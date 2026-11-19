import Footer from "@/components/layout/Footer";
import Hero from "@/components/pages/home/Hero";
import Projects from "@/components/pages/home/Projects";
import Services from "@/components/pages/home/Services";
import { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Mursal Haxverdiyev | Full-Stack Developer";
  const description =
    "Full-stack developer building scalable web apps with Node.js, NestJS, PostgreSQL, React and Next.js. Selected projects, experience and contact.";
  const siteName = "Mursal Haxverdiyev";
  const keywords = [
    "Mursal Haxverdiyev",
    "full-stack developer",
    "software engineer",
    "Node.js developer",
    "NestJS developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "PostgreSQL",
    "web developer Azerbaijan",
    "portfolio",
  ];
  const ogImage = {
    url: "/images/og-image.png",
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteName, url: APP_URL }],
    creator: siteName,
    metadataBase: new URL(APP_URL),
    openGraph: {
      type: "website",
      url: APP_URL,
      siteName,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Projects />
      <Services />
      <Footer />
    </div>
  );
};

export default HomePage;
