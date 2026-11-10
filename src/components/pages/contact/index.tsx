import { EMAIL, PHONE, socials } from "@/lib/info";
import Form from "./Form";

const eyebrow =
  "text-[#ADADAD] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const linkClass =
  "text-[#0A0A0A] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-60";

export default function Contact() {
  return (
    <main className="flex flex-col gap-10 px-5 pb-10 pt-24 md:gap-15 md:px-10 md:pb-15 md:pt-32">
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className="text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase">
          Contact
        </h1>
        <p className="text-start md:text-end text-[#ADADAD] font-medium text-[1rem]/[1.25rem] md:text-[1.125rem]/[1.3125rem] tracking-[-0.045rem] md:whitespace-pre-line">
          {"Have a project or a role in mind?\nSend a message."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Email</p>
            <a
              href={`mailto:${EMAIL}`}
              className="break-all text-[#0A0A0A] text-[1.25rem]/[1.5rem] font-medium tracking-[-0.0625rem] transition-opacity duration-300 hover:opacity-60 md:text-[1.5rem]/[1.75rem]">
              {EMAIL}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Phone</p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={linkClass}>
              {PHONE}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Social</p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className={eyebrow}>Languages</p>
            <p className="text-[#212325] text-[1rem]/[1.375rem]">
              Azerbaijani · English
            </p>
          </div>
        </div>

        <Form />
      </div>
    </main>
  );
}
