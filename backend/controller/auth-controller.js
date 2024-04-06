// routes/auth.js
const express = require("express");
const authRouter = express.Router();
require("dotenv").config();
const User = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { validate } = require("../validation/auth-validation");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET;

// User registration
authRouter.post("/register", validate("createUser"), async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email: email,
      user_id: uuidv4(),
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// User login
authRouter.post("/forgot", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      delete user.password;
      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "User not found" });
    }
  });

  authRouter.post("/forgot/reset", async (req, res) => {
    try {
      const { user_id, password } = req.body;
      const user = await User.findOne({ user_id });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userUpdate = await user.updateOne({password: hashedPassword})
      delete userUpdate.password;
      res.status(200).json({ user: userUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "User not found" });
    }
  });

module.exports = authRouter;
