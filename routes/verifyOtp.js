const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    if (user.otp === otp) {
      return res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
      return res.status(401).json({ message: 'Incorrect OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'OTP verification failed.' });
  }
});

module.exports = router;
