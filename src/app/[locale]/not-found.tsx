"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";

const small =
  "text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const bar =
  "text-[0.875rem] md:text-[1rem] font-semibold tracking-[-0.0625rem] uppercase";

export default function NotFoundPage() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-svh flex-col justify-between overflow-hidden bg-[#0A0A0A] px-5 py-5 text-[#F3F0EC] selection:bg-[#F3F0EC] selection:text-[#0A0A0A] md:px-10 md:py-7">
      <div className="flex items-center justify-between border-b border-[#6D6C6A] pb-5 md:pb-7">
        <p className={`${small} text-[#ADADAD]`}>Error</p>
        <p className={`${small} text-[#ADADAD]`}>Page not found</p>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <GlitchText
          text="404"
          label="404, page not found"
          className="select-none font-anton text-[clamp(7rem,min(36vw,50svh),40rem)] leading-[0.85] tracking-[-0.02em]"
        />
      </div>

      <div className="flex flex-col gap-6 border-t border-[#6D6C6A] pt-5 md:flex-row md:items-center md:justify-between md:pt-7">
        <p className="min-w-0 break-all font-mono text-[0.875rem]/[1.25rem] text-[#ADADAD] md:text-[1rem]/[1.5rem]">
          <span className="text-[#F3F0EC]">GET</span> {pathname || "/"}{" "}
          <span className="text-[#F3F0EC]">&rarr; 404</span>
          <span className="ml-1 inline-block animate-pulse">_</span>
        </p>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className={`${bar} cursor-pointer text-start text-[#ADADAD] transition-opacity duration-300 hover:opacity-60`}>
            Go back
          </button>

          <Link
            href="/"
            className="group flex w-full items-center justify-between gap-6 bg-[#F3F0EC] px-6 py-5 text-[#0A0A0A] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-80 md:w-auto md:min-w-64">
            Back home
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
