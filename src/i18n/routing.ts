import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "az", "ru"],
  defaultLocale: "en",
  // Serve the default locale at "/" (200) instead of a 307 redirect to "/en",
  // so links to mursal.dev point straight at the canonical URL.
  localePrefix: "as-needed",
});

export type I_Languages = (typeof routing.locales)[number];
