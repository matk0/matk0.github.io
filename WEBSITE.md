# clawforce.sk — Website Description

## Overview

Marketing website for **Clawforce** — an AI agent consulting/implementation business targeting SMBs in Slovakia. The value proposition: deploy AI agents for your team in days, not months. Services span consulting, implementation (per-employee AI agents via Slack orchestrated by a CEO agent on OpenClaw), and training.

Founded by Matej Lukasik (Founder & AI Engineer). Based in Slovakia.

## Tech Stack

- **Framework:** Astro 6 (SSR mode)
- **Styling:** Tailwind CSS 4 via Vite plugin
- **Font:** Inter (Google Fonts)
- **Hosting:** Cloudflare Workers (via `@astrojs/cloudflare` adapter)
- **Email:** Resend API (contact form delivery to matej@clawforce.sk)
- **Scheduling:** Cal.com embed (30min booking with matejlukasik)
- **Analytics:** Google Analytics 4 (custom events for CTA clicks and funnel signals)
- **Domain:** clawforce.sk (+ www redirect)

## Design

Proton.me-inspired. Dark purple hero gradients, clean white content sections, alternating `bg-surface` / `bg-surface-alt` backgrounds.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `primary` | `#6D4AFF` | Buttons, links, accents |
| `primary-dark` | `#1B1340` | Hero backgrounds, footer |
| `primary-light` | `#F3F0FF` | Icon backgrounds, alt surfaces |
| `primary-hover` | `#5B3DE6` | Button hover states |
| `accent` | `#936DFF` | Gradient endpoints, hero subtitle |
| `heading` | `#0C0C14` | Heading text |
| `body` | `#706D7A` | Body text |
| `surface` | `#FFFFFF` | Main backgrounds |
| `surface-alt` | `#F3F0FF` | Alternating section backgrounds |
| `border` | `#E5E2EB` | Card borders, dividers |

### Button Variants

- `btn-primary` — Purple fill, white text, hover lift + shadow
- `btn-secondary` — Purple outline, fills on hover
- `btn-white` — White fill, purple text (used on dark hero/CTA bands)
- `btn-outline-white` — White border on dark backgrounds

### Typography

- Font: Inter 400/500/600/700
- Headings: `#0C0C14`, bold, tight line-height (1.15)
- Body: `#706D7A`
- Smooth font rendering enabled

## i18n

Bilingual: Slovak (default) and English. Language detected from `Accept-Language` header on root `/` with redirect to `/{lang}/`.

### URL Structure

| Page | Slovak | English |
|---|---|---|
| Home | `/sk/` | `/en/` |
| Services | `/sk/sluzby` | `/en/services` |
| About | `/sk/o-nas` | `/en/about` |
| Contact | `/sk/kontakt` | `/en/contact` |

Translations stored in `src/i18n/sk.json` and `src/i18n/en.json`. Language switcher in nav toggles between SK/EN with path mapping.

## Site Structure

### Layout (`Layout.astro`)

All pages share: `<Nav>` (fixed top) → `<main>` (slot) → `<Footer>`. Full OG/Twitter meta tags, canonical URLs, GA4 analytics script. Custom event tracking on CTA link clicks and funnel signals.

### Navigation (`Nav.astro`)

- Fixed top bar with backdrop blur (`bg-surface/80 backdrop-blur-lg`)
- Logo: "clawforce" text (bold, left)
- Desktop: Services | About | Contact links + language toggle + "Book a Call" button
- Mobile: Hamburger menu toggling a dropdown panel
- Active page highlighting via `currentPath` prop
- 64px spacer div below nav to prevent content overlap

### Footer (`Footer.astro`)

- Dark background (`bg-primary-dark`)
- 3-column grid: brand + tagline | navigation links | contact info (email + location)
- Copyright with dynamic year

## Pages

### Homepage (`/sk/` | `/en/`)

1. **Hero** (large) — Title: "AI agents for your team." / Subtitle: "Deployed in days, not months." / Description / Two CTAs: "Book a Free Call" + "See Our Services"
2. **Pain Points** — 3-column grid of PainCards:
   - Too many tools, no strategy
   - Expensive experiments that go nowhere
   - Your team doesn't know where to start
3. **Services Overview** — 3-column grid of ServiceCards linking to services page:
   - Consulting & Advisory
   - Implementation
   - Training & Workshops
4. **Trust Strip** — Shield icon badge: "Built on open-source technology" + no vendor lock-in message
5. **CTA Band** — "Ready to bring AI to your team?" with call booking button

### Services (`/sk/sluzby` | `/en/services`)

1. **Hero** (small) — "How We Help"
2. **Consulting & Advisory** (`#konzultacie` / `#consulting`) — Assess workflows, identify automation opportunities, build roadmap. Includes: process audit, opportunity mapping, ROI estimation, adoption roadmap. CTA links to contact with `?service=consulting`.
3. **Implementation** (`#implementacia` / `#implementation`) — Per-employee AI agents via Slack, CEO orchestrator, shared prompt library, admin dashboard. CTA links to contact with `?service=implementation`.
4. **Training & Workshops** (`#skolenia` / `#training`) — Half-day workshops, multi-week programs, prompt engineering, ongoing support. CTA links to contact with `?service=training`.
5. **CTA Band** — "Not sure where to start?" with free call button

Each service section uses `ServiceSection.astro` — alternating layout (text left/right), icon placeholder block, checkmark includes list.

### About (`/sk/o-nas` | `/en/about`)

1. **Hero** (small) — "Who's Behind Clawforce"
2. **Bio Section** — 2+3 column grid: avatar photo + name/title | multi-paragraph bio text. Bio covers: problem (wasted AI pilots), solution (Clawforce builds agents that work), approach (understand business first).
3. **Approach** — 3 principle cards:
   - Open-source first (OpenClaw, no vendor lock-in)
   - Capability, not dependency (train alongside deployment)
   - Start small, prove value (fast deploy, measure, expand)
4. **Technology** — Paragraph about OpenClaw platform: per-employee Slack agents, CEO orchestrator, shared MCP server, single API key, on-prem data control.
5. **CTA Band** — "Let's talk about what AI can do for your team." Two buttons: Book a Call + Send a Message

### Contact (`/sk/kontakt` | `/en/contact`)

1. **Hero** (small) — "Get in Touch"
2. **Main Section** — 2-column grid:
   - **Left: Contact Form** — Name (required), Email (required), Company (optional), Service interest (dropdown, preselectable via `?service=` query param), Message (required), Submit button. AJAX submission with success/error feedback. Honeypot spam field.
   - **Right: Cal.com Embed** — Inline 30-min booking widget (month view, cal.eu origin)
3. **Direct Contact** — Email link (matej@clawforce.sk) + location (Slovakia)

## API

### `POST /api/contact`

Contact form handler. Validates required fields (name, email, message) and email format. Honeypot check (hidden `website` field — if filled, silently returns success). Sends email via Resend API to matej@clawforce.sk with reply-to set to submitter. Falls back to console logging if no `RESEND_API_KEY`.

## Components

| Component | Purpose |
|---|---|
| `Layout.astro` | HTML shell, meta tags, nav + footer, GA4, CTA tracking |
| `Nav.astro` | Fixed nav bar, language switcher, mobile hamburger menu |
| `Footer.astro` | 3-column footer with brand, nav links, contact |
| `Hero.astro` | Gradient hero section, large/small variants, optional subtitle + slot for CTAs |
| `CTABand.astro` | Full-width gradient banner with title, description, slotted buttons |
| `ServiceCard.astro` | Card with icon, title, description, arrow link (homepage grid) |
| `PainCard.astro` | Centered card with icon, title, description (pain points grid) |
| `ServiceSection.astro` | Full service detail: icon, title, subtitle, description, includes list, CTA, reversible layout |
| `ContactForm.astro` | AJAX contact form with validation, honeypot, preselectable service |
| `CalEmbed.astro` | Cal.com inline scheduling widget |

## Content Summary (English)

**Tagline:** "AI agents for your team. Deployed in days, not months."

**Core message:** You know AI could transform your business. We show you exactly how and make it happen. No vendor lock-in, open-source first, deployed on your infrastructure.

**Three services:**
1. **Consulting** — Process audit, automation opportunity mapping, ROI estimation, adoption roadmap
2. **Implementation** — Per-employee AI agents via Slack, CEO orchestrator, shared knowledge base, admin dashboard (built on OpenClaw)
3. **Training** — Workshops, multi-week programs, prompt engineering, ongoing support

**Differentiators:**
- Open-source (OpenClaw platform), no vendor lock-in
- Your data stays on your infrastructure
- Build capability, not dependency
- Start small, prove value fast
- Single person operation (Matej Lukasik) — direct, no fluff

**CTA flow:** Every page funnels to contact page → form submission (Resend email) or Cal.com 30-min call booking.
