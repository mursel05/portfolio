import type { Metadata } from "next";
import { EMAIL, socials } from "@/lib/info";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://mursal.dev"
).replace(/\/+$/, "");

/** Only the production deployment may be indexed; previews (test.mursal.dev) stay out of search. */
export const INDEXABLE =
  (process.env.VERCEL_ENV ?? "production") === "production";

export const NAME = "Mursal Haxverdiyev";
export const ALTERNATE_NAMES = ["Mürsəl Haxverdiyev"];
export const JOB_TITLE = "Full-Stack Developer";

const OG_IMAGE = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: `${NAME} | ${JOB_TITLE}`,
};

export const robots: Metadata["robots"] = INDEXABLE
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    }
  : { index: false, follow: false };

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Path without locale prefix, e.g. "" or "/work". */
  path: string;
}): Metadata {
  const fullTitle = path ? `${title} | ${NAME}` : title;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      type: "website",
      url: path || "/",
      siteName: NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        alternateName: ALTERNATE_NAMES,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${NAME} | ${JOB_TITLE}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: NAME,
        alternateName: ALTERNATE_NAMES,
        givenName: "Mursal",
        familyName: "Haxverdiyev",
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        email: `mailto:${EMAIL}`,
        jobTitle: [JOB_TITLE, "Software Engineer"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "The Academy of Public Administration Under the President of the Republic of Azerbaijan",
        },
        address: { "@type": "PostalAddress", addressCountry: "AZ" },
        nationality: { "@type": "Country", name: "Azerbaijan" },
        knowsLanguage: ["az", "en"],
        knowsAbout: [
          "Full-stack web development",
          "TypeScript",
          "Node.js",
          "NestJS",
          "React",
          "Next.js",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "REST APIs",
          "Docker",
          "GSAP",
          "Three.js",
        ],
        sameAs: socials.map((s) => s.href),
      },
    ],
  };
}

/** Serialises JSON-LD safely for an inline <script> (no `</script>` breakout). */
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
