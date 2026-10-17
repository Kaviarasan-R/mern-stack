const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const prisma = require("../prisma/client");

async function register(req, res) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    const duplicate = await prisma.user.findUnique({ where: { username: username } })
    // SELECT * FROM user WHERE username = username;

    if (duplicate) {
        return res.status(409).send({ message: "Already registered" });
    }

    await prisma.user.create({ data: { username, password: await bcrypt.hash(password, 10) } })

    return res.status(201).send({ message: "Registered successfully." });
}

async function login(req, res) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    const foundUser = await prisma.user.findUnique({ where: { username }, omit: { password: false } });
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

    await prisma.user.update({ where: { id: foundUser.id }, data: { refreshToken } });
    // UPDATE user SET refreshToken = "" WHERE id = ""

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
}

async function refresh(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await prisma.user.findFirst({ where: { refreshToken } });
    if (!foundUser) return res.sendStatus(403); //Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.user) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { user: decoded.user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { register, login, refresh };
