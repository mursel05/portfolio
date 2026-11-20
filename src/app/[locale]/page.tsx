import Footer from "@/components/layout/Footer";
import Hero from "@/components/pages/home/Hero";
import Projects from "@/components/pages/home/Projects";
import Services from "@/components/pages/home/Services";
import { JOB_TITLE, NAME, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: `${NAME} | ${JOB_TITLE}`,
  description:
    "Mursal Haxverdiyev, full-stack developer from Azerbaijan building scalable web apps with Node.js, NestJS, PostgreSQL, React and Next.js.",
  path: "",
});

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
