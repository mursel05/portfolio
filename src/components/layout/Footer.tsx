"use client";

import { Link } from "@/i18n/navigation";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMAIL, PHONE, socials } from "@/lib/info";

const nav = [
  { key: "work", href: "/work" },
  { key: "info", href: "/info" },
  { key: "contact", href: "/contact" },
] as const;

const label =
  "text-[#ADADAD] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const linkClass =
  "text-[#F3F0EC] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-60";

const Footer = () => {
  const t = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="flex flex-col gap-10 overflow-hidden bg-[#0A0A0A] px-5 pt-10 md:gap-15 md:px-10 md:pt-15">
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h2 className="text-[#F3F0EC] text-[3rem]/[2.5rem] md:text-[5.625rem]/[5rem] font-medium tracking-[-0.0313rem] uppercase">
          {t("letsBuild")}
          <br />
          {t("somethingTogether")}
        </h2>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {t("openTo")}
        </p>
      </div>

      <div className="relative grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5 md:gap-10">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-2">
          <p className={label}>{t("sayHello")}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="break-all text-[#F3F0EC] text-[1.25rem]/[1.5rem] font-medium tracking-[-0.0625rem] transition-opacity duration-300 hover:opacity-60 md:text-[1.5rem]/[1.75rem]">
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className={label}>{t("navigate")}</p>
          <div className="flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={linkClass}>
                {tn(n.key)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className={label}>{t("social")}</p>
          <div className="flex flex-col gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                lang="en"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <p className={label}>{t("phone")}</p>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={linkClass}>
            {PHONE}
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="font-anton uppercase text-[#F3F0EC] text-[clamp(4rem,18.5vw,18rem)] leading-[0.85] tracking-[-0.02em] mb-[-0.06em]">
        Mursal
      </p>

      <div className="flex items-center justify-between gap-4 border-t border-[#6D6C6A] py-5 md:py-7">
        <p lang="en" className={label}>
          © {new Date().getFullYear()} Mursal Haxverdiyev
        </p>
        <p className={`${label} hidden md:block`}>{t("role")}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${linkClass} flex cursor-pointer items-center gap-2`}>
          {t("top")}
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
