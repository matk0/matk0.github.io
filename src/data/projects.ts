export interface ProjectMedia {
  image: string;
  width: number;
  height: number;
  href: string;
  alt: Record<'en' | 'sk', string>;
  caption: Record<'en' | 'sk', string>;
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
      sk: 'Objednávková stránka Vozokany s týždennou ponukou farmy, fotografiami produktov, cenami a výberom množstva.',
    },
    caption: {
      en: 'Customer ordering screen',
      sk: 'Objednávková stránka pre zákazníkov',
    },
  },
  postwork: {
    image: '/images/projects/postwork.png',
    width: 1440,
    height: 900,
    href: 'https://post.work/',
    alt: {
      en: 'post.work campaign planner with a draft social post open for human review in a demo workspace.',
      sk: 'Plánovač kampaní v post.work s návrhom príspevku otvoreným na kontrolu v ukážkovom pracovnom priestore.',
    },
    caption: {
      en: 'Demo workspace with sample campaign content',
      sk: 'Ukážkový pracovný priestor so vzorovým obsahom kampane',
    },
  },
  viki: {
    image: '/images/projects/viki.png',
    width: 1728,
    height: 940,
    href: 'https://github.com/matk0/viki',
    alt: {
      en: 'Viki specification workspace displaying a Gherkin scenario, its revision and related pages.',
      sk: 'Pracovný priestor Viki so scenárom v Gherkine, jeho revíziou a súvisiacimi stránkami.',
    },
    caption: {
      en: 'Versioned scenario in the specification workspace',
      sk: 'Verziovaný scenár v pracovnom priestore pre špecifikácie',
    },
  },
};
