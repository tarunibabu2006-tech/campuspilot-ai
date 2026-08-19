<div align="center">

<img src="https://img.shields.io/badge/CampusPilot_AI-Your_Smart_Campus_Companion-6C63FF?style=for-the-badge&logo=rocket&logoColor=white" alt="CampusPilot AI Banner"/>

# 🎓 CampusPilot AI

**Your all-in-one AI-powered academic & career companion for Indian college students.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-campus--pilot--ai.vercel.app-6C63FF?style=for-the-badge)](https://campus-pilot-ai.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-tarunibabu2006--tech-181717?style=for-the-badge&logo=github)](https://github.com/tarunibabu2006-tech/campuspilot-ai)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

</div>

---

## 🚀 Live URL

> **🔗 [https://campus-pilot-ai.vercel.app]( https://campus-pilot-ai-eta.vercel.app)**

---

## 📌 What is CampusPilot AI?

CampusPilot AI is a full-stack web platform built specifically for Indian college students to navigate academics, placements, and career growth — all in one place. Powered by Google Gemini AI, it provides real-time assistance, smart search, and personalized guidance.

---

## ✨ Key Features

| Module | Description |
|---|---|
| 🔐 **Google One-Click Login** | Instant authentication using the device's Google account — no manual entry needed |
| 🧠 **AI Chat Assistant** | Powered by Google Gemini — ask anything about academics, placements, or career |
| 💼 **Job Portal** | 1000+ live job listings with smart search by role, domain, company & location |
| 📚 **Notes Hub** | 1000+ curated academic notes across Engineering, Arts, Science & more — with AI Flashcards |
| 🛠️ **Skill Hub** | Browse 1050+ industry skills categorised by domain with learning roadmaps |
| 📊 **Skill Gap Analyzer** | Compare your current skills vs. target job requirements with AI-driven insights |
| 🎤 **Mock Interview** | Role-specific AI mock interviews with real-time feedback |
| 📝 **Aptitude Test** | 1000+ aptitude questions (Quantitative, Logical, Verbal) with timed practice |
| 📄 **Resume Builder** | ATS-friendly resume generator with AI enhancement tips |
| 🏛️ **Placements Tracker** | Track campus placement drives, company visits, and offer statistics |
| 🚨 **Exam Emergency** | Last-minute revision planner with AI summaries and priority topics |
| 📅 **Bunk Planner** | Smart attendance calculator — know exactly how many classes you can skip |
| 🎓 **Viva Prep** | Subject-wise viva Q&A generator powered by AI |
| 🔧 **Admin Panel** | Password-protected admin dashboard to manage content, notes, and users |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite 4** — blazing-fast dev & build
- **Vanilla CSS** — custom design system with glassmorphism & dark mode
- **Lucide React** — icon library
- **React Hot Toast** — elegant notifications
- **Axios** — HTTP client

### Backend
- **Node.js** + **Express.js** — REST API server
- **MongoDB** (Mongoose) — data persistence
- **Google Gemini AI API** — AI-powered features
- **JWT** — secure authentication

### DevOps
- **Vercel** — frontend deployment & CI/CD
- **GitHub** — version control

---

## 📂 Project Structure

```
campuspilot-ai/
├── frontend/
│   ├── src/
│   │   ├── components/         # All UI components
│   │   │   ├── Admin/          # Admin Panel
│   │   │   ├── Auth/           # Login & Register
│   │   │   ├── Dashboard/      # Student Dashboard
│   │   │   ├── Jobs/           # Job Portal
│   │   │   ├── Interview/      # Mock Interview & Aptitude
│   │   │   ├── Resume/         # Resume Builder
│   │   │   └── Skills/         # Skill Hub & Roadmaps
│   │   ├── context/            # AuthContext (global auth state)
│   │   ├── data/               # 1000+ static datasets (jobs, skills, notes, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   └── services/           # API service layer
│   └── index.html
├── backend/
│   ├── routes/                 # Express route handlers
│   ├── models/                 # Mongoose models
│   ├── controllers/            # Business logic
│   ├── middleware/             # Auth middleware
│   ├── data/                   # Seed data & AI prompts
│   └── server.js               # Entry point
├── docs/                       # Architecture documentation
├── vercel.json                 # Vercel deployment config
└── README.md
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/tarunibabu2006-tech/campuspilot-ai.git
cd campuspilot-ai
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret_key
ADMIN_PASSWORD=your_admin_password
```

Start the backend server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🌐 Deployment

The frontend is deployed on **[Vercel](https://vercel.com)**. Every push to the `main` branch triggers an automatic deployment.

> **Live URL:** [https://campus-pilot-ai.vercel.app](https://campus-pilot-ai.vercel.app)

---

## 🔐 Admin Access

The Admin Panel is password-protected. Only authenticated admins can:
- Manage and publish notes
- Add/edit job listings
- View user analytics
- Configure aptitude questions and roles

> ⚠️ Admin credentials are not public. Contact the project owner for access.

---

## 📊 Dataset Scale

| Category | Count |
|---|---|
| 💼 Jobs & Vacancies | 1000+ |
| 🛠️ Skills | 1050+ |
| 📚 Notes | 1000+ |
| 🧩 Aptitude Questions | 1000+ |
| 🎯 Roles & Domains | 500+ |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Taruni Babu**
- GitHub: [@tarunibabu2006-tech](https://github.com/tarunibabu2006-tech)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ for Indian college students

**⭐ Star this repo if you found it useful!**

</div>
