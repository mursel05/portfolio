"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/work";

const ids = [
  "fullstack",
  "backend",
  "databases",
  "frontend",
  "devops",
  "animation",
] as const;

const Services = () => {
  const [open, setOpen] = useState(-1);
  const t = useTranslations("services");

  return (
    <div className="flex flex-col gap-8 px-5 py-6 md:gap-15 md:px-10 md:py-10">
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-15">
        <h2 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          {t("title")}
        </h2>
        <p className="text-start md:text-center text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] tracking-[-0.035rem] uppercase whitespace-pre-line">
          {t("stats", { count: projects.length })}
        </p>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {t("intro")}
        </p>
      </div>

      <Image
        src="/images/service.png"
        alt={t("imageAlt")}
        width={1360}
        height={370}
        sizes="100vw"
        className="h-48 w-full object-cover md:h-72 lg:h-92.5"
      />

      <div>
        {ids.map((id, index) => {
          const isOpen = open === index;
          const item = {
            title: t(`items.${id}.title`),
            subtitle: t(`items.${id}.subtitle`),
            description: t(`items.${id}.description`),
          };

          return (
            <div key={id}>
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
