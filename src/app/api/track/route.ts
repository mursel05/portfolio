import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ID = /^[A-Za-z0-9-]{8,64}$/;
const BOT =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|curl|wget|python|axios|node-fetch|monitor|uptime/i;
const LOCALES = ["en", "az"];

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)yandex\./, "yandex"],
  [/(^|\.)yahoo\./, "yahoo"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin"],
  [/(^|\.)github\.com$/, "github"],
  [/(^|\.)(twitter\.com|x\.com|t\.co)$/, "x"],
  [/(^|\.)(facebook\.com|fb\.com)$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(t\.me|telegram\.org)$/, "telegram"],
  [/(^|\.)youtube\.com$/, "youtube"],
  [/(^|\.)reddit\.com$/, "reddit"],
  [/(^|\.)whatsapp\.com$/, "whatsapp"],
];

function cleanPath(p: unknown) {
  if (typeof p !== "string" || !p.startsWith("/")) return null;
  let path = p.split(/[?#]/)[0].slice(0, 200);
  path = path.replace(new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`), "") || "/";
  if (path.length > 1) path = path.replace(/\/+$/, "");
  if (path.startsWith("/stats")) return null;
  return path;
}

function sourceOf(referrer: string, search: string, host: string) {
  const sp = new URLSearchParams(search);
  const tag = sp.get("utm_source") ?? sp.get("ref");
  if (tag) return tag.toLowerCase().slice(0, 40);
  if (!referrer) return "direct";
  try {
    const h = new URL(referrer).hostname.replace(/^www\./, "");
    if (h === host.replace(/^www\./, "").split(":")[0]) return "direct";
    return SOURCES.find(([re]) => re.test(h))?.[1] ?? h.slice(0, 60);
  } catch {
    return "direct";
  }
}

async function geo(req: Request) {
  const h = req.headers;
  let country = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry");
  let city = h.get("x-vercel-ip-city") ?? h.get("cf-ipcity");
  if (city) {
    try {
      city = decodeURIComponent(city);
    } catch {}
  }
  if (!country || country === "XX") {
    const ip =
      h.get("x-forwarded-for")?.split(",")[0].trim() ?? h.get("x-real-ip");
    if (ip && !/^(::1|127\.|10\.|192\.168\.)/.test(ip)) {
      try {
        const r = await fetch(
          `https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country_code,city`,
          { signal: AbortSignal.timeout(1500) },
        );
        const j = await r.json();
        if (j.success) {
          country = j.country_code;
          city = j.city;
        }
      } catch {}
    }
  }
  return {
    country: country ? country.toUpperCase().slice(0, 2) : null,
    city: city || null,
  };
}

const empty = (status = 204) => new NextResponse(null, { status });

export async function POST(req: Request) {
  const host = req.headers.get("host") ?? "";
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return empty(403);
    } catch {
      return empty(403);
    }
  }

  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return empty();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return empty(400);
  }

  const sid = String(body.sid ?? "");
  if (!ID.test(sid)) return empty(400);

  if (body.type === "ping") {
    const viewId = Number(body.viewId);
    if (!Number.isInteger(viewId)) return empty(400);
    const seconds = Math.min(
      Math.max(Math.round(Number(body.seconds) || 0), 0),
      3600,
    );
    await prisma.pageView.updateMany({
      where: { id: viewId, sessionId: sid, duration: { lt: seconds } },
      data: { duration: seconds },
    });
    await prisma.session.updateMany({
      where: { id: sid },
      data: { lastActiveAt: new Date() },
    });
    return empty();
  }

  const vid = String(body.vid ?? "");
  if (body.type !== "view" || !ID.test(vid)) return empty(400);

  const path = cleanPath(body.path);
  if (!path) return empty();

  const existing = await prisma.session.findUnique({
    where: { id: sid },
    select: { id: true },
  });

  if (!existing) {
    const r = new UAParser(ua).getResult();
    const { country, city } = await geo(req);

    await prisma.visitor.upsert({
      where: { id: vid },
      create: { id: vid },
      update: {},
    });

    await prisma.session
      .create({
        data: {
          id: sid,
          visitorId: vid,
          country,
          city,
          browser: r.browser.name ?? "Unknown",
          os: r.os.name ?? "Unknown",
          device: r.device.type ?? "desktop",
          source: sourceOf(
            String(body.referrer ?? ""),
            String(body.search ?? ""),
            host,
          ),
        },
      })
      .catch(() => {});
  } else {
    await prisma.session.update({
      where: { id: sid },
      data: { lastActiveAt: new Date() },
    });
  }

  const view = await prisma.pageView.create({
    data: { sessionId: sid, path },
    select: { id: true },
  });

  return NextResponse.json({ viewId: view.id });
}
