const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User"); // Import User model

dotenv.config();

// Middleware to verify JWT token and attach user object
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        // Fetch user and attach it to request
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user object
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to ensure user is an admin
const admin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized, please login" });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
};

module.exports = { authMiddleware, admin };
