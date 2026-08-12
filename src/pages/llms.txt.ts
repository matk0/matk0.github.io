import type { APIRoute } from 'astro';
import { type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Systems & Software Engineering Consultant

> Helps companies replace time-consuming workflows and software that no longer fits with the right mix of bespoke software systems, automations, and AI agents.

Matej is an AI Systems & Software Engineering Consultant with 10 years of software engineering experience. He assesses workflows and existing systems, builds the right mix of bespoke software, automations, and AI agents, and helps teams adopt and own the solution. He works with companies in Europe and the United States. Engagements start with a free 30-minute consultation. Bilingual (English / Slovak).

## Services

- **Workflow & Software Assessment Sprint** — Maps how work actually happens, including handoffs, exceptions, workarounds, and the systems involved, then recommends the highest-value first implementation.
- **Bespoke Software, Automation & AI Agents** — Builds the right solution around one defined business problem and tests it on real work.
- **Adoption, Handoff & Improvement** — Helps the team adopt the solution, establish operating rules, measure results, and improve it from real usage.

## Process

1. Free 30-Minute Consultation — We discuss the business problem, the current workflow or software, and whether an Assessment Sprint is the right next step.
2. Workflow & Software Assessment Sprint — Matej maps how work actually happens, including handoffs, exceptions, and workarounds, and recommends the highest-value change with a clear success metric.
3. Implementation — Matej builds and tests the agreed software, automation, AI agent, or combination on real work.
4. Adoption & Handoff — Matej helps the team adopt the system, measure the result, and take ownership, with ongoing support available if useful.

## A simple first step

**Start with a Free 30-Minute Consultation** — Tell me where work is slow, manual, or constrained by your current software. We’ll clarify the problem, determine whether I can help, and agree on the right next step. No commitment.

## Research

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Daily agentic AI incidents mapped to threat categories and prevention principles.
- [Threat categories](https://atlas.matejlukasik.sk/threats): Practical risk categories for teams deploying AI agents.

## Projects

- [post.work](https://post.work/): Managed AI automations for recurring business work.
- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Applied security research documenting real AI-agent failures and prevention principles.

## Principles

- Right tool for the job (open-source vs. managed, self-hosted vs. cloud — recommended on fit, not commission).
- Improve or connect existing systems before recommending replacement.
- Capability over dependency — train the team alongside deployment.
- Start with a clearly scoped problem, measure the result, and expand only what works.

## Pages

- [Home (EN)](https://matejlukasik.com/): Services overview, process, about, FAQ.
- [Projects (EN)](https://matejlukasik.com/projects): Selected software systems, AI automations, and applied research.
- [Contact (EN)](https://matejlukasik.com/contact): Contact form and direct email.
- [Domov (SK)](https://matejlukasik.sk/): Slovak homepage.
- [Projekty (SK)](https://matejlukasik.sk/projekty): Vybrané softvérové systémy, AI automatizácie a aplikovaný výskum.
- [Kontakt (SK)](https://matejlukasik.sk/kontakt): Slovak contact page.

## Optional

- [Full content (markdown)](https://matejlukasik.com/llms-full.txt): All site copy concatenated as markdown.

## Contact

- Email: matej@matejlukasik.com
- Location: Slovakia (serves Europe and the United States)
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- GitHub: https://github.com/matk0
`;

const SK = `# Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo

> Pomáha firmám nahrádzať časovo náročné procesy a nevyhovujúci softvér správnou kombináciou softvéru na mieru, automatizácií a AI agentov. Východiskom je konkrétny problém vo firme, nie nástroj AI.

Matej má 10 rokov praxe v softvérovom inžinierstve. Posudzuje procesy a existujúce systémy, vytvára správnu kombináciu softvéru na mieru, automatizácií a AI agentov a pomáha tímom riešenie zaviesť a prevziať. Pracuje s firmami v Európe a USA. Spolupráca sa začína bezplatnou 30-minútovou konzultáciou. Komunikuje po slovensky a anglicky.

## Služby

- **Assessment Sprint pre procesy a softvér** — Mapuje prácu tak, ako skutočne prebieha, vrátane používaných systémov, odovzdávania práce, výnimiek a obchádzok, a odporučí prvú implementáciu s najväčším prínosom.
- **Softvér na mieru, automatizácie a AI agenti** — Postaví správne riešenie pre jeden konkrétny problém a otestuje ho na reálnej práci.
- **Zavedenie do praxe, odovzdanie a zlepšovanie** — Pomôže tímu osvojiť si riešenie, nastaviť pravidlá prevádzky, merať výsledky a zlepšovať ho podľa reálneho používania.

## Proces

1. Bezplatná 30-minútová konzultácia — Preberieme problém vo Vašom podnikaní, súčasný proces alebo softvér a posúdime, či je Assessment Sprint správnym ďalším krokom.
2. Assessment Sprint pre procesy a softvér — Matej zmapuje, ako práca skutočne prebieha, vrátane odovzdávania práce, výnimiek a obchádzok, a odporučí zmenu s najväčším prínosom spolu s jasnou metrikou úspechu.
3. Implementácia — Matej postaví a otestuje dohodnutý softvér, automatizáciu, AI agenta alebo ich kombináciu na reálnych úlohách.
4. Zavedenie a odovzdanie — Matej pomôže tímu zaviesť riešenie do každodennej práce, zmerať výsledok a prevziať ho do vlastných rúk; ak to dáva zmysel, podpora môže pokračovať.

## Jednoduchý prvý krok

**Začnime bezplatnou 30-minútovou konzultáciou** — Povedzte mi, kde sa vo Vašej firme práca spomaľuje, zostáva manuálna alebo ju obmedzuje súčasný softvér. Spoločne si ujasníme problém, posúdime, či Vám viem pomôcť, a dohodneme sa na správnom ďalšom kroku. Bez záväzkov.

## Výskum

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Denné incidenty agentickej AI mapované na kategórie hrozieb a preventívne princípy.
- [Kategórie hrozieb](https://atlas.matejlukasik.sk/threats): Praktické kategórie rizík pre tímy nasadzujúce AI agentov.

## Projekty

- [post.work](https://post.work/): Spravované AI automatizácie pre opakujúcu sa prácu vo firme.
- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Aplikovaný bezpečnostný výskum skutočných zlyhaní AI agentov a princípov prevencie.

## Princípy

- Správny nástroj pre danú úlohu — open-source alebo spravované riešenie, vlastná infraštruktúra alebo cloud; odporúčanie podľa vhodnosti, nie provízie.
- Zlepšiť alebo prepojiť existujúce systémy skôr, než sa odporučí ich výmena.
- Schopnosť namiesto závislosti — tím sa zapája počas realizácie a riešenie preberá.
- Začať jasne vymedzeným problémom, zmerať výsledok a rozširovať len to, čo funguje.

## Stránky

- [Domov (SK)](https://matejlukasik.sk/): Prehľad služieb, proces, profil a FAQ.
- [Projekty (SK)](https://matejlukasik.sk/projekty): Vybrané softvérové systémy, AI automatizácie a aplikovaný výskum.
- [Kontakt (SK)](https://matejlukasik.sk/kontakt): Kontaktný formulár a priamy email.
- [Home (EN)](https://matejlukasik.com/): Anglická domovská stránka.
- [Projects (EN)](https://matejlukasik.com/projects): Selected software systems, AI automations, and applied research.
- [Contact (EN)](https://matejlukasik.com/contact): Anglická kontaktná stránka.

## Voliteľné

- [Plný obsah (markdown)](https://matejlukasik.sk/llms-full.txt): Všetok obsah stránky spojený ako markdown.

## Kontakt

- Email: matej@matejlukasik.com
- Lokalita: Slovensko (služby pre Európu a USA)
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
