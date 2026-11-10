import { Link } from "@/i18n/navigation";
import { socials } from "@/lib/info";
import Image from "next/image";

const nav = [
  { label: "work", href: "/work" },
  { label: "info", href: "/info" },
  { label: "contact", href: "/contact" },
];

const small =
  "text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const bar =
  "text-[0.875rem] md:text-[1rem] font-semibold tracking-[-0.0625rem] uppercase";

const Hero = () => {
  return (
    <section className="relative w-full min-h-svh overflow-hidden flex flex-col text-white">
      <Image
        src="/images/bg-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <Image
        src="/images/bg-hero-overlay.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-5"
      />

      <h1 className="relative px-5 md:px-10 pt-24 md:pt-30 font-anton uppercase text-[#F3F0EC] text-[clamp(4rem,15.5vw,15.625rem)] leading-20 tracking-[-0.02em]">
        Hi, I&apos;m
        <br className="md:hidden" /> Mursal
      </h1>

      <div className="relative mt-auto px-5 md:px-10 pb-10 md:pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <p className={`${small} whitespace-pre-line`}>
          {
            "Frontend developer building fast,\nscalable and accessible web apps\nwith clean, reusable code."
          }
        </p>
        <p className={`${small} whitespace-pre-line md:text-center`}>
          {
            "React · Next.js · TypeScript\nAngular · Svelte · Tailwind CSS\nGSAP · Three.js"
          }
        </p>
        <p className={`${small} whitespace-pre-line md:text-end`}>
          {
            "Frontend Developer @Microsol.\nPreviously Togetech, SHI Studio,\nPrepare.sh and Sabah.Hub."
          }
        </p>
      </div>

      <div className="relative px-5 md:px-10 w-full">
        <div className="py-5 md:py-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-white">
          <a href="mailto:mursal.haxverdiyev@gmail.com" className={bar}>
            Say hello
          </a>

          <div className="flex flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4 md:gap-8">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={bar}>
                  {s.label}
                </a>
                {i < socials.length - 1 && <span className={bar}>/</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={bar}>
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
