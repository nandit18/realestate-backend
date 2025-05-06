const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route for Render root URL
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Routes
app.use("/api", require("./routes/sendOtp"));
app.use("/api", require("./routes/verifyOtp"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
