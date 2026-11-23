import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { certificates, education, formatMonth, formatPeriod } from "@/lib/work";

const skills = [
  { id: "languages", items: "JavaScript, TypeScript, HTML, CSS" },
  {
    id: "backend",
    items: "Node.js, NestJS, Express.js, RESTful APIs, JWT, Prisma, TypeORM",
  },
  { id: "databases", items: "PostgreSQL, MongoDB, Redis" },
  {
    id: "frontend",
    items:
      "React, Next.js, Angular, Ionic, Svelte, Redux, Redux Toolkit, Zustand, TanStack Query, React Hook Form, Zod",
  },
  {
    id: "styling",
    items:
      "Tailwind CSS, SASS, Bootstrap, Material UI, Mantine, Shadcn UI, GSAP, Three.js",
  },
  {
    id: "devops",
    items:
      "Docker, Docker Compose, GitHub Actions (CI/CD), Azure, AWS S3, Firebase",
  },
  { id: "tools", items: "Git, GitHub, GitLab, Jira, Slack, Stripe" },
] as const;

const languages = [
  { id: "az", level: "native" },
  { id: "en", level: "upperIntermediate" },
] as const;

const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const sectionTitle =
  "text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase";
const rowTitle =
  "text-[#0A0A0A] text-[1.5rem]/[1.75rem] md:text-[2rem]/[2.25rem] font-medium tracking-[-0.0625rem] uppercase";
const body = "text-[#212325] text-[1rem]/[1.375rem]";

export default function InfoPage() {
  const t = useTranslations("info");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <main className="flex flex-col gap-12 px-5 pb-10 pt-24 md:gap-20 md:px-10 md:pb-15 md:pt-32">
      {/* header */}
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className={sectionTitle}>{t("title")}</h1>
        <p className={`${eyebrow} md:text-center whitespace-pre-line`}>
          {t("facts")}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {t("intro")}
        </p>
      </div>

      {/* about */}
      <section
        aria-labelledby="about-title"
        className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D7D9DB] md:max-w-120">
          <Image
            src="/images/about.png"
            alt="Mursal Haxverdiyev"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h2 id="about-title" className={eyebrow}>
              {t("about")}
            </h2>
            <p className="text-[#0A0A0A] text-[1.25rem]/[1.75rem] md:text-[1.75rem]/[2.25rem] font-medium tracking-[-0.0625rem]">
              {t("summary")}
            </p>
          </div>

          <Link
            href="/contact"
            className="group flex w-full cursor-pointer items-center justify-between gap-6 bg-[#0A0A0A] px-6 py-5 text-[#F3F0EC] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-80 md:w-auto md:min-w-64 md:self-start">
            {t("getInTouch")}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>

      {/* skills */}
      <section aria-labelledby="skills-title" className="flex flex-col gap-6">
        <h2 id="skills-title" className={sectionTitle}>
          {t("skills")}
        </h2>
        <div>
          {skills.map((s, i) => (
            <div
              key={s.id}
              className="flex flex-col gap-3 border-b border-[#D7D9DB] px-3 py-6 md:flex-row md:items-start md:gap-4 md:py-8">
              <span className={`${eyebrow} w-10 shrink-0 md:w-85`}>
                0{i + 1}
              </span>
              <h3 className={`${rowTitle} md:w-85 md:shrink-0`}>
                {t(`skillGroups.${s.id}`)}
              </h3>
              <p className={`${body} md:max-w-160 md:flex-1`}>{s.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* education */}
      <section
        aria-labelledby="education-title"
        className="flex flex-col gap-6">
        <h2 id="education-title" className={sectionTitle}>
          {t("education")}
        </h2>
        <div>
          {education.map((e, i) => (
            <div
              key={e.id}
              className="flex flex-col gap-3 border-b border-[#D7D9DB] px-3 py-6 md:flex-row md:items-start md:gap-4 md:py-8">
              <div className="flex items-baseline gap-4 md:w-85 md:shrink-0">
                <span className={`${eyebrow} w-10 shrink-0 md:w-auto`}>
                  0{i + 1}
                </span>
                <span className={eyebrow}>
                  {formatPeriod(e.start, e.end, locale, tc("present"))}
                </span>
              </div>
              <h3 className={`${rowTitle} md:w-85 md:shrink-0`}>
                {t(`degrees.${e.id}`)}
              </h3>
              <div className="flex flex-col gap-2 md:max-w-160 md:flex-1">
                <p className={body}>{t("school")}</p>
                {e.id === "bachelor" && <p className={eyebrow}>{t("gpa")}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* certificates + languages */}
      <section className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10">
        <div aria-labelledby="certs-title" className="flex flex-col gap-6">
          <h2 id="certs-title" className={eyebrow}>
            {t("certificates")}
          </h2>
          <div>
            {certificates.map((c) => (
              <div
                key={c.id}
                className="flex items-start justify-between gap-4 border-b border-[#D7D9DB] py-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[#0A0A0A] text-[1rem]/[1.375rem] font-medium">
                    {t(`certificateNames.${c.id}`)}
                  </p>
                  <p
                    lang="en"
                    className="text-[#ADADAD] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase">
                    {c.issuer}
                  </p>
                </div>
                <p className={`${eyebrow} shrink-0`}>
                  {formatMonth(c.date, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div aria-labelledby="languages-title" className="flex flex-col gap-6">
          <h2 id="languages-title" className={eyebrow}>
            {t("languages")}
          </h2>
          <div>
            {languages.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-4 border-b border-[#D7D9DB] py-4">
                <p className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] font-medium tracking-[-0.0625rem] uppercase">
                  {t(`languageList.${l.id}`)}
                </p>
                <p className={eyebrow}>{t(`levels.${l.level}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
