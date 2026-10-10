"use client";

import { useMemo, useState } from "react";
import { formatDay, monthLabels, useContributions, type Day } from "@/lib/contributions";
import { profile } from "@/content/profile";
import styles from "./Home.module.css";

/** Last 12 months of public GitHub activity. Hides itself if the API is unreachable. */
export function Contributions() {
  const { data, failed } = useContributions();
  const [hover, setHover] = useState<Day | null>(null);
  const days = data?.days;
  const weeks = data?.weeks ?? [];
  const total = data?.total ?? 0;
  const active = data?.active ?? 0;
  const streak = data?.streak ?? 0;
  const months = useMemo(() => monthLabels(weeks), [weeks]);

  if (failed) return null;

  return (
    <section className={`wrap section reveal ${styles.contrib}`} aria-labelledby="contrib-title">
      <div className={`card ${styles.contribCard}`}>
        <div className={styles.contribHead}>
          <p id="contrib-title" className="eyebrow">
            GitHub ·{" "}
            <a className="red" href={profile.github} target="_blank" rel="noopener noreferrer">
              @{profile.githubHandle}
            </a>
          </p>
          <dl className={styles.contribStats}>
            <div>
              <dt>Contributions</dt>
              <dd>{days ? total : "—"}</dd>
            </div>
            <div>
              <dt>Active days</dt>
              <dd>{days ? active : "—"}</dd>
            </div>
            <div>
              <dt>Best streak</dt>
              <dd>{days ? `${streak}d` : "—"}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.graphScroll}>
          <div className={styles.graph} style={{ "--weeks": weeks.length || 53 } as React.CSSProperties}>
            <div className={styles.monthRow} aria-hidden="true">
              {months.map((m) => (
                <span key={`${m.label}-${m.col}`} style={{ gridColumn: m.col + 1 }}>
                  {m.label}
                </span>
              ))}
            </div>
            <div className={styles.cells} role="img" aria-label={`${total} contributions in the last year`}>
              {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array(7).fill(null))).map((w, wi) =>
                Array.from({ length: 7 }, (_, di) => {
                  const d = w[di] as Day | null | undefined;
                  return (
                    <span
                      key={`${wi}-${di}`}
                      className={styles.cell}
                      data-level={d ? d.level : "x"}
                      style={{ gridColumn: wi + 1, gridRow: di + 1, "--w": wi } as React.CSSProperties}
                      onMouseEnter={() => d && setHover(d)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className={styles.contribFoot}>
          <span>
            {hover
              ? formatDay(hover)
              : "Last 12 months"}
          </span>
          <span className={styles.legend} aria-hidden="true">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={styles.cell} data-level={l} />
            ))}
            More
          </span>
        </div>
      </div>
    </section>
  );
}
