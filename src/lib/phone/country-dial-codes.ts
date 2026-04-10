/** ISO-style dial prefixes for E.164 (Duffel expects international format). */

export type CountryDialOption = {
  /** E.g. "+66" */
  dial: string;
  /** English country / region name */
  country: string;
};

/** Sorted A–Z by country; default UI can still preselect Thailand (+66). */
export const COUNTRY_DIAL_CODES: CountryDialOption[] = [
  { country: "Afghanistan", dial: "+93" },
  { country: "Albania", dial: "+355" },
  { country: "Algeria", dial: "+213" },
  { country: "Argentina", dial: "+54" },
  { country: "Australia", dial: "+61" },
  { country: "Austria", dial: "+43" },
  { country: "Bahrain", dial: "+973" },
  { country: "Bangladesh", dial: "+880" },
  { country: "Belgium", dial: "+32" },
  { country: "Brazil", dial: "+55" },
  { country: "Brunei", dial: "+673" },
  { country: "Bulgaria", dial: "+359" },
  { country: "Cambodia", dial: "+855" },
  { country: "United States / Canada", dial: "+1" },
  { country: "Chile", dial: "+56" },
  { country: "China", dial: "+86" },
  { country: "Colombia", dial: "+57" },
  { country: "Costa Rica", dial: "+506" },
  { country: "Croatia", dial: "+385" },
  { country: "Cyprus", dial: "+357" },
  { country: "Czechia", dial: "+420" },
  { country: "Denmark", dial: "+45" },
  { country: "Ecuador", dial: "+593" },
  { country: "Egypt", dial: "+20" },
  { country: "Estonia", dial: "+372" },
  { country: "Finland", dial: "+358" },
  { country: "France", dial: "+33" },
  { country: "Germany", dial: "+49" },
  { country: "Ghana", dial: "+233" },
  { country: "Greece", dial: "+30" },
  { country: "Guatemala", dial: "+502" },
  { country: "Hong Kong", dial: "+852" },
  { country: "Hungary", dial: "+36" },
  { country: "Iceland", dial: "+354" },
  { country: "India", dial: "+91" },
  { country: "Indonesia", dial: "+62" },
  { country: "Ireland", dial: "+353" },
  { country: "Israel", dial: "+972" },
  { country: "Italy", dial: "+39" },
  { country: "Japan", dial: "+81" },
  { country: "Jordan", dial: "+962" },
  { country: "Kenya", dial: "+254" },
  { country: "Kuwait", dial: "+965" },
  { country: "Laos", dial: "+856" },
  { country: "Latvia", dial: "+371" },
  { country: "Lithuania", dial: "+370" },
  { country: "Luxembourg", dial: "+352" },
  { country: "Malaysia", dial: "+60" },
  { country: "Maldives", dial: "+960" },
  { country: "Mexico", dial: "+52" },
  { country: "Morocco", dial: "+212" },
  { country: "Myanmar", dial: "+95" },
  { country: "Nepal", dial: "+977" },
  { country: "Netherlands", dial: "+31" },
  { country: "New Zealand", dial: "+64" },
  { country: "Nigeria", dial: "+234" },
  { country: "Norway", dial: "+47" },
  { country: "Oman", dial: "+968" },
  { country: "Pakistan", dial: "+92" },
  { country: "Panama", dial: "+507" },
  { country: "Peru", dial: "+51" },
  { country: "Philippines", dial: "+63" },
  { country: "Poland", dial: "+48" },
  { country: "Portugal", dial: "+351" },
  { country: "Qatar", dial: "+974" },
  { country: "Romania", dial: "+40" },
  { country: "Saudi Arabia", dial: "+966" },
  { country: "Singapore", dial: "+65" },
  { country: "Slovakia", dial: "+421" },
  { country: "Slovenia", dial: "+386" },
  { country: "South Africa", dial: "+27" },
  { country: "South Korea", dial: "+82" },
  { country: "Spain", dial: "+34" },
  { country: "Sri Lanka", dial: "+94" },
  { country: "Sweden", dial: "+46" },
  { country: "Switzerland", dial: "+41" },
  { country: "Taiwan", dial: "+886" },
  { country: "Thailand", dial: "+66" },
  { country: "Türkiye", dial: "+90" },
  { country: "United Arab Emirates", dial: "+971" },
  { country: "United Kingdom", dial: "+44" },
  { country: "Vietnam", dial: "+84" },
].sort((a, b) => a.country.localeCompare(b.country));

/** ISO 3166-1 alpha-2 → ITU dial prefix for entries in {@link COUNTRY_DIAL_CODES}. */
const ISO2_TO_DIAL: Record<string, string> = {
  AF: "+93",
  AL: "+355",
  DZ: "+213",
  AR: "+54",
  AU: "+61",
  AT: "+43",
  BH: "+973",
  BD: "+880",
  BE: "+32",
  BR: "+55",
  BN: "+673",
  BG: "+359",
  KH: "+855",
  US: "+1",
  CA: "+1",
  CL: "+56",
  CN: "+86",
  CO: "+57",
  CR: "+506",
  HR: "+385",
  CY: "+357",
  CZ: "+420",
  DK: "+45",
  EC: "+593",
  EG: "+20",
  EE: "+372",
  FI: "+358",
  FR: "+33",
  DE: "+49",
  GH: "+233",
  GR: "+30",
  GT: "+502",
  HK: "+852",
  HU: "+36",
  IS: "+354",
  IN: "+91",
  ID: "+62",
  IE: "+353",
  IL: "+972",
  IT: "+39",
  JP: "+81",
  JO: "+962",
  KE: "+254",
  KW: "+965",
  LA: "+856",
  LV: "+371",
  LT: "+370",
  LU: "+352",
  MY: "+60",
  MV: "+960",
  MX: "+52",
  MA: "+212",
  MM: "+95",
  NP: "+977",
  NL: "+31",
  NZ: "+64",
  NG: "+234",
  NO: "+47",
  OM: "+968",
  PK: "+92",
  PA: "+507",
  PE: "+51",
  PH: "+63",
  PL: "+48",
  PT: "+351",
  QA: "+974",
  RO: "+40",
  SA: "+966",
  SG: "+65",
  SK: "+421",
  SI: "+386",
  ZA: "+27",
  KR: "+82",
  ES: "+34",
  LK: "+94",
  SE: "+46",
  CH: "+41",
  TW: "+886",
  TH: "+66",
  TR: "+90",
  AE: "+971",
  GB: "+44",
  VN: "+84",
};

/** When BCP-47 has no region, map primary language to a representative region for ordering. */
const LANGUAGE_TO_REGION: Record<string, string> = {
  th: "TH",
  en: "US",
  de: "DE",
  fr: "FR",
  es: "ES",
  pt: "BR",
  nl: "NL",
  pl: "PL",
  it: "IT",
  ja: "JP",
  ko: "KR",
  zh: "CN",
  vi: "VN",
  id: "ID",
  ms: "MY",
  sv: "SE",
  no: "NO",
  nb: "NO",
  nn: "NO",
  da: "DK",
  fi: "FI",
  cs: "CZ",
  el: "GR",
  he: "IL",
  ar: "AE",
  hi: "IN",
  tr: "TR",
  ru: "US",
};

export function getNavigatorDialLocale(): {
  region?: string;
  language?: string;
} {
  if (typeof window === "undefined") return {};
  const nav = window.navigator;
  const tags = [...(nav.languages ?? []), nav.language];
  let language: string | undefined;
  for (const tag of tags) {
    if (!tag?.trim()) continue;
    try {
      const loc = new Intl.Locale(tag);
      if (loc.region) {
        return { region: loc.region, language: loc.language };
      }
      if (!language && loc.language) language = loc.language;
    } catch {
      continue;
    }
  }
  return { language };
}

function resolvePriorityDial(region?: string, language?: string): string | undefined {
  const r = region?.toUpperCase();
  if (r && ISO2_TO_DIAL[r]) return ISO2_TO_DIAL[r];

  const lang = language?.toLowerCase();
  if (lang) {
    const primary = lang.split("-")[0] ?? lang;
    const fallbackRegion = LANGUAGE_TO_REGION[primary];
    if (fallbackRegion && ISO2_TO_DIAL[fallbackRegion]) {
      return ISO2_TO_DIAL[fallbackRegion];
    }
  }
  return undefined;
}

/** Puts the caller's most likely dial code(s) first, then the rest A–Z by country. */
export function orderedDialCodesForLocale(
  region: string | undefined,
  language: string | undefined,
  codes: CountryDialOption[] = COUNTRY_DIAL_CODES,
): CountryDialOption[] {
  const priorityDial = resolvePriorityDial(region, language);
  const copy = [...codes];
  if (!priorityDial) {
    return copy.sort((a, b) => a.country.localeCompare(b.country));
  }
  const primary = copy.filter((o) => o.dial === priorityDial);
  const rest = copy.filter((o) => o.dial !== priorityDial);
  primary.sort((a, b) => a.country.localeCompare(b.country));
  rest.sort((a, b) => a.country.localeCompare(b.country));
  return [...primary, ...rest];
}

export function formatE164(dial: string, national: string): string {
  const prefix = dial.startsWith("+") ? dial : `+${dial}`;
  let n = national.replace(/\D/g, "");
  if (n.startsWith("0")) n = n.slice(1);
  return `${prefix}${n}`;
}

export function nationalDigitCount(national: string): number {
  return national.replace(/\D/g, "").replace(/^0+/, "").length;
}
