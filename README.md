

Frontend: `http://localhost:5173`
Backend API: `http://localhost:5000/api`
Admin Dashboard: `http://localhost:5173/admin-dashboard`

---

## ✨ Features

### Frontend
- ⚛️ React.js with Vite
- 🎨 Premium dark glassmorphism design
- 🌊 Framer Motion animations
- 📱 Fully responsive (320px → 1440px+)
- 🔤 Typewriter effect hero
- 🖥️ Interactive developer terminal
- 🏗️ Engineering architecture visualization (clickable layers)
- 📊 Interactive tech lab (skill cards with details)
- 📁 Project modal with full case studies
- 🔄 Development process walkthrough
- ♿ Accessible (ARIA, keyboard navigation, focus states)

### Backend
- 🟢 Node.js + Express.js REST API
- 🍃 MongoDB with Mongoose ODM
- 🔐 JWT authentication for admin
- 🔒 bcrypt password hashing
- 📧 Email notifications via Nodemailer
- ⚡ Rate limiting (express-rate-limit)
- 🛡️ Security headers (Helmet)
- ✅ Input validation (express-validator)
- 📈 Portfolio analytics tracking
- 🔧 Secure admin dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Framer Motion, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Email | Nodemailer |
| Security | Helmet, express-rate-limit, express-validator |

---

## 📁 Project Structure

```
ramesh-portfolio/
├── client/                    # React.js frontend (Vite)
│   ├── public/
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/        # Navbar, Footer
│   │   ├── sections/          # All page sections
│   │   ├── pages/             # Home, AdminDashboard
│   │   ├── data/              # portfolioData.js (single source of truth)
│   │   ├── services/          # API service layer
│   │   ├── index.css          # Complete design system
│   │   ├── App.jsx            # Router
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Node.js + Express.js backend
│   ├── config/                # MongoDB connection
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   ├── models/                # Mongoose schemas
│   ├── middleware/             # Auth, rate limiting
│   ├── services/              # Email service
│   ├── utils/                 # Helpers
│   ├── server.js              # Entry point
│   ├── .env                   # Environment variables (not committed)
│   └── package.json
│
├── .env.example               # Environment variables template
└── README.md
```

---

