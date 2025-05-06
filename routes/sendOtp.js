const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Utility to generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const otp = generateOtp();

  try {
    // Save user with OTP to MongoDB
    const user = new User({ name, email, otp });
    await user.save();

    // Send OTP via Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your TerraMind OTP',
      text: `Hello ${name},\n\nYour OTP for TerraMind is: ${otp}\n\nCheck your spam folder too if you don’t see it.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});

module.exports = router;
