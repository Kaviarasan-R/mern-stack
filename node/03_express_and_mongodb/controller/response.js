import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import User from "../model/users.js"
import Employee from "../model/employees.js"

function response(req, res) {
    res.status(200).json({message: "response success"});
}

function postsResponse(req, res) {
    console.log(req.headers, req.query, req.logger, req.params, req.body)

    const {pid, uid} = req.params
    console.log(pid, uid)

    const {name, age} = req.query
    console.log(name, age)

    res.status(202).send({ message: "Hello world!"})
}

/**
POST http://localhost:3000/api/users/register (raw -> json)
    {
        "user": "Kavi",
        "pwd": "123"
    }
*/
async function registerUser(req, res) {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.insertOne({
        username: user,
        password: hashedPwd
    })

    console.log("result", result)

    res.status(200).send({message: "User registered"})
}

async function loginUser(req, res) {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const hasUser = await User.findOne({ username: user })
    if (!hasUser) return res.sendStatus(401);

    const isPwdMatched = await bcrypt.compare(pwd, hasUser.password);
    if (!isPwdMatched) return res.sendStatus(401);

    const accessToken = jwt.sign(
        {
            username: hasUser.username,
            roles: hasUser.roles,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1000s' }
    );

    res.status(200).send({ token: accessToken })
}

async function addEmployee(req, res) {
    const getUser = await User.findOne({ username: req.user.username })
    if (!getUser) return res.sendStatus(401);

    console.log(getUser)

    const employee = await Employee.insertOne({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        user: getUser._id
    })

    res.status(200).send({message: employee})
}

export { response, postsResponse, registerUser, loginUser, addEmployee }