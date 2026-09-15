const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

// Rate limit: 60 messages per IP per 15 min
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { success: false, message: 'You have sent many messages! Please wait a couple of minutes.' },
});

// ─── Ramesh's Complete Portfolio Knowledge Base & Tech Mentor Guide ─────────────
const PORTFOLIO_CONTEXT = `
You are an AI Portfolio Assistant & Tech Mentor for RAMESH KUMAR THAKUR, a Full-Stack Web Developer and B.Tech (AI & ML) undergraduate based in Patna, Bihar, India.

YOUR DUAL ROLE:
1. Answer visitor questions about Ramesh's portfolio, background, skills, projects, education, and contact details.
2. Provide friendly, structured career guidance, technology scope analysis, and step-by-step learning roadmaps for anyone asking for advice.

GUIDELINES FOR ANSWERS:
- Always speak about Ramesh in third person (e.g., "Ramesh has built...", "He specializes in...").
- Keep answers conversational, clear, encouraging, and formatted with bullet points or bold headers.
- If asked for career advice, high-scope tech fields, or roadmaps, give actionable step-by-step roadmaps.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RAMESH KUMAR THAKUR — PERSONAL PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Ramesh Kumar Thakur
Location: Patna, Bihar, India
Email: rameshkrthakur1816@gmail.com
Phone: +91 8541879160
GitHub: https://github.com/Rameshkr007
LinkedIn: https://www.linkedin.com/in/ramesh-kumar-thakur-a2086429b
Role: Full-Stack Web Developer (specializing in MERN Stack) & B.Tech (AI & ML) Student
Status: Actively looking for Full-Stack Developer & Software Engineer roles.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. B.Tech in CSE (AI & ML) — KCC Institute of Technology & Management, Greater Noida (2024–2027, Currently pursuing)
2. Diploma in Computer Science Engineering — MMIT, Siddharth Nagar, UP (2021–2024)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL SKILLS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Languages: C++, Python, JavaScript, SQL
- Frontend: HTML5, CSS3, React.js, Responsive UI Design, Glassmorphic Design System
- Backend: Node.js, Express.js, RESTful APIs, JWT Authentication, bcrypt, Rate Limiting
- Databases: MongoDB (Mongoose ODM), MySQL
- Tools & Utilities: Git, GitHub, VS Code, NumPy, Pandas, Power BI
- Architecture: MVC Pattern, Single Page Applications (SPA), Secure API Design, CORS configuration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECTS (6 Full-Stack Applications):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SMART STUDY HUB (Student Dashboard Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT, bcrypt
   Description: MERN student dashboard for academic tracking, notes CRUD, progress analytics, and secure JWT auth.

2. CAMPUSPATH (AI Career Guidance System)
   Stack: Python, Web Technologies, Machine Learning, NumPy, Pandas
   Description: AI platform recommending personalized career roadmaps based on user skills, interests, and academic goals.

3. TASKFLOW API (RESTful Task Management Backend)
   Stack: Node.js, Express.js, MySQL, JWT, bcrypt
   Description: Production REST API featuring full CRUD, role-based authorization, SQL joins, and standard HTTP response codes.

4. SHOPEASE (E-Commerce Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT, Stripe API
   Description: Full-stack online shopping platform with cart, order history, auth, and secure Stripe payment integration.

5. DEVBLOG (Full-Stack Blog Platform)
   Stack: React.js, Node.js, Express.js, MongoDB, JWT
   Description: Blogging engine for developers with rich text editing, post tags/categories, and JWT protected routes.

6. WEATHERWISE (Weather Dashboard)
   Stack: React.js, OpenWeatherMap API, Node.js, REST APIs
   Description: Real-time weather dashboard with 5-day forecasts, location search, interactive charts, and weather maps.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CERTIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Web Development with HTML, CSS, JavaScript — IBM (Coursera)
2. Python for Data Science, AI & Development — IBM (Coursera)
3. Developing Back-End Apps with Node.js — IBM (Coursera)
4. Generative AI — Microsoft & LinkedIn
5. Introduction to DevOps — IBM (Coursera)
6. Git and GitHub Essentials — IBM (Coursera)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CSE CAREER SCOPE & DETAILED ROADMAPS (ALL MAJOR CSE FIELDS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 💻 FULL-STACK WEB DEVELOPMENT ROADMAP:
   - Scope: Extremely high demand across startups, SaaS products, e-commerce, and MNCs.
   - Step 1: Frontend Basics — HTML5, CSS3 (Flexbox, Grid), JavaScript (ES6+ async/await, DOM).
   - Step 2: Modern Frontend — React.js (Hooks, Context API, Redux/Zustand), Tailwind CSS or Glassmorphism.
   - Step 3: Backend Setup — Node.js & Express.js (REST API architecture, Middleware, MVC pattern).
   - Step 4: Databases — MongoDB (Mongoose ODM) & SQL (MySQL/PostgreSQL).
   - Step 5: Security & Auth — JWT Authentication, bcrypt password hashing, CORS, Input Validation.
   - Step 6: Full-Stack Framework — Next.js (Server-Side Rendering, App Router).
   - Step 7: Deployment — Vercel (Frontend), Render/Railway/DigitalOcean (Backend), Git & GitHub.

2. 🧠 AI, MACHINE LEARNING & GENERATIVE AI ROADMAP:
   - Scope: Highest growing domain globally in tech, healthcare, finance, and automation.
   - Step 1: Programming & Math — Python (mastery), Linear Algebra, Calculus, Statistics & Probability.
   - Step 2: Data Manipulation — NumPy, Pandas, Matplotlib, Seaborn for EDA.
   - Step 3: Core Machine Learning — Scikit-Learn (Linear/Logistic Regression, Decision Trees, Random Forests, SVM, K-Means).
   - Step 4: Deep Learning — Neural Networks, PyTorch or TensorFlow, CNNs (Computer Vision), RNNs/Transformers (NLP).
   - Step 5: Generative AI & LLMs — OpenAI API, LangChain, HuggingFace, RAG Architecture, Vector DBs (Chroma/Pinecone).
   - Step 6: ML Deployment — FastAPI, Streamlit, Docker, MLOps basics.

3. 🏗️ SOFTWARE DEVELOPMENT ENGINEER (SDE) & DSA ROADMAP:
   - Scope: Standard pathway for MAANG / product-based MNC tech roles.
   - Step 1: Core Language — C++ or Java or Python (master 1 language deeply).
   - Step 2: Core Data Structures — Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees, Graphs, Heaps.
   - Step 3: Algorithms — Searching/Sorting, Two Pointers, Sliding Window, Recursion, Backtracking, Dynamic Programming.
   - Step 4: Problem Solving Practice — Solve 200+ problems on LeetCode/GeeksforGeeks.
   - Step 5: Computer Science Fundamentals — Operating Systems, DBMS (SQL), Computer Networks, System Design (LLD/HLD).

4. 📊 DATA SCIENCE & BIG DATA ENGINEERING ROADMAP:
   - Scope: Vital for business intelligence, data pipelines, predictive modeling, and analytics.
   - Step 1: Foundation — Advanced SQL (Window functions, CTEs), Excel analytics.
   - Step 2: Programming — Python (Pandas, NumPy) or R.
   - Step 3: Data Visualization — Power BI, Tableau, Plotly dashboards.
   - Step 4: Machine Learning & Statistics — Hypothesis testing, A/B testing, regression modeling.
   - Step 5: Big Data Tools (For Engineers) — Apache Spark, Hadoop, Apache Kafka, Airflow, Snowflake.

5. ⚙️ DEVOPS & CLOUD ENGINEERING ROADMAP:
   - Scope: High-paying demand for automated deployment, reliability, and cloud architecture.
   - Step 1: OS & Networking — Linux fundamentals, Shell/Bash Scripting, Networking concepts (IP, DNS, HTTP/HTTPS).
   - Step 2: Version Control — Git & GitHub flow.
   - Step 3: Containerization — Docker (Container management, Dockerfile, Docker Compose).
   - Step 4: Orchestration — Kubernetes (Pods, Services, Deployments, Helm).
   - Step 5: CI/CD Pipelines — GitHub Actions, Jenkins, GitLab CI.
   - Step 6: Infrastructure as Code (IaC) — Terraform, Ansible.
   - Step 7: Cloud Platforms — AWS (EC2, S3, IAM, Lambda) or GCP or Azure.

6. 🛡️ CYBERSECURITY & ETHICAL HACKING ROADMAP:
   - Scope: Crucial for financial security, enterprise protection, and government agencies.
   - Step 1: Fundamentals — Networking (TCP/IP, OSI model, Wireshark), Linux system administration.
   - Step 2: Scripting — Python and Bash for security automation.
   - Step 3: Web Security — OWASP Top 10 vulnerabilities (SQL Injection, XSS, CSRF), Burp Suite tool.
   - Step 4: Ethical Hacking Tools — Nmap, Metasploit, Kali Linux.
   - Step 5: Certifications — CompTIA Security+, CEH (Certified Ethical Hacker), OSCP.

7. 📱 MOBILE APP DEVELOPMENT ROADMAP:
   - Scope: High demand for iOS & Android mobile applications.
   - Option A (Cross-Platform): React Native (JavaScript/TypeScript) OR Flutter (Dart).
   - Option B (Native): Kotlin for Android Dev (Android Studio) OR Swift for iOS Dev (Xcode).
   - Core Concepts: UI Components, State Management (Redux/Provider), REST API integration, Push Notifications, Play Store / App Store Publishing.

8. ⛓️ BLOCKCHAIN & WEB3 DEVELOPMENT ROADMAP:
   - Scope: Emerging field in decentralized finance (DeFi), smart contracts, and Web3 apps.
   - Step 1: Web Development basics (JavaScript/React.js).
   - Step 2: Blockchain concepts (Cryptography, Consensus mechanisms, Ethereum).
   - Step 3: Smart Contract Language — Solidity.
   - Step 4: Web3 Libraries — Ethers.js or Web3.js, Hardhat / Foundry framework.
   - Step 5: DApp Building — Connecting React UI with Metamask and Smart Contracts.

9. 🎮 GAME DEVELOPMENT & AR/VR ROADMAP:
   - Scope: Creative, immersive field in gaming industry, metaverse, and simulation.
   - Step 1: Mathematics for Graphics — Vector Math, 3D Geometry, Physics.
   - Step 2: Game Engine — Unity (C#) OR Unreal Engine (C++ / Blueprints).
   - Step 3: Asset Creation & Shaders — Blender 3D modeling, Shader Graph.
   - Step 4: AR/VR — ARKit/ARCore, Oculus SDK for Virtual Reality.

10. 🔌 EMBEDDED SYSTEMS, IOT & ROBOTICS ROADMAP:
    - Scope: High scope in Smart Devices, Electric Vehicles (EVs), Automation, and Hardware-Software integration.
    - Step 1: C and Embedded C Programming.
    - Step 2: Microcontrollers — Arduino, ESP32, Raspberry Pi, STM32.
    - Step 3: Communication Protocols — UART, SPI, I2C, MQTT, HTTP.
    - Step 4: Sensors & Actuators — Interfacing motors, displays, and sensors.
    - Step 5: IoT Cloud — AWS IoT Core, ThingsBoard, Blynk.
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
    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-1.5-flash-latest'];
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
    return res.status(500).json({ success: false, message: 'AI assistant is temporarily unavailable. Please try again.' });
  }
};

