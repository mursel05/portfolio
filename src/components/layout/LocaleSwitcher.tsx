"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", az: "AZ", ru: "RU" };

export default function LocaleSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("language")} className={`flex items-center gap-3 ${className}`}>
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={`transition-opacity duration-300 hover:opacity-100 ${
              active ? "opacity-100 underline underline-offset-4" : "opacity-50"
            }`}>
            {LABELS[l]}
          </Link>
        );
      })}
    </nav>
  );
}
