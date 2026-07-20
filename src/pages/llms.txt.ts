import type { APIRoute } from 'astro';
import { type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Process Audits and Automation

> Helps small and medium-sized businesses find recurring work that consumes the most time, simplify it, automate it, and measure the result. The starting point is one concrete business process, not an AI tool.

Matej has 10 years of software engineering experience and now focuses on practical AI automation. He works with businesses in Slovakia and across the EU. Engagements range from a 45-minute diagnostic to custom implementation and team training. Bilingual (English / Slovak).

## Services

- **Process and AI Opportunity Audit** — Identifies the processes currently taking the most time, ranks 3–5 opportunities by impact and effort, recommends the first process, and provides a concrete next-step plan.
- **Automating One Specific Process** — Connects one automated process to the tools the client already uses, tests it on real cases, measures the result, and hands it over to the team.
- **AI in the Team's Day-to-Day Work** — Establishes practical tasks, rules, and work habits so AI becomes part of day-to-day work rather than a one-off demo.

## Process

1. 45-Minute AI Opportunity Diagnostic — a free 45-minute review of one recurring process to assess whether it is worth automating.
2. First-Step Plan — the first process worth solving, a success metric, security rules, and a realistic rollout path.
3. Execution — the agreed solution is built, tested on real work, introduced to the first users, and measured.
4. Handoff — once the solution works, the client team takes it over, with continued support available when useful.

## Common first engagement

**45-Minute AI Opportunity Diagnostic** — In 45 minutes, maps one recurring process and assesses whether it is worth automating. If it is not, Matej says so directly.

## Research

- [Agent Threat Atlas](https://atlas.matejlukasik.sk/): Daily agentic AI incidents mapped to threat categories and prevention principles.
- [Threat categories](https://atlas.matejlukasik.sk/threats): Practical risk categories for teams deploying AI agents.

## Principles

- Right tool for the job (open-source vs. managed, self-hosted vs. cloud — recommended on fit, not commission).
- Capability over dependency — train the team alongside deployment.
- Start small, prove value — no 6-month projects; deploy fast, measure, expand what works.

## Pages

- [Home (EN)](https://matejlukasik.com/): Services overview, process, about, FAQ.
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

- **Audit procesov a AI prilezitosti** — Procesy, ktore dnes stoja najviac casu, 3–5 prilezitosti zoradenych podla prinosu a narocnosti, odporucanie prveho procesu a konkretny plan dalsich krokov.
- **Automatizacia jedneho konkretneho procesu** — Proces napojeny na sucasne nastroje, otestovany na realnych pripadoch a odovzdany timu s meranim vysledku.
- **AI v kazdodennej praci timu** — Konkretne ulohy, pravidla a pracovne navyky, vdaka ktorym AI nezostane jednorazovym demom.

## Proces

1. 45-minutova diagnostika moznosti AI — bezplatna 45-minutova analyza jedneho opakujuceho sa procesu, ktora posudi, ci sa ho oplati automatizovat.
2. Plan prveho kroku — prvy proces, ktory sa oplati riesit, metrika uspechu, bezpecnostne pravidla a realisticky postup nasadenia.
3. Realizacia — dohodnute riesenie sa postavi, otestuje na realnej praci, zavedie medzi prvych pouzivatelov a zmeria.
4. Odovzdanie do praxe — ked riesenie funguje, preberie ho klientsky tim; dalsia podpora ostava dostupna, ak dava zmysel.

## Najcastejsi prvy krok

**45-minutova diagnostika moznosti AI** — Za 45 minut zmapuje jeden opakujuci sa proces a posudi, ci sa ho oplati automatizovat. Ak nie, Matej to povie priamo.

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
