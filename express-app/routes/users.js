const express = require("express");
const {getResponse, putResponse} = require("../controllers/users");
const logger = require("../middlewares/logger");
const verifyToken = require("../middlewares/verifyToken");

const userRouter = express.Router();

userRouter.route("/")
    // MIDDLEWARE
    .all((req, res, next) => {
        console.log("Hello world")
        next()
    })
    // RESPONSE
    .get((req, res) => {
        res.status(200).send({ message: "Get route retrieved" });
    })
    .post((req, res) => {
        res.status(200).send({ message: "Post route retrieved" });
    })
    .put((req, res) => {
        res.status(200).send({ message: "Put route retrieved" });
    })
    .delete((req, res) => {
        res.status(200).send({ message: "Delete route retrieved" });
    })

userRouter.get("/all", verifyToken, logger, getResponse)

userRouter.get("/:id", (req, res) => {
    throw new Error("User not found")
    // res.status(400).send({ message: "User not found" })
})

userRouter.post("/create", (req, res) => {
    console.log(req.body)
    res.status(200).send({ message: "Create user" })
})

userRouter.put("/update", putResponse)

userRouter.delete("/delete", (req, res) => {
    res.status(200).send({ message: "Delete user" })
})

module.exports = userRouter;