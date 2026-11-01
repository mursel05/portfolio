import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["az", "en", "ru"],
  defaultLocale: "az",
});

export type I_Languages = (typeof routing.locales)[number];