import { configDotenv } from "dotenv";
import express from 'express';
import usersRouter from "./routes/users.js"
import { postsRouter, commentsRouter } from "./routes/posts.js";
import mongoose from "mongoose";
// import logger from "./middlewares/logger.js";

configDotenv({path: ".env"})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (err) {
        console.error(err);
    }
}

connectDB().then(() => {
    console.log("Mongodb Connected");
})

const app = express();

app.use(express.json()); // postman reference: body -> raw -> json
app.use(express.urlencoded({ extended: true })); // postman reference: body -> x-www-form-urlencoded


// HOME ROUTE
app.get('/', (req, res) => {
    // throw new Error("Intentional error")
    // res.status(500).send("Intentional error")
    res.status(202).send({ message: "Hello world!"})
})

// MIDDLEWARE
// app.use((req, res, next) => {
//     console.log(`Middleware: ${req.method}\t${req.path}`);
//     // if (condition) next()
//     // else throw new Error("Not authorized")
//     next()
// })

// ROUTES
app.use("/api/users", usersRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)

// ERROR HANDLING
app.use((err, req, res, next) => {
    console.log("Error Received: ", err)
    res.status(500).send(err.message);
})

// 404 ROUTE
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT, () => {
    console.log(`Express web server listening on ${process.env.PORT}`);
})