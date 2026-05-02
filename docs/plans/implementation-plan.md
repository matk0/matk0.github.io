# Implementation Plan

## Context

Overhaul of matejlukasik.com to fix identity crisis, build credibility pipeline, streamline funnel, and align all channels. The user has more assets than initially apparent: a 42-slide Agentic AI presentation (delivered to Amity Age), a Clawforce deployment system (Docker/OpenClaw/MCP server), and deep knowledge of agent architecture. No production client deployments yet — need a pipeline to get there.

---

## Part 1: Website Changes (code)

### 1.1 Add YouTube to social links
- Add `https://youtube.com/@matejlukasik` to `Footer.astro` (alongside LinkedIn, X, GitHub)
- Add YouTube to JSON-LD `sameAs` array in `Layout.astro`
- Files: `src/components/Footer.astro`, `src/layouts/Layout.astro`

### 1.2 Remove pricing from FAQ
- Delete the "How much does it cost?" Q&A from both `en.json` and `sk.json`
- Files: `src/i18n/en.json`, `src/i18n/sk.json`

### 1.3 Restructure to 2 pages: Home + Contact

**Home page** — single scroll, this order:
1. Hero (keep as-is with typewriter)
2. Pain points (keep 3 cards)
3. Services (expand: merge in the detailed content from Services page — bullet lists, includes — directly into the home page service sections)
4. Process timeline (keep 4 steps)
5. About/Bio section (merge from About page — bio, 3 principles, tech explanation)
6. Trust badge (keep)
7. FAQ (move from Contact page, remove pricing question)
8. CTA band (keep — "Book a Free Call")

**Contact page** — stays as-is minus the FAQ (form + calendar + direct email)

**Delete/redirect:**
- `/services` and `/sluzby` — remove pages, redirect to home
- `/about` and `/o-mne` — remove pages, redirect to home

**Nav:** simplify to: Services (anchor `#services`), About (anchor `#about`), FAQ (anchor `#faq`), Contact (link), Book a Call (CTA)

**Files to modify:**
- `src/pages/index.astro` — add services detail sections, about section, FAQ
- `src/pages/contact.astro` — remove FAQ section
- `src/pages/kontakt.astro` — remove FAQ section
- `src/components/Nav.astro` — update links to anchors
- `src/i18n/en.json`, `src/i18n/sk.json` — update nav strings
- `src/i18n/index.ts` — update routing (remove services/about paths)
- `src/middleware.ts` — add redirects for old paths
- Delete: `src/pages/services.astro`, `src/pages/sluzby.astro`, `src/pages/about.astro`, `src/pages/o-mne.astro`

### 1.4 Create `best-practices.md` at project root
Track the consulting sales pipeline best practices to work through later:

```
# Sales Pipeline Best Practices

Work through these one by one in future sessions.

- [ ] Lead with outcomes, not services ("Reduce ops costs 30%" not "Consulting & Advisory")
- [ ] Social proof on every page (testimonials, logos, case studies, metrics)
- [ ] Niche positioning ("AI agents for X" beats "any team with repetitive work")
- [ ] Content marketing (blog, video, LinkedIn posts)
- [ ] Case studies with metrics
- [ ] Reduce clicks to conversion (done — single page)
- [ ] Show, don't tell (demos, screenshots, video walkthroughs)
- [ ] Authority positioning (speaking, articles, podcasts)
- [ ] Consistent identity across channels
- [ ] Email list / lead magnet ("AI Readiness Assessment" or similar)
```

---

## Part 2: Identity Crisis Plan (not code — strategic)

### Unified identity across all channels

**Target identity:** "AI Agent Consultant" — not "AI Engineer", not job seeker.

| Channel | Current | Change to |
|---------|---------|-----------|
| LinkedIn headline | "AI Engineer \| LLM Systems \| RAG..." | "AI Agent Consultant \| I help teams deploy AI agents that work \| matejlukasik.com" |
| LinkedIn position | Product Engineer at Doconomy only | Add: "AI Agent Consultant at matejlukasik.com" (current, alongside Doconomy) |
| LinkedIn skills | Ruby on Rails, Team Development | AI Agents, AI Strategy, LLM Systems, Prompt Engineering |
| LinkedIn featured | Nothing | Link to website + Amity Age presentation recording (when available) |
| X bio | "AI Engineer" | "AI Agent Consultant. Building agents that work for real teams. matejlukasik.com" |
| X activity | 0 posts | Start posting (see content pipeline below) |
| GitHub bio | "AI Engineer with 10+ years..." | "AI Agent Consultant. Building production agent systems." |
| GitHub repos | No agent work visible | Publish Clawforce or demo agent repos (see pipeline) |
| YouTube | Doesn't exist on site | Add @matejlukasik, start with presentation recording |

---

## Part 3: Competence-Building Project Pipeline

You already have more than you think:
- The Amity Age presentation (42 slides, detailed speaker notes, code examples)
- The Clawforce deployment system (Docker, OpenClaw, MCP server, deploy script)
- Deep knowledge of agent architecture (Brain + Tools + Memory + Agency)
- The use cases from your presentation (each one is a potential project)

### The Pipeline Formula

```
Learn/Build → Working Demo (GitHub) → Content (YouTube + LinkedIn + X)
```

### Project Sequence (ordered by difficulty, each builds on previous)

**Project 1: HN News Agent** (you already described this in slide 24)
- Learn: Claude API tool use, cron scheduling, Telegram bot API
- Demo: Agent that scrapes HN daily, filters AI-relevant news, sends Telegram digest
- GitHub: Public repo with clear README
- YouTube: "I built an AI agent that reads Hacker News for me" — screen recording, 10 min
- LinkedIn: Post the problem/solution, link to video
- X: Thread: "I got tired of checking HN every day. So I built an agent. Here's how."
- **Why first:** Simple, single-purpose agent. Proves the concept. You literally used this as an example in your talk.

**Project 2: Document Processing Agent** (slide 28)
- Learn: PDF extraction, structured output, multi-model routing
- Demo: Feed invoices/contracts → get structured JSON with extracted fields
- GitHub: Public repo with sample documents
- YouTube: "How I automated invoice processing with AI agents" — walkthrough + before/after
- LinkedIn: "Every finance team I talk to spends 20h/week on this. Here's how an agent does it in seconds."
- X: Before/after screenshot thread
- **Why second:** Universally relatable business problem. Every SMB has invoices.

**Project 3: Knowledge Base Agent** (slide 26)
- Learn: RAG pipeline, vector embeddings, retrieval strategies
- Demo: Upload company docs → agent answers questions with citations
- GitHub: Public repo with RAG implementation
- YouTube: "Build a company knowledge base agent from scratch" — tutorial format
- LinkedIn: "Your company's most valuable knowledge is trapped in Google Docs. Here's how to free it."
- X: Demo GIF + link
- **Why third:** This is what CEOs actually want first. Proves you can handle enterprise data.

**Project 4: Clawforce — Full Multi-Agent Deployment** (your existing project)
- Learn: You already know this — Docker orchestration, MCP server, agent-per-employee
- Demo: Polish Clawforce, deploy it on a VPS, make it reproducible
- GitHub: Open-source the deployment framework (or parts of it)
- YouTube: "Deploying AI agents for an entire team — architecture walkthrough" — this is the flagship video
- LinkedIn: "Here's the exact architecture I use to deploy AI agents for teams. One server, one API key, one agent per employee."
- X: Architecture diagram thread
- **Why fourth:** This IS the product your website describes. Once this is public and working, the credibility gap closes.

**Project 5: Your First Client (pro bono or deeply discounted)**
- Target: Amity Age or another contact from your network
- Scope: Deploy the simplest version of Clawforce for their team
- Deliverable: Working agents + a case study with real metrics
- Content: "Case Study: How [Company] deployed AI agents in 2 weeks" — blog post, video, LinkedIn
- **Why fifth:** This is the only project that produces real social proof. Everything before this builds the skills and visibility to get here.

### Content Cadence
- YouTube: 1 video per project (5 videos over ~3 months)
- LinkedIn: 2-3 posts/week (insights from building, behind-the-scenes, opinions)
- X: 1 post/day minimum (even just a thought, a screenshot, a question)
- Each project should take 1-2 weeks to build, 1 day to record/edit video

---

## Part 4: Social Proof Strategy (no proof yet — how to build it)

**Immediate (this week):**
- Record/upload the Amity Age presentation to YouTube — this IS content, it shows expertise
- Screenshot the Clawforce architecture and post it on LinkedIn
- Add "Speaking: The Age of Agentic AI (Amity Age, April 2026)" to your website's About section

**Short-term (projects 1-3):**
- Each project demo becomes a portfolio piece
- GitHub stars/forks become a signal
- YouTube views/comments become social proof

**Medium-term (project 5):**
- First client testimonial
- First case study with real metrics
- Add to website: logos, quotes, results

---

## Verification

After implementation:
1. `npm run build` — verify no broken links from removed pages
2. `npm run dev` — test the single-page scroll, all anchor links work
3. Test redirects: `/services` → `/`, `/about` → `/`, `/sluzby` → `/`, `/o-mne` → `/`
4. Verify YouTube link appears in footer and structured data
5. Verify FAQ question about pricing is removed
6. Verify nav links scroll to correct sections
7. Test both domains (`.com` and `.sk`)
