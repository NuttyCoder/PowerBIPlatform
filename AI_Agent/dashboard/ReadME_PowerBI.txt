Use Power BI Desktop to:
1. Load Clean_Forecast.xlsx
2. Create visuals (Forecast vs Actual, MAPE, RMSE)
3. Apply Row-Level Security:
   - Go to Modeling > Manage Roles
   - Add role 'ClientRole' with: [Client_Email] = USERNAME()
4. Publish to Power BI Service and share securely with clients.

    "web/pages/index.js": "/* Subscription tiers and links */",
    "web/pages/login.js": "/* Firebase Google login */",
    "web/pages/dashboard.js": "/* Power BI iframe embed with auth check */",
    "web/pages/agent-chat.js": "/* AI chat UI calling /api/agent */",
    "web/utils/firebase.js": "/* Firebase config with auth */",
    "web/utils/firestore/clients.js": "/* Firestore fetch client metadata */",
    "web/pages/api/agent.js": "/* Vercel function that sends request to OpenAI */",
    "web/.env.local.example": "OPENAI_API_KEY=sk-...\nNEXT_PUBLIC_FIREBASE_API_KEY=...",

| Stage                           | Component                | Tools                              | Delivered Code             |
| ------------------------------- | ------------------------ | ---------------------------------- | -------------------------- |
| 1️⃣ **Data Prep & Forecasting** | Clean + Forecast Sales   | Python (Prophet or moving average) | ✅ Python script → Excel    |
| 2️⃣ **Dashboard Creation**      | Visualize KPIs + RLS     | Power BI Desktop                   | ✅ RLS-ready .pbix template |
| 3️⃣ **Client Portal Web App**   | Login, dashboard, Stripe | Next.js + Firebase                 | ✅ Frontend + Firestore     |
| 4️⃣ **AI Assistant**            | Forecast explainer       | GPT-4 + Vercel Function            | ✅ Serverless /agent API    |
| 5️⃣ **Deployment**              | Live hosting & login     | Vercel + SharePoint                | ✅ Vercel setup + README    |

Goal is to include:

📈 Python sales forecasting script

📊 Power BI dashboard setup instructions

🌐 Next.js web portal (login, dashboard, AI assistant)

🔧 Firebase & Firestore scaffolding

🤖 Serverless GPT-4 agent API

✅ Deployment README

Let me know when you're ready to:

Set your environment variables

Push to GitHub

Connect Vercel for CI/CD

1. Run forecasting: python scripts/forecast_sales.py
2. Import forecast Excel into Power BI, create visuals, and set up RLS
3. Build frontend: cd web && npm install && npm run dev
4. Set environment keys in .env.local
5. Deploy with Vercel. Secure Power BI with login + RLS.
6. AI assistant accessible at /agent-chat
