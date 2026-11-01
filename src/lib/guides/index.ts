import { EN_GUIDES, EN_UI } from "./en";
import { EN_COUNTRY_GUIDES } from "./en-countries";
import { EN_COUNTRY_GUIDES_2 } from "./en-countries-2";
import { EN_COUNTRY_GUIDES_3 } from "./en-countries-3";
import { EN_SCHENGEN_NATIONALITY_GUIDES } from "./en-schengen-nationality";
import { EN_VISA_NATIONALITY_GUIDES } from "./en-visa-nationality";
import { EN_OFFICIAL_GUIDES } from "./en-official";
import { EN_NOMAD_GUIDES } from "./en-nomad";
import { EN_VISA_RUN_GUIDES } from "./en-visa-runs";
import { EN_INDIA_GUIDES } from "./en-india";
import { DE_NOMAD_GUIDES } from "./de-nomad";
import { DE_OFFICIAL_GUIDES } from "./de-official";
import { DE_VISA_RUN_GUIDES } from "./de-visa-runs";
import { IT_NOMAD_GUIDES } from "./it-nomad";
import { IT_OFFICIAL_GUIDES } from "./it-official";
import { IT_VISA_RUN_GUIDES } from "./it-visa-runs";
import { DE_GUIDES, DE_UI } from "./de";
import { ES_GUIDES, ES_UI } from "./es";
import { ES_COUNTRY_GUIDES } from "./es-countries";
import { ES_NOMAD_GUIDES } from "./es-nomad";
import { ES_OFFICIAL_GUIDES } from "./es-official";
import { ES_VISA_RUN_GUIDES } from "./es-visa-runs";
import { ES_VISA_LATAM_GUIDES } from "./es-visa-latam";
import { FR_GUIDES, FR_UI } from "./fr";
import { FR_NOMAD_GUIDES } from "./fr-nomad";
import { FR_OFFICIAL_GUIDES } from "./fr-official";
import { FR_VISA_RUN_GUIDES } from "./fr-visa-runs";
import { FR_VISA_AFRIQUE_GUIDES } from "./fr-visa-afrique";
import { ID_GUIDES, ID_UI } from "./id";
import { ID_MORE_GUIDES } from "./id-more";
import { IT_GUIDES, IT_UI } from "./it";
import { PT_BR_GUIDES, PT_BR_UI } from "./pt-BR";
import { PT_BR_MORE_GUIDES } from "./pt-BR-more";
import { PT_BR_NOMAD_GUIDES } from "./pt-BR-nomad";
import { PT_BR_OFFICIAL_GUIDES } from "./pt-BR-official";
import { PT_BR_VISA_RUN_GUIDES } from "./pt-BR-visa-runs";
import { HI_GUIDES, HI_UI } from "./hi";
import { AR_GUIDES, AR_UI } from "./ar";
import { TR_GUIDES, TR_UI } from "./tr";
import { JA_GUIDES, JA_UI } from "./ja";
import { KO_GUIDES, KO_UI } from "./ko";
import { ZH_CN_GUIDES, ZH_CN_UI } from "./zh-CN";
import { ZH_TW_GUIDES, ZH_TW_UI } from "./zh-TW";
import { VI_GUIDES, VI_UI } from "./vi";
import { TH_GUIDES, TH_UI } from "./th";
import { RU_GUIDES, RU_UI } from "./ru";
import { NL_GUIDES, NL_UI } from "./nl";
import { PL_GUIDES, PL_UI } from "./pl";
import { ID_EXTRA_GUIDES } from "./id-extra";
import { MS_GUIDES, MS_UI } from "./ms";
import { NE_GUIDES, NE_UI } from "./ne";
import { SI_GUIDES, SI_UI } from "./si";
import { FIL_GUIDES, FIL_UI } from "./fil";
import { HI_MORE_GUIDES } from "./hi-more";
import { FIL_MORE_GUIDES, AR_MORE_GUIDES, TR_MORE_GUIDES, VI_MORE_GUIDES } from "./deep-24";
import type { Guide, GuideUi } from "./types";

export type { Guide, GuideUi } from "./types";

/** Locales with hand-written guides. Other locales don't get guide pages. */
const GUIDES_BY_LOCALE: Record<string, { guides: Guide[]; ui: GuideUi }> = {
  en: { guides: [...EN_GUIDES, ...EN_COUNTRY_GUIDES, ...EN_COUNTRY_GUIDES_2, ...EN_COUNTRY_GUIDES_3, ...EN_SCHENGEN_NATIONALITY_GUIDES, ...EN_VISA_NATIONALITY_GUIDES, ...EN_OFFICIAL_GUIDES, ...EN_NOMAD_GUIDES, ...EN_VISA_RUN_GUIDES, ...EN_INDIA_GUIDES], ui: EN_UI },
  es: { guides: [...ES_GUIDES, ...ES_COUNTRY_GUIDES, ...ES_VISA_LATAM_GUIDES, ...ES_NOMAD_GUIDES, ...ES_VISA_RUN_GUIDES, ...ES_OFFICIAL_GUIDES], ui: ES_UI },
  "pt-BR": { guides: [...PT_BR_GUIDES, ...PT_BR_MORE_GUIDES, ...PT_BR_NOMAD_GUIDES, ...PT_BR_VISA_RUN_GUIDES, ...PT_BR_OFFICIAL_GUIDES], ui: PT_BR_UI },
  fr: { guides: [...FR_GUIDES, ...FR_VISA_AFRIQUE_GUIDES, ...FR_NOMAD_GUIDES, ...FR_VISA_RUN_GUIDES, ...FR_OFFICIAL_GUIDES], ui: FR_UI },
  de: { guides: [...DE_GUIDES, ...DE_NOMAD_GUIDES, ...DE_VISA_RUN_GUIDES, ...DE_OFFICIAL_GUIDES], ui: DE_UI },
  it: { guides: [...IT_GUIDES, ...IT_NOMAD_GUIDES, ...IT_VISA_RUN_GUIDES, ...IT_OFFICIAL_GUIDES], ui: IT_UI },
  id: { guides: [...ID_GUIDES, ...ID_MORE_GUIDES, ...ID_EXTRA_GUIDES], ui: ID_UI },
  hi: { guides: [...HI_GUIDES, ...HI_MORE_GUIDES], ui: HI_UI },
  ar: { guides: [...AR_GUIDES, ...AR_MORE_GUIDES], ui: AR_UI },
  tr: { guides: [...TR_GUIDES, ...TR_MORE_GUIDES], ui: TR_UI },
  ja: { guides: JA_GUIDES, ui: JA_UI },
  ko: { guides: KO_GUIDES, ui: KO_UI },
  "zh-CN": { guides: ZH_CN_GUIDES, ui: ZH_CN_UI },
  "zh-TW": { guides: ZH_TW_GUIDES, ui: ZH_TW_UI },
  vi: { guides: [...VI_GUIDES, ...VI_MORE_GUIDES], ui: VI_UI },
  th: { guides: TH_GUIDES, ui: TH_UI },
  ru: { guides: RU_GUIDES, ui: RU_UI },
  nl: { guides: NL_GUIDES, ui: NL_UI },
  pl: { guides: PL_GUIDES, ui: PL_UI },
  ms: { guides: MS_GUIDES, ui: MS_UI },
  ne: { guides: NE_GUIDES, ui: NE_UI },
  si: { guides: SI_GUIDES, ui: SI_UI },
  fil: { guides: [...FIL_GUIDES, ...FIL_MORE_GUIDES], ui: FIL_UI },
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
