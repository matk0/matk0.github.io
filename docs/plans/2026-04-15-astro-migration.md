# Astro Migration — matejlukasik.com / matejlukasik.sk

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate matejlukasik.com from a Hugo personal site to an Astro 6 bilingual marketing site for AI agent consulting, adapting the existing clawforce.sk codebase to a personal brand.

**Architecture:** Domain-based i18n — matejlukasik.com serves English, matejlukasik.sk serves Slovak. Astro middleware detects hostname and sets locale. All pages are SSR on Cloudflare Pages. Clean URLs with no language prefix (e.g., `/services` not `/en/services`). Language switcher links to the equivalent page on the other domain.

**Tech Stack:** Astro 6 (SSR), Tailwind CSS 4 (Vite plugin), Cloudflare Pages (`@astrojs/cloudflare`), Resend (contact form email), Cal.com embed, Plausible analytics, Inter font.

**Prerequisites (manual, not part of this plan):**
- Cloudflare account with both domains (matejlukasik.com, matejlukasik.sk) configured
- Resend account with matejlukasik.com domain verified, API key generated
- Plausible analytics account with both domains added

---

## Task 1: Archive Hugo Site and Scaffold Astro Project

**Files:**
- Move: All current Hugo files → `archive/`
- Keep at root: `.git/`, `.claude/`, `WEBSITE.md`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.env.example`, `.gitignore`

**Step 1: Create archive directory and move Hugo files**

```bash
cd /Users/matejlukasik/Projects/matejlukasik.com
mkdir -p archive
# Move all Hugo files/dirs into archive
mv archetypes assets config content data hugo.toml.bak i18n layouts photo.png public resources static themes archive/
mv .gitmodules .hugo_build.lock .nojekyll CNAME archive/
mv .github archive/
```

**Step 2: Verify only expected files remain at root**

Run: `ls -la`
Expected: `.git/`, `.claude/`, `CLAUDE.md`, `WEBSITE.md`, `archive/`, `docs/`

**Step 3: Create package.json**

Create `package.json`:

```json
{
  "name": "matejlukasik-com",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

**Step 4: Install dependencies**

Run: `npm install astro@latest @astrojs/cloudflare@latest tailwindcss@latest @tailwindcss/vite@latest`

Expected: `package.json` updated with dependencies, `node_modules/` created, `package-lock.json` created.

**Step 5: Create astro.config.mjs**

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://matejlukasik.com',
  output: 'server',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 6: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "archive"]
}
```

**Step 7: Create .env.example**

```
RESEND_API_KEY=
```

**Step 8: Create .gitignore**

```
node_modules/
dist/
.astro/
.env
.wrangler/
.DS_Store
```

**Step 9: Copy static assets from archive**

```bash
mkdir -p public
cp archive/static/avatar.png public/avatar.png
cp archive/static/favicon.png public/favicon.png
cp archive/static/favicon-16x16.png public/favicon-16x16.png
cp archive/static/favicon-32x32.png public/favicon-32x32.png
cp archive/static/apple-touch-icon.png public/apple-touch-icon.png
```

**Step 10: Verify Astro project scaffolding works**

Run: `npx astro check` (may warn about missing pages, that's OK)
Run: `npm run build` (will fail — no pages yet, but confirms tooling is wired up)

**Step 11: Commit**

```bash
git add -A
git commit -m "Archive Hugo site and scaffold Astro 6 project"
```

---

## Task 2: Create i18n System and Middleware

**Files:**
- Create: `src/i18n/en.json`
- Create: `src/i18n/sk.json`
- Create: `src/i18n/index.ts`
- Create: `src/middleware.ts`

**Step 1: Create directory structure**

```bash
mkdir -p src/i18n src/pages src/layouts src/components src/styles
```

**Step 2: Create English translations**

Create `src/i18n/en.json`:

```json
{
  "lang": "en",
  "dir": "ltr",
  "nav": {
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "bookCall": "Book a Call"
  },
  "home": {
    "heroTitle": "AI agents for your team.",
    "heroSubtitle": "Deployed in days, not months.",
    "heroDescription": "You know AI could transform your business. I'll show you exactly how — and make it happen.",
    "ctaPrimary": "Book a Free Call",
    "ctaSecondary": "See My Services",
    "painTitle": "AI is everywhere. Implementing it shouldn't be this hard.",
    "pain1Title": "Too many tools, no strategy",
    "pain1Description": "Every week there's a new AI tool. Without a clear plan, you're just collecting subscriptions.",
    "pain2Title": "Expensive experiments that go nowhere",
    "pain2Description": "Proof-of-concept projects that never make it to production. Budget spent, nothing to show.",
    "pain3Title": "Your team doesn't know where to start",
    "pain3Description": "AI feels overwhelming. Your people are willing, but they need guidance and the right setup.",
    "servicesTitle": "How I Help",
    "consultingTitle": "Consulting & Advisory",
    "consultingDescription": "Assess workflows, identify high-impact automation opportunities, build your adoption roadmap.",
    "implementationTitle": "Implementation",
    "implementationDescription": "Design and deploy custom AI agents tailored to your processes. From single-task to multi-agent orchestration.",
    "trainingTitle": "Training & Workshops",
    "trainingDescription": "Hands-on sessions for your team. From prompt engineering to production agent workflows.",
    "learnMore": "Learn more",
    "trustTitle": "Built on open-source technology",
    "trustDescription": "No vendor lock-in. Your data stays on your infrastructure. Full transparency in how your AI agents work.",
    "ctaBandTitle": "Ready to bring AI to your team?",
    "ctaBandDescription": "Most clients start with a 30-minute exploratory call. No commitment, no jargon."
  },
  "services": {
    "heroTitle": "How I Help",
    "heroDescription": "From strategy to execution — I meet you where you are.",
    "consulting": {
      "title": "Consulting & Advisory",
      "subtitle": "Find out where AI makes sense — before you spend a crown.",
      "description": "I assess your current workflows, identify the highest-impact automation opportunities, and build a concrete adoption roadmap. You get clarity on what's worth automating and what isn't.",
      "includes": ["Workflow & process audit", "Automation opportunity mapping", "ROI estimation & prioritization", "Adoption roadmap with milestones"],
      "cta": "Book a Consultation"
    },
    "implementation": {
      "title": "Implementation",
      "subtitle": "One API key. One server. An AI agent for every team member.",
      "description": "I design and deploy custom AI agents tailored to your processes. Each employee gets their own agent, connected through a shared intelligence layer. A CEO agent orchestrates across the entire team.",
      "includes": ["AI agent per employee via Slack", "CEO orchestrator for cross-team coordination", "Shared prompt library & company knowledge base", "Admin dashboard with usage analytics"],
      "cta": "Start a Project"
    },
    "training": {
      "title": "Training & Workshops",
      "subtitle": "Build internal capability, not dependency.",
      "description": "Hands-on sessions that teach your team how to work effectively with AI agents. From prompt engineering fundamentals to designing production agent workflows.",
      "includes": ["Half-day intensive workshops", "Multi-week training programs", "Prompt engineering for business teams", "Ongoing support & office hours"],
      "cta": "Request Training"
    },
    "notSure": {
      "title": "Not sure where to start?",
      "description": "Most clients start with a 30-minute exploratory call. No commitment, no jargon — just an honest conversation about what AI can do for your business.",
      "cta": "Book a Free Call"
    }
  },
  "about": {
    "heroTitle": "Who Am I",
    "heroDescription": "One person, one mission: making AI work for real teams.",
    "bioName": "Matej Lukasik",
    "bioTitle": "AI Agent Consultant",
    "bioText": "I've seen too many companies burn money on AI pilots that go nowhere. Flashy demos that never make it to production. Consultants who leave behind a PDF and disappear.\n\nI fix that. I build AI agent systems that actually work — deployed on your infrastructure, integrated into your team's daily workflow, producing measurable results from week one.\n\nMy approach is simple: understand your business first, then build exactly what you need. No more, no less.",
    "approachTitle": "My Approach",
    "principle1Title": "Open-source first",
    "principle1Description": "Built on open standards. No vendor lock-in, full transparency in how your agents work.",
    "principle2Title": "Capability, not dependency",
    "principle2Description": "I train your team alongside deployment. The goal is for you to own and evolve your AI systems independently.",
    "principle3Title": "Start small, prove value",
    "principle3Description": "No 6-month projects. I deploy fast, measure results, and expand only what works.",
    "techTitle": "The Technology",
    "techDescription": "I build on open-source multi-agent platforms. Each employee gets a personal AI agent accessible via Slack, orchestrated by a CEO agent that coordinates across the team. A shared MCP server provides company-wide prompts, tools, and knowledge. Everything runs on your infrastructure with a single API key. You maintain full control over your data.",
    "ctaTitle": "Let's talk about what AI can do for your team.",
    "ctaPrimary": "Book a Call",
    "ctaSecondary": "Send a Message"
  },
  "contact": {
    "heroTitle": "Get in Touch",
    "heroDescription": "Whether you have a clear project or just questions — I'm here.",
    "formTitle": "Send me a message",
    "nameLabel": "Name",
    "namePlaceholder": "Your name",
    "emailLabel": "Email",
    "emailPlaceholder": "you@company.com",
    "companyLabel": "Company (optional)",
    "companyPlaceholder": "Your company name",
    "serviceLabel": "What are you interested in?",
    "serviceOptions": {
      "consulting": "Consulting & Advisory",
      "implementation": "Implementation",
      "training": "Training & Workshops",
      "notSure": "Not sure yet"
    },
    "messageLabel": "Message",
    "messagePlaceholder": "Tell me about your project or question...",
    "submit": "Send Message",
    "success": "Message sent! I'll get back to you within 24 hours.",
    "error": "Something went wrong. Please try again or email me directly.",
    "bookTitle": "Book a call",
    "bookDescription": "Pick a time that works. 30 minutes, no strings attached.",
    "directTitle": "Or reach out directly",
    "email": "matej@matejlukasik.com",
    "location": "Slovakia"
  },
  "footer": {
    "description": "AI agent consulting for teams that want real results.",
    "navigation": "Navigation",
    "getInTouch": "Get in Touch",
    "copyright": "Matej Lukasik. All rights reserved."
  }
}
```

**Step 3: Create Slovak translations**

Create `src/i18n/sk.json`:

```json
{
  "lang": "sk",
  "dir": "ltr",
  "nav": {
    "services": "Sluzby",
    "about": "O mne",
    "contact": "Kontakt",
    "bookCall": "Dohodnut hovor"
  },
  "home": {
    "heroTitle": "AI agenti pre vas tim.",
    "heroSubtitle": "Nasadeni za dni, nie mesiace.",
    "heroDescription": "Viete, ze AI moze zmenit vase podnikanie. Ukazem vam presne ako — a zariadim to.",
    "ctaPrimary": "Bezplatna konzultacia",
    "ctaSecondary": "Moje sluzby",
    "painTitle": "AI je vsade. Implementovat ho nemusi byt take tazke.",
    "pain1Title": "Prilis vela nastrojov, ziadna strategia",
    "pain1Description": "Kazdy tyzden novy AI nastroj. Bez jasneho planu len zbierame predplatne.",
    "pain2Title": "Drahe experimenty bez vysledkov",
    "pain2Description": "Proof-of-concept projekty, ktore sa nikdy nedostanu do produkcie. Penaze minutne, vysledky ziadne.",
    "pain3Title": "Vas tim nevie, kde zacat",
    "pain3Description": "AI posobi prehlcujuco. Vasi ludia su ochotni, ale potrebuju vedenie a spravne nastavenie.",
    "servicesTitle": "Ako pomozem",
    "consultingTitle": "Konzultacie a poradenstvo",
    "consultingDescription": "Zhodnotim vase procesy, identifikujem prilezitosti na automatizaciu a vytvorim plan nasadenia.",
    "implementationTitle": "Implementacia",
    "implementationDescription": "Navrhem a nasadim AI agentov presne pre vase procesy. Od jednoduchych automatizacii po multi-agentovu orchestraciu.",
    "trainingTitle": "Skolenia a workshopy",
    "trainingDescription": "Prakticke skolenia pre vas tim. Od prompt engineeringu po produkcne agentove workflows.",
    "learnMore": "Viac info",
    "trustTitle": "Postavene na open-source technologii",
    "trustDescription": "Ziadne vendor lock-in. Vase data zostavaju na vasej infrastrukture. Plna transparentnost v tom, ako vasi AI agenti funguju.",
    "ctaBandTitle": "Ste pripraveni priniest AI do vasho timu?",
    "ctaBandDescription": "Vacsina klientov zacina 30-minutovou konzultaciou. Bez zavazkov, bez zargonu."
  },
  "services": {
    "heroTitle": "Ako pomozem",
    "heroDescription": "Od strategie po realizaciu — stretnem sa tam, kde ste.",
    "consulting": {
      "title": "Konzultacie a poradenstvo",
      "subtitle": "Zistite, kde ma AI zmysel — skor, nez minete jedinu korunu.",
      "description": "Zhodnotim vase sucasne procesy, identifikujem prilezitosti s najvacsim dopadom a vytvorim konkretny plan nasadenia. Ziskate jasno v tom, co sa oplati automatizovat a co nie.",
      "includes": ["Audit procesov a workflows", "Mapovanie prilezitosti na automatizaciu", "Odhad ROI a prioritizacia", "Plan nasadenia s milnikmi"],
      "cta": "Objednat konzultaciu"
    },
    "implementation": {
      "title": "Implementacia",
      "subtitle": "Jeden API kluc. Jeden server. AI agent pre kazdeho clena timu.",
      "description": "Navrhem a nasadim AI agentov presne pre vase procesy. Kazdy zamestnanec dostane vlastneho agenta, prepojenho cez zdielanu inteligentnu vrstvu. CEO agent koordinuje napriec celym timom.",
      "includes": ["AI agent pre kazdeho zamestnanca cez Slack", "CEO orchestrator pre koordinaciu napriec timami", "Zdielana kniznica promptov a firemna znalostna baza", "Admin dashboard s analytikou pouzitia"],
      "cta": "Spustit projekt"
    },
    "training": {
      "title": "Skolenia a workshopy",
      "subtitle": "Budujem schopnosti, nie zavislost.",
      "description": "Prakticke skolenia, ktore nauca vas tim efektivne pracovat s AI agentmi. Od zakladov prompt engineeringu po navrhovanie produkcnych agentovych workflows.",
      "includes": ["Poldenove intenzivne workshopy", "Viac-tyzdnove trenovacie programy", "Prompt engineering pre business timy", "Priebezna podpora a konzultacie"],
      "cta": "Objednat skolenie"
    },
    "notSure": {
      "title": "Neviete, kde zacat?",
      "description": "Vacsina klientov zacina 30-minutovou konzultaciou. Bez zavazkov, bez zargonu — len uprimny rozhovor o tom, co moze AI urobit pre vase podnikanie.",
      "cta": "Bezplatna konzultacia"
    }
  },
  "about": {
    "heroTitle": "Kto som",
    "heroDescription": "Jeden clovek, jedna misia: aby AI fungoval pre realne timy.",
    "bioName": "Matej Lukasik",
    "bioTitle": "AI Agent Konzultant",
    "bioText": "Videl som prilis vela firiem, ktore spalili peniaze na AI pilotoch, ktore nikam neviedli. Leskle dema, ktore sa nikdy nedostali do produkcie. Konzultanti, ktori zanechali PDF a zmizli.\n\nTo menim. Budujem systemy AI agentov, ktore naozaj funguju — nasadene na vasej infrastrukture, integrovane do denneho workflow vasho timu, s meratelnyni vysledkami od prveho tyzdna.\n\nMoj pristup je jednoduchy: najprv pochopit vase podnikanie, potom postavit presne to, co potrebujete. Nic viac, nic menej.",
    "approachTitle": "Moj pristup",
    "principle1Title": "Open-source na prvom mieste",
    "principle1Description": "Postavene na otvorenyh standardoch. Ziadne vendor lock-in, plna transparentnost v tom, ako vasi agenti funguju.",
    "principle2Title": "Schopnost, nie zavislost",
    "principle2Description": "Vas tim skolim sucasne s nasadenim. Cielom je, aby ste svoje AI systemy vlastnili a rozvijali samostatne.",
    "principle3Title": "Zacat malo, dokazat hodnotu",
    "principle3Description": "Ziadne 6-mesacne projekty. Nasadzujem rychlo, meriam vysledky a rozsirujem len to, co funguje.",
    "techTitle": "Technologia",
    "techDescription": "Staviam na open-source multi-agentovych platformach. Kazdy zamestnanec dostane osobneho AI agenta pristupneho cez Slack, orchestrovaneho CEO agentom, ktory koordinuje napriec timom. Zdielany MCP server poskytuje firemne prompty, nastroje a znalosti. Vsetko bezi na vasej infrastrukture s jednym API klucom. Zachovavate plnu kontrolu nad vasimi datami.",
    "ctaTitle": "Porozpravajme sa o tom, co moze AI urobit pre vas tim.",
    "ctaPrimary": "Dohodnut hovor",
    "ctaSecondary": "Napisat spravu"
  },
  "contact": {
    "heroTitle": "Spojte sa so mnou",
    "heroDescription": "Ci uz mate jasny projekt, alebo len otazky — som tu.",
    "formTitle": "Napisite mi",
    "nameLabel": "Meno",
    "namePlaceholder": "Vase meno",
    "emailLabel": "Email",
    "emailPlaceholder": "vy@firma.sk",
    "companyLabel": "Firma (volitelne)",
    "companyPlaceholder": "Nazov vasej firmy",
    "serviceLabel": "O co mate zaujem?",
    "serviceOptions": {
      "consulting": "Konzultacie a poradenstvo",
      "implementation": "Implementacia",
      "training": "Skolenia a workshopy",
      "notSure": "Zatial neviem"
    },
    "messageLabel": "Sprava",
    "messagePlaceholder": "Povedzte mi o vasom projekte alebo otazke...",
    "submit": "Odoslat spravu",
    "success": "Sprava odoslana! Ozvem sa do 24 hodin.",
    "error": "Nieco sa pokazilo. Skuste to znova alebo mi napisete priamo.",
    "bookTitle": "Dohodnut hovor",
    "bookDescription": "Vyberte si cas, ktory vam vyhovuje. 30 minut, bez zavazkov.",
    "directTitle": "Alebo ma kontaktujte priamo",
    "email": "matej@matejlukasik.com",
    "location": "Slovensko"
  },
  "footer": {
    "description": "AI agent konzulting pre timy, ktore chcu realne vysledky.",
    "navigation": "Navigacia",
    "getInTouch": "Kontakt",
    "copyright": "Matej Lukasik. Vsetky prava vyhradene."
  }
}
```

**Step 4: Create i18n utility module**

Create `src/i18n/index.ts`:

```typescript
import en from './en.json';
import sk from './sk.json';

export const languages = { en, sk } as const;
export type Lang = keyof typeof languages;

export function t(lang: Lang) {
  return languages[lang];
}

export const DOMAINS: Record<Lang, string> = {
  en: 'https://matejlukasik.com',
  sk: 'https://matejlukasik.sk',
};

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'sk' ? 'en' : 'sk';
}

const PATH_MAP: Record<string, Record<Lang, string>> = {
  '/': { en: '/', sk: '/' },
  '/services': { en: '/services', sk: '/sluzby' },
  '/sluzby': { en: '/services', sk: '/sluzby' },
  '/about': { en: '/about', sk: '/o-mne' },
  '/o-mne': { en: '/about', sk: '/o-mne' },
  '/contact': { en: '/contact', sk: '/kontakt' },
  '/kontakt': { en: '/contact', sk: '/kontakt' },
};

export function getAlternateUrl(lang: Lang, currentPath: string): string {
  const altLang = getAlternateLang(lang);
  const entry = PATH_MAP[currentPath];
  const altPath = entry ? entry[altLang] : '/';
  return `${DOMAINS[altLang]}${altPath}`;
}

export function getExpectedPath(lang: Lang, currentPath: string): string | null {
  const entry = PATH_MAP[currentPath];
  if (!entry) return null;
  return entry[lang];
}

export function getLocalizedPaths(lang: Lang) {
  return {
    services: lang === 'sk' ? '/sluzby' : '/services',
    about: lang === 'sk' ? '/o-mne' : '/about',
    contact: lang === 'sk' ? '/kontakt' : '/contact',
  };
}
```

**Step 5: Create middleware for domain-based language detection**

Create `src/middleware.ts`:

```typescript
import { defineMiddleware } from 'astro:middleware';
import type { Lang } from './i18n';
import { getExpectedPath } from './i18n';

function getLangFromHost(hostname: string): Lang {
  if (hostname.endsWith('.sk')) return 'sk';
  if (hostname === 'localhost' || hostname.startsWith('localhost:')) return 'en';
  return 'en';
}

export const onRequest = defineMiddleware(async ({ url, locals, redirect }, next) => {
  if (url.pathname.startsWith('/api/')) return next();

  const lang = getLangFromHost(url.hostname);
  (locals as any).lang = lang;

  const expected = getExpectedPath(lang, url.pathname);
  if (expected !== null && expected !== url.pathname) {
    return redirect(expected, 301);
  }

  return next();
});
```

**Step 6: Verify TypeScript compiles**

Run: `npx astro check`
Expected: No errors related to i18n module (may warn about missing pages)

**Step 7: Commit**

```bash
git add src/i18n/ src/middleware.ts
git commit -m "Add i18n system and domain-based language middleware"
```

---

## Task 3: Create Global Styles and Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`

**Step 1: Create global styles**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #6D4AFF;
  --color-primary-dark: #1B1340;
  --color-primary-light: #F3F0FF;
  --color-primary-hover: #5B3DE6;
  --color-accent: #936DFF;
  --color-heading: #0C0C14;
  --color-body: #706D7A;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F3F0FF;
  --color-border: #E5E2EB;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-sans);
    color: var(--color-body);
    background-color: var(--color-surface);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-heading);
    font-weight: 700;
    line-height: 1.15;
  }
}

@layer components {
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    background-color: var(--color-primary);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(109, 74, 255, 0.3);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    background-color: transparent;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
    border: 2px solid var(--color-primary);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .btn-secondary:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-1px);
  }

  .btn-white {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    background-color: white;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .btn-white:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }

  .btn-outline-white {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    background-color: transparent;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .btn-outline-white:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: white;
    transform: translateY(-1px);
  }

  .section-padding {
    padding: 5rem 1.5rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  @media (min-width: 768px) {
    .section-padding {
      padding: 7rem 2rem;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
```

**Step 2: Create Layout component**

Create `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import type { Lang } from '../i18n';
import { DOMAINS, getAlternateUrl, getAlternateLang } from '../i18n';

interface Props {
  title: string;
  description: string;
  lang: Lang;
  currentPath: string;
}

const { title, description, lang, currentPath } = Astro.props;
const canonicalURL = new URL(currentPath, DOMAINS[lang]);
const alternateURL = getAlternateUrl(lang, currentPath);
const altLang = getAlternateLang(lang);
---

<!DOCTYPE html>
<html lang={lang} dir="ltr">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL.href} />
    <meta property="og:locale" content={lang === 'sk' ? 'sk_SK' : 'en_US'} />
    <meta property="og:site_name" content="Matej Lukasik" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <link rel="canonical" href={canonicalURL.href} />
    <link rel="alternate" hreflang={altLang} href={alternateURL} />
    <link rel="alternate" hreflang={lang} href={canonicalURL.href} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen flex flex-col">
    <Nav lang={lang} currentPath={currentPath} />
    <main class="flex-1">
      <slot />
    </main>
    <Footer lang={lang} />
  </body>
</html>
```

Note: Plausible analytics will be added in Task 10 after the site is functional.

**Step 3: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "Add global styles and Layout component"
```

---

## Task 4: Create Nav and Footer Components

**Files:**
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`

**Step 1: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
import { t, getAlternateUrl, getAlternateLang, getLocalizedPaths } from '../i18n';
import type { Lang } from '../i18n';

interface Props {
  lang: Lang;
  currentPath: string;
}

const { lang, currentPath } = Astro.props;
const strings = t(lang);
const altLang = getAlternateLang(lang);
const altUrl = getAlternateUrl(lang, currentPath);
const paths = getLocalizedPaths(lang);
---

<nav class="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
  <div class="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-heading tracking-tight">
      matejlukasik
    </a>

    <div class="hidden md:flex items-center gap-8">
      <a href={paths.services} class:list={["text-sm font-medium transition-colors hover:text-primary", currentPath === paths.services ? "text-primary" : "text-body"]}>
        {strings.nav.services}
      </a>
      <a href={paths.about} class:list={["text-sm font-medium transition-colors hover:text-primary", currentPath === paths.about ? "text-primary" : "text-body"]}>
        {strings.nav.about}
      </a>
      <a href={paths.contact} class:list={["text-sm font-medium transition-colors hover:text-primary", currentPath === paths.contact ? "text-primary" : "text-body"]}>
        {strings.nav.contact}
      </a>
    </div>

    <div class="flex items-center gap-3">
      <a
        href={altUrl}
        class="text-sm font-medium text-body hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary-light"
      >
        {altLang.toUpperCase()}
      </a>
      <a href={paths.contact} class="hidden sm:inline-flex btn-primary !py-2 !px-4 !text-sm">
        {strings.nav.bookCall}
      </a>
    </div>

    <button id="mobile-menu-btn" class="md:hidden p-2 text-body hover:text-heading" aria-label="Menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-surface">
    <div class="container mx-auto px-4 py-4 flex flex-col gap-3">
      <a href={paths.services} class="text-sm font-medium text-body hover:text-primary py-2">{strings.nav.services}</a>
      <a href={paths.about} class="text-sm font-medium text-body hover:text-primary py-2">{strings.nav.about}</a>
      <a href={paths.contact} class="text-sm font-medium text-body hover:text-primary py-2">{strings.nav.contact}</a>
      <a href={paths.contact} class="btn-primary !text-sm mt-2">{strings.nav.bookCall}</a>
    </div>
  </div>
</nav>

<div class="h-16"></div>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
  });
</script>
```

**Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
import { t, getLocalizedPaths } from '../i18n';
import type { Lang } from '../i18n';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const strings = t(lang);
const paths = getLocalizedPaths(lang);
const year = new Date().getFullYear();
---

<footer class="bg-primary-dark text-white/70">
  <div class="container mx-auto px-4 sm:px-6 section-padding !pb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div>
        <a href="/" class="text-xl font-bold text-white tracking-tight">matejlukasik</a>
        <p class="mt-4 text-sm leading-relaxed max-w-xs">{strings.footer.description}</p>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{strings.footer.navigation}</h4>
        <ul class="space-y-2">
          <li><a href={paths.services} class="text-sm hover:text-white transition-colors">{strings.nav.services}</a></li>
          <li><a href={paths.about} class="text-sm hover:text-white transition-colors">{strings.nav.about}</a></li>
          <li><a href={paths.contact} class="text-sm hover:text-white transition-colors">{strings.nav.contact}</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{strings.footer.getInTouch}</h4>
        <ul class="space-y-2">
          <li>
            <a href={`mailto:${strings.contact.email}`} class="text-sm hover:text-white transition-colors">
              {strings.contact.email}
            </a>
          </li>
          <li><span class="text-sm">{strings.contact.location}</span></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10 pt-8">
      <p class="text-sm text-white/40">&copy; {year} {strings.footer.copyright}</p>
    </div>
  </div>
</footer>
```

**Step 3: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro
git commit -m "Add Nav and Footer components"
```

---

## Task 5: Create Hero and CTABand Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/CTABand.astro`

**Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  size?: 'large' | 'small';
}

const { title, subtitle, description, size = 'small' } = Astro.props;
const isLarge = size === 'large';
---

<section class="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary-dark">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

  <div class:list={["container mx-auto px-4 sm:px-6 relative z-10 text-center", isLarge ? "py-24 md:py-36" : "py-16 md:py-24"]}>
    {subtitle && (
      <p class:list={["font-semibold text-accent mb-4", isLarge ? "text-lg md:text-xl" : "text-base"]}>
        {subtitle}
      </p>
    )}
    <h1 class:list={["font-bold text-white leading-tight", isLarge ? "text-4xl md:text-6xl max-w-4xl mx-auto" : "text-3xl md:text-5xl max-w-3xl mx-auto"]}>
      {title}
    </h1>
    {description && (
      <p class:list={["text-white/70 max-w-2xl mx-auto", isLarge ? "text-lg md:text-xl mt-6" : "text-base md:text-lg mt-4"]}>
        {description}
      </p>
    )}
    <div class:list={[isLarge ? "mt-10" : "mt-6"]}>
      <slot />
    </div>
  </div>
</section>
```

**Step 2: Create CTABand component**

Create `src/components/CTABand.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section class="relative overflow-hidden bg-gradient-to-r from-primary to-accent">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
  <div class="container mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10 text-center">
    <h2 class="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h2>
    {description && (
      <p class="text-white/80 text-lg max-w-xl mx-auto mb-8">{description}</p>
    )}
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <slot />
    </div>
  </div>
</section>
```

**Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/CTABand.astro
git commit -m "Add Hero and CTABand components"
```

---

## Task 6: Create Homepage

**Files:**
- Create: `src/components/PainCard.astro`
- Create: `src/components/ServiceCard.astro`
- Create: `src/pages/index.astro`

**Step 1: Create PainCard component**

Create `src/components/PainCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
}

const { title, description, icon } = Astro.props;
---

<div class="flex flex-col items-center text-center p-6">
  <div class="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-2xl mb-4">
    {icon}
  </div>
  <h3 class="text-lg font-bold text-heading mb-2">{title}</h3>
  <p class="text-body text-sm leading-relaxed max-w-xs">{description}</p>
</div>
```

**Step 2: Create ServiceCard component**

Create `src/components/ServiceCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
  linkText: string;
}

const { title, description, icon, href, linkText } = Astro.props;
---

<div class="bg-surface rounded-2xl p-8 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
  <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5 group-hover:bg-primary/10 transition-colors">
    {icon}
  </div>
  <h3 class="text-xl font-bold text-heading mb-3">{title}</h3>
  <p class="text-body text-sm leading-relaxed mb-5">{description}</p>
  <a href={href} class="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors gap-1">
    {linkText}
    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </a>
</div>
```

**Step 3: Create homepage**

Create `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import PainCard from '../components/PainCard.astro';
import ServiceCard from '../components/ServiceCard.astro';
import CTABand from '../components/CTABand.astro';
import { t, getLocalizedPaths } from '../i18n';
import type { Lang } from '../i18n';

const lang = (Astro.locals as any).lang as Lang || 'en';
const strings = t(lang);
const paths = getLocalizedPaths(lang);
---

<Layout
  title={`Matej Lukasik — ${strings.home.heroTitle}`}
  description={strings.home.heroDescription}
  lang={lang}
  currentPath="/"
>
  <Hero
    title={strings.home.heroTitle}
    subtitle={strings.home.heroSubtitle}
    description={strings.home.heroDescription}
    size="large"
  >
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href={paths.contact} class="btn-white">{strings.home.ctaPrimary}</a>
      <a href={paths.services} class="btn-outline-white">{strings.home.ctaSecondary}</a>
    </div>
  </Hero>

  <section class="section-padding bg-surface">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold text-heading text-center mb-12 max-w-3xl mx-auto">
        {strings.home.painTitle}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PainCard icon="🧩" title={strings.home.pain1Title} description={strings.home.pain1Description} />
        <PainCard icon="💸" title={strings.home.pain2Title} description={strings.home.pain2Description} />
        <PainCard icon="🤷" title={strings.home.pain3Title} description={strings.home.pain3Description} />
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface-alt">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold text-heading text-center mb-12">
        {strings.home.servicesTitle}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard icon="🎯" title={strings.home.consultingTitle} description={strings.home.consultingDescription} href={`${paths.services}#consulting`} linkText={strings.home.learnMore} />
        <ServiceCard icon="🔧" title={strings.home.implementationTitle} description={strings.home.implementationDescription} href={`${paths.services}#implementation`} linkText={strings.home.learnMore} />
        <ServiceCard icon="📚" title={strings.home.trainingTitle} description={strings.home.trainingDescription} href={`${paths.services}#training`} linkText={strings.home.learnMore} />
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface">
    <div class="container mx-auto text-center">
      <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-light text-primary text-sm font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        {strings.home.trustTitle}
      </div>
      <p class="text-body mt-4 max-w-xl mx-auto text-sm">{strings.home.trustDescription}</p>
    </div>
  </section>

  <CTABand title={strings.home.ctaBandTitle} description={strings.home.ctaBandDescription}>
    <a href={paths.contact} class="btn-white">{strings.home.ctaPrimary}</a>
  </CTABand>
</Layout>
```

**Step 4: Verify homepage builds and renders**

Run: `npm run dev`
Open: `http://localhost:4321`
Expected: Homepage renders with English content (localhost defaults to EN), navigation, footer, all sections visible.

**Step 5: Commit**

```bash
git add src/components/PainCard.astro src/components/ServiceCard.astro src/pages/index.astro
git commit -m "Add homepage with PainCard and ServiceCard components"
```

---

## Task 7: Create Services Pages

**Files:**
- Create: `src/components/ServiceSection.astro`
- Create: `src/pages/services.astro`
- Create: `src/pages/sluzby.astro`

**Step 1: Create ServiceSection component**

Create `src/components/ServiceSection.astro`:

```astro
---
interface Props {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  ctaText: string;
  ctaHref: string;
  icon: string;
  reversed?: boolean;
  bg?: 'white' | 'alt';
}

const { id, title, subtitle, description, includes, ctaText, ctaHref, icon, reversed = false, bg = 'white' } = Astro.props;
---

<section id={id} class:list={["section-padding", bg === 'alt' ? "bg-surface-alt" : "bg-surface"]}>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class:list={[reversed && "lg:order-2"]}>
      <div class="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-3xl mb-6">
        {icon}
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-heading mb-3">{title}</h2>
      <p class="text-lg text-primary font-medium mb-4">{subtitle}</p>
      <p class="text-body leading-relaxed mb-6">{description}</p>
      <ul class="space-y-3 mb-8">
        {includes.map((item) => (
          <li class="flex items-start gap-3 text-body text-sm">
            <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <a href={ctaHref} class="btn-primary">{ctaText}</a>
    </div>
    <div class:list={[reversed && "lg:order-1"]}>
      <div class="rounded-2xl bg-gradient-to-br from-primary-light to-surface-alt p-12 flex items-center justify-center min-h-[300px]">
        <span class="text-8xl">{icon}</span>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Create English services page**

Create `src/pages/services.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ServiceSection from '../components/ServiceSection.astro';
import CTABand from '../components/CTABand.astro';
import { t } from '../i18n';

const lang = 'en';
const strings = t(lang);
---

<Layout
  title="Services — Matej Lukasik"
  description="AI consulting, agent implementation, and training for your team."
  lang={lang}
  currentPath="/services"
>
  <Hero
    title={strings.services.heroTitle}
    description={strings.services.heroDescription}
  />

  <ServiceSection
    id="consulting"
    icon="🎯"
    title={strings.services.consulting.title}
    subtitle={strings.services.consulting.subtitle}
    description={strings.services.consulting.description}
    includes={strings.services.consulting.includes}
    ctaText={strings.services.consulting.cta}
    ctaHref="/contact?service=consulting"
    bg="white"
  />

  <ServiceSection
    id="implementation"
    icon="🔧"
    title={strings.services.implementation.title}
    subtitle={strings.services.implementation.subtitle}
    description={strings.services.implementation.description}
    includes={strings.services.implementation.includes}
    ctaText={strings.services.implementation.cta}
    ctaHref="/contact?service=implementation"
    reversed
    bg="alt"
  />

  <ServiceSection
    id="training"
    icon="📚"
    title={strings.services.training.title}
    subtitle={strings.services.training.subtitle}
    description={strings.services.training.description}
    includes={strings.services.training.includes}
    ctaText={strings.services.training.cta}
    ctaHref="/contact?service=training"
    bg="white"
  />

  <CTABand title={strings.services.notSure.title} description={strings.services.notSure.description}>
    <a href="/contact" class="btn-white">{strings.services.notSure.cta}</a>
  </CTABand>
</Layout>
```

**Step 3: Create Slovak services page**

Create `src/pages/sluzby.astro` — identical structure to `services.astro` but with:
- `const lang = 'sk';`
- `currentPath="/sluzby"`
- `title="Sluzby — Matej Lukasik"`
- `description="AI konzulting, implementacia agentov a skolenia pre vas tim."`
- All `ctaHref` paths use Slovak routes: `/kontakt?service=consulting`, `/kontakt?service=implementation`, `/kontakt?service=training`
- CTA band href: `/kontakt`
- Service section IDs for SK: `id="konzultacie"`, `id="implementacia"`, `id="skolenia"`

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ServiceSection from '../components/ServiceSection.astro';
import CTABand from '../components/CTABand.astro';
import { t } from '../i18n';

const lang = 'sk';
const strings = t(lang);
---

<Layout
  title="Sluzby — Matej Lukasik"
  description="AI konzulting, implementacia agentov a skolenia pre vas tim."
  lang={lang}
  currentPath="/sluzby"
>
  <Hero
    title={strings.services.heroTitle}
    description={strings.services.heroDescription}
  />

  <ServiceSection
    id="konzultacie"
    icon="🎯"
    title={strings.services.consulting.title}
    subtitle={strings.services.consulting.subtitle}
    description={strings.services.consulting.description}
    includes={strings.services.consulting.includes}
    ctaText={strings.services.consulting.cta}
    ctaHref="/kontakt?service=consulting"
    bg="white"
  />

  <ServiceSection
    id="implementacia"
    icon="🔧"
    title={strings.services.implementation.title}
    subtitle={strings.services.implementation.subtitle}
    description={strings.services.implementation.description}
    includes={strings.services.implementation.includes}
    ctaText={strings.services.implementation.cta}
    ctaHref="/kontakt?service=implementation"
    reversed
    bg="alt"
  />

  <ServiceSection
    id="skolenia"
    icon="📚"
    title={strings.services.training.title}
    subtitle={strings.services.training.subtitle}
    description={strings.services.training.description}
    includes={strings.services.training.includes}
    ctaText={strings.services.training.cta}
    ctaHref="/kontakt?service=training"
    bg="white"
  />

  <CTABand title={strings.services.notSure.title} description={strings.services.notSure.description}>
    <a href="/kontakt" class="btn-white">{strings.services.notSure.cta}</a>
  </CTABand>
</Layout>
```

**Step 4: Verify services pages render**

Run: `npm run dev`
Open: `http://localhost:4321/services`
Expected: Services page renders with three service sections, alternating layout, CTA band at bottom.

**Step 5: Commit**

```bash
git add src/components/ServiceSection.astro src/pages/services.astro src/pages/sluzby.astro
git commit -m "Add services pages with ServiceSection component"
```

---

## Task 8: Create About Pages

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/o-mne.astro`

**Step 1: Create English about page**

Create `src/pages/about.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import CTABand from '../components/CTABand.astro';
import { t } from '../i18n';

const lang = 'en';
const strings = t(lang);
---

<Layout
  title="About — Matej Lukasik"
  description="AI agent consultant. My approach to deploying AI agents for real teams."
  lang={lang}
  currentPath="/about"
>
  <Hero
    title={strings.about.heroTitle}
    description={strings.about.heroDescription}
  />

  <section class="section-padding bg-surface">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div class="lg:col-span-2 flex flex-col items-center lg:items-start">
          <div class="w-48 h-48 rounded-2xl overflow-hidden mb-6">
            <img src="/avatar.png" alt="Matej Lukasik" class="w-full h-full object-cover" />
          </div>
          <h2 class="text-2xl font-bold text-heading">{strings.about.bioName}</h2>
          <p class="text-primary font-medium">{strings.about.bioTitle}</p>
        </div>
        <div class="lg:col-span-3">
          {strings.about.bioText.split('\n\n').map((paragraph) => (
            <p class="text-body leading-relaxed mb-4 last:mb-0">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface-alt">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold text-heading text-center mb-12">{strings.about.approachTitle}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">🔓</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle1Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle1Description}</p>
        </div>
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">💪</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle2Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle2Description}</p>
        </div>
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">🚀</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle3Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle3Description}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface">
    <div class="container mx-auto max-w-3xl text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-heading mb-6">{strings.about.techTitle}</h2>
      <p class="text-body leading-relaxed">{strings.about.techDescription}</p>
    </div>
  </section>

  <CTABand title={strings.about.ctaTitle}>
    <a href="/contact" class="btn-white">{strings.about.ctaPrimary}</a>
    <a href="/contact" class="btn-outline-white">{strings.about.ctaSecondary}</a>
  </CTABand>
</Layout>
```

**Step 2: Create Slovak about page**

Create `src/pages/o-mne.astro` — identical structure to `about.astro` but with:
- `const lang = 'sk';`
- `currentPath="/o-mne"`
- `title="O mne — Matej Lukasik"`
- `description="AI agent konzultant. Moj pristup k nasadeniu AI agentov pre realne timy."`
- CTA hrefs use `/kontakt` instead of `/contact`

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import CTABand from '../components/CTABand.astro';
import { t } from '../i18n';

const lang = 'sk';
const strings = t(lang);
---

<Layout
  title="O mne — Matej Lukasik"
  description="AI agent konzultant. Moj pristup k nasadeniu AI agentov pre realne timy."
  lang={lang}
  currentPath="/o-mne"
>
  <Hero
    title={strings.about.heroTitle}
    description={strings.about.heroDescription}
  />

  <section class="section-padding bg-surface">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div class="lg:col-span-2 flex flex-col items-center lg:items-start">
          <div class="w-48 h-48 rounded-2xl overflow-hidden mb-6">
            <img src="/avatar.png" alt="Matej Lukasik" class="w-full h-full object-cover" />
          </div>
          <h2 class="text-2xl font-bold text-heading">{strings.about.bioName}</h2>
          <p class="text-primary font-medium">{strings.about.bioTitle}</p>
        </div>
        <div class="lg:col-span-3">
          {strings.about.bioText.split('\n\n').map((paragraph) => (
            <p class="text-body leading-relaxed mb-4 last:mb-0">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface-alt">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold text-heading text-center mb-12">{strings.about.approachTitle}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">🔓</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle1Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle1Description}</p>
        </div>
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">💪</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle2Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle2Description}</p>
        </div>
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-border">
          <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-5">🚀</div>
          <h3 class="text-lg font-bold text-heading mb-2">{strings.about.principle3Title}</h3>
          <p class="text-body text-sm leading-relaxed">{strings.about.principle3Description}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface">
    <div class="container mx-auto max-w-3xl text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-heading mb-6">{strings.about.techTitle}</h2>
      <p class="text-body leading-relaxed">{strings.about.techDescription}</p>
    </div>
  </section>

  <CTABand title={strings.about.ctaTitle}>
    <a href="/kontakt" class="btn-white">{strings.about.ctaPrimary}</a>
    <a href="/kontakt" class="btn-outline-white">{strings.about.ctaSecondary}</a>
  </CTABand>
</Layout>
```

**Step 3: Verify about pages render**

Run: `npm run dev`
Open: `http://localhost:4321/about`
Expected: About page with avatar photo, bio text, approach cards, technology section, CTA band.

**Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/o-mne.astro
git commit -m "Add about pages"
```

---

## Task 9: Create Contact Pages with Form and API

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/components/CalEmbed.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/kontakt.astro`
- Create: `src/pages/api/contact.ts`

**Step 1: Create ContactForm component**

Create `src/components/ContactForm.astro`:

```astro
---
import type { Lang } from '../i18n';
import { t } from '../i18n';

interface Props {
  lang: Lang;
  preselectedService?: string;
}

const { lang, preselectedService } = Astro.props;
const strings = t(lang);
---

<form id="contact-form" class="space-y-5" method="POST" action="/api/contact">
  <input type="hidden" name="lang" value={lang} />
  <input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />

  <div>
    <label for="name" class="block text-sm font-medium text-heading mb-1.5">{strings.contact.nameLabel}</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder={strings.contact.namePlaceholder}
      class="w-full px-4 py-3 rounded-xl border border-border bg-surface text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-heading mb-1.5">{strings.contact.emailLabel}</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder={strings.contact.emailPlaceholder}
      class="w-full px-4 py-3 rounded-xl border border-border bg-surface text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
    />
  </div>

  <div>
    <label for="company" class="block text-sm font-medium text-heading mb-1.5">{strings.contact.companyLabel}</label>
    <input
      type="text"
      id="company"
      name="company"
      placeholder={strings.contact.companyPlaceholder}
      class="w-full px-4 py-3 rounded-xl border border-border bg-surface text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
    />
  </div>

  <div>
    <label for="service" class="block text-sm font-medium text-heading mb-1.5">{strings.contact.serviceLabel}</label>
    <select
      id="service"
      name="service"
      class="w-full px-4 py-3 rounded-xl border border-border bg-surface text-heading focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
    >
      <option value="consulting" selected={preselectedService === 'consulting'}>{strings.contact.serviceOptions.consulting}</option>
      <option value="implementation" selected={preselectedService === 'implementation'}>{strings.contact.serviceOptions.implementation}</option>
      <option value="training" selected={preselectedService === 'training'}>{strings.contact.serviceOptions.training}</option>
      <option value="notSure" selected={!preselectedService || preselectedService === 'notSure'}>{strings.contact.serviceOptions.notSure}</option>
    </select>
  </div>

  <div>
    <label for="message" class="block text-sm font-medium text-heading mb-1.5">{strings.contact.messageLabel}</label>
    <textarea
      id="message"
      name="message"
      rows="4"
      required
      placeholder={strings.contact.messagePlaceholder}
      class="w-full px-4 py-3 rounded-xl border border-border bg-surface text-heading placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
    ></textarea>
  </div>

  <button type="submit" class="btn-primary w-full">
    {strings.contact.submit}
  </button>

  <div id="form-success" class="hidden p-4 rounded-xl bg-green-50 text-green-800 text-sm">
    {strings.contact.success}
  </div>
  <div id="form-error" class="hidden p-4 rounded-xl bg-red-50 text-red-800 text-sm">
    {strings.contact.error}
  </div>
</form>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.textContent;

    successEl?.classList.add('hidden');
    errorEl?.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        successEl?.classList.remove('hidden');
        form.reset();
      } else {
        errorEl?.classList.remove('hidden');
      }
    } catch {
      errorEl?.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
</script>
```

**Step 2: Create CalEmbed component**

Create `src/components/CalEmbed.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div>
  <h3 class="text-xl font-bold text-heading mb-2">{title}</h3>
  <p class="text-body text-sm mb-6">{description}</p>
  <div class="rounded-xl border border-border overflow-hidden bg-surface-alt min-h-[400px]">
    <div id="cal-embed" class="w-full"></div>
  </div>
</div>

<script is:inline>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () { let cal = C.Cal; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", { origin: "https://cal.eu" });
  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: "matejlukasik/30min",
    config: { layout: "month_view" },
  });
  Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
</script>
```

**Step 3: Create contact API route**

Create `src/pages/api/contact.ts`:

```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const honeypot = formData.get('website');
  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const company = formData.get('company')?.toString().trim() || '';
  const service = formData.get('service')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim();
  const lang = formData.get('lang')?.toString().trim() || 'en';

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email' }),
      { status: 400 }
    );
  }

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Matej Lukasik <noreply@matejlukasik.com>',
        to: ['matej@matejlukasik.com'],
        reply_to: email,
        subject: `New inquiry from ${name} — ${service}`,
        html: `<h2>New contact form submission</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Company:</strong> ${company || 'N/A'}</p>
               <p><strong>Service:</strong> ${service}</p>
               <p><strong>Language:</strong> ${lang}</p>
               <hr />
               <p>${message.replace(/\n/g, '<br />')}</p>`,
      }),
    });

    if (!res.ok) {
      console.error('Resend API error:', await res.text());
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500 }
      );
    }
  } else {
    console.log('Contact form submission (no RESEND_API_KEY):', {
      name, email, company, service, message, lang,
      timestamp: new Date().toISOString(),
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
```

**Step 4: Create English contact page**

Create `src/pages/contact.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ContactForm from '../components/ContactForm.astro';
import CalEmbed from '../components/CalEmbed.astro';
import { t } from '../i18n';

const lang = 'en';
const strings = t(lang);
const service = Astro.url.searchParams.get('service') || undefined;
---

<Layout
  title="Contact — Matej Lukasik"
  description="Get in touch. Send a message or book a free consultation call."
  lang={lang}
  currentPath="/contact"
>
  <Hero
    title={strings.contact.heroTitle}
    description={strings.contact.heroDescription}
  />

  <section class="section-padding bg-surface">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 class="text-xl font-bold text-heading mb-6">{strings.contact.formTitle}</h2>
          <ContactForm lang={lang} preselectedService={service} />
        </div>
        <div>
          <CalEmbed title={strings.contact.bookTitle} description={strings.contact.bookDescription} />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface-alt !pt-0">
    <div class="container mx-auto">
      <h3 class="text-lg font-bold text-heading mb-4">{strings.contact.directTitle}</h3>
      <div class="flex flex-col sm:flex-row gap-6">
        <a href={`mailto:${strings.contact.email}`} class="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {strings.contact.email}
        </a>
        <span class="inline-flex items-center gap-2 text-body">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {strings.contact.location}
        </span>
      </div>
    </div>
  </section>
</Layout>
```

**Step 5: Create Slovak contact page**

Create `src/pages/kontakt.astro` — identical structure to `contact.astro` but with:
- `const lang = 'sk';`
- `currentPath="/kontakt"`
- `title="Kontakt — Matej Lukasik"`
- `description="Spojte sa so mnou. Napisite spravu alebo si dohodnite bezplatnu konzultaciu."`

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ContactForm from '../components/ContactForm.astro';
import CalEmbed from '../components/CalEmbed.astro';
import { t } from '../i18n';

const lang = 'sk';
const strings = t(lang);
const service = Astro.url.searchParams.get('service') || undefined;
---

<Layout
  title="Kontakt — Matej Lukasik"
  description="Spojte sa so mnou. Napisite spravu alebo si dohodnite bezplatnu konzultaciu."
  lang={lang}
  currentPath="/kontakt"
>
  <Hero
    title={strings.contact.heroTitle}
    description={strings.contact.heroDescription}
  />

  <section class="section-padding bg-surface">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 class="text-xl font-bold text-heading mb-6">{strings.contact.formTitle}</h2>
          <ContactForm lang={lang} preselectedService={service} />
        </div>
        <div>
          <CalEmbed title={strings.contact.bookTitle} description={strings.contact.bookDescription} />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-surface-alt !pt-0">
    <div class="container mx-auto">
      <h3 class="text-lg font-bold text-heading mb-4">{strings.contact.directTitle}</h3>
      <div class="flex flex-col sm:flex-row gap-6">
        <a href={`mailto:${strings.contact.email}`} class="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {strings.contact.email}
        </a>
        <span class="inline-flex items-center gap-2 text-body">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {strings.contact.location}
        </span>
      </div>
    </div>
  </section>
</Layout>
```

**Step 6: Verify contact page and API**

Run: `npm run dev`
Open: `http://localhost:4321/contact`
Expected: Contact page with form on left, Cal.com embed on right, direct contact section below.

Test form submission (without RESEND_API_KEY, it logs to console):
1. Fill in name, email, message
2. Click Submit
3. Check dev server terminal — should see console.log with form data
4. Success message should appear in the form

**Step 7: Commit**

```bash
git add src/components/ContactForm.astro src/components/CalEmbed.astro src/pages/contact.astro src/pages/kontakt.astro src/pages/api/contact.ts
git commit -m "Add contact pages with form, Cal.com embed, and API route"
```

---

## Task 10: Add Analytics, SEO, Deployment, and Update CLAUDE.md

**Files:**
- Modify: `src/layouts/Layout.astro` (add Plausible + CTA tracking)
- Create: `.github/workflows/ci.yml` (build verification)
- Modify: `CLAUDE.md` (update for new Astro project)

**Step 1: Add Plausible analytics to Layout**

Add the following inside `<head>` in `src/layouts/Layout.astro`, before `<title>`:

```html
<!-- Plausible analytics — replace PLAUSIBLE_SCRIPT_ID with your actual script path -->
<script async src="https://plausible.io/js/script.js" data-domain="matejlukasik.com,matejlukasik.sk" is:inline></script>
<script is:inline>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};
</script>
```

Add CTA tracking script before `</body>` in Layout:

```html
<script is:inline>
  document.querySelectorAll('a[href*="kontakt"], a[href*="contact"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof plausible !== 'undefined') {
        const isBookCall = link.textContent?.toLowerCase().includes('call') || link.textContent?.toLowerCase().includes('hovor');
        plausible(isBookCall ? 'clicked_book_call' : 'clicked_service_cta');
      }
    });
  });
</script>
```

Note: After creating your Plausible account, replace the `data-domain` attribute and script src with the actual values from your Plausible dashboard.

**Step 2: Create CI workflow for build verification**

Create `.github/workflows/ci.yml`:

```yaml
name: Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
```

Deployment note: For Cloudflare Pages, connect the GitHub repository in the Cloudflare dashboard:
1. Go to Cloudflare Dashboard > Workers & Pages > Create > Pages
2. Connect GitHub repository
3. Build settings: Framework preset "Astro", Build command `npm run build`, Output directory `dist`
4. Add environment variable: `RESEND_API_KEY`
5. Add custom domains: `matejlukasik.com` and `matejlukasik.sk`

**Step 3: Update CLAUDE.md**

Replace `CLAUDE.md` content with:

```markdown
# CLAUDE.md

## Project Overview

Bilingual marketing website for Matej Lukasik's AI agent consulting practice. Built with Astro 6, deployed on Cloudflare Pages. Serves English on matejlukasik.com and Slovak on matejlukasik.sk.

## Common Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## Architecture

**Domain-based i18n:** Middleware (`src/middleware.ts`) detects hostname — `.sk` serves Slovak, everything else serves English. Language switcher links to the equivalent page on the other domain. No path prefixes.

**URL structure:**
| EN (matejlukasik.com) | SK (matejlukasik.sk) |
|---|---|
| `/` | `/` |
| `/services` | `/sluzby` |
| `/about` | `/o-mne` |
| `/contact` | `/kontakt` |

**Key files:**
- `src/i18n/` — Translation files (en.json, sk.json) and routing utilities
- `src/middleware.ts` — Domain detection, wrong-language URL redirects
- `src/layouts/Layout.astro` — HTML shell, meta tags, hreflang, analytics
- `src/pages/api/contact.ts` — Contact form handler (Resend API)
- `src/styles/global.css` — Tailwind theme, button styles, color palette

**Content:** All user-facing text is in `src/i18n/{en,sk}.json`. Components are translation-agnostic — they receive strings via props.

**Deployment:** Cloudflare Pages with Git integration. Auto-deploys on push to main. Environment variable: `RESEND_API_KEY`.

**Archived:** Previous Hugo site is in `archive/`.
```

**Step 4: Full build verification**

Run: `npm run build`
Expected: Build succeeds with all pages generated.

Run: `npm run dev`
Verify all pages render correctly:
- `http://localhost:4321/` — Homepage (English on localhost)
- `http://localhost:4321/services` — Services page
- `http://localhost:4321/about` — About page
- `http://localhost:4321/contact` — Contact page with form + Cal.com embed

**Step 5: Commit**

```bash
git add -A
git commit -m "Add Plausible analytics, CI workflow, and update CLAUDE.md"
```
