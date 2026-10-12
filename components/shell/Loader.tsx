"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Loader.module.css";

const LOG_LINES = ["> Portfolio / Rahul Narayanasamy", "> Loading assets ................ OK", "> Almost ready"];

// Boot sequence timings.
const START_MS = 200;
const PER_CHAR_MS = 16;
const LINE_PAUSE_MS = 130;
const PROGRESS_MS = 1500;
const HOLD_MS = 400;
const LIFT_MS = 1000;

const TYPE_END = LOG_LINES.reduce((t, l) => t + l.length * PER_CHAR_MS + LINE_PAUSE_MS, START_MS);

/** power2.inOut easing. */
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** How many characters of each line are visible after `ms` of typing. */
function typedAt(ms: number) {
  let t = START_MS;
  return LOG_LINES.map((line) => {
    const n = Math.max(0, Math.min(line.length, Math.floor((ms - t) / PER_CHAR_MS) + 1));
    t += line.length * PER_CHAR_MS + LINE_PAUSE_MS;
    return n;
  });
}

/**
 * Terminal boot screen: lines type in, the counter runs to 100%, then the whole screen lifts away.
 * Shown on every full page load (an inline script adds `html.booting` before first paint).
 * Any key or tap fast-forwards it; the counter waits at 99% until the webfont is ready.
 * With reduced motion, lines appear at once and the counter runs in 0.6s.
 */
export function Loader() {
  const [typed, setTyped] = useState(() => LOG_LINES.map(() => 0));
  const [pct, setPct] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("booting")) {
      setGone(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progressMs = reduce ? 600 : PROGRESS_MS;
    const skipTyping = reduce;

    let fontsReady = !document.fonts;
    document.fonts?.ready.then(() => (fontsReady = true));

    const start = performance.now();
    let progressStart = 0;
    let raf = 0;
    let timer = 0;

    const lift = () => {
      setLifting(true);
      // Release the page's own entrance animations as the screen lifts.
      root.classList.remove("booting");
      root.classList.add("booted");
      timer = window.setTimeout(() => setGone(true), LIFT_MS);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      if (skipRef.current || skipTyping || elapsed >= TYPE_END) {
        setTyped(LOG_LINES.map((l) => l.length));
        if (!progressStart) progressStart = skipRef.current ? now - progressMs : now;
        const t = Math.min(1, (now - progressStart) / progressMs);
        const p = Math.round(easeInOut(t) * 100);
        setPct(fontsReady ? p : Math.min(p, 99));
        if (t >= 1 && fontsReady) {
          timer = window.setTimeout(lift, skipRef.current ? 0 : HOLD_MS);
          return;
        }
      } else {
        setTyped(typedAt(elapsed));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => (skipRef.current = true);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (gone) return null;

  const active = typed.findIndex((n, i) => n < LOG_LINES[i].length);

  return (
    <div className={`${styles.loader} ${lifting ? styles.lift : ""}`} aria-hidden="true">
      <div className={styles.log}>
        {LOG_LINES.map((line, i) => (
          <p key={line} className={`${styles.line} ${i > 0 ? styles.dim : ""}`}>
            {line.slice(0, typed[i])}
            {active === i && <span className={styles.cursor}>_</span>}
            {typed[i] === 0 && " "}
          </p>
        ))}
        <p className={styles.count}>
          Loading portfolio <span className={styles.num}>{String(pct).padStart(3, "0")}%</span>
        </p>
        <div className={styles.bar}>
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <p className={styles.skip}>Press any key to skip</p>
      </div>
    </div>
  );
}
