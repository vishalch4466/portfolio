// ===== Project data (from GitHub + resume) =====
const GH = "https://github.com/vishalch4466/";
const projects = [
  {
    name: "Pinechat", repo: "pinechat-glass-ui", cat: "Real-time", featured: true,
    img: "assets/pinechat.png",
    desc: "Peer-to-peer, end-to-end encrypted chat and file sharing over WebRTC — messages and files travel directly between browsers and never touch a relay.",
    tags: ["React 19", "WebRTC", "TanStack Start", "TypeScript", "Tailwind"],
  },
  {
    name: "RUSTRUN", repo: "rustrun-studio", cat: "Web3 · AI", featured: true,
    img: "assets/rustrun.png",
    desc: "A browser IDE for Solana Anchor programs — write Rust in a Monaco editor, build & deploy to devnet, and scaffold complete programs with a Claude-powered AI assistant.",
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
    desc: "“Docs as a Service” — authenticated authors publish GitBook-style documentation at custom permalinks, with an AI-powered “import from GitHub” flow that drafts pages from a repo.",
    tags: ["React", "Supabase", "AI Import", "TanStack"],
  },
  {
    name: "DoctorAI", repo: "doctorAI", cat: "AI", emoji: "🩺",
    desc: "An LLM-powered health assistant offering AI chat, a hospital locator, medicine recommendations, and image-based medicine info extraction for a complete digital-health experience.",
    tags: ["TypeScript", "LLM", "OpenAI"],
  },
  {
    name: "DocuAI", repo: "DocuAI", cat: "AI · RAG", emoji: "📄",
    desc: "Chat with your PDFs in natural language — upload a document and ask questions, getting accurate, context-aware answers powered by FastAPI + OpenAI.",
    tags: ["Python", "FastAPI", "OpenAI", "RAG"],
  },
  {
    name: "Git Repo Analyzer", repo: "gitrepo-analyzer", cat: "Dev Tools", emoji: "📊",
    desc: "Automated, systematic evaluations of Git repository health — objective quality metrics and actionable recommendations, no manual review required.",
    tags: ["TypeScript", "Automation", "DevEx"],
  },
];

const extIcon = '<svg class="ic" viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h5v2H5v12h12v-5h2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>';

const shot = (p) => p.img
  ? `<div class="proj-shot"><img src="${p.img}" alt="${p.name} screenshot" loading="lazy" /></div>`
  : `<div class="proj-shot proj-shot--ph"><span>${p.emoji || "★"}</span></div>`;

const grid = document.getElementById("projects-grid");
grid.innerHTML = projects.map(p => `
  <article class="project reveal">
    ${shot(p)}
    <div class="proj-body">
      <div class="proj-top">
        <span class="proj-cat">${p.cat}</span>
        ${p.featured ? '<span class="proj-featured">★ Featured</span>' : ''}
      </div>
      <h3>${p.name}</h3>
      <p class="proj-repo">vishalch4466/${p.repo}</p>
      <p>${p.desc}</p>
      <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <a class="proj-link" href="${GH + p.repo}" target="_blank" rel="noopener">View on GitHub ${extIcon}</a>
    </div>
  </article>
`).join("");

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===== Nav scrolled state =====
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobile burger menu =====
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
window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();
