import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const summary =
  "Frontend developer experienced in building scalable, responsive web applications with React, Next.js, Angular and Svelte. I work with reusable UI components, state management, modern styling, REST API integration and performance optimization, with a focus on clean code and high-quality user experiences.";

const skills = [
  {
    group: "Languages & Frameworks",
    items:
      "HTML, JavaScript, TypeScript, React, Next.js, Svelte, Angular, Node.js, NestJS",
  },
  {
    group: "Styling & UI",
    items:
      "Tailwind CSS, SASS, CSS, Bootstrap, Material UI, Shadcn, GSAP, Three.js",
  },
  {
    group: "State Management",
    items: "Redux, Redux Toolkit, Zustand",
  },
  {
    group: "Tools & Platforms",
    items:
      "Git, GitHub, GitLab, GitHub Actions (CI/CD), Docker, Firebase, AWS S3, Stripe, JWT",
  },
  {
    group: "Database",
    items: "PostgreSQL, Redis",
  },
  {
    group: "Workflow",
    items: "Jira, Slack, Bitrix",
  },
];

const education = [
  {
    degree: "Master of Digital Government",
    period: "Sep 2026 – Present",
    school:
      "The Academy of Public Administration Under the President of the Republic of Azerbaijan",
    note: "",
  },
  {
    degree: "Bachelor of Computer Science",
    period: "Sep 2022 – Jun 2026",
    school:
      "The Academy of Public Administration Under the President of the Republic of Azerbaijan",
    note: "GPA: 95.3/100",
  },
];

const certificates = [
  {
    name: "Learn the basics of web: Internet fundamentals",
    issuer: "Codedamn",
    date: "Nov 2023",
  },
  { name: "REST API (Intermediate)", issuer: "HackerRank", date: "Oct 2023" },
  { name: "Get Started with Figma", issuer: "Coursera", date: "Oct 2023" },
  { name: "JavaScript", issuer: "HackerRank", date: "Oct 2023" },
  { name: "Frontend Development", issuer: "Matrix", date: "Aug 2023" },
];

const languages = [
  { name: "Azerbaijani", level: "Native" },
  { name: "English", level: "Upper-Intermediate" },
];

const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const sectionTitle =
  "text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase";
const rowTitle =
  "text-[#0A0A0A] text-[1.5rem]/[1.75rem] md:text-[2rem]/[2.25rem] font-medium tracking-[-0.0625rem] uppercase";
const body = "text-[#212325] text-[1rem]/[1.375rem]";

export default function InfoPage() {
  return (
    <main className="flex flex-col gap-12 px-5 pb-10 pt-24 md:gap-20 md:px-10 md:pb-15 md:pt-32">
      {/* header */}
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className={sectionTitle}>Info</h1>
        <p className={`${eyebrow} md:text-center whitespace-pre-line`}>
          {"BASED IN: AZERBAIJAN\nROLE: FRONTEND DEVELOPER"}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {"A bit about me, what I use\nand where I studied."}
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
              About
            </h2>
            <p className="text-[#0A0A0A] text-[1.25rem]/[1.75rem] md:text-[1.75rem]/[2.25rem] font-medium tracking-[-0.0625rem]">
              {summary}
            </p>
          </div>

          <Link
            href="/contact"
            className="group flex w-full cursor-pointer items-center justify-between gap-6 bg-[#0A0A0A] px-6 py-5 text-[#F3F0EC] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-80 md:w-auto md:min-w-64 md:self-start">
            Get in touch
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
          Skills
        </h2>
        <div>
          {skills.map((s, i) => (
            <div
              key={s.group}
              className="flex flex-col gap-3 border-b border-[#D7D9DB] px-3 py-6 md:flex-row md:items-start md:gap-4 md:py-8">
              <span className={`${eyebrow} w-10 shrink-0 md:w-85`}>
                0{i + 1}
              </span>
              <h3 className={`${rowTitle} md:w-85 md:shrink-0`}>{s.group}</h3>
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
          Education
        </h2>
        <div>
          {education.map((e, i) => (
            <div
              key={e.degree}
              className="flex flex-col gap-3 border-b border-[#D7D9DB] px-3 py-6 md:flex-row md:items-start md:gap-4 md:py-8">
              <div className="flex items-baseline gap-4 md:w-85 md:shrink-0">
                <span className={`${eyebrow} w-10 shrink-0 md:w-auto`}>
                  0{i + 1}
                </span>
                <span className={eyebrow}>{e.period}</span>
              </div>
              <h3 className={`${rowTitle} md:w-85 md:shrink-0`}>{e.degree}</h3>
              <div className="flex flex-col gap-2 md:max-w-160 md:flex-1">
                <p className={body}>{e.school}</p>
                {e.note && <p className={eyebrow}>{e.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* certificates + languages */}
      <section className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10">
        <div aria-labelledby="certs-title" className="flex flex-col gap-6">
          <h2 id="certs-title" className={eyebrow}>
            Certificates
          </h2>
          <div>
            {certificates.map((c) => (
              <div
                key={c.name}
                className="flex items-start justify-between gap-4 border-b border-[#D7D9DB] py-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[#0A0A0A] text-[1rem]/[1.375rem] font-medium">
                    {c.name}
                  </p>
                  <p className="text-[#ADADAD] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase">
                    {c.issuer}
                  </p>
                </div>
                <p className={`${eyebrow} shrink-0`}>{c.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div aria-labelledby="languages-title" className="flex flex-col gap-6">
          <h2 id="languages-title" className={eyebrow}>
            Languages
          </h2>
          <div>
            {languages.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-between gap-4 border-b border-[#D7D9DB] py-4">
                <p className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] font-medium tracking-[-0.0625rem] uppercase">
                  {l.name}
                </p>
                <p className={eyebrow}>{l.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
