"use client";

import { useEffect, useState } from "react";
import { profile, quotes } from "@/content/profile";
import { useLocalTime } from "@/lib/hooks";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const time = useLocalTime();
  const [q, setQ] = useState(0);

  // A different line each visit, chosen after hydration so server and client agree.
  useEffect(() => setQ(Math.floor(Math.random() * quotes.length)), []);
  const quote = quotes[q];

  return (
    <footer className={styles.footer}>
      <figure className={`wrap ${styles.quote}`}>
        <span className={styles.mark} aria-hidden="true">
          //
        </span>
        <blockquote key={q} className={styles.text}>
          {quote.text}
        </blockquote>
        <figcaption className={styles.by}>— {quote.by}</figcaption>
      </figure>

      <div className={`wrap ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className={styles.time}>{time ? `${time} IST` : " "}</span>
        <span className={styles.links}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.medium} target="_blank" rel="noopener noreferrer">
            Medium
          </a>
          <a href="#top" className={styles.top}>
            Back to top ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
