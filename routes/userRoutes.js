const express = require("express");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ min: 13 })
    .withMessage("Email must be at least 13 characters long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  async (req, res) => {
    console.log("Received user form data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Validation failed" });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Validation failed" });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or password is invalid" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Username or password is invalid" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
    });
  }
);

module.exports = router;
