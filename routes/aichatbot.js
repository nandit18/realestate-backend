const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const aiReply = response.choices[0].message.content;
    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({ error: "Something went wrong with the AI chatbot." });
  }
});

module.exports = router;
