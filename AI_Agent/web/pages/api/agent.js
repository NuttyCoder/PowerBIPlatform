// This is a Vercel Serverless Function to securely call OpenAI GPT-4
export default async function handler(req, res) {
  const { question } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful analytics assistant for JRW Sales. Keep responses under 100 words." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that.";
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch OpenAI response." });
  }
}
""",
    "pages/agent-chat.js": """
import { useState } from "react";

export default function AgentChat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAgent = async () => {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>JRW Forecast AI Assistant</h1>
      <textarea
        rows="4"
        style={{ width: "60%", fontSize: "16px" }}
        placeholder="Ask a question about your dashboard..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <button onClick={askAgent} style={{ marginTop: 10, padding: "10px 20px" }}>
        Ask Agent
      </button>
      <div style={{ marginTop: 30, fontSize: "18px", color: "#333" }}>
        <strong>Agent:</strong> {response}
      </div>
    </div>
  );
}
""",
    ".env.local.example": """
# Copy this file to .env.local and insert your OpenAI API key
OPENAI_API_KEY=sk-xxxxxxx
