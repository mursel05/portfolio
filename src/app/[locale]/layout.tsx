import type { Metadata, Viewport } from "next";
import { Anton_SC, Geist } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LenisProvider from "@/lib/lenis";
import CustomScrollbar from "@/components/layout/CustomScrollbar";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/layout/CustomCursor";
import Tracker from "@/components/layout/Tracker";
import Script from "next/script";
import {
  JOB_TITLE,
  NAME,
  SITE_URL,
  jsonLdString,
  personJsonLd,
  robots,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} | ${JOB_TITLE}`, template: `%s | ${NAME}` },
  description:
    "Mursal Haxverdiyev is a full-stack developer from Azerbaijan building scalable web apps with Node.js, NestJS, PostgreSQL, React and Next.js.",
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  robots,
};

export const viewport: Viewport = {
  themeColor: "#F3F0EC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const antonSc = Anton_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton-sc",
});

const geist = Geist({
  subsets: ["latin"],
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
    <html lang={locale} className={`${antonSc.variable} ${geist.variable}`}>
      <body className="flex">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Tracker />
            <CustomCursor />
            <CustomScrollbar />
            {children}
          </LenisProvider>
        </NextIntlClientProvider>

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B32WTL1HDH');
          `}
        </Script>
      </body>
    </html>
  );
}
