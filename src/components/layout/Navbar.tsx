"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, usePathname } from "@/i18n/navigation";

const links = [
  { label: "home", href: "/" },
  { label: "work", href: "/work" },
  { label: "info", href: "/info" },
  { label: "contact", href: "/contact" },
];

const socials = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mursal-hakhverdiyev/",
  },
  { label: "github", href: "https://github.com/mursel05" },
];

const EMAIL = "mursal.haxverdiyev@gmail.com";

const small =
  "text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const bar =
  "text-[0.875rem] md:text-[1rem] font-semibold tracking-[-0.0625rem] uppercase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current!;
    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power4.inOut",
          },
        )
        .fromTo(
          ".nav-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power4.out" },
          "-=0.3",
        )
        .fromTo(
          ".nav-meta",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          "-=0.5",
        );
    }, overlay);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (open) {
      tl.timeScale(1).play();
      document.body.style.overflow = "hidden";
    } else {
      tl.timeScale(1.4).reverse();
      document.body.style.overflow = "";
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  return (
    <>
      <div
        ref={overlayRef}
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0A] px-5 pb-6 pt-24 [clip-path:inset(0_0_100%_0)] md:px-10 md:py-20 ${
          open ? "" : "pointer-events-none"
        }`}>
        <nav aria-label="Main">
          <ul className="group/list flex flex-col">
            {links
              .filter((l) => l.href !== (pathname === "" ? "/" : pathname))
              .map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <Link
                    href={l.href}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="nav-line flex items-baseline gap-4 py-1 transition-opacity duration-300 group-hover/list:opacity-30 hover:opacity-100! md:gap-8">
                    <span className={`${small} w-8 shrink-0 text-[#ADADAD]`}>
                      0{i + 1}
                    </span>
                    <span className="font-anton uppercase text-[clamp(3.5rem,14vw,12rem)] leading-[0.95] tracking-[-0.02em] text-[#F3F0EC]">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <header className="fixed inset-x-0 top-0 z-60 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10 md:py-7">
        <Link
          href="/"
          className={`${bar} transition-opacity duration-300 hover:opacity-60`}>
          Mursal
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className={`${bar} flex cursor-pointer items-center gap-2 transition-opacity duration-300 hover:opacity-60`}>
          {open ? "Close" : "Menu"}
        </button>
      </header>
    </>
  );
}
