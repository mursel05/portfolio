import type { Metadata, Viewport } from "next";
import { Anton_SC, Geist, Oswald } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import LenisProvider from "@/lib/lenis";
import CustomScrollbar from "@/components/layout/CustomScrollbar";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/layout/CustomCursor";
import Tracker from "@/components/layout/Tracker";
import Script from "next/script";
import {
  INDEXABLE,
  NAME,
  SITE_URL,
  jsonLdString,
  personJsonLd,
  robots,
} from "@/lib/seo";

const GA_ID = "G-B32WTL1HDH";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${NAME} | ${t("jobTitle")}`,
      template: `%s | ${NAME}`,
    },
    description: t("home.description"),
    applicationName: NAME,
    authors: [{ name: NAME, url: SITE_URL }],
    creator: NAME,
    robots,
  };
}

export const viewport: Viewport = {
  themeColor: "#F3F0EC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const antonSc = Anton_SC({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-anton-sc",
});

// Anton SC has no Cyrillic, so Russian display text falls back to Oswald (see .font-anton).
const oswald = Oswald({
  subsets: ["cyrillic"],
  weight: "700",
  variable: "--font-oswald",
  preload: false,
});

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${antonSc.variable} ${oswald.variable} ${geist.variable}`}>
      <body className="flex">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd(locale)) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Tracker />
            <CustomCursor />
            <CustomScrollbar />
            {children}
          </LenisProvider>
        </NextIntlClientProvider>

        {INDEXABLE && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
