const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser, getUserProfile ,exportUsersToGoogleSheet} = require("../controllers/userController");

const router = express.Router();

router.get("/export-google-sheet", exportUsersToGoogleSheet);

module.exports = router;
