// ===== Theme =====
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const themeColor = document.getElementById("theme-color");
const activeTheme = () => (root.dataset.theme === "dark" ? "dark" : "light");

const syncToggleLabel = () => {
  const next = activeTheme() === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  themeToggle.setAttribute("title", `Switch to ${next} theme`);
};

const syncThemeColor = () => {
  themeColor.setAttribute("content", activeTheme() === "dark" ? "#0a0a0a" : "#ffffff");
};

themeToggle.addEventListener("click", () => {
  const next = activeTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  syncToggleLabel();
  syncThemeColor();
});

syncToggleLabel();
syncThemeColor();

// ===== Project data (from GitHub + resume) =====
const GH = "https://github.com/vishalch4466/";
const projects = [
  {
    name: "autopilotmode", repo: "autopilotmode", cat: "AI Agents · Rust", featured: true,
    img: "assets/autopilotmode.png",
    site: "https://autopilotmode.ai/",
    desc: "A computer-use agent that drives your real mouse and keyboard from a screenshot: look, act, look again. No selectors or integrations, so it works in any app, website, or game that a script can't.",
    tags: ["Rust", "Claude API", "OpenRouter", "Computer Use", "Tauri", "Voice"],
  },
  {
    name: "Pinechat", repo: "pinechat-glass-ui", cat: "Real-time", featured: true,
    img: "assets/pinechat.png",
    desc: "Peer-to-peer, end-to-end encrypted chat and file sharing over WebRTC, so messages and files travel directly between browsers and never touch a relay.",
    tags: ["React 19", "WebRTC", "TanStack Start", "TypeScript", "Tailwind"],
  },
  {
    name: "RUSTRUN", repo: "Rustrun", cat: "Web3 · AI", featured: true,
    img: "assets/rustrun.png",
    desc: "A browser IDE for Solana Anchor programs: write Rust in a Monaco editor, build & deploy to devnet, and scaffold complete programs with a Claude-powered AI assistant.",
    tags: ["React", "Monaco", "Solana Anchor", "Claude API", "Supabase"],
  },
  {
    name: "ResumeGenie", repo: "docx-talent-hub", cat: "AI", featured: true,
    img: "assets/resumegenie.png",
    desc: "An AI-powered ATS resume checker: upload a .docx, get an instant ATS score with a checklist, download an AI-improved resume, and browse matched job listings.",
    tags: ["React", "TanStack Start", "AI", "Cloudflare"],
  },
  {
    name: "Lumen", repo: "write-guide-maker", cat: "AI · Web",
    img: "assets/lumen.png",
    desc: "“Docs as a Service”: authenticated authors publish GitBook-style documentation at custom permalinks, with an AI-powered “import from GitHub” flow that drafts pages from a repo.",
    tags: ["React", "Supabase", "AI Import", "TanStack"],
  },
  {
    name: "DoctorAI", repo: "doctorAI", cat: "AI",
    desc: "An LLM-powered health assistant offering AI chat, a hospital locator, medicine recommendations, and image-based medicine info extraction for a complete digital-health experience.",
    tags: ["TypeScript", "LLM", "OpenAI"],
  },
  {
    name: "DocuAI", repo: "DocuAI", cat: "AI · RAG",
    desc: "Chat with your PDFs in natural language. Upload a document and ask questions, and get accurate, context-aware answers powered by FastAPI + OpenAI.",
    tags: ["Python", "FastAPI", "OpenAI", "RAG"],
  },
  {
    name: "Git Repo Analyzer", repo: "gitrepo-analyzer", cat: "Dev Tools",
    desc: "Automated, systematic evaluations of Git repository health, giving objective quality metrics and actionable recommendations with no manual review required.",
    tags: ["TypeScript", "Automation", "DevEx"],
  },
];

const extIcon = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h5v2H5v12h12v-5h2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>';

// Projects without a screenshot get a typographic mark rather than an emoji.
const initials = (name) => name.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 3).toUpperCase();

const shot = (p) => p.img
  ? `<div class="proj-shot"><img src="${p.img}" alt="${p.name} screenshot" loading="lazy" /></div>`
  : `<div class="proj-shot proj-shot--ph"><span class="proj-ph-mark">${initials(p.name)}</span></div>`;

const grid = document.getElementById("projects-grid");
grid.innerHTML = projects.map(p => `
  <article class="project reveal">
    ${shot(p)}
    <div class="proj-body">
      <div class="proj-top">
        <span class="proj-cat">${p.cat}</span>
        ${p.featured ? '<span class="proj-featured">Featured</span>' : ''}
      </div>
      <h3>${p.name}</h3>
      <p class="proj-repo">vishalch4466/${p.repo}</p>
      <p>${p.desc}</p>
      <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links">
        <a class="proj-link" href="${GH + p.repo}" target="_blank" rel="noopener">View on GitHub ${extIcon}</a>
        ${p.site ? `<a class="proj-link" href="${p.site}" target="_blank" rel="noopener">Visit site ${extIcon}</a>` : ""}
      </div>
    </div>
  </article>
`).join("");

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===== Nav scrolled state =====
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobile menu =====
const burger = document.getElementById("burger");
const backdrop = document.getElementById("nav-backdrop");
const setMenu = (open) => {
  nav.classList.toggle("open", open);
  backdrop.classList.toggle("show", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
backdrop.addEventListener("click", () => setMenu(false));
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 860) setMenu(false); });

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();
