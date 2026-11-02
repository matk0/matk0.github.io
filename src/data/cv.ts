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
      'I’m a Senior Software Engineer focusing on AI Productivity Systems: tools and workflows that help engineers build reliable software with AI. I bring over ten years of experience building web applications, owning projects from early ideas through delivery and leading engineering teams.',
      'My current work focuses on agentic AI and software factories. I’m building tools around clear specifications, context for agents, controlled tool access and independent verification, with people in control of requirements, review and release.',
      'My experience includes Ruby on Rails, API design, integrations, performance optimization and front-end development with React and React Native. As a former CTO and mentor, I care about both software quality and helping teams build, operate and improve their systems.',
    ],
    experienceHeading: 'Work experience',
    entries: [
      {
        id: 'independent',
        role: 'Independent software engineering',
        organization: 'Agentic AI & productivity systems',
        start: '2026-05',
        end: null,
        period: 'May 2026 – Present',
        location: 'Trnava, Slovakia',
        summary: 'Working on agentic AI and software productivity systems, with a current focus on building software factories.',
        highlights: [],
      },
      {
        id: 'doconomy',
        role: 'Product Engineer',
        organization: 'Doconomy',
        start: '2025-05',
        end: '2026-06',
        period: 'May 2025 – June 2026',
        location: 'Remote',
        summary: 'Worked on Dreams Enterprise, a Ruby on Rails financial platform serving multiple partner banks and hundreds of thousands of users.',
        highlights: [
          'Turned production errors into proposed code fixes through an AI workflow connecting Datadog monitoring with GitHub.',
          'Improved legacy Ruby code’s maintainability and performance with an agent that automated refactoring using object-oriented design practices.',
          'Made application activity traceable by designing and implementing an Audit Trail system.',
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
          'Turned brief product concepts into production-ready features, owning Ruby on Rails development as a one-person team.',
          'Enabled real-time sensor visualization across millions of data points by optimizing queries for performance and scalability.',
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
          'Grew the development team from 2 to 10 people within three years.',
          'Gave the growing team a shared approach to software delivery by establishing Agile workflows, QA practices and collaboration processes using JIRA.',
          'Expanded the company’s development capabilities by introducing React, React Native and GraphQL.',
          'Delivered medium- to large-scale software projects by leading them from initial concept through completion.',
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
          'QuickBooks Online: Opened access to the QBO app marketplace and created new business opportunities by building the QuickBooks Online integration.',
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
          'Vive.co: Made booking faster and easier to use by leading a front-end redesign with Sass and React and turning the booking flow into a single-page application.',
          'Hlidacky.cz: Enabled mobile app integration through an API documented with Swagger. Made admin access rules explicit by introducing declarative authorization.',
        ],
      },
    ],
  },
};
