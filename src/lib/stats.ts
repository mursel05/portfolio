import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export type Range = "7" | "30" | "90" | "all";

export const TZ = "Asia/Baku";

const DAY = 86_400_000;

export async function getStats(range: Range) {
  const days = range === "all" ? null : Number(range);
  const from = days ? new Date(Date.now() - days * DAY) : null;

  const sWhere: Prisma.SessionWhereInput = from ? { startedAt: { gte: from } } : {};
  const vWhere: Prisma.PageViewWhereInput = from ? { createdAt: { gte: from } } : {};
  const sSql = from ? Prisma.sql`WHERE "startedAt" >= ${from}` : Prisma.empty;
  const vSql = from ? Prisma.sql`WHERE "createdAt" >= ${from}` : Prisma.empty;

  const chartDays = days ?? 90;
  const chartFrom = new Date(Date.now() - chartDays * DAY);

  const topBy = (col: "country" | "browser" | "os" | "device" | "source") =>
    prisma.$queryRaw<{ label: string | null; n: number }[]>(Prisma.sql`
      SELECT ${Prisma.raw(`"${col}"`)} AS label, COUNT(*)::int AS n
      FROM "Session" ${sSql}
      GROUP BY 1 ORDER BY n DESC LIMIT 8`);

  const [
    views,
    sessions,
    unique,
    newVisitors,
    totalVisitors,
    online,
    avg,
    countries,
    cities,
    browsers,
    systems,
    devices,
    sources,
    pages,
    dailyRaw,
    recent,
  ] = await Promise.all([
    prisma.pageView.count({ where: vWhere }),
    prisma.session.count({ where: sWhere }),
    prisma.$queryRaw<{ n: number }[]>(Prisma.sql`
      SELECT COUNT(DISTINCT "visitorId")::int AS n FROM "Session" ${sSql}`),
    prisma.visitor.count({ where: from ? { firstSeen: { gte: from } } : {} }),
    prisma.visitor.count(),
    prisma.session.count({
      where: { lastActiveAt: { gte: new Date(Date.now() - 5 * 60_000) } },
    }),
    prisma.$queryRaw<{ s: number }[]>(Prisma.sql`
      SELECT COALESCE(AVG(EXTRACT(EPOCH FROM ("lastActiveAt" - "startedAt"))), 0)::float AS s
      FROM "Session" ${sSql}`),
    topBy("country"),
    prisma.$queryRaw<{ country: string | null; city: string | null; n: number }[]>(Prisma.sql`
      SELECT "country", "city", COUNT(*)::int AS n
      FROM "Session" ${sSql}
      GROUP BY 1, 2 ORDER BY n DESC LIMIT 8`),
    topBy("browser"),
    topBy("os"),
    topBy("device"),
    topBy("source"),
    prisma.$queryRaw<{ path: string; n: number; avg: number }[]>(Prisma.sql`
      SELECT "path", COUNT(*)::int AS n,
             COALESCE(ROUND(AVG(NULLIF("duration", 0))), 0)::int AS avg
      FROM "PageView" ${vSql}
      GROUP BY "path" ORDER BY n DESC LIMIT 10`),
    prisma.$queryRaw<{ day: string; views: number; visitors: number }[]>(Prisma.sql`
      SELECT to_char(date_trunc('day', (p."createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${TZ}), 'YYYY-MM-DD') AS day,
             COUNT(*)::int AS views,
             COUNT(DISTINCT s."visitorId")::int AS visitors
      FROM "PageView" p JOIN "Session" s ON s.id = p."sessionId"
      WHERE p."createdAt" >= ${chartFrom}
      GROUP BY 1 ORDER BY 1`),
    prisma.session.findMany({
      orderBy: { startedAt: "desc" },
      take: 25,
      include: {
        views: {
          orderBy: { createdAt: "asc" },
          select: { path: true, duration: true },
        },
      },
    }),
  ]);

  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });
  const byDay = new Map(dailyRaw.map((d) => [d.day, d]));
  const daily = Array.from({ length: chartDays }, (_, i) => {
    const day = fmt.format(new Date(Date.now() - (chartDays - 1 - i) * DAY));
    return byDay.get(day) ?? { day, views: 0, visitors: 0 };
  });

  return {
    views,
    sessions,
    uniqueVisitors: unique[0]?.n ?? 0,
    newVisitors,
    totalVisitors,
    online,
    avgSession: avg[0]?.s ?? 0,
    countries,
    cities,
    browsers,
    systems,
    devices,
    sources,
    pages,
    daily,
    recent,
  };
}