import Image from "next/image";

const projects = [
  {
    name: "Morninx",
    type: "Company website",
    stack: "Next.js · Tailwind CSS · Three.js · GSAP",
    description:
      "Interactive 3D model built with Three.js, with the whole page animated using GSAP.",
    image1: "/images/morninx-1.png",
    image2: "/images/morninx-2.png",
  },
  {
    name: "3ssay",
    type: "AI-powered essay evaluation platform",
    stack: "Next.js · TypeScript · NestJS · Prisma · PostgreSQL · Paddle",
    description:
      "Evaluates essays with AI, generating numerical scores and detailed feedback.",
    image1: "/images/3ssay-1.png",
    image2: "/images/3ssay-2.png",
  },
  {
    name: "Jeff",
    type: "Company website",
    stack: "Next.js · Tailwind CSS · GSAP",
    description:
      "Company website built with Next.js and Tailwind CSS, with smooth GSAP animations.",
    image1: "/images/jeff-1.png",
    image2: "/images/jeff-2.png",
  },
  {
    name: "Hiri",
    type: "Job posting and application platform",
    stack: "React · Next.js · Tailwind CSS",
    description:
      "Hybrid React and Next.js platform where employers post jobs and candidates apply.",
    image1: "/images/hiri-1.png",
    image2: "/images/hiri-2.png",
  },
];

const experience = [
  {
    company: "Microsol",
    role: "Frontend Developer",
    period: "Mar 2026 – Nov 2026",
    summary:
      "Responsive production apps with React, Next.js, TypeScript and Tailwind CSS. TanStack Query for server state, React Hook Form and Zod for complex forms.",
  },
  {
    company: "Togetech",
    role: "Software Engineer",
    period: "Sep 2025 – Feb 2026",
    summary:
      "Component-based interfaces across React, Next.js and Angular. Refactored shared UI into a consistent design system and implemented JWT auth flows.",
  },
  {
    company: "SHI Studio",
    role: "Software Engineer",
    period: "Apr 2025 – Dec 2025",
    summary:
      "Led delivery of frontend-heavy apps in Angular and React with TypeScript. Built reusable component systems and role-based UI behavior.",
  },
  {
    company: "Prepare.sh",
    role: "Software Engineer",
    period: "Jul 2024 – Apr 2025",
    summary:
      "Interactive screens and dashboard-style views in React and Svelte, with client-side validation, state management and API integrations.",
  },
  {
    company: "Sabah.Hub",
    role: "Frontend Developer",
    period: "Apr 2023 – Nov 2024",
    summary:
      "Accessible, optimized interfaces with React, SASS and TypeScript. Improved load performance and cross-device responsiveness.",
  },
];

const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";

export default function Work() {
  return (
    <main className="flex flex-col gap-10 px-5 pb-10 pt-24 md:gap-15 md:px-10 md:pb-15 md:pt-32">
      {/* header */}
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          Work
        </h1>
        <p className={`${eyebrow} md:text-center`}>
          {`PROJECTS: ${String(projects.length).padStart(2, "0")}\nCOMPANIES: ${String(experience.length).padStart(2, "0")}`}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {"Selected projects and\nwhere I've built them."}
        </p>
      </div>

      {/* projects */}
      <section aria-labelledby="projects-title" className="flex flex-col gap-6">
        <h2 id="projects-title" className={eyebrow}>
          Selected projects
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-15">
          {projects.map((p, i) => (
            <article key={p.name} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D7D9DB]">
                <Image
                  src={p.image1}
                  alt={`${p.name} screenshot 1`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={p.image2}
                  alt={`${p.name} screenshot 2`}
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
                <p className={`${eyebrow} text-end`}>{p.type}</p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[#212325] text-[1rem]/[1.375rem]">
                  {p.description}
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
          Experience
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
                <span className={eyebrow}>{e.period}</span>
              </div>

              <div className="flex flex-col gap-1 pl-14 md:w-85 md:shrink-0 md:pl-0">
                <h3 className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] md:text-[2rem]/[2.25rem] font-medium tracking-[-0.0625rem] uppercase">
                  {e.company}
                </h3>
                <p className={eyebrow}>{e.role}</p>
              </div>

              <p className="pl-14 text-[#212325] text-[1rem]/[1.375rem] md:max-w-160 md:flex-1 md:pl-0">
                {e.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
