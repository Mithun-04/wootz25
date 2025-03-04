const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser, getUserProfile } = require("../controllers/userController");
const { admin, authMiddleware } = require("../middleware/authMiddleware");

// console.log("getUsers:", getUsers);
// console.log("getUserById:", getUserById);
// console.log("updateUser:", updateUser);
// console.log("deleteUser:", deleteUser);
// console.log("admin:", admin);

const router = express.Router();

// Get all users (Admin only)
router.get("/", authMiddleware, admin, getUsers);

// Update user profile (Authenticated user)
router.get("/profile", authMiddleware, getUserProfile);

// Get a single user by ID (Protected)
router.get("/:id", authMiddleware, getUserById);

// Update a user (Protected)
router.put("/:id", authMiddleware, updateUser);

// Delete a user (Admin only)
router.delete("/:id", authMiddleware, admin, deleteUser);


module.exports = router;
