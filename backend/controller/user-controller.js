// routes/auth.js
const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const Files = require("../model/file-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { validate } = require("../validation/auth-validation");
const verifyToken = require("../middlewares/auth-middleware");
const upload = require("../upload-files/multer");

const JWT_SECRET = process.env.JWT_SECRET;

// User registration
userRouter.get("/files", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const files = await Files.find({ user_id: userId });
    res.status(200).json({ files: files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

userRouter.post('/files', verifyToken , upload.single('file'), async (req, res) => {
    try {
        const fileData = req.file;
        console.log(fileData);
        const file = new Files({ file_path: fileData.path.replace("public/",""), user_id: req.userId, meta_data: fileData });
        await file.save();
        // Handle the uploaded file
        res.json({ message: 'File uploaded successfully!' });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
  });

module.exports = userRouter;
