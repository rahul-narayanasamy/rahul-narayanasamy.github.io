"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contribs = { days: Day[]; weeks: (Day | null)[][]; total: number; active: number; streak: number };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// One request per page load, shared by every graph that asks.
let cache: Promise<Contribs> | null = null;

function shape(days: Day[]): Contribs {
  const lead = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells: (Day | null)[] = [...Array(lead).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const w = cells.slice(i, i + 7);
    while (w.length < 7) w.push(null);
    weeks.push(w);
  }
  let run = 0;
  let streak = 0;
  for (const d of days) {
    run = d.count ? run + 1 : 0;
    streak = Math.max(streak, run);
  }
  return {
    days,
    weeks,
    total: days.reduce((s, d) => s + d.count, 0),
    active: days.filter((d) => d.count).length,
    streak,
  };
}

function load() {
  cache ??= fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubHandle}?y=last`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: { contributions?: Day[] }) => {
      if (!d.contributions?.length) throw new Error("empty");
      return shape(d.contributions);
    })
    .catch((e) => {
      cache = null; // allow a retry on the next mount
      throw e;
    });
  return cache;
}

export function useContributions() {
  const [data, setData] = useState<Contribs | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    load()
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);
  return { data, failed };
}

/** Month labels positioned by week column. */
export function monthLabels(weeks: (Day | null)[][]) {
  const out: { label: string; col: number }[] = [];
  weeks.forEach((w, col) => {
    const first = w.find((d) => d && d.date.endsWith("-01"));
    if (first) out.push({ label: MONTHS[Number(first.date.slice(5, 7)) - 1], col });
  });
  return out;
}

export function formatDay(d: Day) {
  return `${d.count} contribution${d.count === 1 ? "" : "s"} · ${new Date(`${d.date}T00:00:00`).toDateString().slice(4)}`;
}
