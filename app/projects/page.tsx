import type { Metadata } from "next";
import { caseStudies, sideProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import { PageHead } from "@/components/shell/PageHead";
import { CaseStudies } from "@/components/pages/CaseStudies";
import { ProjectPoster } from "@/components/pages/ProjectPoster";
import { SnakeGraph } from "@/components/pages/SnakeGraph";
import styles from "@/components/pages/Projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Client case studies in insurance, financial data and logistics, plus side projects: Apogee, Vault, Signal and more.",
  alternates: { canonical: "/projects/" },
};

export default function Projects() {
  return (
    <div className="wrap">
      <PageHead
        no="02"
        eyebrow="Selected projects"
        title={
          <>
            Things I&apos;ve
            <br />
            built
          </>
        }
        lead={`${caseStudies.length} client engagements, described without client names, and ${sideProjects.length} things I build in public.`}
      />

      <section className="reveal" aria-label="GitHub contributions">
        <SnakeGraph />
      </section>

      <section className="section" aria-labelledby="client-title">
        <div className="section-title">
          <h2 id="client-title">Client work</h2>
          <span className="label">Problem · approach · outcome</span>
        </div>
        <CaseStudies />
      </section>

      <section className="section" aria-labelledby="side-title">
        <div className="section-title">
          <h2 id="side-title">Side projects</h2>
          <a className="label red" href={profile.github} target="_blank" rel="noopener noreferrer">
            [ GitHub · @{profile.githubHandle} ↗ ]
          </a>
        </div>

        <ol className={styles.side}>
          {sideProjects.map((p, i) => {
            const no = String(i + 1).padStart(2, "0");
            return (
              <li key={p.id} className={`${styles.proj} ${i % 2 ? styles.flip : ""}`}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`reveal poster-tone ${styles.visual} ${styles[p.tone]}`}
                  aria-label={`${p.title} source on GitHub`}
                >
                  <ProjectPoster motif={p.motif} />
                  <span className={styles.tag}>Project {no}</span>
                  <span className={styles.ghost} aria-hidden="true">
                    {no}
                  </span>
                </a>
                <div className={`reveal ${styles.info}`} style={{ "--d": "120ms" } as React.CSSProperties}>
                  <p className={styles.kind}>
                    Project {no} — {p.kind} · {p.year}
                  </p>
                  <h3 className={styles.projTitle}>{p.title}</h3>
                  <p className={styles.projSummary}>{p.summary}</p>
                  <ul className="chips">
                    {p.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className={`btn ${styles.source}`}>
                    Source <span className="arrow">↗</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
