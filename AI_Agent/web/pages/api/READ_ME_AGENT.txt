✅ AI Agent Integration - JRW Portal (Vercel + OpenAI)

1. Add your OpenAI key to a .env.local file:
   OPENAI_API_KEY=sk-your-key-here

2. The agent lives at:
   /pages/api/agent.js

3. Access the chat interface at:
   /agent-chat

4. You can ask questions like:
   - "Why did my sales drop last quarter?"
   - "Explain what RMSE means in my dashboard."
   - "How do I improve my forecast accuracy?"

Deploy this project to Vercel. The serverless function runs securely there and uses your private API key.
| Role Name             | Functionality                             |
| --------------------- | ----------------------------------------- |
| 🔍 Forecast Explainer | Explains drops, spikes, seasonality       |
| 🧾 Report Generator   | Summarizes dashboard monthly/weekly       |
| 🧠 Insight Coach      | Recommends actions based on KPIs          |
| 💬 Chat Assistant     | Client support for “What does Bias mean?” |

✅ Option 1: Client-Side OpenAI Agent (No Backend)
Use OpenAI's JavaScript SDK

Load a lightweight chat agent into your portal

Ask questions about dashboard, and manually structure replies

✅ Option 2: No-Code AI Embeds
Use:

ChatGPT Widget via iframe (safe)

Retool, Chatbase, or Ragic AI to train bots on your dashboards or documentation

Embed them directly into your dashboard sidebar

Pros:

No dev work

Simple embed

Cons:

Not truly personalized per client unless paired with login state

✅ Option 3: Backend-Optional Agent Actions
Use tools like:

LangChain or Semantic Kernel (AI agent frameworks)

Deploy via Vercel Serverless Functions

Pull Power BI summary data → analyze → return natural language
