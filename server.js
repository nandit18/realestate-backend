const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const sendOtpRoute = require('./routes/sendOtp');
const verifyOtpRoute = require('./routes/verifyOtp');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/send-otp', sendOtpRoute);
app.use('/api/verify-otp', verifyOtpRoute);

// Test route
app.get('/api/test', (req, res) => {
  res.send('TerraMind backend is working!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
