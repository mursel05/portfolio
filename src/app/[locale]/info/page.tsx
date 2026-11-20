import Footer from "@/components/layout/Footer";
import Info from "@/components/pages/info";
import Navbar from "@/components/layout/Navbar";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "About, Skills & Education",
  description:
    "About Mursal Haxverdiyev: full-stack developer based in Azerbaijan. Skills in TypeScript, Node.js, NestJS, React, Next.js and PostgreSQL, education and certificates.",
  path: "/info",
});

const InfoPage = () => {
  return (
    <div>
      <Navbar />
      <Info />
      <Footer />
    </div>
  );
};

export default InfoPage;
