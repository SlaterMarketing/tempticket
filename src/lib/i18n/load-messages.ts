import { hasLocale } from "next-intl";
import en from "../../../messages/en.json";
import { deepMergeMessages } from "@/lib/i18n/merge-messages";
import { routing } from "@/i18n/routing";

export async function resolveMessages(locale: string) {
  const safe =
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  let messages: Record<string, unknown> = en as Record<string, unknown>;
  if (safe !== routing.defaultLocale) {
    try {
      const mod = await import(`../../../messages/${safe}.json`);
      messages = deepMergeMessages(messages, mod.default as Record<string, unknown>);
    } catch {
      messages = en as Record<string, unknown>;
    }
  }
  return { locale: safe, messages };
}
