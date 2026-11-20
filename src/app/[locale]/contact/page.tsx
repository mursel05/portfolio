import Footer from "@/components/layout/Footer";
import Contact from "@/components/pages/contact";
import Navbar from "@/components/layout/Navbar";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Mursal Haxverdiyev about full-stack roles, freelance projects or collaborations. Email, phone, LinkedIn and GitHub.",
  path: "/contact",
});

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
