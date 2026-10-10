"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

/* One shared one-second ticker, so every clock on the page updates together. */
let now = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (timer === undefined) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
const getNow = () => now || Date.now();
const getServerNow = () => 0;

export function useNow() {
  return useSyncExternalStore(subscribe, getNow, getServerNow);
}

/** mm:ss (or h:mm:ss) since this browser session first opened the site. Survives page loads. */
export function useSessionClock() {
  const t = useNow();
  const [start, setStart] = useState<number | null>(null);
  useEffect(() => {
    let s = Date.now();
    try {
      const saved = Number(sessionStorage.getItem("session-start"));
      if (saved) s = saved;
      else sessionStorage.setItem("session-start", String(s));
    } catch {}
    setStart(s);
  }, []);
  if (!t || start === null) return "00:00:00";
  const secs = Math.max(0, Math.floor((t - start) / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(secs / 3600))}:${pad(Math.floor(secs / 60) % 60)}:${pad(secs % 60)}`;
}

const timeFmt =
  typeof Intl !== "undefined"
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: profile.timezone,
      })
    : null;

/** Rahul's local time in Bengaluru. Empty string until mounted, to keep SSR output stable. */
export function useLocalTime() {
  const t = useNow();
  return t && timeFmt ? timeFmt.format(t) : "";
}

export function useYearProgress() {
  const t = useNow();
  if (!t) return null;
  const d = new Date(t);
  const start = new Date(d.getFullYear(), 0, 1).getTime();
  const end = new Date(d.getFullYear() + 1, 0, 1).getTime();
  const day = Math.floor((t - start) / 86_400_000) + 1;
  const total = Math.round((end - start) / 86_400_000);
  return { year: d.getFullYear(), pct: ((t - start) / (end - start)) * 100, day, total };
}

/** Current temperature in Bengaluru from Open-Meteo (no key). Null while loading or on failure. */
export function useWeather() {
  const [temp, setTemp] = useState<number | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    const { lat, lon } = profile.coords;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setTemp(Math.round(d.current.temperature_2m)))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return temp;
}

/**
 * Marks every `.reveal` element with `data-in` as it scrolls into view. A data attribute (not a class)
 * so React re-rendering an element's className never hides it again. Re-run on route change via `key`.
 */
export function useReveal(key: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not([data-in])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
