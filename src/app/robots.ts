export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/public/", "/work", "/contact", "/info"],
      disallow: [],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
