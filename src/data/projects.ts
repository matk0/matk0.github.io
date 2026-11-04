export interface ProjectMedia {
  image: string;
  width: number;
  height: number;
  href: string;
  alt: Record<'en', string>;
  caption: Record<'en', string>;
}

// Unmodified actual-product captures.
// Initial captures: artifacts/project-screenshots/2026-10-28/README.md.
// Vozokany: rehealthyfarm.sk/zasoby?stav=skladom, body > div > div,
// captured 2 November 2026 and cropped to the element bounds (outer margins excluded).
// post.work: Keyana social media planning chat, captured 4 November 2026.
// Viki: selected live pricing scenario, captured 2 November 2026 at 1440 × 900
// to match the preview aspect ratio and preserve the full interface without cropping.
export const projectMedia: Record<string, ProjectMedia> = {
  vozokany: {
    image: '/images/projects/vozokany-inventory.webp',
    width: 1120,
    height: 2169,
    href: 'https://rehealthyfarm.sk',
    alt: {
      en: 'Vozokany farm inventory screen filtered to in-stock products, showing crop categories, availability controls and prices.',
    },
    caption: {
      en: 'Farm inventory filtered to in-stock products',
    },
  },
  postwork: {
    image: '/images/projects/postwork-social-plan.png',
    width: 1600,
    height: 1000,
    href: 'https://post.work/',
    alt: {
      en: 'post.work chat showing Keyana’s weekly social media plan with posts awaiting review.',
    },
    caption: {
      en: 'Keyana’s weekly social media plan ready for review',
    },
  },
  viki: {
    image: '/images/projects/viki-sent-prices-scenario.webp',
    width: 1440,
    height: 900,
    href: 'https://github.com/matk0/viki',
    alt: {
      en: 'Viki specification workspace showing the complete “Keep sent prices when the catalogue changes” Gherkin scenario, revision metadata and related pages.',
    },
    caption: {
      en: 'Preserving sent offer prices when the catalogue changes',
    },
  },
};
