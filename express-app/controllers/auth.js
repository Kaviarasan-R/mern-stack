const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require('jsonwebtoken');
const {promises: fsPromises} = require("fs");

const USERS_FILE = path.join(__dirname, '..', 'model', 'users.json');

const usersDB = {
    users: require(USERS_FILE),
    setUsers: function (data) { this.users = data }
}

async function register(req, res) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    const duplicate = usersDB.users.find(u => u.username === username)

    if (duplicate) {
        return res.status(409).send({ message: "Already registered" });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const newUser = { "username": username, "password": hashedPwd }

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(USERS_FILE, JSON.stringify(usersDB.users, null, 2));

        return res.status(201).send({ message: "Registered successfully." });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

async function login(req, res) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    const foundUser = usersDB.users.find(person => person.username === username);
    if (!foundUser) {
        return res.status(401).send({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).send({ message: "Incorrect password" });
    }

    const accessToken = jwt.sign(
        { user: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
        { user: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    const currentUser = { ...foundUser, refreshToken };
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);

    usersDB.setUsers([currentUser, ...otherUsers]);
    await fsPromises.writeFile(USERS_FILE, JSON.stringify(usersDB.users, null, 2));

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
}

function refresh(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden

    console.log("refreshToken", refreshToken);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.user) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { register, login, refresh };