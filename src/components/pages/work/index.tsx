import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { experience, formatPeriod, projects } from "@/lib/work";


const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";

export default function Work() {
  const t = useTranslations("work");
  const tp = useTranslations("projects");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <main className="flex flex-col gap-10 px-5 pb-10 pt-24 md:gap-15 md:px-10 md:pb-15 md:pt-32">
      {/* header */}
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          {t("title")}
        </h1>
        <p className={`${eyebrow} md:text-center whitespace-pre-line`}>
          {t("stats", {
            projects: String(projects.length).padStart(2, "0"),
            companies: String(experience.length).padStart(2, "0"),
          })}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {t("intro")}
        </p>
      </div>

      {/* projects */}
      <section aria-labelledby="projects-title" className="flex flex-col gap-6">
        <h2 id="projects-title" className={eyebrow}>
          {t("selected")}
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-15">
          {projects.map((p, i) => (
            <article key={p.name} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D7D9DB]">
                <Image
                  src={p.image1}
                  alt={tp("screenshot", { name: p.name, n: 1 })}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={p.image2}
                  alt={tp("screenshot", { name: p.name, n: 2 })}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[#D7D9DB] pb-4">
                <div className="flex min-w-0 items-baseline gap-4">
                  <span className={eyebrow}>0{i + 1}</span>
                  <h3 className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] md:text-[2rem]/[2.25rem] font-medium tracking-[-0.0625rem] uppercase">
                    {p.name}
                  </h3>
                </div>
                <p className={`${eyebrow} text-end`}>
                  {tp(`items.${p.id}.type`)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[#212325] text-[1rem]/[1.375rem]">
                  {tp(`items.${p.id}.description`)}
                </p>
                <p className="text-[#ADADAD] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase">
                  {p.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* experience */}
      <section
        aria-labelledby="experience-title"
        className="flex flex-col gap-6">
        <h2
          id="experience-title"
          className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          {t("experience")}
        </h2>

        <div>
          {experience.map((e, i) => (
            <div
              key={e.company}
              className="flex flex-col gap-3 border-b border-[#D7D9DB] px-3 py-6 md:flex-row md:items-start md:gap-4 md:py-8">
              <div className="flex items-baseline gap-4 md:w-85 md:shrink-0">
                <span className={`${eyebrow} w-10 shrink-0 md:w-auto`}>
                  0{i + 1}
                </span>
                <span className={eyebrow}>
                  {formatPeriod(e.start, e.end, locale, tc("present"))}
                </span>
              </div>

              <div className="flex flex-col gap-1 pl-14 md:w-85 md:shrink-0 md:pl-0">
                <h3 className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] md:text-[2rem]/[2.25rem] font-medium tracking-[-0.0625rem] uppercase">
                  {e.company}
                </h3>
                <p className={eyebrow}>{t(`items.${e.id}.role`)}</p>
              </div>

              <p className="pl-14 text-[#212325] text-[1rem]/[1.375rem] md:max-w-160 md:flex-1 md:pl-0">
                {t(`items.${e.id}.summary`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
