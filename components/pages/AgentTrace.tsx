"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { actors, agentTurn } from "@/content/system";
import styles from "./Agents.module.css";

const col = (id: string) => actors.findIndex((a) => a.id === id);
const W = 100 / actors.length;

/** One agent turn drawn as a sequence diagram. "Play" walks through it a message at a time. */
export function AgentTrace() {
  const [step, setStep] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const play = useCallback(() => {
    window.clearInterval(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    setStep(0);
    timer.current = window.setInterval(
      () => {
        i += 1;
        if (i >= agentTurn.length) {
          window.clearInterval(timer.current);
          window.setTimeout(() => setStep(null), 1600);
          return;
        }
        setStep(i);
      },
      reduce ? 300 : 800
    );
  }, []);

  useEffect(() => {
    const onPlay = () => play();
    window.addEventListener("agent:play", onPlay);
    return () => {
      window.removeEventListener("agent:play", onPlay);
      window.clearInterval(timer.current);
    };
  }, [play]);

  const live = step === null ? [] : [agentTurn[step].from, agentTurn[step].to];
  const current = step === null ? null : agentTurn[step];

  return (
    <figure className={`card ${styles.trace}`}>
      <div className={styles.traceHead}>
        <span className="label">Fig. 06 — one tool-using turn</span>
        <button type="button" className="btn" onClick={play}>
          {step === null ? "Play trace" : `Step ${step + 1} / ${agentTurn.length}`}
          <span className="arrow" aria-hidden="true">
            ▶
          </span>
        </button>
      </div>

      <div className={styles.seq}>
        <div className={styles.actors} style={{ gridTemplateColumns: `repeat(${actors.length}, 1fr)` }}>
          {actors.map((a) => (
            <span key={a.id} className={live.includes(a.id) ? styles.actorOn : undefined}>
              {a.label}
            </span>
          ))}
        </div>
        <div className={styles.lifelines} aria-hidden="true" style={{ gridTemplateColumns: `repeat(${actors.length}, 1fr)` }}>
          {actors.map((a) => (
            <i key={a.id} className={live.includes(a.id) ? styles.lifeOn : undefined} />
          ))}
        </div>
        <ol className={styles.steps}>
          {agentTurn.map((s, i) => {
            const a = col(s.from);
            const b = col(s.to);
            const left = (Math.min(a, b) + 0.5) * W;
            const width = Math.abs(b - a) * W;
            // Labels get at least two columns of room, kept inside the diagram.
            const msgWidth = Math.max(width, 2 * W);
            const msgLeft = Math.min(left, 100 - msgWidth);
            const state = step === null ? "" : i === step ? styles.now : i < step ? styles.done : styles.later;
            return (
              <li key={i} className={`${styles.step} ${state}`}>
                <span className={styles.msg} style={{ left: `${msgLeft}%`, width: `${msgWidth}%` }}>
                  <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span> {s.label}
                </span>
                <span
                  className={`${styles.arrow} ${s.kind === "return" ? styles.ret : ""} ${b < a ? styles.toLeft : styles.toRight}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  aria-hidden="true"
                />
                <span className="sr-only">
                  from {actors[a].label} to {actors[b].label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <figcaption className={styles.caption} aria-live="polite">
        {current ? (
          <>
            <span className="red">&gt;</span> {actors[col(current.from)].label} → {actors[col(current.to)].label}:{" "}
            {current.label}
          </>
        ) : (
          <span className={styles.legend}>
            <span>
              <i className={styles.solidKey} /> request
            </span>
            <span>
              <i className={styles.dashKey} /> response
            </span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
