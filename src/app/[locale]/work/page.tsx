import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Work from "@/components/pages/work";
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
    title: t("work.title"),
    description: t("work.description"),
    path: "/work",
    locale,
  });
}

const WorkPage = () => {
  return (
    <div className="w-full min-w-0">
      <Navbar />
      <Work />
      <Footer />
    </div>
  );
};

export default WorkPage;
