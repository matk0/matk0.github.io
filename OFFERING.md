# Offering & Pricing

Internal document. Not for client distribution without redaction.

---

## Positioning

AI agents for SMB teams, built on open-source foundations, delivered with a proprietary orchestrator that gives leadership full visibility: costs, evals, usage, skill library.

**What makes this defensible:**
- Open-source underneath (no vendor lock-in; clients can self-host)
- Orchestrator on top (dashboards, evals, cost tracking, skill sharing) — *delivery leverage, not a product sold standalone*
- Ongoing care layer (retainer) keeps agents current as models, prompts, and workflows evolve

**Who we sell to:** SMBs, 20–200 employees, tech-curious but lacking in-house AI expertise. Sectors with repetitive knowledge work: finance, legal, ops, HR, customer support, B2B services.

**What we do not sell:** the orchestrator as standalone SaaS; AI "strategy" decks without implementation; one-off workshops without a path to implementation.

---

## The three-phase journey

Every client goes through all three phases. No skipping, no shortcuts.

### Phase 1 — Discovery & Audit
**Fixed fee · 2 weeks · every client, no exceptions**

- Workflow inventory (30–50 processes mapped, shadowing + interviews)
- Opportunity map with ROI estimates per candidate
- 12-month adoption roadmap, prioritized by impact × feasibility
- Risk & compliance assessment (data handling, access, sector-specific)
- Recommended Phase 2 scope with initial workflow list

**Deliverable:** written report + 90-min walkthrough. Client can take the report and walk away. That's fine — it's paid work, and it builds reference credibility.

**Conversion target:** 60–70% of audits convert to Phase 2.

### Phase 2 — Implementation
**Base fee + per-workflow fees · 6–10 weeks**

Base covers:
- Orchestrator deployed (self-hosted or managed instance)
- SSO, user provisioning, knowledge base ingestion
- Slack/Teams/Discord integration
- Eval framework baseline (task-level pass/fail tracking)
- Cost monitoring dashboard (per-workflow, per-user)
- Admin views for CEO/CTO
- 2 starter workflows included (scoped during audit)

Each additional workflow is billed separately, one-time, at delivery (see matrix below).

**Deliverable:** running orchestrator, N workflows live, team trained, handoff docs.

### Phase 3 — Retainer
**Monthly · 12-month minimum commitment**

Three tiers (detail below). Every Phase 2 client is quoted a retainer as part of the implementation contract — not offered as an afterthought.

**Target retainer attach rate:** 85%+ of Phase 2 clients.

---

## Pricing — CEE standard rates

(Slovakia, Czechia, Poland, Hungary. Apply ~1.8–2× for DACH clients.)

### Phase 1 — Audit

| Company size | Price |
|---|---|
| <50 employees | €3,500 |
| 50–150 employees | €5,500 |
| 150+ employees | €8,000 |

### Phase 2 — Implementation

**Base implementation:** €8,000–12,000 (depending on infra complexity, integrations, on-prem vs. cloud)

**Per-workflow pricing (one-time, billed at delivery):**

| Complexity | Examples | Price |
|---|---|---|
| Simple | Email triage, meeting notes, document summarization, internal Q&A | €1,200 |
| Standard | Invoice processing, CRM enrichment, RFP drafting, report generation | €2,500 |
| Complex | Multi-system integration, human-in-loop approvals, custom tool development | €5,000 |

**Typical Phase 2 total:** base + 4–6 workflows = **€18,000–30,000**

### Phase 3 — Retainer

| Tier | Price/mo | Scope |
|---|---|---|
| **Care** | €900 | Orchestrator updates, cost monitoring, 2h/mo prompt tuning, quarterly review |
| **Evolve** | €1,800 | Care + 1 new simple workflow per quarter included + 6h/mo changes + monthly review |
| **Embed** | €3,200 | Evolve + weekly sync, unlimited small changes, 1 new workflow per month |

**Target mix:** 50% Care / 35% Evolve / 15% Embed → avg €1,500/mo/client.

### DACH rates (Austria/Germany/Switzerland)

Multiply CEE prices by 1.8 for Austria/Germany, 2.3 for Switzerland. Example:
- Audit (mid-size): €10,000 (AT/DE) / €12,500 (CH)
- Implementation base: €18,000 (AT/DE) / €23,000 (CH)
- Evolve retainer: €3,200/mo (AT/DE) / €4,000/mo (CH)

---

## What's always included (all phases)

- Written proposal and statement of work before any invoice
- Fixed-price engagements (no surprise T&M)
- Named point of contact (you), response within 1 business day
- All code, configs, and prompts delivered to client — no hostage data
- Client owns their deployment, their data, their configs

## What's never included unless scoped & paid

- Net-new workflows outside retainer allowance
- Training new client hires (workshops priced separately)
- Third-party SaaS subscriptions (client pays directly)
- LLM API usage (client pays provider directly; you monitor and optimize)
- 24/7 on-call (not offered; emergency response SLAs available at Embed tier only)

---

## Non-negotiables

### 1. Scope-before-build rule
No implementation starts without understanding the client's workflows in enough depth to scope it correctly. The *form* of that understanding scales with deal size:

| Deal size | Discovery requirement |
|---|---|
| <€5k (founding-client tier) | Discovery call(s) — informal scoping folded into sales conversation |
| €5–15k | Free half-day onsite (or equivalent): workflow walkthrough, stakeholder interviews |
| €15k+ | Paid audit (Phase 1) required — no exceptions |

A prospect who refuses the level of discovery appropriate to their deal size is a disqualification signal. The audit isn't ceremony — it's how you avoid under-scoping, integration surprises, and 3 months of scope-creep fights.

### 2. Retainer-attached rule
Every Phase 2 proposal includes a retainer line item (Care minimum). Client can decline, but they see it on every proposal.

### 3. IP extraction rule
Every engagement produces, in addition to client deliverables:
- **Anonymized case study** — published within 60 days of Phase 2 completion
- **≥1 reusable workflow template** — added to internal library, reusable on future engagements
- **Signed IP clause** — client owns their deployment, data, and configs; consultant retains rights to methodology, orchestrator code, prompt patterns, eval suites, and learnings

Engagements that cannot produce all three do not run. No exceptions.

### 4. Stack-agnostic rule
Recommend what fits the client. Orchestrator supports multiple agent frameworks (OpenClaw, Claude Agent SDK, LangGraph, etc.). Never lock a client to a framework that's failing them.

---

## Founding-client track (first 3 clients)

Discounted pricing to build case studies and pressure-test delivery.

| Client | Audit | Impl base | Per workflow | Retainer |
|---|---|---|---|---|
| #1 (signed) | included | €2,500 | €300 | free support 1 year (scoped) |
| #2 | €2,000 | €5,000 | €600 | €400/mo (Care, from month 4) |
| #3 | €3,000 | €7,500 | €900 | €700/mo (Care, from month 4) |
| #4 onward | CEE standard | CEE standard | CEE standard | CEE standard |

**Non-negotiables apply from day one,** even at founding pricing. Free is not free of scope.

### Doubling triggers (internal)

Prices rise to the next tier only when both conditions are met:

1. Published case study from the previous client (anonymized is OK)
2. Previous client agrees to take at least one reference call

Until both are in hand, the next prospect gets the previous tier's price — not the next one.

---

## Revenue projection (solo, realistic)

| | Y1 | Y2 | Y3 |
|---|---|---|---|
| Audits sold | 10 | 18 | 24 |
| Phase 2 conversions | 6 | 12 | 17 |
| Active retainers (90% attach, 15% churn) | 5 | 15 | 28 |
| Audit revenue | €35k | €80k | €115k |
| Implementation revenue (avg €22k CEE) | €130k | €265k | €375k |
| Retainer revenue (avg €1.5k × 12mo) | €55k | €200k | €380k |
| **Total** | **€220k** | **€545k** | **€870k** |

Solo ceiling without hiring: roughly **€400–500k/year recurring** once retainer book matures. To cross €1M reliably, add one delivery engineer (Y2–Y3) or productize the orchestrator.

---

## Sales process

1. **Inbound** → 30-min discovery call (free, 45 min cap)
2. **Qualified** → audit proposal sent within 48h
3. **Signed** → audit runs (2 weeks)
4. **Audit delivered** → Phase 2 proposal with scoped workflows + retainer tier recommendation
5. **Signed** → Phase 2 kickoff within 2 weeks
6. **Phase 2 delivered** → retainer starts month after handoff
7. **Month 3 of retainer** → expansion conversation (new workflows, tier upgrade)

**Disqualification signals:**
- Refuses the level of discovery appropriate to deal size (see scope-before-build rule)
- Wants a €15k+ implementation without a paid audit
- Refuses to let you shadow workflows or interview team members
- "We just want to try it cheap first" (no commitment signals)
- Has already hired three consultants and fired them
- Budget holder not on intro call after the second meeting
- Pushing hard on price before scope is defined

---

## Open questions to resolve

- Exact orchestrator MVP scope (what ships with Phase 2 vs. what's Phase 3)
- Indemnity & liability caps in contracts (need lawyer review)
- Data residency defaults (EU-only hosting policy?)
- Subcontractor backup arrangement (for "hit by a bus" concern above €15k deals)
- When to raise Slovak prices to meet actual demand (review every 3 clients)
