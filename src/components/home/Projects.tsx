"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = 8;
const ITEM_H = 16;
const GAP = 50;
const STEP = ITEM_H + GAP;
const LIST_H = 350;
const SCROLL_PER_ITEM = 300;

const projects = Array.from({ length: TOTAL }, (_, i) => ({
  name: `project-${i + 1}`,
  image1: `/images/project-${i + 1}-1.png`,
  image2: `/images/project-${i + 1}-2.png`,
}));

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        y: -(TOTAL - 1) * STEP,
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

  return (
    <div
      ref={sectionRef}
      className="flex h-screen flex-col justify-center gap-4 px-10 py-10">
      <h2 className="text-[#0A0A0A] text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
        Projects
      </h2>
      <p className="text-end text-[#0A0A0A] text-[1rem]/[1.5rem] tracking-[-0.0313rem] whitespace-pre-line">
        {"Case studies that walk through\nour approach and impact."}
      </p>

      <div className="flex items-center">
        <div className="relative w-120 h-100 shrink-0">
          {projects.map((p, i) => (
            <Image
              key={p.image1}
              src={p.image1}
              alt={p.name}
              width={480}
              height={400}
              priority={i < 2}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{
                opacity: i === active ? 1 : 0,
                zIndex: i === active ? 2 : 1,
                transitionDelay: i === active ? "0ms" : "500ms",
              }}
            />
          ))}
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{ height: LIST_H }}>
          <div className="pointer-events-none bg-linear-to-b from-[#f5f5f7] from-29% to-transparent z-99 absolute top-0 w-full h-20" />
          <div className="pointer-events-none bg-linear-to-t from-[#f5f5f7] from-29% to-transparent z-99 absolute bottom-0 w-full h-20" />
          <div
            ref={trackRef}
            className="flex flex-col items-center will-change-transform"
            style={{
              gap: GAP,
              paddingTop: LIST_H / 2 - ITEM_H / 2,
              paddingBottom: LIST_H / 2 - ITEM_H / 2,
            }}>
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

        <div className="relative w-120 h-100 shrink-0">
          {projects.map((p, i) => (
            <Image
              key={p.image2}
              src={p.image2}
              alt={p.name}
              width={480}
              height={400}
              priority={i < 2}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
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
