export type GuideSection = { heading: string; paragraphs: string[] };
export type GuideFaq = { q: string; a: string };
export type GuideTable = {
  caption: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

export type Guide = {
  /** Same key across languages links translations together (hreflang). */
  key: string;
  slug: string;
  /** <title> and H1 target the search phrase people actually type. */
  title: string;
  h1: string;
  description: string;
  intro: string;
  /** Shown near the top, e.g. an affiliate disclosure on comparison pages. */
  disclosure?: string;
  table?: GuideTable;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

/** Interface text around the guide content, per language. */
export type GuideUi = {
  home: string;
  guides: string;
  indexTitle: string;
  indexDescription: string;
  commonQuestions: string;
  moreGuides: string;
  disclaimer: string;
  ctaHeading: (price: string | null) => string;
  ctaBody: string;
  ctaButton: string;
  destinationsTitle: string;
  destinationsSub: string;
};
