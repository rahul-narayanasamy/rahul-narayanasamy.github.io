"use client";

import { useState } from "react";
import { skills } from "@/content/skills";
import styles from "./Skills.module.css";

/** Rows flood red on hover (as on the original site); click or Enter expands where each skill is used. */
export function SkillRows() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ol className={styles.rows}>
      {skills.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.name} className={`reveal ${styles.row} ${isOpen ? styles.open : ""}`} style={{ "--d": `${i * 40}ms` } as React.CSSProperties}>
            <button
              type="button"
              className={styles.head}
              aria-expanded={isOpen}
              aria-controls={`skill-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.as}>{s.as}</span>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </button>
            <div id={`skill-${i}`} className={styles.body} role="region" aria-label={s.name}>
              <div className={styles.inner}>
                <p>{s.usedFor}</p>
                <p className={styles.seen}>
                  <span className="label">Seen in</span>
                  {s.seenIn.map((x) => (
                    <span key={x} className="chip">
                      {x}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
