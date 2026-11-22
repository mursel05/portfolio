import { Link } from "@/i18n/navigation";
import { EMAIL, socials } from "@/lib/info";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";

const nav = [
  { key: "work", href: "/work" },
  { key: "info", href: "/info" },
  { key: "contact", href: "/contact" },
] as const;

/**
 * Desktop heading size per locale so "greeting + name" stays on one line
 * (az/ru greetings are ~1.45x wider than "Hi, I'm"). Mobile always wraps and uses the 4rem floor.
 */
const HEADING_VW: Record<string, number> = { en: 15.5, az: 10.6, ru: 10.6 };

const small =
  "text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const bar =
  "text-[0.875rem] md:text-[1rem] font-semibold tracking-[-0.0625rem] uppercase";

const Hero = () => {
  const t = useTranslations("hero");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative w-full min-h-svh overflow-hidden flex flex-col text-white">
      <Image
        src="/images/bg-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <Image
        src="/images/bg-hero-overlay.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-5"
      />

      <LocaleSwitcher
        className={`${bar} absolute right-5 top-5 z-10 md:right-10 md:top-7`}
      />

      <h1 className="relative px-5 md:px-10 pt-24 md:pt-30 font-anton uppercase text-[#F3F0EC] leading-20 tracking-[-0.02em]"
        style={{
          fontSize: `clamp(4rem, ${HEADING_VW[locale] ?? 15.5}vw, 15.625rem)`,
        }}>
        {t("greeting")}
        <br className="md:hidden" /> {t("name")}
      </h1>

      <div className="relative mt-auto px-5 md:px-10 pb-10 md:pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <p className={`${small} whitespace-pre-line`}>
          {t("intro")}
        </p>
        <p lang="en" className={`${small} whitespace-pre-line md:text-center`}>
          {
            "Node.js · NestJS · TypeScript\nPostgreSQL · Prisma · Redis\nReact · Next.js · Docker"
          }
        </p>
        <p className={`${small} whitespace-pre-line md:text-end`}>
          {t("background")}
        </p>
      </div>

      <div className="relative px-5 md:px-10 w-full">
        <div className="py-5 md:py-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-white">
          <a href={`mailto:${EMAIL}`} className={bar}>
            {tc("sayHello")}
          </a>

          <div className="flex flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4 md:gap-8">
                <a
                  lang="en"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={bar}>
                  {s.label}
                </a>
                {i < socials.length - 1 && <span className={bar}>/</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={bar}>
                {tn(n.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
