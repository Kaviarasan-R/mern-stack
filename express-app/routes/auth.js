const express = require("express");
const { register, login, refresh } = require("../controllers/auth")

const authRouter = express.Router();

authRouter.post("/register", register)

authRouter.post("/login", login)

authRouter.get("/refresh", refresh)

module.exports = authRouter;