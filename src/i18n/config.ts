/**
 * Supported locales: high global reach + major web economies (50 BCP 47 tags).
 * Adjust order or swap codes in this file only.
 */
export const locales = [
  "en",
  "es",
  "pt-BR",
  "fr",
  "de",
  "it",
  "nl",
  "pl",
  "ru",
  "uk",
  "tr",
  "ar",
  "hi",
  "id",
  "vi",
  "th",
  "ms",
  "fil",
  "ja",
  "ko",
  "zh-CN",
  "zh-TW",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "ur",
  "fa",
  "he",
  "el",
  "cs",
  "sk",
  "hu",
  "ro",
  "bg",
  "hr",
  "sr",
  "sl",
  "sv",
  "da",
  "nb",
  "fi",
  "et",
  "lv",
  "lt",
  "sw",
] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

/** Locales that use right-to-left layout at the document level. */
export const rtlLocales: ReadonlySet<string> = new Set(["ar", "he", "fa", "ur"]);
