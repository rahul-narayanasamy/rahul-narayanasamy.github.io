import type { Metadata } from "next";
import { education, roles } from "@/content/experience";
import { PageHead } from "@/components/shell/PageHead";
import styles from "@/components/pages/Experience.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description: "EPAM Systems since 2022 and Syncfusion from 2018 to 2022: the full career timeline.",
  alternates: { canonical: "/experience/" },
};

export default function Experience() {
  return (
    <div className="wrap">
      <PageHead
        no="04"
        eyebrow="Career history"
        title={
          <>
            Where I&apos;ve
            <br />
            worked
          </>
        }
        lead="Two companies, eight years, and a habit of staying through production support. Each engagement is listed under the company it ran through."
      />

      <ol className={styles.roles}>
        {roles.map((r) => (
          <li key={r.org} className={`reveal ${styles.role}`}>
            <div className={styles.when}>
              <p className={styles.period}>{r.period}</p>
              <p className="label">{r.place}</p>
              {r.current && (
                <p className={styles.current}>
                  <span className="status-dot" /> Current
                </p>
              )}
            </div>
            <div className={styles.what}>
              <h2 className={`${styles.org} ${r.current ? styles.orgCurrent : ""}`}>{r.org}</h2>
              <p className={styles.title}>{r.title}</p>
              <p className={styles.summary}>{r.summary}</p>
              <ul className="chips">
                {r.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <ol className={styles.engagements}>
                {r.engagements.map((e, i) => (
                  <li key={e.context}>
                    <details open={r.current && i === 0}>
                      <summary>
                        <span className={styles.ePeriod}>{e.period}</span>
                        <span className={styles.eContext}>{e.context}</span>
                        <span className={styles.eToggle} aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul className={styles.notes}>
                        {e.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                      {e.stack && (
                        <ul className={`chips ${styles.eStack}`} aria-label="Stack">
                          {e.stack.map((t) => (
                            <li key={t} className="chip">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>

      <section className="section" aria-labelledby="edu-title">
        <p id="edu-title" className="eyebrow" style={{ marginBottom: 20 }}>
          Education
        </p>
        <div className={`reveal ${styles.edu}`}>
          <div>
            <h2 className={styles.eduTitle}>{education.title}</h2>
            <p className={styles.title}>
              {education.degree} · {education.school}
            </p>
          </div>
          <span className="label">{education.period}</span>
        </div>
      </section>
    </div>
  );
}
