import type { APIRoute } from 'astro';
import { type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Agent Consulting

> Solo AI agent consultant based in Slovakia. Helps teams identify, design, and deploy AI agent systems that produce measurable results — from first roadmap to production handoff. Stack-agnostic, open-source friendly, focused on building internal capability rather than long-term consultant dependency.

Matej comes from a Ruby/Rails engineering background and now focuses on agentic AI. He works with teams across the EU. Engagements range from a single discovery call to multi-week implementation and training programs. Bilingual (English / Slovak).

## Services

- **Consulting & Advisory** — Workflow and process audit, automation opportunity mapping, ROI estimation, adoption roadmap with milestones.
- **Implementation** — Custom AI agents tailored to client processes. Typical setup: one agent per employee accessible via Slack, a CEO orchestrator agent coordinating across teams, a shared prompt library and company knowledge base, admin dashboard with usage analytics. Self-hosted or managed.
- **Training & Workshops** — Half-day intensive workshops, multi-week training programs, prompt engineering for business teams, ongoing support and office hours.

## Process

1. Discovery Call — free 30-minute exploratory conversation.
2. Roadmap — tailored plan with clear milestones, no guesswork.
3. Execution — agents built, team trained, weekly progress visible (no big-reveal).
4. Handoff — documentation, training, client team runs it independently.

## Principles

- Right tool for the job (open-source vs. managed, self-hosted vs. cloud — recommended on fit, not commission).
- Capability over dependency — train the team alongside deployment.
- Start small, prove value — no 6-month projects; deploy fast, measure, expand what works.

## Pages

- [Home (EN)](https://matejlukasik.com/): Services overview, process, principles, FAQ.
- [Contact (EN)](https://matejlukasik.com/contact): Contact form and direct email.
- [Domov (SK)](https://matejlukasik.sk/): Slovak homepage.
- [Kontakt (SK)](https://matejlukasik.sk/kontakt): Slovak contact page.

## Optional

- [Full content (markdown)](https://matejlukasik.com/llms-full.txt): All site copy concatenated as markdown.

## Contact

- Email: matej@matejlukasik.com
- Location: Slovakia (serves EU)
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- GitHub: https://github.com/matk0
- YouTube: https://youtube.com/@matejlukasik
- X: https://x.com/matejlukasik
`;

const SK = `# Matej Lukášik — AI agent konzulting

> Samostatny AI agent konzultant zo Slovenska. Pomaha timom identifikovat, navrhnut a nasadit systemy AI agentov s meratelnyni vysledkami — od prveho planu po produkcne odovzdanie. Nezavisly od stacku, priatelsky k open-source, zameriava sa na budovanie internej schopnosti namiesto dlhodobej zavislosti od konzultanta.

Matej ma pozadie v Ruby/Rails inzinierstve a teraz sa venuje agentickej AI. Pracuje s timami v EU. Spoluprace siahaju od jedineho uvodneho hovoru po viactyzdnove implementacie a skolenia. Dvojjazycny (anglicky / slovensky).

## Sluzby

- **Konzultacie a poradenstvo** — Audit procesov a workflows, mapovanie prilezitosti na automatizaciu, odhad ROI, plan nasadenia s milnikmi.
- **Implementacia** — AI agenti na mieru klientskym procesom. Typicke nastavenie: jeden agent na zamestnanca pristupny cez Slack, CEO orchestrator agent koordinujuci napriec timami, zdielana kniznica promptov a firemna znalostna baza, admin dashboard s analytikou. Self-hosted alebo spravovane.
- **Skolenia a workshopy** — Poldenove intenzivne workshopy, viactyzdnove trenovacie programy, prompt engineering pre business timy, priebezna podpora a konzultacie.

## Proces

1. Uvodni hovor — bezplatna 30-minutova konzultacia.
2. Plan — nasadeny na mieru s jasnymi milnikmi, ziadne hadanie.
3. Realizacia — agenti nasadeni, tim vyskoleny, pokrok kazdy tyzden (ziadne velke odhalenie na konci).
4. Odovzdanie — dokumentacia, skolenie, klientsky tim to riadi samostatne.

## Principy

- Spravny nastroj na ulohu (open-source vs. spravovane, self-hosted vs. cloud — odporucanie podla vhodnosti, nie podla provizie).
- Schopnost namiesto zavislosti — tim sa skoli sucasne s nasadenim.
- Zacat malo, dokazat hodnotu — ziadne 6-mesacne projekty; nasadit rychlo, merit, rozsirit to, co funguje.

## Stranky

- [Domov (SK)](https://matejlukasik.sk/): Prehlad sluzieb, proces, principy, FAQ.
- [Kontakt (SK)](https://matejlukasik.sk/kontakt): Kontaktny formular a priamy email.
- [Home (EN)](https://matejlukasik.com/): Anglicka domovska stranka.
- [Contact (EN)](https://matejlukasik.com/contact): Anglicka kontaktna stranka.

## Volitelne

- [Plny obsah (markdown)](https://matejlukasik.sk/llms-full.txt): Vsetok obsah stranky spojeny ako markdown.

## Kontakt

- Email: matej@matejlukasik.com
- Lokacia: Slovensko (poskytuje sluzby v EU)
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- GitHub: https://github.com/matk0
- YouTube: https://youtube.com/@matejlukasik
- X: https://x.com/matejlukasik
`;

export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  return new Response(lang === 'sk' ? SK : EN, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
