import { EN_GUIDES, EN_UI } from "./en";
import { EN_COUNTRY_GUIDES } from "./en-countries";
import { EN_COUNTRY_GUIDES_2 } from "./en-countries-2";
import { EN_COUNTRY_GUIDES_3 } from "./en-countries-3";
import { EN_SCHENGEN_NATIONALITY_GUIDES } from "./en-schengen-nationality";
import { EN_VISA_NATIONALITY_GUIDES } from "./en-visa-nationality";
import { EN_OFFICIAL_GUIDES } from "./en-official";
import { EN_NOMAD_GUIDES } from "./en-nomad";
import { EN_VISA_RUN_GUIDES } from "./en-visa-runs";
import { DE_GUIDES, DE_UI } from "./de";
import { ES_GUIDES, ES_UI } from "./es";
import { ES_COUNTRY_GUIDES } from "./es-countries";
import { ES_NOMAD_GUIDES } from "./es-nomad";
import { ES_VISA_LATAM_GUIDES } from "./es-visa-latam";
import { FR_GUIDES, FR_UI } from "./fr";
import { FR_NOMAD_GUIDES } from "./fr-nomad";
import { FR_VISA_AFRIQUE_GUIDES } from "./fr-visa-afrique";
import { ID_GUIDES, ID_UI } from "./id";
import { ID_MORE_GUIDES } from "./id-more";
import { IT_GUIDES, IT_UI } from "./it";
import { PT_BR_GUIDES, PT_BR_UI } from "./pt-BR";
import { PT_BR_MORE_GUIDES } from "./pt-BR-more";
import { PT_BR_NOMAD_GUIDES } from "./pt-BR-nomad";
import type { Guide, GuideUi } from "./types";

export type { Guide, GuideUi } from "./types";

/** Locales with hand-written guides. Other locales don't get guide pages. */
const GUIDES_BY_LOCALE: Record<string, { guides: Guide[]; ui: GuideUi }> = {
  en: { guides: [...EN_GUIDES, ...EN_COUNTRY_GUIDES, ...EN_COUNTRY_GUIDES_2, ...EN_COUNTRY_GUIDES_3, ...EN_SCHENGEN_NATIONALITY_GUIDES, ...EN_VISA_NATIONALITY_GUIDES, ...EN_OFFICIAL_GUIDES, ...EN_NOMAD_GUIDES, ...EN_VISA_RUN_GUIDES], ui: EN_UI },
  es: { guides: [...ES_GUIDES, ...ES_COUNTRY_GUIDES, ...ES_VISA_LATAM_GUIDES, ...ES_NOMAD_GUIDES], ui: ES_UI },
  "pt-BR": { guides: [...PT_BR_GUIDES, ...PT_BR_MORE_GUIDES, ...PT_BR_NOMAD_GUIDES], ui: PT_BR_UI },
  fr: { guides: [...FR_GUIDES, ...FR_VISA_AFRIQUE_GUIDES, ...FR_NOMAD_GUIDES], ui: FR_UI },
  de: { guides: DE_GUIDES, ui: DE_UI },
  it: { guides: IT_GUIDES, ui: IT_UI },
  id: { guides: [...ID_GUIDES, ...ID_MORE_GUIDES], ui: ID_UI },
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
