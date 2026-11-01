"use client";
import { useEffect, useRef } from "react";

const MIN_THUMB = 40;
const HIDE_DELAY = 800;

export default function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const thumb = thumbRef.current!;
    const root = document.documentElement;

    let hideTimer: ReturnType<typeof setTimeout>;
    let raf = 0;
    let dragging = false;
    let hovering = false;
    let startY = 0;
    let startScroll = 0;

    const metrics = () => {
      const viewH = window.innerHeight;
      const totalH = root.scrollHeight;
      const maxScroll = Math.max(totalH - viewH, 0);
      const trackH = track.clientHeight;
      const thumbH = Math.max(MIN_THUMB, (trackH * viewH) / totalH);
      return { viewH, totalH, maxScroll, trackH, thumbH };
    };

    const update = () => {
      const { maxScroll, trackH, thumbH } = metrics();
      track.style.display = maxScroll > 0 ? "block" : "none";
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translate3d(0, ${progress * (trackH - thumbH)}px, 0)`;
    };

    const requestUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const show = () => {
      track.style.opacity = "1";
      clearTimeout(hideTimer);
      if (dragging || hovering) return;
      hideTimer = setTimeout(() => (track.style.opacity = "0"), HIDE_DELAY);
    };

    const onScroll = () => {
      requestUpdate();
      show();
    };

    const onThumbDown = (e: PointerEvent) => {
      e.preventDefault();
      dragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      thumb.setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
      show();
    };
    const onThumbMove = (e: PointerEvent) => {
      if (!dragging) return;
      const { maxScroll, trackH, thumbH } = metrics();
      const ratio = maxScroll / (trackH - thumbH);
      window.scrollTo({
        top: startScroll + (e.clientY - startY) * ratio,
        behavior: "instant",
      });
    };
    const onThumbUp = (e: PointerEvent) => {
      dragging = false;
      thumb.releasePointerCapture(e.pointerId);
      document.body.style.userSelect = "";
      show();
    };

    const onTrackDown = (e: PointerEvent) => {
      if (e.target !== track) return;
      const { maxScroll, trackH, thumbH } = metrics();
      const y = e.clientY - track.getBoundingClientRect().top - thumbH / 2;
      const progress = Math.min(Math.max(y / (trackH - thumbH), 0), 1);
      window.scrollTo({ top: progress * maxScroll, behavior: "smooth" });
    };

    const onEnter = () => {
      hovering = true;
      show();
    };
    const onLeave = () => {
      hovering = false;
      show();
    };

    const ro = new ResizeObserver(requestUpdate);
    ro.observe(root);
    ro.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestUpdate);
    thumb.addEventListener("pointerdown", onThumbDown);
    thumb.addEventListener("pointermove", onThumbMove);
    thumb.addEventListener("pointerup", onThumbUp);
    thumb.addEventListener("pointercancel", onThumbUp);
    track.addEventListener("pointerdown", onTrackDown);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    update();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestUpdate);
      thumb.removeEventListener("pointerdown", onThumbDown);
      thumb.removeEventListener("pointermove", onThumbMove);
      thumb.removeEventListener("pointerup", onThumbUp);
      thumb.removeEventListener("pointercancel", onThumbUp);
      track.removeEventListener("pointerdown", onTrackDown);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="custom-scrollbar fixed top-0 right-0 z-9999 hidden h-screen w-3 max-sm:w-1.5 opacity-0 transition-opacity duration-300 sm:block">
      <div
        ref={thumbRef}
        className="mx-0.75 max-sm:mx-0.5 w-1.5 max-sm:w-0.5 rounded-full bg-[#0B1012] transition-[width,margin,background-color]"
      />
    </div>
  );
}
