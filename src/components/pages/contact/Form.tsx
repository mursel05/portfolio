"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const field =
  "w-full bg-transparent border-b border-[#D7D9DB] py-3 text-[#0A0A0A] text-[1.25rem]/[1.5rem] md:text-[1.5rem]/[1.75rem] font-medium tracking-[-0.0625rem] outline-none transition-colors duration-300 placeholder:text-[#ADADAD] focus:border-[#0A0A0A]";

const Form = () => {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8"
      noValidate={false}>
      <label className="flex flex-col gap-1">
        <span className={eyebrow}>01 / Name</span>
        <input
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          className={field}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={eyebrow}>02 / Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={150}
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className={eyebrow}>03 / Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="Tell me about your project"
          className={`${field} resize-none`}
        />
      </label>

      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex w-full cursor-pointer items-center justify-between gap-6 bg-[#0A0A0A] px-6 py-5 text-[#F3F0EC] text-[1rem] font-semibold tracking-[-0.0625rem] uppercase transition-opacity duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-64">
          {status === "sending" ? "Sending..." : "Send message"}
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`${eyebrow} ${status === "error" ? "text-red-600!" : ""}`}>
          {status === "sent" && "Thanks, I'll get back to you soon."}
          {status === "error" &&
            "Something went wrong. Please email me directly."}
        </p>
      </div>
    </form>
  );
};

export default Form;
