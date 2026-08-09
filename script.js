// ── PWA: Register Service Worker ──────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((reg) => console.log("[PWA] Service Worker registered:", reg.scope))
      .catch((err) => console.error("[PWA] SW registration failed:", err));
  });
}

// ── PWA: Install Prompt ────────────────────────────────────────
let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const banner = document.getElementById("install-banner");
  if (banner) banner.style.display = "block";
});

document.getElementById("install-btn")?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === "accepted") {
    console.log("[PWA] App installed!");
    document.getElementById("install-banner").style.display = "none";
  }
  deferredInstallPrompt = null;
});

window.addEventListener("appinstalled", () => {
  document.getElementById("install-banner").style.display = "none";
  console.log("[PWA] CampusPilot AI installed on device!");
});

// ── DATA ──────────────────────────────────────────────────────

const JOBS = [
  { id:1, title:"Software Engineer (2026 Fresher)", company:"Google India", loc:"Bengaluru", type:"Full-Time", salary:"₹18.5–24 LPA", cat:"jobs", url:"https://careers.google.com/jobs/results/" },
  { id:2, title:"Frontend Developer (React/Flutter)", company:"Microsoft", loc:"Hyderabad / Remote", type:"Full-Time", salary:"₹16–20 LPA", cat:"jobs", url:"https://careers.microsoft.com/us/en/search-results" },
  { id:3, title:"Graduate Trainee Engineer (GET)", company:"TCS", loc:"Pan-India", type:"Full-Time", salary:"₹7–9 LPA", cat:"jobs", url:"https://www.tcs.com/careers" },
  { id:4, title:"Backend Engineer – FastAPI / Node.js", company:"Zepto", loc:"Bengaluru", type:"Full-Time", salary:"₹14–18 LPA", cat:"jobs", url:"https://www.zeptonow.com/careers" },
  { id:5, title:"AI / Data Science Summer Intern", company:"Amazon Development Center", loc:"Chennai", type:"6-Month Internship", salary:"₹80,000/mo Stipend", cat:"internships", url:"https://www.amazon.jobs/en/job_categories/software-development" },
  { id:6, title:"Web Dev Intern (ReactJS)", company:"Razorpay", loc:"Bengaluru / Remote", type:"4-Month Internship", salary:"₹40,000/mo Stipend", cat:"internships", url:"https://razorpay.com/jobs/" },
  { id:7, title:"Product Intern (SaaS)", company:"Freshworks", loc:"Chennai", type:"6-Month Internship", salary:"₹50,000/mo Stipend", cat:"internships", url:"https://www.freshworks.com/company/careers/" },
];

const INTERVIEW_QUESTIONS = [
  { q:"Explain the concept of RESTful APIs and the difference between stateless and stateful communication.", diff:"Medium", tip:"Mention HTTP methods (GET, POST, PUT, DELETE) and status codes like 200, 404, 500." },
  { q:"What is the difference between a Process and a Thread in Operating Systems?", diff:"Medium", tip:"Focus on stack vs heap memory, and context switching overhead." },
  { q:"Describe how a HashMap works internally in Java or Python. What happens during hash collision?", diff:"Hard", tip:"Mention hash functions, chaining, and open addressing. Java uses LinkedList in buckets." },
  { q:"Tell me about yourself. Walk me through your academic journey and why you chose this role.", diff:"Easy", tip:"Structure: Background → Skills → Projects → Goal. Keep under 2 minutes." },
  { q:"What is your biggest weakness, and how are you working to improve it?", diff:"Easy", tip:"Choose a real weakness. Show awareness and proactive improvement steps." },
];

const QUIZ_DATA = [
  { q:"What is the time complexity of searching in a balanced Binary Search Tree?", opts:["O(1)","O(log N)","O(N)","O(N²)"], ans:1, exp:"A balanced BST has O(log N) search time because we eliminate half the nodes at each step." },
  { q:"Which data structure uses LIFO (Last-In-First-Out) principle?", opts:["Queue","Array","Stack","LinkedList"], ans:2, exp:"A Stack follows LIFO — the last element pushed is the first to be popped (e.g., browser back button)." },
  { q:"What is the space complexity of Merge Sort?", opts:["O(1)","O(log N)","O(N)","O(N log N)"], ans:2, exp:"Merge Sort uses O(N) auxiliary space for the temporary arrays used during merging." },
];

// ── STATE ─────────────────────────────────────────────────────
let currentTab = "dashboard";
let interviewType = "HR";
let currentQ = 0;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderJobs("jobs");
  renderJobs("internships");
  renderQuiz();
});

// ── NAV ───────────────────────────────────────────────────────
function switchTab(name) {
  currentTab = name;
  
  // Hide all tab content
  document.querySelectorAll(".tab-content").forEach(t => {
    t.style.display = "none";
    t.classList.remove("active");
  });
  
  // Show target tab
  const target = document.getElementById(`tab-${name}`);
  if (target) {
    target.style.display = "block";
    target.classList.add("active");
  }

  // Update header nav buttons
  document.querySelectorAll(".w-nav-item").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === name);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── LOGIN / ONBOARDING ────────────────────────────────────────
function doLogin() {
  const btn = document.getElementById("login-btn");
  if (btn) { btn.textContent = "Signing in..."; btn.disabled = true; }
  
  setTimeout(() => {
    document.getElementById("screen-login").style.display = "none";
    document.getElementById("screen-onboarding").style.display = "none";
    
    // Show Top Header Nav
    document.getElementById("app-header").style.display = "block";
    
    // Show Dashboard tab
    switchTab("dashboard");

    if (btn) {
      btn.textContent = "Sign In to CampusPilot";
      btn.disabled = false;
    }
  }, 600);
}

function showOnboarding() {
  document.getElementById("screen-login").style.display = "none";
  document.getElementById("screen-onboarding").style.display = "block";
}

function showLogin() {
  document.getElementById("screen-onboarding").style.display = "none";
  document.getElementById("screen-login").style.display = "block";
}

function doLogout() {
  // Hide Top Header Nav
  document.getElementById("app-header").style.display = "none";

  // Hide all screens & tabs
  document.querySelectorAll(".tab-content").forEach(t => {
    t.style.display = "none";
    t.classList.remove("active");
  });
  document.getElementById("screen-onboarding").style.display = "none";

  // Show Login Screen
  document.getElementById("screen-login").style.display = "block";
  window.scrollTo({ top: 0 });
}

// ── JOBS ──────────────────────────────────────────────────────
function renderJobs(cat) {
  const container = document.getElementById(`${cat}-container`);
  if (!container) return;
  const filtered = JOBS.filter(j => j.cat === cat);
  container.innerHTML = filtered.map(j => `
    <div class="m-job-card glass-card">
      <h3>${j.title}</h3>
      <div class="job-meta">
        <span>🏢 ${j.company}</span>
        <span>📍 ${j.loc}</span>
        <span>🕐 ${j.type}</span>
      </div>
      <div class="job-salary">${j.salary}</div>
      <a href="${j.url}" target="_blank" class="m-apply-btn">
        Apply on Official Website ↗
      </a>
    </div>
  `).join("");
}

function filterJobs() {
  const q = (document.getElementById("job-search")?.value || "").toLowerCase();
  const isJobs = document.getElementById("jobs-container").style.display !== "none";
  const cat = isJobs ? "jobs" : "internships";
  const container = document.getElementById(`${cat}-container`);
  if (!container) return;
  
  const filtered = JOBS.filter(j => j.cat === cat && (
    j.title.toLowerCase().includes(q) ||
    j.company.toLowerCase().includes(q) ||
    j.loc.toLowerCase().includes(q)
  ));
  
  container.innerHTML = filtered.map(j => `
    <div class="m-job-card glass-card">
      <h3>${j.title}</h3>
      <div class="job-meta">
        <span>🏢 ${j.company}</span>
        <span>📍 ${j.loc}</span>
        <span>🕐 ${j.type}</span>
      </div>
      <div class="job-salary">${j.salary}</div>
      <a href="${j.url}" target="_blank" class="m-apply-btn">Apply on Official Website ↗</a>
    </div>
  `).join("");
}

function toggleJobTab(btn, cat) {
  document.querySelectorAll(".j-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("jobs-container").style.display = cat === "jobs" ? "grid" : "none";
  document.getElementById("internships-container").style.display = cat === "internships" ? "grid" : "none";
}

// ── ATS SCORE ─────────────────────────────────────────────────
function calculateAtsScore() {
  const el = document.getElementById("ats-score-val");
  const v = document.getElementById("ats-verdict");
  let n = 50;
  const to = setInterval(() => {
    n += 4; el.textContent = `${Math.min(n, 88)}%`;
    if (n >= 88) { clearInterval(to); v.textContent = "Strong ATS Match!"; }
  }, 28);
}

// ── INTERVIEW ─────────────────────────────────────────────────
function setIntType(btn, type) {
  interviewType = type;
  document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function startInterview() {
  currentQ = 0;
  document.getElementById("int-setup").style.display = "none";
  document.getElementById("int-active").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const total = INTERVIEW_QUESTIONS.length;
  const data = INTERVIEW_QUESTIONS[currentQ];
  document.getElementById("q-num-label").textContent = `Question ${currentQ + 1} of ${total}`;
  document.getElementById("q-diff-badge").textContent = data.diff;
  document.getElementById("q-text").textContent = `"${data.q}"`;
  document.getElementById("q-tip").textContent = `💡 ${data.tip}`;
  document.getElementById("q-progress-fill").style.width = `${((currentQ + 1) / total) * 100}%`;
  document.getElementById("user-answer").value = "";
  document.getElementById("ai-feedback-box").style.display = "none";
}

function submitAnswer() {
  const ans = document.getElementById("user-answer").value.trim();
  if (!ans) return;

  const box = document.getElementById("ai-feedback-box");
  box.style.display = "block";

  // Animate feedback bars
  const scores = {
    tech: 72 + Math.floor(Math.random() * 20),
    comm: 75 + Math.floor(Math.random() * 18),
    conf: 70 + Math.floor(Math.random() * 20)
  };
  const comments = [
    "Great answer! You clearly explained the concept with correct terminology.",
    "Good response. Adding a real-world example would make it more impactful.",
    "Solid understanding shown. Work on structuring your answer using the STAR method.",
  ];
  document.getElementById("fb-comment").textContent = comments[Math.floor(Math.random() * comments.length)];

  setTimeout(() => {
    document.getElementById("bar-tech").style.width = `${scores.tech}%`;
    document.getElementById("lbl-tech").textContent = `${scores.tech}%`;
    document.getElementById("bar-comm").style.width = `${scores.comm}%`;
    document.getElementById("lbl-comm").textContent = `${scores.comm}%`;
    document.getElementById("bar-conf").style.width = `${scores.conf}%`;
    document.getElementById("lbl-conf").textContent = `${scores.conf}%`;
  }, 100);
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= INTERVIEW_QUESTIONS.length) {
    document.getElementById("int-active").style.display = "none";
    document.getElementById("int-setup").style.display = "block";
    alert("🎉 Interview Session Completed! Scores saved to profile.");
  } else {
    loadQuestion();
  }
}

// ── LEARNING ──────────────────────────────────────────────────
function toggleLearnTab(btn, cat) {
  document.querySelectorAll(".l-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("learn-notes").style.display = cat === "notes" ? "block" : "none";
  document.getElementById("learn-quiz").style.display = cat === "quiz" ? "block" : "none";
}

function setLevel(btn) {
  document.querySelectorAll(".lvl-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function setQuizType(btn) {
  document.querySelectorAll(".qt-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function generateNotes() {
  const topic = document.getElementById("notes-topic").value || "Topic";
  const out = document.getElementById("notes-output");
  out.innerHTML = `
    <h4>${topic} — AI Generated Notes</h4>
    <p><b>1. Overview:</b> ${topic} is a core concept widely used in software engineering and technical interviews at top companies.</p>
    <p><b>2. Key Principles:</b> Focus on understanding the trade-offs between time complexity and space complexity to write optimal solutions.</p>
    <p><b>3. Industry Applications:</b> Used in building scalable systems at Google, Amazon, Netflix, and Zepto.</p>
    <div class="key-points">
      <b>Key Takeaways:</b>
      <ul>
        <li>Master the fundamentals before tackling advanced problems.</li>
        <li>Practice 2-3 problems per day consistently for 60 days.</li>
        <li>Always analyze worst-case complexity before coding.</li>
      </ul>
    </div>`;
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;
  container.innerHTML = QUIZ_DATA.map((item, idx) => `
    <div class="quiz-q-card glass-card">
      <h4>Q${idx + 1}. ${item.q}</h4>
      ${item.opts.map((opt, i) => `
        <button class="opt-btn" id="opt-${idx}-${i}" onclick="checkAnswer(${idx}, ${i}, ${item.ans}, '${item.exp}')">
          ${String.fromCharCode(65+i)}) ${opt}
        </button>`).join("")}
      <p id="exp-${idx}" style="display:none; font-size:13px; color:var(--txt2); margin-top:8px; line-height:1.5;">${item.exp}</p>
    </div>`).join("");
}

function loadQuiz() { renderQuiz(); }

function checkAnswer(qIdx, chosen, correct, explanation) {
  QUIZ_DATA[qIdx].opts.forEach((_, i) => {
    const btn = document.getElementById(`opt-${qIdx}-${i}`);
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    else if (i === chosen) btn.classList.add("wrong");
  });
  document.getElementById(`exp-${qIdx}`).style.display = "block";
}
