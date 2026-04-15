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
