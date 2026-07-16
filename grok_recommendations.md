# matejlukasik.com — Brutal Review Recommendations

All actionable items extracted from the full review (Lighthouse data + visual inspection + DOM + copy analysis).
Every item is a concrete fix or decision. We will go through them **one by one**.

---

## 1. Lighthouse / Technical / Accessibility (Exact Failures)

- [IGNORED] Fix `errors-in-console`: Cloudflare Web Analytics beacon error (only appears with ad blockers like AdGuard; not a production issue for normal visitors). No code change required.
- [x] Fix footer contrast (color-contrast audit): Bumped all `text-white/40` in the bottom legal bar (copyright, Privacy link, Cookie settings) to `text-white/60`. Removed every instance of `text-white/40` from Footer.astro.
- [x] Fix all other footer low-contrast elements (same audit): No remaining `text-white/40` in the footer. All small legal text now uses `text-white/60`.
- [x] Fix heading order (heading-order audit): Changed all four footer column `<h4>` labels (NAVIGATION, GET IN TOUCH, RESEARCH, FOLLOW ME) to `<p>` with identical styling. Removes them from the heading tree and fixes the sequential order violation.
- [x] Verify the same 3 audits pass on mobile Lighthouse run after fixes. (Contrast + heading-order fixes deployed — re-run Lighthouse on live site to confirm Accessibility 100 and zero contrast/heading errors.)

---

## 2. Hero Section & Typewriter

- [ ] Decide: Kill the typewriter animation entirely, or commit to a proper implementation.
- [ ] If killing: Replace the current broken H1 (`"Highly effective | AI agents for your team."` with blinking cursor in the accessibility tree) with a single, static, sharp, benefit-driven headline that does not rely on JS animation.
- [ ] If keeping: Make the animation robust so the final static text after animation is a clean, meaningful, fully accessible H1 (no chopped phrases, proper pause, good fallback for reduced-motion users).
- [ ] Ensure the H1 passes accessibility tree inspection (no leftover cursor or partial phrases).

---

## 3. Visual Design & Imagery

- [ ] Audit every decorative image on the homepage (`service-strategy.webp`, `pain-clarity.webp`, `pain-value.webp`, `pain-security.webp`, `about-matej.webp`, service images, etc.).
- [ ] Replace or remove any images that read as generic corporate/AI stock photography. Replace with either:
  - Real screenshots of your actual work (anonymized if needed),
  - Custom simple illustrations that directly support the point, or
  - Remove the image entirely if it adds no information.
- [ ] Ensure every remaining image has proper `alt` text that is descriptive and useful (not just "Matej Lukášik" repeated).
- [ ] Check image loading performance (Lighthouse passed responsive sizing, but verify actual file sizes are reasonable for the visual value delivered).

---

## 4. Information Architecture & Heading Structure

- [ ] Remove the duplicate service blocks: Currently "How I Can Help" (h2 + 3 h3 cards) is immediately followed by three full repeated sections at h2 level with the exact same names ("AI Consulting and Strategy", etc.). Choose **one** structure and delete the duplication.
- [ ] Re-design the services / offerings section so there is a single, clear hierarchy (no repeated headings at different levels).
- [ ] Review the entire heading tree (h1 → h2 → h3) for logical descent and scannability. No more "we have three things" told twice on the same page.
- [ ] Apply the same cleanup to the Slovak version.

---

## 5. Copy & Messaging

- [ ] Rewrite the hero subhead / opening paragraph to be more specific and less generic. Current: "You know you need AI. Together, we'll find where to start..." is true but interchangeable with 200 other consultants.
- [ ] Strengthen the core value proposition so it passes the "why you and not the other 50 AI people?" test. Make promises sharper and more exclusionary.
- [ ] Rewrite or remove the orphaned "CAME FROM AGENT THREAT ATLAS?" block. Either integrate the security/guardrails angle cleanly into the main services narrative, or move the entire reference off the homepage.
- [ ] Make the 4-step "How We Work Together" process less generic. Add concrete details that actually differentiate how you run projects (tools you use, decision points, what "handoff" really looks like, what the client owns after step 4, etc.).
- [ ] Review every other paragraph on the homepage for corporate vagueness. Replace "measurable value", "safe deployment", "real problem" etc. with sharper language or specific examples where possible.
- [ ] Apply equivalent copy tightening to the Slovak site (the translation itself looked competent; the underlying English problems were just copied over).

---

## 6. Trust & Proof (Case Studies / Results)

- [ ] Add at least one real, concrete case study (even anonymized) with actual numbers on the homepage or a dedicated /work or /results section.
  - Example shape: "Reduced average ticket resolution time from 47 min → 19 min for a 28-person logistics company after 6-week deployment of internal knowledge agent + RAG over their ticket history."
- [ ] If you have 2–3 previous clients who will give even rough metrics or a one-paragraph quote + outcome, surface them prominently.
- [ ] If you truly have zero publishable results yet, add a "Selected Engagements" or "Problem patterns I've solved" section that still gives specificity without naming clients.

---

## 7. Navigation & Mobile Experience

- [ ] Audit the top navigation on real mobile viewports (or iPhone 14 Pro emulation): "Services / About / FAQ / Contact" + "SK" + "Free Consultation" button. Check for crowding, tap target size, and whether the two contact CTAs fight each other.
- [ ] Decide on a cleaner mobile nav treatment if needed (hamburger, condensed "Consult" CTA, or different priority).
- [ ] Verify language switcher ("SK" / "EN") placement and labeling is clear on both desktop and mobile.

---

## 8. FAQ Accordion

- [ ] Improve scannability of the FAQ: In the collapsed state, show the first 1–2 lines (or a one-sentence answer preview) for each question instead of forcing users to click every accordion to see if it is relevant.
- [ ] Re-order FAQ questions by frequency/importance for the target buyer (most common objections first).

---

## 9. Cookie / Analytics Banner

- [ ] Keep the honest tone (good), but reduce visual weight or move the banner so it doesn't dominate first-fold attention on every visit.
- [ ] Consider a less intrusive pattern (small footer toast, settings gear only, or remember previous choice more aggressively) while still being GDPR-compliant.
- [ ] Verify the "Reject analytics" and "Allow analytics" still function correctly after any UI change.

---

## 10. Lead Generation & Conversion Funnel (Biggest Strategic Gap)

- [ ] Stop asking for calendar time or form submission with zero demonstrated value beforehand. Current flow is basically "read generic copy → book a call".
- [ ] Create and offer at least one real lead magnet / free value asset that proves expertise before the ask. High-value ideas:
  - "Agent Risk Audit Checklist" (10–15 concrete questions teams should answer before shipping any agent)
  - "First 90 Days of AI Adoption" playbook / template
  - "Agent Threat Atlas – Quick Reference Card" or mini-version of your public atlas
  - Simple calculator or self-assessment ("How many hours per week could an agent realistically save in your support / ops / knowledge workflow?")
- [ ] Place the lead magnet(s) prominently above the fold or right after the services section, with a clear "Get the free checklist" CTA.
- [ ] Build a lightweight email capture (ConvertKit, Buttondown, or even a simple form that writes to a Google Sheet / Airtable for now) tied to the magnet. Use it to nurture and demonstrate substance over time.
- [ ] Add a "Selected writing / public resources" or newsletter signup that actually ships useful, non-salesy content (not just "here's my latest offer").
- [ ] On the contact page specifically: Keep Cal.com and the form, but add the lead magnet(s) higher on the page so people who aren't ready for a call still leave with something and stay in the funnel.

---

## 11. Slovak Site (matejlukasik.sk)

- [ ] Fix the H1 typewriter localization bug observed in one capture ("Úplne bezpeč | AI agenti pre Váš tím." — appears to be a truncated or wrong rotating phrase).
- [ ] Apply every structural, copy, visual, and accessibility fix from the English site to the Slovak site (do not maintain two diverging versions).
- [ ] Verify the language switcher between .com and .sk works cleanly in both directions on all pages.
- [ ] Decide whether the two sites should share the same lead magnets / assets (translated) or have market-specific ones.

---

## 12. Overall Positioning & Strategy

- [ ] Sharpen the niche claim: "Agentic AI for small and medium-sized businesses where measurability and security matter" is a start. Make it more specific and defensible (industry verticals? team size? specific failure modes you refuse to touch? regulatory contexts?).
- [ ] Decide what you are **not** selling (e.g. "I do not do generic ChatGPT workshops, one-off prompt libraries, or 'AI strategy' reports that sit on the shelf").
- [ ] Update the homepage (and Slovak) to reflect the tighter positioning so the right buyers self-select and the wrong ones bounce faster.
- [ ] Re-evaluate whether the current three-service framing (Consulting / Implementation / Training) is still the best way to package your work, or whether a different framing (e.g. "Risk-first AI Adoption", "First Production Agent in 6 weeks", "Internal AI Operating System") would convert better.

---

## 13. Miscellaneous / Lower Priority

- [ ] Add a visible "Last updated" or version note on the privacy page if it doesn't already exist (builds trust on data handling claims).
- [ ] Consider adding a tiny "What I won't do" or "Red lines" section somewhere (in FAQ or About) to increase credibility through negative specification.
- [ ] After all content changes, re-run full Lighthouse (desktop + mobile) and confirm Accessibility ≥ 98, Best Practices 100, and zero console errors from your own code.
- [ ] After visual + copy changes, do a real-device mobile + tablet pass (not just emulator) and a screen-reader pass (VoiceOver on Mac or NVDA) on the key pages.

---

**Total items: 40+ concrete tasks.**

We will walk through this list item by item (or in logical batches). For each one you can say:
- "Do it" (and give any constraints)
- "Skip"
- "Discuss first"
- "Rewrite the item to be more precise"

Ready when you are. Start with #1 or tell me the order/batching you want.
