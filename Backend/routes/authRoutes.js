const express = require("express");
const { register, login, getProfile, setPassword, verify_email , syncPayment} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { set } = require("mongoose");

// console.log("registerUser:", register);
// console.log("loginUser:", login);
// console.log("getProfile:", getProfile);
// console.log("protect:", protect);

// console.log({ register, login, getProfile, authMiddleware });

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user profile (Protected route)
router.get("/profile", getProfile);

router.post("/setpassword", setPassword);

router.post("/verify_email", verify_email);

router.post("/syncPayment" , syncPayment)

module.exports = router;
