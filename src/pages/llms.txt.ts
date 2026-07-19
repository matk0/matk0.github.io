import type { APIRoute } from 'astro';
import { type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Agent Consulting

> Solo AI agent consultant based in Slovakia. Helps teams identify, design, and deploy AI agent systems that produce measurable results — from first roadmap to production handoff. Stack-agnostic, open-source friendly, focused on building internal capability rather than long-term consultant dependency.

Matej comes from a Ruby/Rails engineering background and now focuses on agentic AI. He works with teams across the EU. Engagements range from a single discovery call to multi-week implementation and training programs. Bilingual (English / Slovak).

## Services

- **AI Consulting & Strategy** — Process and workflow audit, AI opportunity mapping, prioritization by ROI and feasibility, and an adoption plan with success metrics.
- **AI Solution Implementation** — Practical AI automations, agents, and integrations built around a clear business problem, with safe deployment, evaluations, and monitoring.
- **AI Workshops & Adoption** — Workshops built around the team's real tasks, output verification, model limits, and rules for safe use of data and tools.

## Process

1. Introductory Call — free 45-minute conversation to clarify the problem and whether AI is the right next step.
2. First-Step Plan — a concrete use case, success metric, safety rules, and realistic rollout path.
3. Execution — the approved workflow is built, tested on real tasks, introduced to the first users, and measured.
4. Handoff — once the solution works, the client team takes it over, with continued support available when useful.

## Common first engagement

**AI Opportunity Audit** — In a free 45-minute consultation, maps where AI makes sense in the company, which workflow to tackle first, which risks need addressing, and how success will be measured.

## Research

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Daily agentic AI incidents mapped to threat categories and prevention principles.
- [Threat categories](https://atlas.matejlukasik.sk/threats): Practical risk categories for teams deploying AI agents.

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
`;

const SK = `# Matej Lukášik — AI agent konzulting

> Samostatny AI agent konzultant zo Slovenska. Pomaha timom identifikovat, navrhnut a nasadit systemy AI agentov s meratelnyni vysledkami — od prveho planu po produkcne odovzdanie. Nezavisly od stacku, priatelsky k open-source, zameriava sa na budovanie internej schopnosti namiesto dlhodobej zavislosti od konzultanta.

Matej ma pozadie v Ruby/Rails inzinierstve a teraz sa venuje agentickej AI. Pracuje s timami v EU. Spoluprace siahaju od jedineho uvodneho hovoru po viactyzdnove implementacie a skolenia. Dvojjazycny (anglicky / slovensky).

## Sluzby

- **Konzultacie a AI strategia** — Audit procesov a workflowov, mapovanie AI prilezitosti, prioritizacia podla ROI a realizovatelnosti a plan adopcie s metrikami uspechu.
- **Implementacia AI rieseni** — Prakticke AI automatizacie, agenti a integracie postavene okolo jasneho biznis problemu, s bezpecnym nasadenim, evaluaciami a monitoringom.
- **AI workshopy a zavedenie do praxe** — Workshopy postavene na realnych ulohach timu, overovanie vystupov, limity modelov a pravidla bezpecneho pouzivania dat a nastrojov.

## Proces

1. Uvodny rozhovor — bezplatnych 45 minut na ujasnenie problemu a toho, ci je AI spravny dalsi krok.
2. Plan prveho kroku — konkretny use case, metrika uspechu, bezpecnostne pravidla a realisticky postup nasadenia.
3. Realizacia — schvaleny workflow sa postavi, otestuje na realnych ulohach, zavedie medzi prvych pouzivatelov a zmeria.
4. Odovzdanie do praxe — ked riesenie funguje, preberie ho klientsky tim; dalsia podpora ostava dostupna, ak dava zmysel.

## Najcastejsi prvy krok

**Audit AI prilezitosti** — Za bezplatnych 45 minut zmapuje, kde ma AI vo firme zmysel, ktory workflow riesit ako prvy, ake rizika treba osetrit a ako sa bude merat uspech.

## Vyskum

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Denne incidenty agentickej AI mapovane na kategorie hrozieb a preventivne principy.
- [Kategorie hrozieb](https://atlas.matejlukasik.sk/threats): Prakticke kategorie rizik pre timy nasadzujuce AI agentov.

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
