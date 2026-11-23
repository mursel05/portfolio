import Footer from "@/components/layout/Footer";
import Contact from "@/components/pages/contact";
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
    title: t("contact.title"),
    description: t("contact.description"),
    path: "/contact",
    locale,
  });
}

const ContactPage = () => {
  return (
    <div className="w-full min-w-0">
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
