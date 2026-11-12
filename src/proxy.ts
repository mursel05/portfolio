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
    "/((?!api|_next/static|_next/image|sitemap.xml|robots.txt|favicon.ico)(?!.*\\.).*)",
  ],
};
