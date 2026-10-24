const express = require("express");
const { ask } = require("../controllers/agent");

const agentRouter = express.Router();

agentRouter.post("/", ask)

module.exports = agentRouter;
