"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE =
  "a, button, input, textarea, select, label, [role='button'], summary";
const ROTATE = 45;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const el = cursorRef.current!;
    const root = document.documentElement;
    root.classList.remove("has-custom-cursor");

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      rotate: ROTATE,
      opacity: 0,
    });

    const xTo = gsap.quickTo(el, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.2, ease: "power3.out" });

    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.2 });
        visible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest(INTERACTIVE);
      gsap.to(el, {
        rotate: hit ? 0 : ROTATE,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onDown = () =>
      gsap.to(el, { scale: 0.8, duration: 0.15, overwrite: "auto" });
    const onUp = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest(INTERACTIVE);
      gsap.to(el, { scale: hit ? 1 : 1, duration: 0.2, overwrite: "auto" });
    };

    const onLeave = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-10000 hidden select-none font-mono text-[1.2rem]/[1.2rem] font-bold tracking-[-0.1rem] text-white opacity-0 mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block">
      {"</>"}
    </div>
  );
}
