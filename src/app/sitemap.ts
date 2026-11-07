import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const langs = ["en", "az", "ru"];
  const pages: {
    path: string;
    changeFrequency:
      | "daily"
      | "always"
      | "hourly"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
    lastModified: Date;
  }[] = [
    {
      path: "",
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      path: "/work",
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(),
    },
    {
      path: "/info",
      changeFrequency: "yearly",
      priority: 0.4,
      lastModified: new Date(),
    },
  ];

  return pages.flatMap((page) =>
    langs.map((lang) => ({
      url: `${baseUrl}/${lang}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          "x-default": `${baseUrl}/en${page.path}`,
          en: `${baseUrl}/en${page.path}`,
          az: `${baseUrl}/az${page.path}`,
          ru: `${baseUrl}/ru${page.path}`,
        },
      },
    })),
  );
}
