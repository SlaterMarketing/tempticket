import { EN_GUIDES, EN_UI } from "./en";
import { ES_GUIDES, ES_UI } from "./es";
import { PT_BR_GUIDES, PT_BR_UI } from "./pt-BR";
import type { Guide, GuideUi } from "./types";

export type { Guide, GuideUi } from "./types";

/** Locales with hand-written guides. Other locales don't get guide pages. */
const GUIDES_BY_LOCALE: Record<string, { guides: Guide[]; ui: GuideUi }> = {
  en: { guides: EN_GUIDES, ui: EN_UI },
  es: { guides: ES_GUIDES, ui: ES_UI },
  "pt-BR": { guides: PT_BR_GUIDES, ui: PT_BR_UI },
};

export const GUIDE_LOCALES = Object.keys(GUIDES_BY_LOCALE);

export function hasGuides(locale: string): boolean {
  return locale in GUIDES_BY_LOCALE;
}

export function getGuides(locale: string): Guide[] {
  return GUIDES_BY_LOCALE[locale]?.guides ?? [];
}

export function getGuideUi(locale: string): GuideUi | null {
  return GUIDES_BY_LOCALE[locale]?.ui ?? null;
}

export function getGuide(locale: string, slug: string): Guide | undefined {
  return getGuides(locale).find((g) => g.slug === slug);
}

/** Every language version of the guide with this key, as locale -> slug. */
export function guideTranslations(key: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [locale, { guides }] of Object.entries(GUIDES_BY_LOCALE)) {
    const g = guides.find((x) => x.key === key);
    if (g) out[locale] = g.slug;
  }
  return out;
}
