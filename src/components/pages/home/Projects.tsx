"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_ITEM = 300;

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

const TOTAL = projects.length;

const imgClass =
  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;

      gsap.to(track, {
        y: () => {
          const items = track.children;
          const first = items[0] as HTMLElement;
          const last = items[items.length - 1] as HTMLElement;
          return -(last.offsetTop - first.offsetTop);
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(TOTAL - 1) * SCROLL_PER_ITEM}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (TOTAL - 1));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          },
        },
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const current = projects[active];

  return (
    <div
      ref={sectionRef}
      className="flex h-svh flex-col justify-center gap-4 overflow-hidden px-5 py-6 md:px-10 md:py-10">
      <h2 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
        Projects
      </h2>
      <div className="flex md:justify-end">
        <p className="md:w-80 md:text-end text-[#0A0A0A] text-[0.875rem]/[1.25rem] md:text-[1rem]/[1.5rem] tracking-[-0.0313rem] whitespace-pre-line">
          {current.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:items-center md:gap-0 md:grid-cols-[minmax(0,30rem)_minmax(0,1fr)_minmax(0,30rem)]">
        <div className="relative order-1 aspect-4/3 w-full md:aspect-auto md:h-72 lg:h-100">
          {projects.map((p, i) => (
            <Image
              key={p.image1}
              src={p.image1}
              alt={`${p.name} screenshot 1`}
              width={480}
              height={400}
              sizes="(min-width: 768px) 480px, 50vw"
              priority={i < 2}
              loading="eager"
              className={imgClass}
              style={{
                opacity: i === active ? 1 : 0,
                zIndex: i === active ? 2 : 1,
                transitionDelay: i === active ? "0ms" : "500ms",
              }}
            />
          ))}
        </div>

        <div className="relative order-3 col-span-2 h-(--list-h) overflow-hidden [--list-h:160px] [--gap:32px] md:order-2 md:col-span-1 md:[--list-h:300px] lg:[--list-h:350px] md:[--gap:50px]">
          <div className="pointer-events-none bg-linear-to-b from-[#f5f5f7] from-29% to-transparent z-99 absolute top-0 w-full h-12 md:h-20" />
          <div className="pointer-events-none bg-linear-to-t from-[#f5f5f7] from-29% to-transparent z-99 absolute bottom-0 w-full h-12 md:h-20" />
          <div
            ref={trackRef}
            className="flex flex-col items-center gap-(--gap) pt-[calc(var(--list-h)/2-0.5rem)] pb-[calc(var(--list-h)/2-0.5rem)] will-change-transform">
            {projects.map((p, i) => (
              <span
                key={p.name}
                className="font-medium text-[0.9375rem]/[1rem] tracking-[-0.0313rem] transition-colors duration-300"
                style={{ color: i === active ? "#212325" : "#ADADAD" }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative order-2 aspect-4/3 w-full md:order-3 md:aspect-auto md:h-72 lg:h-100">
          {projects.map((p, i) => (
            <Image
              key={p.image2}
              src={p.image2}
              alt={`${p.name} screenshot 2`}
              width={480}
              height={400}
              sizes="(min-width: 768px) 480px, 50vw"
              priority={i < 2}
              loading="eager"
              className={imgClass}
              style={{
                opacity: i === active ? 1 : 0,
                zIndex: i === active ? 2 : 1,
                transitionDelay: i === active ? "0ms" : "500ms",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
