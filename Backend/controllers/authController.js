const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const sendVerificationEmail = async (mailOptions, retries = 3, delay = 2000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return; // Exit on success
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) throw error; // Fail after max retries
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    }
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, college, department, year } = req.body;

    // Validate input
    if (!name || !email || !phone || !college || !department || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verification token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    console.log("Token: ", token);
    const mailOptions = {
      from: `"Wootz 25" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Wootz 25",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: left; padding: 20px; background-color: #000; color: white; max-width: 450px; margin: auto; border-radius: 8px;">
          <h2 style="color: #ff9900; text-align: center;">Wootz 25 - Email Verification</h2>
          <p style="color: white;">Hello <strong>${name}</strong>,</p>
          <p style="color: white;">Click the button below to set up your password and verify your account:</p>
          <div style="text-align: center; margin-top: 10px;">
            <a href="${process.env.FRONTEND_URL}/auth/set-password?token=${token}" 
               style="display: inline-block; padding: 12px 24px; background-color: #ff9900; color: #000; 
               text-decoration: none; font-weight: bold; border-radius: 5px;">
              Verify Email
            </a>
          </div>
          <p style="color: white; font-size: 12px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
          <hr style="border: 0.5px solid #333; margin: 20px 0;">
          <p style="color: white; font-size: 14px;">Best wishes,<br><strong>Wootz Team</strong><br>PSG College of Technology</p>
        </div>
      `,
    };

    await sendVerificationEmail(mailOptions);

    const user = new User({
      name,
      email,
      phone,
      college,
      department,
      year,
      verification_token: token,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully. Please verify your email to complete the registration.",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      return res.status(500).json({ message: "Failed to send verification email", error: error.message });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate input
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verified = true;
    await user.save();

    const jwt_token = jwt.sign(
      { userId: user._id, role: user.role, wootz_id: user.wootz_id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.status(200).json({
      message: "Password set successfully",
      jwt_token
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

    const isMatch = await bcrypt.compare(password, user.password);
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
      secure: false,
      sameSite: 'None',
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        department: user.department,
        year: user.year,
        wootz_id: user.wootz_id,
        verified: user.verified,
        payment: user.payment
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.verify_email = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = user.verification_token;
    const mailOptions = {
      from: `"Wootz 25" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Wootz 25",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: left; padding: 20px; background-color: #000; color: white; max-width: 450px; margin: auto; border-radius: 8px;">
          <h2 style="color: #ff9900; text-align: center;">Wootz 25 - Email Verification</h2>
          <p style="color: white;">Hello <strong>${user.name}</strong>,</p>
          <p style="color: white;">Click the button below to set up your password and verify your account:</p>
          <div style="text-align: center; margin-top: 10px;">
            <a href="${process.env.FRONTEND_URL}/auth/set-password?token=${token}" 
               style="display: inline-block; padding: 12px 24px; background-color: #ff9900; color: #000; 
               text-decoration: none; font-weight: bold; border-radius: 5px;">
              Verify Email
            </a>
          </div>
          <p style="color: white; font-size: 12px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
          <hr style="border: 0.5px solid #333; margin: 20px 0;">
          <p style="color: white; font-size: 14px;">Best wishes,<br><strong>Wootz Team</strong><br>PSG College of Technology</p>
        </div>
      `,
    };


    await transporter.sendMail(mailOptions);
    res.json({ message: "Verification email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send verification email" });
  }

};

exports.syncPayment = async (req, res) => {
  try {
    const data = req.body;
    for (const item of data) {
      await User.updateOne(
        { wootz_id: item.wootz_id },
        { $set: { payment: item.payment } },) // payment is now a boolean 
    }
    res.status(200).send('Payment status updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating MongoDB');
  }
}