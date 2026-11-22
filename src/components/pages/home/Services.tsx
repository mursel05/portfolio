"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    title: "Full-Stack Web Applications",
    subtitle: "Next.js, NestJS and PostgreSQL",
    description:
      "End-to-end products from database schema to UI: NestJS backends, Prisma and PostgreSQL, React and Next.js frontends, and payment integration with Paddle or Stripe, as in 3ssay and Jeff.",
  },
  {
    title: "Backend & REST APIs",
    subtitle: "Node.js, NestJS and Express",
    description:
      "Backend services and RESTful APIs with clean, maintainable business logic, JWT-based authentication and authorization, and third-party integrations.",
  },
  {
    title: "Databases & Data Modeling",
    subtitle: "PostgreSQL, MongoDB and Redis",
    description:
      "Relational and NoSQL schema design, data access layers with Prisma and TypeORM, and query and data model optimization.",
  },
  {
    title: "Frontend & Mobile",
    subtitle: "React, Next.js, Angular and Ionic",
    description:
      "Responsive interfaces and reusable components with React, Next.js, Angular and Svelte, plus cross-platform mobile apps with Ionic. TanStack Query, React Hook Form and Zod for data and forms.",
  },
  {
    title: "DevOps & Deployment",
    subtitle: "Docker, GitHub Actions and Azure",
    description:
      "Containerized apps with Docker and Docker Compose, CI/CD pipelines with GitHub Actions, and deployments on Azure, with AWS S3 and Firebase where needed.",
  },
  {
    title: "Animation & Interactive 3D",
    subtitle: "GSAP and Three.js",
    description:
      "Smooth scroll-driven animations and interactive 3D scenes that make a site feel alive, without hurting performance. Used on Morninx.",
  },
];

const Services = () => {
  const [open, setOpen] = useState(-1);

  return (
    <div className="flex flex-col gap-8 px-5 py-6 md:gap-15 md:px-10 md:py-10">
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-15">
        <h2 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          Services
        </h2>
        <p className="text-start md:text-center text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] tracking-[-0.035rem] whitespace-pre-line">
          {"EXPERIENCE: 3+ YEARS\nCOMPANIES: 5\nPROJECTS: 5 FEATURED"}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {
            "I build web apps end to end:\nAPIs, databases and the\ninterfaces on top of them."
          }
        </p>
      </div>

      <Image
        src="/images/service.png"
        alt="Services"
        width={1360}
        height={370}
        sizes="100vw"
        className="h-48 w-full object-cover md:h-72 lg:h-92.5"
      />

      <div>
        {data.map((item, index) => {
          const isOpen = open === index;

          return (
            <div key={item.title}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-[#D7D9DB] px-3 py-4 text-left md:py-6">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="w-10 shrink-0 text-[#212325] text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] md:w-85">
                    0{index + 1}
                  </span>
                  <span className="text-[#0A0A0A] text-[1.5rem]/[1.75rem] sm:text-[2rem]/[2.25rem] lg:text-[2.5rem]/[2.75rem] font-medium tracking-[-0.0625rem] uppercase">
                    {item.title}
                  </span>
                </div>
                {isOpen ? (
                  <Minus size={20} className="shrink-0" />
                ) : (
                  <Plus size={20} className="shrink-0" />
                )}
              </button>

              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}>
                <div className="min-h-0 overflow-hidden">
                  <div
                    className={`flex flex-col gap-3 px-3 py-6 transition-opacity duration-500 ease-in-out md:flex-row md:items-center md:gap-4 md:py-10 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}>
                    <p className="pl-14 text-[#212325] text-[1rem]/[1.375rem] font-medium md:w-85 md:shrink-0 md:pl-0 md:font-normal">
                      {item.subtitle}
                    </p>
                    <p className="pl-14 text-[#212325] text-[1rem]/[1.375rem] md:max-w-160 md:flex-1 md:pl-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
