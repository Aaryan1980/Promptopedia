<h1 align="center">
  <br>
  🧠 Promptopedia
  <br>
</h1>

<h4 align="center">A social platform for sharing, discovering, and remixing AI prompts.</h4>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>

---

## Features

- 🔐 **Auth** — JWT-based registration and login
- 📝 **Prompts** — Create, edit, delete, and browse AI prompts
- ❤️ **Likes & Comments** — Engage with the community
- 🔁 **Remixes** — Fork and remix prompts from other users
- 👥 **Follow System** — Follow creators you love
- 🔔 **Notifications** — Real-time activity updates
- 💬 **Messages** — Direct messaging with Socket.io
- 📱 **Responsive Design** — Works great on all screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router v6 |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB with Mongoose |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |
| **Real-time** | Socket.io |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
prompt-social/
├── backend/                  # Express + TypeScript API
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth & error middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   └── utils/            # Helpers & utilities
│   ├── .env.example          # Environment variable template
│   └── server.ts             # Entry point
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── api/              # Axios API client
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context (Auth etc.)
│   │   └── pages/            # Route-level page components
│   └── vite.config.js
│
├── package.json              # Root scripts (runs both)
└── DEPLOYMENT_GUIDE.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally or a connection string from [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** v9+

### 1. Clone the repo

```bash
git clone https://github.com/Code-Hexster/Promptopedia.git
cd Promptopedia/prompt-social
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

```bash
cp backend/.env.example backend/.env
# Fill in your MONGO_URI and JWT_SECRET
```

### 4. Start the development servers

```bash
npm run dev
```

This starts both the backend (`:5001`) and frontend (`:5173`) concurrently.

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to **Render** (backend) and **Vercel** (frontend).

---

<p align="center">Built with ❤️ by <a href="https://github.com/Code-Hexster">Code-Hexster</a></p>
