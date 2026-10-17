const express = require("express");
const { getAll, getOne, update, remove } = require("../controllers/crud")("user");
const verifyToken = require("../middlewares/verifyToken");

const userRouter = express.Router();

userRouter.use(verifyToken)
userRouter.get("/", getAll)
userRouter.route("/:id").get(getOne).put(update).delete(remove)

module.exports = userRouter;
