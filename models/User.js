const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Auto-delete after 5 minutes
  }
});

module.exports = mongoose.model('User', userSchema);
