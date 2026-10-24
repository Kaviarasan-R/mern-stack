const express = require("express");
const { upload, getAll, remove } = require("../controllers/documents");
const uploadFile = require("../middlewares/upload");

const documentRouter = express.Router();

documentRouter.post("/upload", uploadFile.single("file"), upload)
documentRouter.get("/", getAll)
documentRouter.delete("/:id", remove)

module.exports = documentRouter;
