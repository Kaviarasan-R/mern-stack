const { configDotenv } = require("dotenv")

configDotenv({
    path: ".env"
})

const express = require('express');
const documentRouter = require("./routes/documents.js");
const chatRouter = require("./routes/chat.js");
const agentRouter = require("./routes/agent.js");

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json()); // Middleware
app.use(express.urlencoded({ extended: true })) // Middleware

app.get("/", (req, res) => {
    res.send({message: "Hello world"})
})

app.use("/api/documents", documentRouter)
app.use("/api/chat", chatRouter)
app.use("/api/agent", agentRouter)

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
