const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const sendOtpRoute = require("./routes/sendOtp");
const verifyOtpRoute = require("./routes/verifyOtp");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

// 👇 This is CRITICAL
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);

// Optional root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
