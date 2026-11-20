import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/seo";

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

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path || "/"}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
