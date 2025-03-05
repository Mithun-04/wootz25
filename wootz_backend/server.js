const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');


const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.set("debug", true);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Event Organizer API 🚀");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

