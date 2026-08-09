# CampusPilot AI

A full‑stack AI‑powered career and placement platform.

## Project structure
```
CampusPilot_AI_Web/
├─ index.html          # Front‑end entry point (already live on Surge)
├─ style.css           # Front‑end styles
├─ script.js           # Front‑end logic
├─ backend/            # Node.js/Express API
│   ├─ package.json
│   ├─ server.js
│   ├─ .env.example    # Example environment variables
│   └─ src/
│       ├─ models/     # Mongoose models (User, Job, College, Application)
│       └─ routes/     # API route placeholders
└─ .gitignore          # Git ignore for both front‑end and back‑end
```

## How to run locally
```bash
# Clone the repo
git clone <repo-url>
cd CampusPilot_AI_Web

# Front‑end (static) – just open index.html or serve via any static server
# Backend
cd backend
npm install
cp .env.example .env   # fill in your MongoDB URI and JWT secret
npm run dev            # starts server on PORT (default 8080)
```

## Deployment
- **Front‑end** is already deployed on Surge (`https://campuspilot-ai.surge.sh`).
- **Back‑end** can be deployed to Railway (or Render/Heroku). Connect the repo, set the environment variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`), and Railway will provide a public URL.

## Next steps
- Implement the API routes (`auth`, `recruiter`, `college`, `jobs`).
- Add dark‑mode toggle to the front‑end.
- Extend CI/CD with GitHub Actions.
