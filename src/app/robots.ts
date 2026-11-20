import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Previews stay crawlable so bots can see the noindex header/meta and drop them.
  if (!INDEXABLE) return { rules: { userAgent: "*", allow: "/" } };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/stats"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
