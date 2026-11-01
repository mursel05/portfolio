import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Image
        src="/images/bg-hero.png"
        alt="Hero Image"
        width={4000}
        height={2500}
        loading="eager"
        className="w-screen h-screen object-cover"
      />
      <Image
        src="/images/bg-hero-overlay.png"
        alt="Hero Image"
        width={256}
        height={256}
        className="w-full h-full object-cover absolute top-0 left-0 opacity-5"
      />
      <h1 className="w-full absolute top-20 px-10 transform text-[#F3F0EC] text-[15.625rem]/[14.0625rem] tracking-[-0.3187rem] uppercase font-anton">
        HI, I&apos;M MURSAL
      </h1>
      <div className="absolute bottom-1/3 px-10 transform text-white flex justify-between w-full">
        <p className="text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase">
          {
            "Building modern web experiences\nthat are fast, scalable, and\ncrafted with clean code."
          }
        </p>
        <p className="text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] text-center uppercase">
          {"Creative Director\nMotion & visual designer."}
        </p>
        <p className="text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] text-end uppercase">
          {
            "Frontend Developer @MicroSol.\nPreviously worked with Saas, crm and websites."
          }
        </p>
      </div>
      <div className="absolute bottom-0 px-10 w-full">
        <div className="text-white py-7 flex justify-between w-full border-t border-white">
          <Link href="/pc" className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
            Nese
          </Link>
          <div className="flex gap-8">
            <Link
              href="https://www.behance.net/"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              behance
            </Link>
            <p className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              /
            </p>
            <Link
              href="https://www.linkedin.com/in/mursal-hakhverdiyev/"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              linkedin
            </Link>
            <p className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              /
            </p>
            <Link
              href="https://github.com/mursel05"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              github
            </Link>
          </div>
          <div className="flex gap-8">
            <Link
              href="/work"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              work
            </Link>
            <Link
              href="/info"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              Info
            </Link>
            <Link
              href="/contact"
              className="text-[1rem] font-semibold tracking-[-0.0625rem] text-start uppercase">
              contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
