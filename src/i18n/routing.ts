import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
});

export type I_Languages = (typeof routing.locales)[number];
