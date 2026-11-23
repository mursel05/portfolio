import Footer from "@/components/layout/Footer";
import Info from "@/components/pages/info";
import Navbar from "@/components/layout/Navbar";
import { pageMetadata } from "@/lib/seo";
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
    title: t("info.title"),
    description: t("info.description"),
    path: "/info",
    locale,
  });
}

const InfoPage = () => {
  return (
    <div className="w-full min-w-0">
      <Navbar />
      <Info />
      <Footer />
    </div>
  );
};

export default InfoPage;
