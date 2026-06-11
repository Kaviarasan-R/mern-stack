import express from "express";
import {addEmployee, loginUser, registerUser, response} from "../controller/response.js";
import verifyToken from "../middlewares/protected.js";

const usersRouter = express.Router();

usersRouter.get("/", response)
usersRouter.post("/register", registerUser)
usersRouter.post("/login", loginUser)
usersRouter.put("/add-employee", verifyToken, addEmployee)
usersRouter.delete("/", response)

export default usersRouter;