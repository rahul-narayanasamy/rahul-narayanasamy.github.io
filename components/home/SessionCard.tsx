"use client";

import { profile } from "@/content/profile";
import { useLocalTime, useSessionClock } from "@/lib/hooks";
import styles from "./Home.module.css";

/** A boarding-pass style readout: how long you've been here, and where this route leads. */
export function SessionCard() {
  const clock = useSessionClock();
  const time = useLocalTime();
  return (
    <section className={`wrap section ${styles.session}`} aria-label="Session">
      <div className={`reveal ${styles.sessionCopy}`}>
        <p className="eyebrow">Route</p>
        <p className={styles.sessionBig}>
          From <span className="red">Bengaluru</span>
          <br />
          to your team.
        </p>
        <p className={styles.sessionLead}>
          Remote-friendly across time zones. It&apos;s {time ? <b>{time}</b> : "daytime"} here right now.
        </p>
      </div>
      <div className={`card reveal ${styles.sessionCard}`} style={{ "--d": "120ms" } as React.CSSProperties}>
        <p className="label">Session clock</p>
        <p className={styles.sessionClock}>{clock}</p>
        <p className={styles.sessionCap}>Time since you opened this portfolio</p>
        <dl className={styles.sessionList}>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>{profile.experience} years shipping for the web</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>React · TypeScript · AI agents</dd>
          </div>
        </dl>
        <div className={styles.route}>
          <span>Origin · BLR</span>
          <span className={styles.routeLine} aria-hidden="true" />
          <span>Destination · You</span>
        </div>
        <p className={styles.routeStatus}>
          <span className="status-dot" /> Route status · Open
        </p>
      </div>
    </section>
  );
}
