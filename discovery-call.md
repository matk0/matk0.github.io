# Discovery Call Guide

Questions to identify the right client, the right stack, and the right engagement.

## 1. Understanding the Business

- What does your company do? How many people?
- What's your role? Who makes the final decision on this?
- What triggered this call — what happened that made you look into AI now?
- What's the one thing that, if AI could handle it, would change your week?

## 2. Current State

- What tools does your team use daily? (Slack, email, CRM, spreadsheets?)
- Have you tried any AI tools already? What worked, what didn't?
- Do you have any developers or technical staff in-house?
- Where does your company data live? (Google Workspace, Microsoft 365, on-prem servers?)

## 3. What Matters Most (Stack Signals)

These questions reveal whether the client needs open-source/self-hosted or managed/proprietary.

### Data & Compliance
- Do you handle sensitive customer data? (financial, health, legal)
- Are there regulations you need to comply with? (GDPR is baseline — dig deeper: industry-specific?)
- Does data need to stay in a specific country or on your own servers?

**If yes to any → leans open-source/self-hosted.** The client needs full data control. Managed solutions may not offer the residency or isolation guarantees they need.

### Technical Capability
- Do you have someone who can maintain a server? Or would you rather not think about infrastructure?
- How do you feel about managing updates and maintenance?

**No technical staff + don't want to think about infra → leans managed/proprietary.** They need something turnkey. Open-source requires ongoing ops.

**Has technical staff + wants control → leans open-source.** They can own and evolve the system.

### Budget & Scale
- What's your rough budget for this? (One-time? Monthly?)
- How many people would use the AI agents?
- Do you expect this to grow significantly in the next year?

**Tight budget, growing team → leans open-source.** No per-seat fees, scales without license cost pressure.

**Budget available, small team, wants fast results → leans managed.** Pay for convenience, get to value faster.

### Risk Tolerance
- How important is it that you could switch away from whatever we build if you needed to?
- Are you comfortable depending on a third-party service, or do you prefer owning everything?

**Wants independence → open-source.** Portable, no vendor lock-in.

**Comfortable with SaaS → managed.** They're already running their business on third-party tools.

## 4. Decision Framework

After the call, map the answers:

| Signal | Open-Source / Self-Hosted | Managed / Proprietary |
|---|---|---|
| Sensitive data / strict compliance | ✅ | ⚠️ Check residency options |
| No technical staff | ⚠️ Higher support burden | ✅ |
| Has technical staff | ✅ | ✅ |
| Tight budget, growing team | ✅ | ❌ Per-seat costs scale |
| Wants fast time-to-value | ⚠️ More setup time | ✅ |
| Wants full control / portability | ✅ | ❌ |
| Just wants it to work | ❌ | ✅ |

Most SMBs will land in a **hybrid**: managed AI provider (Anthropic, OpenAI) for the LLM layer, with custom integration and orchestration that you control. Pure self-hosted everything is rare for SMBs. Pure vendor-managed everything limits what you can build.

## 5. Closing the Call

- Based on what you've told me, here's what I'd recommend... (brief, 2 sentences)
- I'll send you a one-page roadmap within 48 hours — no cost, no commitment
- If it looks right, we start. If not, no hard feelings.
