const express = require("express");
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");
const { authMiddleware } = require("../middleware/authMiddleware");

// console.log("createEvent:", createEvent);
// console.log("getEvents:", getEvents);
// console.log("getEventById:", getEventById);
// console.log("updateEvent:", updateEvent);
// console.log("deleteEvent:", deleteEvent);
// console.log("protect:", protect);

const router = express.Router();

// Create a new event (Protected)
router.post("/", authMiddleware, createEvent);

// Get all events
router.get("/", getEvents);

// Get a single event by ID
router.get("/:id", getEventById);

// Update an event (Protected)
router.put("/:id", authMiddleware, updateEvent);

// Delete an event (Protected)
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
