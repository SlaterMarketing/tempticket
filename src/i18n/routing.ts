import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
});

export { defaultLocale, locales };
export type { AppLocale } from "./config";
