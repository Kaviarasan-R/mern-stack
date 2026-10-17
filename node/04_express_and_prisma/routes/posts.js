const express = require("express");
const { getAll, getOne, create, update, remove } = require("../controllers/crud")("post");
const verifyToken = require("../middlewares/verifyToken");

const postRouter = express.Router();

postRouter.use(verifyToken)
postRouter.route("/").post(create)
postRouter.route("/:id").get(getOne).put(update).delete(remove)

module.exports = postRouter;
