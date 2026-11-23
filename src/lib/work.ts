/** Locale-independent project and experience data. Text lives in the i18n messages under the same ids. */

export const projects = [
  {
    id: "morninx",
    name: "Morninx",
    stack: "Next.js · Tailwind CSS · Three.js · GSAP",
    image1: "/images/morninx-1.png",
    image2: "/images/morninx-2.png",
  },
  {
    id: "3ssay",
    name: "3ssay",
    stack: "Next.js · TypeScript · NestJS · Prisma · PostgreSQL · Paddle",
    image1: "/images/3ssay-1.png",
    image2: "/images/3ssay-2.png",
  },
  {
    id: "jeff",
    name: "Jeff",
    stack: "Next.js · NestJS · PostgreSQL · Redis",
    image1: "/images/jeff-1.png",
    image2: "/images/jeff-2.png",
  },
  {
    id: "hiri",
    name: "Hiri",
    stack: "React · Next.js · Tailwind CSS",
    image1: "/images/hiri-1.png",
    image2: "/images/hiri-2.png",
  },
  {
    id: "storo",
    name: "Storo",
    stack:
      "Next.js · NestJS · TypeScript · Prisma · PostgreSQL · Redis · Tailwind CSS · GSAP",
    image1: "/images/storo-1.png",
    image2: "/images/storo-2.png",
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];

/** Periods are "YYYY-MM"; `end: null` means ongoing. */
export const experience = [
  { id: "microsol", company: "Microsol", start: "2026-02", end: "2026-11" },
  { id: "togetech", company: "TogeTech", start: "2025-09", end: "2026-02" },
  { id: "shi", company: "SHI Studio", start: "2025-04", end: "2025-12" },
  { id: "prepare", company: "Prepare.sh", start: "2024-07", end: "2025-04" },
  { id: "sabah", company: "Sabah.Hub", start: "2023-04", end: "2024-11" },
] as const;

export const education = [
  { id: "master", start: "2026-09", end: null },
  { id: "bachelor", start: "2022-09", end: "2026-06" },
] as const;

export const certificates = [
  { id: "codedamn", issuer: "Codedamn", date: "2023-11" },
  { id: "restApi", issuer: "HackerRank", date: "2023-10" },
  { id: "figma", issuer: "Coursera", date: "2023-10" },
  { id: "javascript", issuer: "HackerRank", date: "2023-10" },
  { id: "frontend", issuer: "Matrix", date: "2023-08" },
] as const;

/** Formats "YYYY-MM" as a short month + year in the given locale, e.g. "Feb 2026". */
export function formatMonth(ym: string, locale: string) {
  const [y, m] = ym.split("-").map(Number);
  const text = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
  // Some locales add a trailing "г." / period; keep it compact and consistent.
  return text.replace(/\s?г\.$/, "").replace(/\.(?=\s)/, "");
}

export function formatPeriod(
  start: string,
  end: string | null,
  locale: string,
  present: string,
) {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : present}`;
}
