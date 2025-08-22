const express = require("express");
const fileModel = require("../models/fileModel");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/home", authMiddleware, async (req, res) => {
  const files = await fileModel.find({ user: req.authUser.userId });
  res.render("home", { files });
});

router.post("/upload-file", authMiddleware, async (req, res) => {
  const { fileBase64, fileName, fileType } = req.body;

  if (!fileBase64 || !fileName || !fileType) {
    return res.status(400).json({ message: "File data is required" });
  }

  const newFile = await fileModel.create({
    fileData: Buffer.from(fileBase64, "base64"),
    fileType,
    fileName,
    user: req.authUser.userId,
  });

  res.status(200).json({
    message: "File uploaded successfully",
    file: newFile,
  });
});

router.get("/download-file/:id", authMiddleware, async (req, res) => {
  const file = await fileModel.findOne({
    _id: req.params.id,
    user: req.authUser.userId,
  });
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }
  res.set({
    "Content-Type": file.fileType,
    "Content-Disposition": `attachment; filename=${file.fileName}`,
  });
  res.send(file.fileData);
});

module.exports = router;
