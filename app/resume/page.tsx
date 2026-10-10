import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { roles } from "@/content/experience";
import { PageHead } from "@/components/shell/PageHead";
import styles from "@/components/pages/Misc.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}'s resume: experience, projects and skills, as a two-page PDF.`,
  alternates: { canonical: "/resume/" },
};

export default function Resume() {
  return (
    <div className="wrap">
      <PageHead
        no="08"
        eyebrow="Curriculum vitae"
        title="Resume"
        lead="A quick look at my experience, projects, and skills. Read it here, open it in a new tab, or download it."
        aside={
          <div className={styles.resumeActions}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Open PDF <span className="arrow">↗</span>
            </a>
            <a href="/resume.pdf" download="Rahul-Narayanasamy-Resume.pdf" className="btn">
              Download <span className="arrow">↓</span>
            </a>
          </div>
        }
      />
      <div className={styles.resumeGrid}>
        <aside className={`reveal ${styles.tldr}`}>
          <p className="eyebrow">TL;DR</p>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{profile.experience} years</dd>
            </div>
            {roles.map((r) => (
              <div key={r.org}>
                <dt>{r.org}</dt>
                <dd>{r.period}</dd>
              </div>
            ))}
            <div>
              <dt>Core</dt>
              <dd>React · TypeScript · Next.js · Node.js</dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd>AI agents · MCP · system design</dd>
            </div>
          </dl>
        </aside>
        <div className={`reveal ${styles.pdfFrame}`}>
          <object data="/resume.pdf#view=FitH" type="application/pdf" aria-label="Resume PDF">
            <p className={styles.pdfFallback}>
              Your browser can&apos;t show PDFs inline. <a href="/resume.pdf">Open the resume</a> instead.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
