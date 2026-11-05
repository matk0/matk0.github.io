import { CONTACT_EMAIL } from '../i18n';

export interface CVEntry {
  id: string;
  role: string;
  organization: string;
  start: string;
  end: string | null;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface CVContent {
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  phoneLabel: string;
  emailLabel: string;
  profileHeading: string;
  profile: string[];
  experienceHeading: string;
  skillsHeading: string;
  skills: string[];
  entries: CVEntry[];
}

// Foundation: the two-page CV Matej Lukasik.pdf supplied by Matej (21 January 2025).
// Doconomy's title/start match LinkedIn; Matej confirmed its June 2026 end
// and approved the outcome-led wording in this conversation on 28 October 2026.
// The contact email follows Matej's current website-wide email preference.
export const cv: Record<'en', CVContent> = {
  en: {
    pageTitle: 'CV — Matej Lukášik',
    metaDescription: 'Matej Lukášik’s CV: senior software engineering, technical leadership, Ruby on Rails and a current focus on AI productivity systems.',
    eyebrow: 'Curriculum vitae',
    name: 'Ing. Matej Lukášik',
    headline: 'Senior Product Engineer',
    location: 'Trnava, Slovakia',
    email: CONTACT_EMAIL,
    phone: '+421944302185',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    profileHeading: 'Profile',
    profile: [
      'I’m a Senior Product Engineer with **over ten years of experience** turning loosely defined problems into useful, reliable software. My strength is asking the right questions, understanding customer needs and technical constraints, and deciding what deserves to be built. I **take ownership** from problem definition and design through implementation, release and improvement.',
      'My experience spans hands-on product engineering at Doconomy, **delivering production features as a one-person development team** at Createview, and building and leading an engineering team as CTO at Zeilenwerk. Today, I combine that engineering foundation with product judgment, design taste and practical experience building AI tools and automations.',
    ],
    experienceHeading: 'Work experience',
    skillsHeading: 'Core skills',
    skills: [
      'Problem definition & product judgment: Clarifying ambiguous requirements, asking the right questions, and deciding what to build, simplify or leave out.',
      'Product design: Turning customer needs and complex workflows into intuitive interfaces and useful features.',
      'End-to-end ownership: Taking features and products from discovery and scope through implementation, release and improvement.',
      'Software engineering: Building web applications, APIs and integrations, with attention to reliability, maintainability and performance.',
      'AI-assisted development & automation: Building agent tools, shared context and verification workflows that support software delivery and business tasks.',
      'Technical collaboration: Working autonomously in remote teams, communicating decisions and tradeoffs, and mentoring engineers.',
    ],
    entries: [
      {
        id: 'independent',
        role: 'Independent Product Engineer',
        organization: 'Vozokany · Viki · post.work',
        start: '2026-06',
        end: null,
        period: 'June 2026 – Present',
        location: 'Trnava, Slovakia',
        summary: 'Designing and building products independently, owning problem definition, scope, user experience, implementation and release. My work combines practical business software with tools for AI-assisted development and automation.',
        highlights: [
          '**Vozokany:** Brought a farm’s weekly offers, customer orders, packing and harvest planning into one application now in use. Designed and built the customer ordering experience and farm management workflows, with executable business specifications and release verification.',
          '**Viki:** Made product requirements explicit and reviewable through a workspace connecting concepts, features and acceptance scenarios. Built version history, source references and scoped AI assistance so people and agents can work from shared, traceable context.',
          '**post.work:** Building a workspace that connects AI agents with business tools, persistent context and human review. Own the product experience and integrations, including access controls and mechanisms for managing and recovering agent sessions.',
        ],
      },
      {
        id: 'doconomy',
        role: 'Product Engineer',
        organization: 'Doconomy',
        start: '2025-05',
        end: '2026-06',
        period: 'May 2025 – June 2026',
        location: 'Remote',
        summary: 'Worked on Dreams Enterprise, a Ruby on Rails financial platform serving multiple partner banks and **hundreds of thousands of users**.',
        highlights: [
          'Turned **production errors into proposed code fixes** through an AI workflow connecting Datadog monitoring with GitHub.',
          'Improved legacy Ruby code’s maintainability and performance with an agent that automated refactoring using object-oriented design practices.',
          '**Made application activity traceable** by designing and implementing an Audit Trail system.',
          'Made user activity and savings trends visible through analytics dashboards covering savings by type and goal creation, with monthly and cumulative views.',
        ],
      },
      {
        id: 'createview',
        role: 'Senior Developer',
        organization: 'Createview AS',
        start: '2023-01',
        end: '2024-07',
        period: 'January 2023 – July 2024',
        location: 'Remote',
        summary: '',
        highlights: [
          'Enabled users to explore underwater sensor data through interactive charts, timeframe navigation, and image browsing and filtering.',
          'Turned brief product concepts into **production-ready features**, owning Ruby on Rails development as a one-person team.',
          'Enabled **real-time sensor visualization across millions of data points** by optimizing queries for performance and scalability.',
          'Helped junior developers progress from minimal Rails experience to meaningful project contributions through mentoring.',
        ],
      },
      {
        id: 'zeilenwerk',
        role: 'Chief Technology Officer',
        organization: 'Zeilenwerk',
        start: '2017-08',
        end: '2022-12',
        period: 'August 2017 – December 2022',
        location: '',
        summary: '',
        highlights: [
          'Helped turn a small startup into a structured engineering organization as its first employee and CTO.',
          'Grew the development team **from 2 to 10 people within three years**.',
          'Gave the growing team a shared approach to software delivery by establishing Agile workflows, QA practices and collaboration processes using JIRA.',
          'Expanded the company’s development capabilities by introducing React, React Native and GraphQL.',
          'Delivered medium- to large-scale software projects by leading them **from initial concept through completion**.',
        ],
      },
      {
        id: 'datamolino',
        role: 'Full Stack Engineer',
        organization: 'Datamolino',
        start: '2016-11',
        end: '2017-07',
        period: 'November 2016 – July 2017',
        location: '',
        summary: '',
        highlights: [
          'Dashboard: Made internal and external data easier to understand and use by redesigning the main dashboard and shaping its information architecture and user experience, helping Datamolino move ahead of Receipt Bank.',
          'QuickBooks Online: **Opened access to the QBO app marketplace** and created new business opportunities by building the QuickBooks Online integration.',
        ],
      },
      {
        id: 'primehammer',
        role: 'Full Stack Engineer',
        organization: 'primehammer',
        start: '2014-07',
        end: '2016-11',
        period: 'July 2014 – November 2016',
        location: '',
        summary: '',
        highlights: [
          'Vive.co: **Made booking faster and easier to use** by leading a front-end redesign with Sass and React and turning the booking flow into a single-page application.',
          'Hlidacky.cz: Enabled mobile app integration through an API documented with Swagger. Made admin access rules explicit by introducing declarative authorization.',
        ],
      },
    ],
  },
};
