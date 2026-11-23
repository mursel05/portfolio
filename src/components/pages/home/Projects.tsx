"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/work";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_ITEM = 300;


const TOTAL = projects.length;

const imgClass =
  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const t = useTranslations("projects");

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

  const shot = (key: "image1" | "image2", label: string) => (
    <>
      {projects.map((p, i) => (
        <Image
          key={p[key]}
          src={p[key]}
          alt={t("screenshot", { name: p.name, n: label })}
          width={2000}
          height={1000}
          sizes="(min-width: 768px) 45vw, 100vw"
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
    </>
  );

  return (
    <div
      ref={sectionRef}
      className="flex h-svh flex-col justify-center gap-4 overflow-hidden px-5 py-6 md:px-10 md:py-10">
      <h2 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
        {t("title")}
      </h2>
      <div className="flex md:justify-end">
        <p className="md:w-80 md:text-end text-[#0A0A0A] text-[0.875rem]/[1.25rem] md:text-[1rem]/[1.5rem] tracking-[-0.0313rem] whitespace-pre-line">
          {t(`items.${current.id}.description`)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(7rem,11rem)_minmax(0,1fr)] md:items-center md:gap-6">
        <div className="relative order-1 aspect-2/1 w-full">
          {shot("image1", "1")}
        </div>

        <div className="relative order-3 h-(--list-h) overflow-hidden [--list-h:112px] [--gap:28px] md:order-2 md:[--list-h:240px] md:[--gap:44px] lg:[--list-h:320px] lg:[--gap:50px]">
          <div className="pointer-events-none bg-linear-to-b from-[#f5f5f7] from-29% to-transparent z-99 absolute top-0 w-full h-10 md:h-20" />
          <div className="pointer-events-none bg-linear-to-t from-[#f5f5f7] from-29% to-transparent z-99 absolute bottom-0 w-full h-10 md:h-20" />
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

        <div className="relative order-2 aspect-2/1 w-full md:order-3">
          {shot("image2", "2")}
        </div>
      </div>
    </div>
  );
};

export default Projects;
