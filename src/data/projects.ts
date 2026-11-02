export interface ProjectMedia {
  image: string;
  width: number;
  height: number;
  href: string;
  alt: Record<'en', string>;
  caption: Record<'en', string>;
}

// Unmodified actual-product captures. post.work uses synthetic visual-test data.
// Source paths and capture context: artifacts/project-screenshots/2026-10-28/README.md.
export const projectMedia: Record<string, ProjectMedia> = {
  vozokany: {
    image: '/images/projects/vozokany.jpg',
    width: 1440,
    height: 900,
    href: 'https://rehealthyfarm.sk',
    alt: {
      en: 'Vozokany customer ordering screen with the weekly farm offer, product photos, prices and quantity controls.',
    },
    caption: {
      en: 'Customer ordering screen',
    },
  },
  postwork: {
    image: '/images/projects/postwork.png',
    width: 1440,
    height: 900,
    href: 'https://post.work/',
    alt: {
      en: 'post.work campaign planner with a draft social post open for human review in a demo workspace.',
    },
    caption: {
      en: 'Demo workspace with sample campaign content',
    },
  },
  viki: {
    image: '/images/projects/viki.png',
    width: 1728,
    height: 940,
    href: 'https://github.com/matk0/viki',
    alt: {
      en: 'Viki specification workspace displaying a Gherkin scenario, its revision and related pages.',
    },
    caption: {
      en: 'Versioned scenario in the specification workspace',
    },
  },
};
