const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const sendOtpRoute = require("./routes/sendOtp");
const verifyOtpRoute = require("./routes/verifyOtp");
const aiChatbotRoute = require("./routes/aichatbot"); // AI Chatbot route

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define API routes
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);
app.use("/api/chatbot", aiChatbotRoute);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
