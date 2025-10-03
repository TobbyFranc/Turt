import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/api/chat", async (req, res) => {
    console.log("Request body:", req.body);
  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("Received message:", message);
  console.log("API Key present:", !!apiKey);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);
    res.json(data);
  } catch (error) {
    console.error("Error contacting OpenAI:", error);
    res.status(500).json({ error: "Failed to contact OpenAI" });
  }
});

/* 🌍 Cultural Search Route (Wikipedia) */
app.get("/api/culture", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.extract) {
      res.json({ snippet: data.extract });
    } else {
      res.status(404).json({ error: "No cultural insights found." });
    }
  } catch (error) {
    console.error("Wikipedia error:", error);
    res.status(500).json({ error: "Failed to fetch cultural insights" });
  }
});

/* 🚀 Start Server */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));