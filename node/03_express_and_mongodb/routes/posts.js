import express from "express";
import logger from "../middlewares/logger.js";
import {postsResponse, response} from "../controller/response.js";

const postsRouter = express.Router();
const commentsRouter = express.Router();

postsRouter.route("/")
    .all(logger)
    .get(logger, (req, res) => {
        console.log(req.logger)
        res.status(200).json({message: "get success"});
    })
    .put(response)
    .delete(response)

// postsRouter.get("/api/users", (req, res) => {})
// postsRouter.put("/api/users", (req, res) => {})
// postsRouter.delete("/api/users", (req, res) => {})

postsRouter.post("/:pid/users/:uid", logger, postsResponse)

commentsRouter.get("/", response)

export { postsRouter, commentsRouter };

