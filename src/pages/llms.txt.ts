import type { APIRoute } from 'astro';
import { CONTACT_EMAIL, CONTACT_HREF, type Lang } from '../i18n';

const EN = `# Matej Lukášik — AI Systems & Software Engineering Consultant

> Helps companies replace time-consuming workflows and software that no longer fits with the right mix of bespoke software systems, automations, and AI agents.

Matej is an AI Systems & Software Engineering Consultant with 10 years of software engineering experience. He assesses workflows and existing systems, builds the right mix of bespoke software, automations, and AI agents, and helps teams adopt and own the solution. He works with companies in Europe and the United States. Bilingual (English / Slovak).

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

## Optional

- [Full content (markdown)](https://matejlukasik.com/llms-full.txt): All site copy concatenated as markdown.

## Contact

- [Email Matej](${CONTACT_HREF}): ${CONTACT_EMAIL}
- Location: Slovakia (serves Europe and the United States)
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- GitHub: https://github.com/matk0
`;


export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  return new Response(EN, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
