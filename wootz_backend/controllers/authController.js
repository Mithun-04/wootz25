const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, phone, college, branch, year } = req.body;

    // Validate input
    if (!name || !email || !phone || !college || !branch || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user without password and verified status
    const user = new User({ name, email, phone, college, branch, year });
    await user.save();

    // Create a verification tokencd
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log("Token: ", token);
    res.cookie('verification_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully. Please verify your email to complete the registration.",
      user: {
        name: user.name,
        email: user.email,
        wootz_id: user.wootz_id,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// New endpoint to handle email verification link and password setting
exports.setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate input
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verified = true;
    await user.save();

    res.status(200).json({
      message: "Password set successfully",
      user: {
        name: user.name,
        email: user.email,
        wootz_id: user.wootz_id,
      }
    }
    );
  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Use the comparePassword method we added to the UserSchema
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with additional user info
    const token = jwt.sign(
      { userId: user._id, role: user.role, wootz_id: user.wootz_id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.cookie('wootz___proj', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      // user: {
      //     name: user.name,
      //     email: user.email,
      //     wootz_id: user.wootz_id,
      //     role: user.role
      // }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    // Assuming the user ID is extracted from the token in a middleware
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        wootz_id: user.wootz_id,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};