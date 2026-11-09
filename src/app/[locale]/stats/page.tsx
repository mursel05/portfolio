import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { COOKIE, authToken, checkPassword, isAuthed } from "@/lib/auth";
import { getStats, TZ, type Range } from "@/lib/stats";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false },
};

const RANGES: { key: Range; label: string }[] = [
  { key: "7", label: "7d" },
  { key: "30", label: "30d" },
  { key: "90", label: "90d" },
  { key: "all", label: "All" },
];

const eyebrow =
  "text-[#212325] text-[0.75rem]/[1.05rem] md:text-[0.875rem]/[1.05rem] font-medium tracking-[-0.035rem] uppercase";
const sectionTitle =
  "text-[#0A0A0A] text-[3rem]/[2.5rem] md:text-[5.625rem]/[4.5rem] font-medium tracking-[-0.0313rem] uppercase";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const flag = (c: string) =>
  String.fromCodePoint(...[...c].map((x) => 127397 + x.charCodeAt(0)));
const country = (c: string | null) => {
  if (!c) return "Unknown";
  try {
    return `${flag(c)} ${regionNames.of(c) ?? c}`;
  } catch {
    return c;
  }
};
const dur = (s: number) =>
  s < 60
    ? `${Math.round(s)}s`
    : `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
const when = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: TZ,
});

function BarList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number; note?: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <section className="flex flex-col gap-4">
      <h2 className={eyebrow}>{title}</h2>
      <div>
        {rows.length === 0 && (
          <p className="border-b border-[#D7D9DB] py-3 text-[#ADADAD]">
            No data yet
          </p>
        )}
        {rows.map((r) => (
          <div
            key={r.label}
            className="relative flex items-center justify-between gap-4 border-b border-[#D7D9DB] px-2 py-3">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 bg-[#0A0A0A]/5"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
            <span className="relative min-w-0 truncate text-[#0A0A0A] text-[1rem]/[1.375rem] font-medium">
              {r.label}
            </span>
            <span className="relative flex shrink-0 items-baseline gap-3">
              {r.note && (
                <span className={`${eyebrow} text-[#ADADAD]`}>{r.note}</span>
              )}
              <span className="text-[#0A0A0A] text-[1rem] font-semibold">
                {r.value}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function StatsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ range?: string; error?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const base = `/${locale}/stats`;

  async function login(fd: FormData) {
    "use server";
    if (!checkPassword(String(fd.get("password") ?? ""))) {
      redirect(`${base}?error=1`);
    }
    (await cookies()).set(COOKIE, authToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect(base);
  }

  async function logout() {
    "use server";
    (await cookies()).delete(COOKIE);
    redirect(base);
  }

  if (!(await isAuthed())) {
    return (
      <main className="flex min-h-svh flex-col justify-center gap-8 px-5 md:px-10">
        <h1 className={sectionTitle}>Stats</h1>
        <form action={login} className="flex max-w-md flex-col gap-6">
          <label className="flex flex-col gap-1">
            <span className={eyebrow}>Password</span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full border-b border-[#D7D9DB] bg-transparent py-3 text-[1.25rem]/[1.5rem] font-medium tracking-[-0.0625rem] text-[#0A0A0A] outline-none transition-colors duration-300 focus:border-[#0A0A0A]"
            />
          </label>
          {sp.error && (
            <p className={`${eyebrow} text-red-600`}>Wrong password</p>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#0A0A0A] px-6 py-5 text-[1rem] font-semibold uppercase tracking-[-0.0625rem] text-[#F3F0EC] transition-opacity duration-300 hover:opacity-80 md:w-auto md:self-start">
            Enter
          </button>
        </form>
      </main>
    );
  }

  const range: Range = (["7", "30", "90", "all"] as const).includes(
    sp.range as Range,
  )
    ? (sp.range as Range)
    : "30";
  const s = await getStats(range);

  const cards: [string, string | number][] = [
    ["Unique visitors", s.uniqueVisitors],
    ["Total visits", s.sessions],
    ["Page views", s.views],
    ["Avg. session", dur(s.avgSession)],
    ["Pages / visit", s.sessions ? (s.views / s.sessions).toFixed(1) : "0"],
    [
      "New / returning",
      `${s.newVisitors} / ${Math.max(s.uniqueVisitors - s.newVisitors, 0)}`,
    ],
    ["Online now", s.online],
    ["All-time visitors", s.totalVisitors],
  ];

  const maxDay = Math.max(...s.daily.map((d) => d.views), 1);

  return (
    <main className="flex flex-col gap-12 px-5 pb-10 pt-10 md:gap-20 md:px-10 md:pb-15 md:pt-15">
      <div className="flex flex-col gap-6 border-b border-[#6D6C6A] pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-15">
        <h1 className={sectionTitle}>Stats</h1>
        <div className="flex items-center gap-6">
          {RANGES.map((r) => (
            <Link
              key={r.key}
              href={`${base}?range=${r.key}`}
              className={`${eyebrow} transition-opacity duration-300 hover:opacity-60 ${
                r.key === range
                  ? "underline underline-offset-4"
                  : "text-[#ADADAD]"
              }`}>
              {r.label}
            </Link>
          ))}
          <form action={logout}>
            <button
              type="submit"
              className={`${eyebrow} cursor-pointer text-[#ADADAD]`}>
              Log out
            </button>
          </form>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-10">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-2 border-t border-[#D7D9DB] pt-4">
            <p className={`${eyebrow} text-[#ADADAD]`}>{label}</p>
            <p className="text-[#0A0A0A] text-[2rem]/[2.25rem] md:text-[2.5rem]/[2.75rem] font-medium tracking-[-0.0625rem]">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={eyebrow}>Page views per day</h2>
        <div className="flex h-40 items-end gap-[2px]">
          {s.daily.map((d) => (
            <div
              key={d.day}
              title={`${d.day}: ${d.views} views, ${d.visitors} visitors`}
              className="flex-1 bg-[#0A0A0A]/15 transition-colors duration-300 hover:bg-[#0A0A0A]"
              style={{
                height: `${Math.max((d.views / maxDay) * 100, d.views ? 4 : 1)}%`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <span className={`${eyebrow} text-[#ADADAD]`}>{s.daily[0]?.day}</span>
          <span className={`${eyebrow} text-[#ADADAD]`}>
            {s.daily.at(-1)?.day}
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10">
        <BarList
          title="Countries"
          rows={s.countries.map((r) => ({
            label: country(r.label),
            value: r.n,
          }))}
        />
        <BarList
          title="Cities"
          rows={s.cities.map((r) => ({
            label: r.city
              ? `${r.city}, ${r.country ?? "?"}`
              : country(r.country),
            value: r.n,
          }))}
        />
        <BarList
          title="Pages"
          rows={s.pages.map((r) => ({
            label: r.path,
            value: r.n,
            note: r.avg ? dur(r.avg) : undefined,
          }))}
        />
        <BarList
          title="Sources"
          rows={s.sources.map((r) => ({
            label: r.label ?? "direct",
            value: r.n,
          }))}
        />
        <BarList
          title="Devices"
          rows={s.devices.map((r) => ({
            label: r.label ?? "Unknown",
            value: r.n,
          }))}
        />
        <BarList
          title="Browsers"
          rows={s.browsers.map((r) => ({
            label: r.label ?? "Unknown",
            value: r.n,
          }))}
        />
        <BarList
          title="Operating systems"
          rows={s.systems.map((r) => ({
            label: r.label ?? "Unknown",
            value: r.n,
          }))}
        />
      </div>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Recent visits</h2>
        <div>
          {s.recent.map((r) => {
            const secs =
              (r.lastActiveAt.getTime() - r.startedAt.getTime()) / 1000;
            return (
              <div
                key={r.id}
                className="grid gap-2 border-b border-[#D7D9DB] px-2 py-4 md:grid-cols-[10rem_13rem_15rem_minmax(0,1fr)_5rem] md:gap-4">
                <span className={eyebrow}>{when.format(r.startedAt)}</span>
                <span className="text-[#0A0A0A] text-[1rem]/[1.375rem] font-medium">
                  {country(r.country)}
                  {r.city ? `, ${r.city}` : ""}
                </span>
                <span className="text-[#212325] text-[1rem]/[1.375rem]">
                  {r.device} · {r.browser} · {r.os}
                </span>
                <span className="min-w-0 text-[#212325] text-[1rem]/[1.375rem]">
                  <span className={`${eyebrow} mr-2 text-[#ADADAD]`}>
                    {r.source}
                  </span>
                  <span className="wrap-break-word">
                    {r.views.map((v) => v.path).join(" → ")}
                  </span>
                </span>
                <span className={`${eyebrow} md:text-end`}>{dur(secs)}</span>
              </div>
            );
          })}
          {s.recent.length === 0 && (
            <p className="border-b border-[#D7D9DB] py-3 text-[#ADADAD]">
              No visits yet
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
