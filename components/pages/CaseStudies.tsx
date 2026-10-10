"use client";

import { useState } from "react";
import { caseStudies } from "@/content/projects";
import styles from "./Projects.module.css";

/** Client work as an accordion: one open at a time, each with a flow schematic of the part Rahul owned. */
export function CaseStudies() {
  const [open, setOpen] = useState<string | null>(caseStudies[0].id);

  return (
    <ol className={styles.cases}>
      {caseStudies.map((c, i) => {
        const isOpen = open === c.id;
        return (
          <li key={c.id} className={`reveal ${styles.case} ${isOpen ? styles.caseOpen : ""}`}>
            <h3>
              <button
                type="button"
                className={styles.caseHead}
                aria-expanded={isOpen}
                aria-controls={`case-${c.id}`}
                onClick={() => setOpen(isOpen ? null : c.id)}
              >
                <span className={styles.caseNo}>C{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.caseTitle}>{c.title}</span>
                <span className={styles.caseDomain}>{c.domain}</span>
                <span className={styles.casePeriod}>{c.period}</span>
                <span className={styles.caseToggle} aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div id={`case-${c.id}`} className={styles.caseBody} role="region" aria-label={c.title}>
              <div className={styles.caseInner}>
                <p className={styles.caseSummary}>{c.summary}</p>
                <p className={styles.caseRole}>
                  <span className="label">Role</span> {c.role}
                </p>

                <div className={styles.flow} aria-label="Flow, with the parts I owned highlighted">
                  {c.flow.map((f, k) => (
                    <span key={f.label} className={styles.flowStep}>
                      {k > 0 && <span className={styles.flowWire} aria-hidden="true" />}
                      <span className={`${styles.flowNode} ${f.focus ? styles.flowFocus : ""}`}>
                        {f.label}
                        {f.focus && <span className="sr-only"> (owned)</span>}
                      </span>
                    </span>
                  ))}
                  <span className={styles.flowKey}>
                    <i /> Part I owned
                  </span>
                </div>

                <dl className={styles.pao}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{c.problem}</dd>
                  </div>
                  <div>
                    <dt>Approach</dt>
                    <dd>
                      <ul>
                        {c.approach.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{c.outcome}</dd>
                  </div>
                </dl>
                <ul className="chips">
                  {c.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
