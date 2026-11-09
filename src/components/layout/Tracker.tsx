"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_TIMEOUT = 30 * 60 * 1000; // new session after 30 min of inactivity
const SKIP = /^\/(en|az)?\/?stats(\/|$)/;

const rid = () =>
  crypto.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function getIds() {
  try {
    let vid = localStorage.getItem("vid");
    if (!vid) {
      vid = rid();
      localStorage.setItem("vid", vid);
    }
    const now = Date.now();
    let sid = sessionStorage.getItem("sid");
    const last = Number(sessionStorage.getItem("sid_t") || 0);
    let isNew = false;
    if (!sid || now - last > SESSION_TIMEOUT) {
      sid = rid();
      isNew = true;
      sessionStorage.setItem("sid", sid);
    }
    sessionStorage.setItem("sid_t", String(now));
    return { vid, sid, isNew };
  } catch {
    return null; // storage blocked: don't track
  }
}

function beacon(data: unknown) {
  const body = JSON.stringify(data);
  if (!navigator.sendBeacon?.("/api/track", body)) {
    fetch("/api/track", { method: "POST", body, keepalive: true }).catch(
      () => {},
    );
  }
}

function allowed() {
  try {
    // visit /?notrack=1 once on your own devices to exclude yourself, /?notrack=0 to undo
    const q = new URLSearchParams(location.search).get("notrack");
    if (q === "1") localStorage.setItem("notrack", "1");
    if (q === "0") localStorage.removeItem("notrack");
    if (localStorage.getItem("notrack") === "1") return false;
  } catch {
    return false;
  }
  if (navigator.doNotTrack === "1") return false;
  if (
    ["localhost", "127.0.0.1"].includes(location.hostname) &&
    !process.env.NEXT_PUBLIC_TRACK_DEV
  )
    return false;
  return true;
}

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP.test(pathname) || !allowed()) return;
    const ids = getIds();
    if (!ids) return;
    const { vid, sid, isNew } = ids;

    let viewId: number | null = null;
    let active = 0; // ms the tab was visible on this page
    let since: number | null =
      document.visibilityState === "visible" ? Date.now() : null;

    const seconds = () =>
      Math.round((active + (since ? Date.now() - since : 0)) / 1000);

    const flush = () => {
      if (viewId != null)
        beacon({ type: "ping", sid, viewId, seconds: seconds() });
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (since) active += Date.now() - since;
        since = null;
        flush();
      } else {
        since = Date.now();
      }
    };

    fetch("/api/track", {
      method: "POST",
      keepalive: true,
      body: JSON.stringify({
        type: "view",
        vid,
        sid,
        path: pathname,
        referrer: isNew ? document.referrer : "",
        search: isNew ? location.search : "",
      }),
    })
      .then((r) => (r.ok && r.status !== 204 ? r.json() : null))
      .then((d) => {
        if (d?.viewId) viewId = d.viewId;
      })
      .catch(() => {});

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush(); // route change: send time spent on the page we're leaving
    };
  }, [pathname]);

  return null;
}
