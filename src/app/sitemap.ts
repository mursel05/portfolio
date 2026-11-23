import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { INDEXABLE, SITE_URL, languageAlternates, localizedPath } from "@/lib/seo";

const pages: {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
  { path: "/info", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];

  // Evaluated at build time, so lastModified is the deploy date.
  const lastModified = new Date();

  const abs = (p: string) => `${SITE_URL}${p}`;

  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: abs(localizedPath(locale, page.path)),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page.path)).map(([l, p]) => [
            l,
            abs(p),
          ]),
        ),
      },
    })),
  );
}
