const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env file

const app = express();
app.use(cors());
app.use(express.json()); // to read JSON data from frontend

// Routes placeholder
// We'll add actual routes here later
app.get('/', (req, res) => {
  res.send('Real Estate API is running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
