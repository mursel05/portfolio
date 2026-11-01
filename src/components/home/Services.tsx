"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Services = () => {
  const [open, setOpen] = useState(-1);

  const data = [
    {
      title: "Web Development",
      subtitle: "Building responsive and scalable web applications",
      description:
        "We build responsive and scalable web applications using modern technologies and best practices.",
    },
    {
      title: "Web Development",
      subtitle: "Building responsive and scalable web applications",
      description:
        "We build responsive and scalable web applications using modern technologies and best practices.",
    },
    {
      title: "Web Development",
      subtitle: "Building responsive and scalable web applications",
      description:
        "We build responsive and scalable web applications using modern technologies and best practices.",
    },
    {
      title: "Web Development",
      subtitle: "Building responsive and scalable web applications",
      description:
        "We build responsive and scalable web applications using modern technologies and best practices.",
    },
    {
      title: "Web Development",
      subtitle: "Building responsive and scalable web applications",
      description:
        "We build responsive and scalable web applications using modern technologies and best practices.",
    },
  ];

  return (
    <div className="py-10 px-10 flex flex-col gap-15">
      <div className="flex items-center justify-between border-b border-[#6D6C6A] pb-15">
        <h2 className="text-[#0A0A0A] text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          Services
        </h2>
        <p className="text-center text-[#212325] text-[0.875rem]/[1.05rem] tracking-[-0.035rem] whitespace-pre-line">
          {"PROJECTS: > 100 DEPL0YED\nUSERS_SERVED: 1.2M+ A/B\nTESTS: 450+"}
        </p>
        <p className="text-end text-[#ADADAD] font-medium text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] whitespace-pre-line">
          {
            "We work across art direction,\nbranding, editorial design, and\nweb development."
          }
        </p>
      </div>
      <Image
        src="/images/service.png"
        alt="Services"
        width={1360}
        height={370}
        className="w-340 h-92.5"
      />
      <div>
        {data.map((item, index) => {
          const isOpen = open === index;

          return (
            <div key={index}>
              <div
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex justify-between items-center border-b border-[#D7D9DB] px-3 py-6 cursor-pointer">
                <div className="flex items-center gap-4">
                  <p className="text-[#212325] text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] w-85">
                    0{index + 1}
                  </p>
                  <p className="text-[#0A0A0A] text-[2.5rem] font-medium tracking-[-0.0625rem] uppercase">
                    {item.title}
                  </p>
                </div>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </div>

              {/* animated wrapper: only the row height transitions */}
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="min-h-0 overflow-hidden">
                  {/* padding lives INSIDE the clipped area */}
                  <div
                    className={`flex items-center gap-4 px-3 py-10 transition-opacity duration-500 ease-in-out ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}>
                    <p className="text-[#212325] text-[1rem]/[1.375rem] w-85">
                      {item.subtitle}
                    </p>
                    <p className="text-[#212325] text-[1rem]/[1.375rem] w-160">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
