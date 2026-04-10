import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { resolveMessages } from "@/lib/i18n/load-messages";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const { messages } = await resolveMessages(locale);
  return { locale, messages };
});
