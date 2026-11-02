import type { APIRoute } from 'astro';
import { CONTACT_EMAIL, CONTACT_HREF, type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Systems & Software Engineering Consultant

> Helps companies replace time-consuming workflows and software that no longer fits with the right mix of bespoke software systems, automations, and AI agents.

Matej is an AI Systems & Software Engineering Consultant with 10 years of software engineering experience. He assesses workflows and existing systems, builds the right mix of bespoke software, automations, and AI agents, and helps teams adopt and own the solution. He works with companies in Europe and the United States. Bilingual (English / Slovak).

## Research

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Daily agentic AI incidents mapped to threat categories and prevention principles.
- [Threat categories](https://atlas.matejlukasik.sk/threats): Practical risk categories for teams deploying AI agents.

## Projects

- [Vozokany](https://matejlukasik.com/projects#vozokany): Farm software for weekly offers, customer orders, packing and harvest planning.
- [post.work](https://post.work/): A workspace integrating managed Hermes agents with business tools, persistent context and human review.
- [Viki](https://github.com/matk0/viki): A human-governed specification and knowledge workspace with Gherkin scenarios, revision history and scoped AI assistance.

## Principles

- Right tool for the job (open-source vs. managed, self-hosted vs. cloud — recommended on fit, not commission).
- Improve or connect existing systems before recommending replacement.
- Capability over dependency — train the team alongside deployment.
- Start with a clearly scoped problem, measure the result, and expand only what works.

## Pages

- [Home (EN)](https://matejlukasik.com/): Software engineering focus and about.
- [CV (EN)](https://matejlukasik.com/cv): Professional profile and work experience.
- [Projects (EN)](https://matejlukasik.com/projects): Vozokany, post.work and Viki, with product screenshots and engineering context.
- [Domov (SK)](https://matejlukasik.sk/): Slovak homepage.
- [CV (SK)](https://matejlukasik.sk/cv): Slovak professional profile and work experience.
- [Projekty (SK)](https://matejlukasik.sk/projekty): Vozokany, post.work a Viki so snímkami produktov a opisom práce.

## Optional

- [Full content (markdown)](https://matejlukasik.com/llms-full.txt): All site copy concatenated as markdown.

## Contact

- [Email Matej](${CONTACT_HREF}): ${CONTACT_EMAIL}
- Location: Slovakia (serves Europe and the United States)
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- GitHub: https://github.com/matk0
`;

const SK = `# Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo

> Pomáha firmám nahrádzať časovo náročné procesy a nevyhovujúci softvér správnou kombináciou softvéru na mieru, automatizácií a AI agentov. Východiskom je konkrétny problém vo firme, nie nástroj AI.

Matej má 10 rokov praxe v softvérovom inžinierstve. Posudzuje procesy a existujúce systémy, vytvára správnu kombináciu softvéru na mieru, automatizácií a AI agentov a pomáha tímom riešenie zaviesť a prevziať. Pracuje s firmami v Európe a USA. Komunikuje po slovensky a anglicky.

## Výskum

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Denné incidenty agentickej AI mapované na kategórie hrozieb a preventívne princípy.
- [Kategórie hrozieb](https://atlas.matejlukasik.sk/threats): Praktické kategórie rizík pre tímy nasadzujúce AI agentov.

## Projekty

- [Vozokany](https://matejlukasik.sk/projekty#vozokany): Softvér pre týždenné ponuky, zákaznícke objednávky, balenie a plánovanie zberu na farme.
- [post.work](https://post.work/): Pracovný priestor, ktorý prepája spravovaných agentov Hermes s firemnými nástrojmi, trvalým kontextom a ľudskou kontrolou.
- [Viki](https://github.com/matk0/viki): Pracovný priestor pre špecifikácie a znalosti s ľudským schvaľovaním, Gherkin scenármi, históriou verzií a AI asistenciou s vymedzenými oprávneniami.

## Princípy

- Správny nástroj pre danú úlohu — open-source alebo spravované riešenie, vlastná infraštruktúra alebo cloud; odporúčanie podľa vhodnosti, nie provízie.
- Zlepšiť alebo prepojiť existujúce systémy skôr, než sa odporučí ich výmena.
- Schopnosť namiesto závislosti — tím sa zapája počas realizácie a riešenie preberá.
- Začať jasne vymedzeným problémom, zmerať výsledok a rozširovať len to, čo funguje.

## Stránky

- [Domov (SK)](https://matejlukasik.sk/): Zameranie na softvérové inžinierstvo a profil.
- [CV (SK)](https://matejlukasik.sk/cv): Profesijný profil a pracovné skúsenosti.
- [Projekty (SK)](https://matejlukasik.sk/projekty): Vozokany, post.work a Viki so snímkami produktov a opisom práce.
- [Home (EN)](https://matejlukasik.com/): Anglická domovská stránka.
- [CV (EN)](https://matejlukasik.com/cv): Anglický profesijný profil a pracovné skúsenosti.
- [Projects (EN)](https://matejlukasik.com/projects): Vozokany, post.work and Viki, with product screenshots and engineering context.

## Voliteľné

- [Plný obsah (markdown)](https://matejlukasik.sk/llms-full.txt): Všetok obsah stránky spojený ako markdown.

## Kontakt

- [Napísať email](${CONTACT_HREF}): ${CONTACT_EMAIL}
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
