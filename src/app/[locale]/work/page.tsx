import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Work from "@/components/pages/work";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Work & Experience",
  description:
    "Selected projects by Mursal Haxverdiyev (Morninx, 3ssay, Jeff, Hiri, STORO) and experience at Microsol, TogeTech, SHI Studio, Prepare.sh and Sabah.Hub.",
  path: "/work",
});

const WorkPage = () => {
  return (
    <div>
      <Navbar />
      <Work />
      <Footer />
    </div>
  );
};

export default WorkPage;
