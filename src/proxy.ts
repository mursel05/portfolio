import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function proxy(req: NextRequest) {
  return intl(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|sitemap.xml|robots.txt|_next/image|favicon.ico)(?!.*\\.).*)",
  ],
};
