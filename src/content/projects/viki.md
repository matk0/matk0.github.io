<h3 id="viki-thesis">Thesis</h3>

Every company runs on a unique mix of software solutions that do the job but do not fit the company’s workflows exactly. SaaS solutions also tend to be expensive. As the cost of software development falls dramatically thanks to Agentic Engineering, more and more companies will choose to write bespoke software tailored to their particular workflows, business scenarios, and legal requirements.

This creates a need for knowledge bases (for lack of a better term) that describe how a company works. A shared wiki that all stakeholders can understand and verify is needed to start and complete the rewrite. This definition must then be usable by LLMs (Software Factories) to code the new solution. A behavior-driven development framework such as [Cucumber](https://cucumber.io/), together with its underlying language, [Gherkin](https://automationpanda.com/2017/01/26/bdd-101-the-gherkin-language/), could be used to achieve this.

Modern LLMs, given the right instructions and skills, could then query the knowledge base for rules and warn us about new requirements that conflict with the way things currently work.

<h3 id="viki-key-learnings">Key Learnings</h3>

It works! Viki is the specification layer of a software factory: **a shared source of truth** connecting stakeholder decisions with the software being built. I also learned:

- Keep things as simple as possible. People’s attention spans are getting shorter than ever, and any non-obvious UX actions will be ignored or misunderstood.
