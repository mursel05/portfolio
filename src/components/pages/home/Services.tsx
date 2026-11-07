"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    title: "Web Applications",
    subtitle: "React, Next.js and TypeScript",
    description:
      "Responsive, scalable web apps built with React, Next.js, TypeScript and Tailwind CSS, from dashboards and SaaS products to company websites. Also comfortable with Angular and Svelte when a project calls for it.",
  },
  {
    title: "UI Components & Design Systems",
    subtitle: "From Figma to reusable code",
    description:
      "Pixel-accurate interfaces built from Figma designs, with reusable component libraries, consistent styling and cross-browser compatibility. Tailwind CSS, SASS, Shadcn and Material UI.",
  },
  {
    title: "Animation & Interactive 3D",
    subtitle: "GSAP and Three.js",
    description:
      "Smooth scroll-driven animations and interactive 3D scenes that make a site feel alive, without hurting performance. Used on Morninx and Jeff.",
  },
  {
    title: "API Integration & Auth",
    subtitle: "REST, JWT and data fetching",
    description:
      "Connecting the frontend to REST APIs with TanStack Query, JWT-based authentication, role-based UI behavior, and complex forms validated with React Hook Form and Zod.",
  },
  {
    title: "Full-Stack Development",
    subtitle: "NestJS, Prisma and PostgreSQL",
    description:
      "End-to-end products when you need more than a frontend: NestJS backends, Prisma and PostgreSQL databases, and payment integration with Paddle or Stripe, as in the 3ssay platform.",
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
          {"EXPERIENCE: 3+ YEARS\nCOMPANIES: 5\nPROJECTS: 4 FEATURED"}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {
            "I build web apps, interfaces,\nanimations and the APIs\nbehind them."
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
