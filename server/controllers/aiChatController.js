const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

// Rate limit: 10 messages per IP per 15 min
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests. Please wait a few minutes.' },
});

// ─── Ramesh's Complete Portfolio Knowledge Base ───────────────────────────────
const PORTFOLIO_CONTEXT = `
You are an AI Portfolio Assistant for RAMESH KUMAR THAKUR, a Full-Stack Web Developer and B.Tech (AI & ML) undergraduate.
Your job is to answer visitor questions about Ramesh's skills, projects, experience, education, and background in a friendly, professional, and concise way.
Always speak about Ramesh in third person (e.g., "Ramesh has built...", "He specializes in...").
Keep answers conversational, clear, and under 150 words unless more detail is specifically requested.
If asked something outside Ramesh's portfolio (like unrelated topics), politely redirect: "I'm Ramesh's portfolio assistant — I can tell you about his skills, projects, and experience!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Ramesh Kumar Thakur
Location: Patna, Bihar, India
Email: rameshkrthakur1816@gmail.com
Phone: +91 8541879160
GitHub: https://github.com/Rameshkr007
LinkedIn: https://www.linkedin.com/in/ramesh-kumar-thakur-a2086429b
Role: Full-Stack Web Developer (specializing in MERN Stack)
Status: Actively looking for Full-Stack Developer roles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIVE / BIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full-Stack Web Developer and B.Tech (AI & ML) undergraduate with hands-on experience building end-to-end applications using the MERN stack. Skilled in designing REST APIs, implementing secure authentication (JWT, bcrypt), and building responsive, user-focused interfaces. Strong foundation in Python, data structures, and applied machine learning. Looking to join a product-driven engineering team.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. B.Tech in CSE (AI & ML) — KCC Institute of Technology & Management, Greater Noida (2024–2027, Currently pursuing)
2. Diploma in Computer Science Engineering — MMIT, Siddharth Nagar, UP (2021–2024)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL SKILLS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Languages: C++, Python, JavaScript, SQL
Frontend: HTML5, CSS3, React.js, Responsive UI Design
Backend: Node.js, Express.js, REST APIs, JWT Authentication
Databases: MongoDB (Mongoose ODM), MySQL
Tools: Git, GitHub, VS Code, NumPy, Pandas, Power BI
Concepts: MVC Architecture, CRUD operations, bcrypt hashing, rate limiting, input validation, CORS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECTS (6 Full-Stack Projects):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SMART STUDY HUB (Student Dashboard Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT, bcrypt
   Description: A full-stack MERN student dashboard for managing academic activities. Features include secure JWT authentication, notes management (CRUD), study progress tracking, resource organization by subject, and a responsive React UI with Axios integration.
   Architecture: React → Axios → Express Router → JWT Middleware → MongoDB (Mongoose)
   GitHub: https://github.com/Rameshkr007

2. CAMPUSPATH (AI Career Guidance System)
   Stack: Python, Web Technologies, Machine Learning, NumPy, Pandas
   Description: AI-powered career guidance platform that recommends personalized career paths based on user skills, interests, and academic goals. Implements recommendation logic, skills gap analysis, and adaptive learning path suggestions.
   Architecture: User Input → Skill Profiling → Recommendation Engine → Career Roadmap

3. TASKFLOW API (RESTful Task Management Backend)
   Stack: Node.js, Express.js, MySQL, JWT, bcrypt
   Description: Production-ready REST API for task management. Features full CRUD operations, user authentication, role-based access, SQL joins, and proper error handling with HTTP status codes.
   Architecture: Express Router → JWT Auth → MySQL via queries → JSON Response

4. SHOPEASE (E-Commerce Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT, bcrypt, Stripe
   Description: Full-stack e-commerce with product catalog, shopping cart, user auth, order management, and Stripe payment integration.
   Architecture: React → Express API → MongoDB → Stripe Payment Gateway

5. DEVBLOG (Full-Stack Blog Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT
   Description: Developer blogging platform with rich text editor, post management, categories, tags, and secure JWT-based auth.
   Architecture: React Editor → Express API → MongoDB → JWT Protected Routes

6. WEATHERWISE (Weather Dashboard)
   Stack: React.js, OpenWeatherMap API, Node.js, REST APIs
   Description: Real-time weather dashboard with 5-day forecast, location search, weather maps, and data visualization using Chart.js.
   Architecture: React → Node.js Backend → OpenWeatherMap API → Data Visualization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CERTIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Web Development with HTML, CSS, JavaScript — IBM (via Coursera)
2. Python for Data Science, AI & Development — IBM (via Coursera)
3. Developing Back-End Apps with Node.js — IBM (via Coursera)
4. Generative AI — Microsoft & LinkedIn
5. Introduction to DevOps — IBM (via Coursera)
6. Git and GitHub Essentials — IBM (via Coursera)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUICK ANSWERS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Favorite stack: MERN (MongoDB, Express.js, React.js, Node.js)
- Strongest skill: Full-stack MERN development with secure REST APIs
- Available for: Full-Stack Developer, React Developer, Node.js Developer roles
- Work mode: Open to remote, hybrid, or on-site opportunities
- Contact: rameshkrthakur1816@gmail.com | +91 8541879160
`;

// ─── Controller ──────────────────────────────────────────────────────────────
let genAI = null;
const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('GEMINI_API_KEY not set');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

exports.chatLimiter = chatLimiter;

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }
    if (message.trim().length > 500) {
      return res.status(400).json({ success: false, message: 'Message too long (max 500 chars).' });
    }

    const ai = getGenAI();
    const modelsToTry = ['gemini-3.6-flash', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-flash-latest'];
    let lastError = null;
    let reply = null;

    const recent = history.slice(-6);
    const formattedHistory = recent.map(h => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

    for (const modelName of modelsToTry) {
      try {
        const model = ai.getGenerativeModel({
          model: modelName,
          systemInstruction: PORTFOLIO_CONTEXT,
        });

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(message.trim());
        reply = result.response.text();
        if (reply) break;
      } catch (err) {
        lastError = err;
        console.warn(`[AI Chat Warning] Model ${modelName} failed: ${err.message}. Trying fallback...`);
      }
    }

    if (!reply) {
      throw lastError || new Error('All Gemini model attempts failed.');
    }

    return res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error('[AI Chat Error]', err.message);
    if (err.message?.includes('GEMINI_API_KEY')) {
      return res.status(503).json({ success: false, message: 'AI service not configured. Please add GEMINI_API_KEY in server/.env' });
    }
    return res.status(500).json({ success: false, message: 'AI assistant is temporarily unavailable.' });
  }
};
