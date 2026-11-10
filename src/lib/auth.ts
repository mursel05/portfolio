import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "stats_auth";

const secret = () => process.env.STATS_SECRET ?? "";

export const authToken = () =>
  createHmac("sha256", secret()).update("stats-v1").digest("hex");

const same = (a: string, b: string) =>
  timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );

export const checkPassword = (pw: string) =>
  !!process.env.STATS_PASSWORD &&
  !!secret() &&
  same(pw, process.env.STATS_PASSWORD);

export async function isAuthed() {
  const v = (await cookies()).get(COOKIE)?.value;
  return !!v && !!secret() && same(v, authToken());
}
