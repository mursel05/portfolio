import Footer from "@/components/layout/Footer";
import Hero from "@/components/pages/home/Hero";
import Projects from "@/components/pages/home/Projects";
import Services from "@/components/pages/home/Services";
import { NAME, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: `${NAME} | ${t("jobTitle")}`,
    description: t("home.description"),
    path: "",
    locale,
  });
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
