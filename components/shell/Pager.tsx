"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { neighbours } from "@/lib/pages";
import { isTyping } from "@/lib/actions";
import styles from "./Pager.module.css";

/** Previous / next page, with `[` and `]` as keyboard shortcuts. */
export function Pager() {
  const pathname = usePathname();
  const router = useRouter();
  const { prev, next } = neighbours(pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "[" && prev) router.push(prev.href);
      if (e.key === "]" && next) router.push(next.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  if (!next) return null;

  return (
    <nav className={`wrap ${styles.pager}`} aria-label="Page navigation">
      {prev ? (
        <Link href={prev.href} className={`${styles.cell} ${styles.prev}`} rel="prev">
          <span className={styles.meta}>
            <kbd>[</kbd> Previous
          </span>
          <span className={styles.row}>
            <span className={styles.arrow}>←</span>
            <span className={styles.no}>{prev.no}</span>
            <span className={styles.title}>{prev.no === "00" ? "Index" : prev.title}</span>
          </span>
        </Link>
      ) : null}
      <Link href={next.href} className={`${styles.cell} ${styles.next} ${prev ? "" : styles.solo}`} rel="next">
        <span className={styles.meta}>
          {next.no === "00" ? "Back to start" : "Next"} <kbd>]</kbd>
        </span>
        <span className={styles.row}>
          <span className={styles.title}>{next.no === "00" ? "Index" : next.title}</span>
          <span className={styles.no}>{next.no}</span>
          <span className={styles.arrow}>→</span>
        </span>
      </Link>
    </nav>
  );
}
