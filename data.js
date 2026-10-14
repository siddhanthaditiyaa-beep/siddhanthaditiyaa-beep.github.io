/* ------------------------------------------------------------------
   EDIT THIS FILE to update your portfolio. No other file needs to change.

   1. SITE      -> your name, links, status line
   2. PROJECTS  -> one object per featured project (copy one, edit it)
   3. TOOLKIT   -> skills; a tool that appears in a project's `stack`
                   becomes clickable and filters the project grid.

   Any new public repo you push to GitHub also shows up automatically
   in the "Fresh from GitHub" row once the site is online.
------------------------------------------------------------------- */

window.SITE = {
  name: "Siddhanthaditiyaa Vettakal",
  short: "Siddhanthaditiyaa",
  github: "siddhanthaditiyaa-beep",
  linkedin: "https://www.linkedin.com/in/siddhanthaditiyaa-vettakal-6a0b25443",
  email: "siddhanthaditiyaa@gmail.com",
  resume: "Siddhanthaditiyaa_Vettakal_Resume.pdf",   // put the PDF in this folder
  photo: "photo.webp",     // main portrait (round crop works best); empty shows your initials
  avatar: "avatar.webp",   // small round picture for the comment pin and contact card
  bio: [                   // replace with your own words
    "I'm a BTech Computer Engineering student at Pillai College of Engineering, specialising in cybersecurity. I like understanding how attacks work so I can build the defences, from forecasting network attacks to designing layered security for real applications.",
    "I also build AI agents and full-stack products from scratch, and I've taken four of them live. I learn fastest by building something real and then asking how it could fail.",
    "I'm looking for a cybersecurity internship where I can learn from a security team and contribute from day one."
  ],
  focus: ["Cybersecurity", "AI and ML", "Full-stack"],   // in your order of priority
  speaks: "English, Hindi, Marathi, Malayalam, German",
  status: "Open to internships and collabs",
  location: "Mulund, Mumbai, India",
  college: "Pillai College of Engineering, Panvel"
};

/* art: which generated cover to use (shelf, notes, travel, learn, network, canvas)
   h:   cover height in the 400-wide artboard, this is what makes the masonry uneven */
window.PROJECTS = [
  {
    id: "shelfsense",
    name: "ShelfSense AI",
    kicker: "Multi-agent retail intelligence with built-in cybersecurity",
    summary:
      "A multi-tenant SaaS for store owners. Forty AI agents watch stock, price and fraud, YOLOv8 reads shelf photos, and thirteen security layers sit in front of all of it.",
    highlights: [
      "40 agents with individual kill switches, each decision logged with its reasoning",
      "YOLOv8 detects occupied and empty shelf slots from an uploaded photo",
      "Demand forecasting, dynamic pricing, anomaly detection and churn prediction",
      "13-layer security design mapped against OWASP Top 10, ISO 27001 and NIST CSF",
      "Multi-store marketplace with a nearest-franchise finder when an item is out of stock",
      "Research project aimed at an IEEE paper"
    ],
    tags: ["AI", "Security", "Full-stack"],
    stack: ["Node.js", "Express", "MongoDB", "YOLOv8", "Groq", "AI agents", "Python", "OWASP", "Render"],
    stats: [
      { v: "40", l: "AI agents" },
      { v: "13", l: "security layers" },
      { v: "461", l: "API routes" }
    ],
    live: "https://shelfsense-ai-lptz.onrender.com",
    repo: "https://github.com/siddhanthaditiyaa-beep/ShelfSense-AI",
    art: "shelf", h: 350, updated: "2026-07-29"
  },
  {
    id: "notebuddy",
    name: "NoteBuddy",
    kicker: "An AI study companion that turns any notes into a full study kit",
    summary:
      "Paste text, upload a PDF, snap handwriting or drop a YouTube link and get a summary, flashcards, quizzes, a mock exam and a knowledge graph. Four agents decide for themselves which of your study data to look at.",
    highlights: [
      "Four agentic features built on Gemini function calling: study planner, coach, cross-note tutor and note organiser",
      "Every tool is bound to the signed-in student's id, so one user can never query another's data",
      "Spaced repetition (SM-2), confidence calibration and a Feynman teach-back mode",
      "Installable PWA with an on-device model running in the browser through WebGPU",
      "Semantic search across all saved notes with pgvector",
      "Built for a college AI competition"
    ],
    tags: ["AI", "Full-stack"],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "FastAPI", "Python", "Gemini", "AI agents", "Supabase", "pgvector", "Vercel", "Render"],
    stats: [
      { v: "4", l: "agentic features" },
      { v: "3", l: "explain levels" }
    ],
    live: "https://note-buddy-wheat.vercel.app",
    repo: "https://github.com/siddhanthaditiyaa-beep/NoteBuddy",
    art: "notes", h: 290, updated: "2026-09-28"
  },
  {
    id: "recoup",
    name: "Recoup",
    kicker: "Travel disruption recovery engine, built at Hackcelestial",
    summary:
      "One delayed flight breaks the transfer, the hotel and the tour that follow it. Recoup maps a trip as a dependency graph, finds what will break, and asks Gemini for recovery plans.",
    highlights: [
      "Breadth-first search over the itinerary graph finds every downstream booking a delay will break",
      "Risk radar flags thin connection buffers before they fail",
      "Gemini 2.5 Flash writes four plans: budget, speed, comfort and balanced",
      "Drafts the notification emails to affected hotels and vendors",
      "Glassmorphic UI whose hero image follows the trip's destination",
      "Built by a team of five for problem statement PS-2"
    ],
    tags: ["AI", "Full-stack", "Hackathon"],
    stack: ["React", "Vite", "Node.js", "Express", "Gemini", "JavaScript", "Vercel", "Render"],
    stats: [
      { v: "BFS", l: "cascade detection" },
      { v: "4", l: "recovery styles" }
    ],
    live: "https://hackcelestial-seven.vercel.app/",
    repo: "https://github.com/siddhanthaditiyaa-beep/Hackcelestial",
    art: "travel", h: 265, updated: "2026-09-05"
  },
  {
    id: "edupulse",
    name: "EduPulse AI",
    kicker: "Personalised learning and student performance prediction",
    summary:
      "Looks at a student's marks and study patterns, predicts how the next exam will go, points at the weak topics and builds a study plan around them. An AI tutor answers questions along the way.",
    highlights: [
      "XGBoost and scikit-learn model for performance prediction",
      "Weak-area detection feeding personalised recommendations and study plans",
      "AI tutor on the Groq API that degrades gracefully when no key is set",
      "SQLite out of the box, MySQL when you need it",
      "Frontend on Vercel, backend on Render, plus a Dockerfile"
    ],
    tags: ["AI", "Full-stack"],
    stack: ["React", "Vite", "Tailwind CSS", "FastAPI", "SQLAlchemy", "SQLite", "XGBoost", "scikit-learn", "Groq", "Python", "Docker", "Vercel", "Render"],
    stats: [
      { v: "ML", l: "exam forecasting" },
      { v: "AI", l: "tutor built in" }
    ],
    live: "",
    repo: "https://github.com/siddhanthaditiyaa-beep/EduPulse-AI",
    art: "learn", h: 320, updated: "2026-09-22"
  },
  {
    id: "netforecast",
    name: "NetForecast",
    kicker: "Smart India Hackathon 2026: AI-based network attack forecasting (SIH26153)",
    summary:
      "Most intrusion detection tells you an attack is happening. NetForecast predicts which attack type is likely in the next window, from real multi-day CICIDS2017 traffic, and streams it live to a dashboard.",
    highlights: [
      "XGBoost multi-class model over 7 classes: benign, DDoS, port scan and four DoS variants",
      "Strict time-based splits per capture, so no future data leaks into training",
      "99.0% accuracy on same-day held-out validation",
      "Cross-day test on attack types never seen in training: 87.7% precision, 73.6% recall, ROC-AUC 0.919",
      "FastAPI WebSocket backend with explainability and a traditional-IDS comparison",
      "Earlier NSL-KDD and single-file iterations kept in the repo to show the process"
    ],
    tags: ["AI", "Security", "Hackathon"],
    stack: ["Python", "FastAPI", "XGBoost", "CICIDS2017", "WebSocket", "Network security"],
    stats: [
      { v: "0.919", l: "cross-day ROC-AUC" },
      { v: "7", l: "attack classes" }
    ],
    live: "",
    repo: "https://github.com/siddhanthaditiyaa-beep/SIH-2026",
    art: "network", h: 285, updated: "2026-08-29"
  },
  {
    id: "portfolio",
    name: "This portfolio",
    kicker: "A design canvas you can scroll",
    summary:
      "Frames, collaborator cursors, sticky notes, an inspector panel and a command palette. Everything on it comes from one data file and a live GitHub feed.",
    highlights: [
      "Vanilla HTML, CSS and JavaScript, no build step",
      "Projects, skills and links live in a single data.js file",
      "New public repos appear automatically through the GitHub API",
      "Press Ctrl or Cmd + K to jump anywhere"
    ],
    tags: ["Full-stack"],
    stack: ["JavaScript", "HTML and CSS", "GitHub Pages"],
    stats: [{ v: "0", l: "dependencies" }],
    live: "",
    repo: "https://github.com/siddhanthaditiyaa-beep/Portfolio.github.io",
    art: "canvas", h: 235, updated: "2026-10-14"
  }
];

window.TOOLKIT = [
  { group: "Languages", items: ["Python", "JavaScript", "Java", "C", "HTML and CSS"] },
  { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express", "SQLAlchemy", "WebSocket"] },
  { group: "AI and ML", items: ["AI agents", "Gemini", "Groq", "XGBoost", "scikit-learn", "YOLOv8", "RAG"] },
  { group: "Data", items: ["MongoDB", "Supabase", "pgvector", "SQLite"] },
  { group: "Security", items: ["OWASP", "Network security", "CICIDS2017", "Malware analysis", "Secure coding"] },
  { group: "Shipping", items: ["Vercel", "Render", "Docker", "GitHub Pages"] }
];

/* The layers panel in the "Path" section. `open` links a row to a project. */
window.PATH = [
  {
    group: "Education", icon: "frame",
    rows: [
      { t: "BTech, Computer Engineering (Cybersecurity)", m: "Pillai College of Engineering, Panvel" }
    ]
  },
  {
    group: "Hackathons and competitions", icon: "frame",
    rows: [
      { t: "IEEE PCE Cognithon 2026: IIT coaching chatbot", m: "3rd place" },
      { t: "Smart India Hackathon 2026: NetForecast", m: "SIH26153", open: "netforecast" },
      { t: "Hackcelestial: Recoup", m: "PS-2", open: "recoup" },
      { t: "College AI competition: NoteBuddy", m: "AI", open: "notebuddy" },
      { t: "Smart India Hackathon: Insider Threat Detection", m: "PS 18" }
    ]
  },
  {
    group: "Research", icon: "frame",
    rows: [
      { t: "Malware attack types and how they are neutralised", m: "Unpublished paper" },
      { t: "Generative AI and deepfake social engineering", m: "Research proposal" },
      { t: "ShelfSense AI: multi-agent platform and 13-layer security", m: "Unpublished paper", open: "shelfsense" }
    ]
  }
];
