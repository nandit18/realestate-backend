const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route: POST /api/chatbot
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [
        {
          role: "system",
          content: "You are a helpful AI real estate expert. Only answer questions related to land, properties, area analysis, pricing, and nearby facilities.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI chatbot error:", error.message);
    res.status(500).json({ error: "Something went wrong with the AI response." });
  }
});

module.exports = router;
