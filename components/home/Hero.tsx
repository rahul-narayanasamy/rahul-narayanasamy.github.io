"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { milestones, profile } from "@/content/profile";
import { useLocalTime, useWeather, useYearProgress } from "@/lib/hooks";
import styles from "./Hero.module.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/_#";

/** Letters settle from random glyphs into the real word, left to right. */
function useDecode(word: string, delay: number) {
  const [out, setOut] = useState(word);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    let startAt = 0;
    const run = () => {
      const t0 = performance.now() + delay;
      const tick = (now: number) => {
        const t = Math.max(0, now - t0);
        const settled = Math.floor(t / 45);
        setOut(
          word
            .split("")
            .map((ch, i) => (i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join("")
        );
        if (settled < word.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    // Wait for the boot loader to lift before decoding.
    if (root.classList.contains("booting")) {
      const mo = new MutationObserver(() => {
        if (!root.classList.contains("booting")) {
          mo.disconnect();
          startAt = window.setTimeout(run, 150);
        }
      });
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
      return () => {
        mo.disconnect();
        cancelAnimationFrame(raf);
        clearTimeout(startAt);
      };
    }
    run();
    return () => cancelAnimationFrame(raf);
  }, [word, delay]);
  return out;
}

export function Hero() {
  const time = useLocalTime();
  const temp = useWeather();
  const year = useYearProgress();
  const first = useDecode(profile.first.toUpperCase(), 0);
  const last = useDecode(profile.last.toUpperCase(), 220);

  return (
    <section className={`wrap ${styles.hero}`} aria-labelledby="hero-name">
      <div className={styles.topline}>
        <span className="label">
          {profile.initials} / Portfolio {year?.year ?? ""}
        </span>
        <ul className={styles.status} aria-label="Local status">
          <li>
            <span aria-hidden="true">◷</span> {time || "--:--:-- --"}
          </li>
          <li>
            <span aria-hidden="true">◬</span> {temp === null ? "--" : temp}°C
          </li>
          <li>
            <span aria-hidden="true">◎</span> {profile.location}
          </li>
        </ul>
      </div>

      <p className={`${styles.kicker} ${styles.anim}`} style={{ "--d": "0ms" } as React.CSSProperties}>
        {profile.role} — Portfolio
      </p>

      <div className={styles.identity}>
        <div className={`${styles.avatar} ${styles.anim}`} style={{ "--d": "80ms" } as React.CSSProperties}>
          <svg className={styles.hud} viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="57" className={styles.hudRing} />
            <circle cx="60" cy="60" r="57" className={styles.hudArc} />
            {Array.from({ length: 24 }, (_, i) => (
              <line
                key={i}
                x1="60"
                y1="1"
                x2="60"
                y2={i % 6 === 0 ? 6 : 3.5}
                transform={`rotate(${i * 15} 60 60)`}
                className={styles.tick}
              />
            ))}
          </svg>
          <Image src="/avatar.png" alt={`Portrait of ${profile.name}`} width={256} height={256} priority />
          <span className={styles.online} title="Available">
            <span className="status-dot" />
          </span>
        </div>

        <h1 id="hero-name" className={styles.name} aria-label={profile.name}>
          <span className={`${styles.solid} ${styles.anim}`} style={{ "--d": "120ms" } as React.CSSProperties} aria-hidden="true">
            {first}
          </span>
          <span className={`${styles.outline} ${styles.anim}`} style={{ "--d": "200ms" } as React.CSSProperties} aria-hidden="true">
            {last}
            <span className="type-cursor">_</span>
          </span>
        </h1>
      </div>

      <div className={styles.lower}>
        <div className={styles.left}>
          <p className={`${styles.intro} ${styles.anim}`} style={{ "--d": "300ms" } as React.CSSProperties}>
            {profile.intro}
          </p>
          <div className={`${styles.ctas} ${styles.anim}`} style={{ "--d": "380ms" } as React.CSSProperties}>
            <Link href="/projects/" className="btn btn-solid">
              View projects
            </Link>
            <Link href="/contact/" className="btn">
              Get in touch
            </Link>
          </div>

          <div className={`${styles.year} ${styles.anim}`} style={{ "--d": "460ms" } as React.CSSProperties}>
            <div className={styles.yearHead}>
              <span>{year?.year ?? "----"} · Progress</span>
              <span className="red">
                {year ? `${year.pct.toFixed(1)}% · Day ${year.day}/${year.total}` : " "}
              </span>
            </div>
            <div className={styles.yearBar}>
              <span style={{ transform: `scaleX(${year ? year.pct / 100 : 0})` }} />
            </div>
          </div>
        </div>

        <ol className={styles.milestones}>
          {milestones.map((m, i) => (
            <li
              key={m.year}
              className={styles.anim}
              style={{ "--d": `${520 + i * 80}ms` } as React.CSSProperties}
            >
              <b>{m.year}</b>
              <span>{m.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <Link href="/about/" className={styles.explore}>
        Explore <span aria-hidden="true">↓</span>
      </Link>
    </section>
  );
}
