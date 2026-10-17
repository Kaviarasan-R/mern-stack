const { configDotenv } = require("dotenv")

configDotenv({
    path: ".env"
})

const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/posts.js");

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json()); // Middleware
app.use(express.urlencoded({ extended: true })) // Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send({message: "Hello world"})
})

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)

/**
 * app.post("/user/:id/settings", (req, res) => {
 *     console.log(req.headers, req.body, req.query, req.query.age, req.params["id"])
 *
 *     res.send({message: "Post user"})
 * })
 * */

app.use((req, res) => { // MIDDLEWARE
    res.status(404).send({message: "Not Found"})
})

// ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(400).send({message: err.message})
})

// WEB SERVER - HTTP
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
