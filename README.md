# 🤖 SiteAI — AI Website Builder (MERN Stack)

A full-stack AI-powered website builder built with the MERN stack and Google Gemini AI. Enter your business information and get a complete, editable website generated in seconds.

![SiteAI](https://img.shields.io/badge/Stack-MERN-4f46e5?style=flat-square) ![AI](https://img.shields.io/badge/AI-Google%20Gemini-4285f4?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🔐 **JWT Authentication** — Signup, login, persistent sessions
- 🤖 **AI Content Generation** — Google Gemini generates hero, about, services, FAQ, testimonials, CTA, contact & SEO
- 🎨 **Live Split-Screen Editor** — Edit and preview simultaneously
- 🔄 **Section Regeneration** — Re-generate any section individually with AI
- 💾 **Project Management** — Create, save, reopen, delete projects
- 📱 **Mobile/Desktop Preview** — Toggle between viewport sizes
- 🌙 **Dark/Light Mode** — Persisted theme preference
- 📤 **Export** — Download as HTML, JSON, or Markdown
- 🎯 **3-Step Form** — Guided multi-step business information form

---

## 🗂️ Project Structure

```
ai-website-builder/
├── server/                    # Node.js + Express backend
│   ├── ai/
│   │   ├── geminiService.js   # Google Gemini API integration
│   │   └── promptTemplates.js # AI prompt builders
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protection
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── ai.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── validateEnv.js
│   ├── .env.example
│   └── index.js
│
└── client/                    # React + Vite + Tailwind frontend
    └── src/
        ├── components/
        │   ├── BusinessForm.jsx   # 3-step form
        │   ├── WebsiteEditor.jsx  # Collapsible section editors
        │   ├── WebsitePreview.jsx # Live website renderer
        │   ├── ExportModal.jsx    # Export to HTML/JSON/MD
        │   ├── Navbar.jsx
        │   ├── LoadingSpinner.jsx
        │   ├── EmptyState.jsx
        │   └── Skeleton.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ThemeContext.jsx
        ├── hooks/
        │   ├── useDebounce.js
        │   ├── useLocalStorage.js
        │   └── useProject.js
        ├── layouts/
        │   ├── DashboardLayout.jsx
        │   └── AuthLayout.jsx
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── LoginPage.jsx
        │   ├── SignupPage.jsx
        │   ├── DashboardPage.jsx
        │   └── EditorPage.jsx
        ├── routes/
        │   └── ProtectedRoute.jsx
        ├── services/
        │   ├── api.js
        │   ├── authService.js
        │   ├── projectService.js
        │   └── aiService.js
        └── utils/
            └── helpers.js
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- Google Gemini API key — free at [aistudio.google.com](https://aistudio.google.com)

---

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ai-website-builder

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 2. Configure Environment Variables

**Server** (`server/.env`):
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-website-builder
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Client** (`client/.env`):
```bash
cd client
cp .env.example .env
```

`client/.env` contents (already correct):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Get a Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → **Create API Key**
3. Copy the key into `server/.env` as `GEMINI_API_KEY`

> The free tier is sufficient for development — no credit card required.

---

### 4. Run the Application

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → Server running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → App running at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register user |
| POST | `/api/auth/login` | — | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/projects` | ✅ | Get all user projects |
| POST | `/api/projects` | ✅ | Create project |
| GET | `/api/projects/:id` | ✅ | Get project by ID |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| POST | `/api/ai/generate` | ✅ | Generate full website |
| POST | `/api/ai/regenerate-section` | ✅ | Regenerate one section |

---

## 🏗️ Generated Website Sections

Each AI generation produces:

| Section | Content |
|---------|---------|
| **Hero** | Headline, subtitle, CTA button |
| **About** | Title, description paragraphs |
| **Services** | 4–6 cards with icon, title, description |
| **Testimonials** | 3 customer quotes with name/role |
| **FAQ** | 5–6 questions and answers |
| **CTA** | Call-to-action with title and button |
| **Contact** | Email, phone, address |
| **SEO** | Meta title, description, keywords |
| **Colors** | Primary, secondary, accent hex colors |

---

## 🚢 Deployment

### Backend → Render

1. Push `server/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set environment variables in Render dashboard
4. Build command: `npm install`
5. Start command: `node index.js`

### Frontend → Vercel

1. Push `client/` to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set `VITE_API_URL=https://your-render-url.onrender.com/api`
4. Deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| AI | Google Gemini 1.5 Flash |
| Icons | React Icons (Feather) |
| Toasts | React Hot Toast |
| Fonts | Syne, DM Sans (Google Fonts) |

---

## 📄 License

MIT — free to use and modify.
