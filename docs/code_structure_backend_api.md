# CampusPilot AI — Backend API Documentation (`backend/`)

## Overview
The **backend** of CampusPilot AI is a lightweight Node.js Express server that provides RESTful endpoints for the frontend features. It is organized into clear layers:

- **`routes/`** – defines the HTTP routes and ties them to controller functions.
- **`controllers/`** – contains the business‑logic for each feature.
- **`utils/`** – helper modules (e.g., prompt templates, environment loading).
- **`.env`** – stores secret keys and configuration (never committed to source control).

All routes are prefixed with `/api` and return JSON responses. Errors are handled centrally and include a `status` and `message` field.

---

## Route Map
| File | HTTP Method | Endpoint | Description |
|------|-------------|----------|-------------|
| `routes/bunkPlanner.js` | **POST** | `/api/bunk-planner` | Accepts a list of class schedules and returns optimized bunk‑planning suggestions. |
| `routes/jobChecker.js` | **GET** | `/api/job-checker` | Returns the latest job listings filtered by user skill set. |
| `routes/skillGap.js` | **POST** | `/api/skill-gap` | Analyzes a resume against desired job postings and returns a skill‑gap report. |
| `routes/chat.js` | **POST** | `/api/chat` | Proxy endpoint that forwards user prompts to the Gemini AI model and streams the response. |

---

## Controllers
### `controllers/geminiController.js`
- **`handleChat(req, res)`** – validates the request payload, constructs the Gemini prompt (using `utils/prompts.js`), calls the Gemini API, and streams the response back to the client.
- **Error handling** – catches API errors, logs them, and returns a `500` status with a friendly message.

Other controllers follow a similar pattern: they parse request data, perform minimal validation, call a service/helper function (if needed), and respond with JSON.

---

## Utils
- **`utils/prompts.js`** – exports a set of prompt templates for each AI feature (bunk planner, skill gap, job suggestions). These templates are interpolated with user data before being sent to Gemini.
- **`utils/config.js`** – loads environment variables (API keys, port) and provides a central config object.

---

## Environment Variables (`.env`)
```
PORT=5000
GEMINI_API_KEY=your-gemini-api-key
```
> **Note:** The `.env` file should never be committed. It is listed in `.gitignore`.

---

## Installation & Running
```bash
# From the project root
cd backend
npm install          # installs express and other deps
npm run dev           # starts the server on http://localhost:$PORT
```
The server uses `nodemon` for hot‑reloading during development.

---

## Security & Best Practices
- **Input validation** – All routes validate payloads using simple checks; consider adding a library like `joi` for stricter schemas.
- **Rate limiting** – Recommended to add `express-rate-limit` to prevent abuse of the AI endpoints.
- **CORS** – Configured to allow requests only from the frontend origin (`https://campuspilot-ai-five.vercel.app`).

---

## Future Extensions
- Add JWT‑based authentication for protected routes.
- Implement pagination for job listings.
- Expand AI prompts to cover additional student services (e.g., interview prep, resume polishing).

---

*End of Backend API documentation.*
