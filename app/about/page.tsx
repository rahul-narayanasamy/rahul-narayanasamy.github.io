import type { Metadata } from "next";
import Image from "next/image";
import { journey, principles, profile, story } from "@/content/profile";
import { credentials } from "@/content/writing";
import { Marked, PageHead } from "@/components/shell/PageHead";
import styles from "@/components/pages/About.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `Who ${profile.name} is: eight years from Syncfusion's DataGrid to production React at EPAM.`,
  alternates: { canonical: "/about/" },
};

const stamp = { "in-progress": "In progress", ongoing: "Ongoing", completed: "Completed" } as const;

export default function About() {
  return (
    <div className="wrap">
      <PageHead
        no="01"
        eyebrow="Who I am"
        title="About"
        lead="A software engineer specializing in React and TypeScript. My journey, how I work, and the milestones that shaped how I build."
      />

      <section className={styles.intro} aria-label="Story">
        <aside className={`card reveal ${styles.idCard}`}>
          <div className={styles.photo}>
            <Image src="/avatar.png" alt={`Portrait of ${profile.name}`} width={256} height={256} />
            <span className={styles.scan} aria-hidden="true" />
          </div>
          <p className={styles.idName}>{profile.name}</p>
          <p className={styles.idRole}>{profile.role}</p>
          <dl className={styles.idMeta}>
            <div>
              <dt>Based</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{profile.experience} years</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className="status-dot" /> {profile.availability}
              </dd>
            </div>
          </dl>
          <div className={styles.idLinks}>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </aside>

        <div className={styles.storyCol}>
          <h2 className={styles.h2}>Who I am</h2>
          <div className="prose">
            {story.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                <Marked text={p} />
              </p>
            ))}
          </div>
          <figure className={`reveal ${styles.pull}`}>
            <blockquote>“{story.quote}”</blockquote>
            <figcaption>{story.quoteSub}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="section-title">
          <h2 id="how-title">How I work</h2>
          <span className="label">4 principles</span>
        </div>
        <ol className={styles.principles}>
          {principles.map((p, i) => (
            <li key={p.no} className="reveal" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <span className={styles.pNo}>{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="journey-title">
        <div className="section-title">
          <h2 id="journey-title">My journey &amp; milestones</h2>
          <span className="label">2014 → now</span>
        </div>
        <ol className={styles.journey}>
          {journey.map((j) => (
            <li key={j.year} className="reveal">
              <div className={styles.jYear}>
                <span className="label">{j.phase}</span>
                <b>{j.year}</b>
              </div>
              <span className={styles.jNode} aria-hidden="true" />
              <div className={styles.jBody}>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="cert-title">
        <div className="section-title">
          <h2 id="cert-title">Certifications &amp; learning</h2>
          <span className="label">Ledger</span>
        </div>
        <ul className={styles.creds}>
          {credentials.map((c, i) => (
            <li key={c.title} className={`reveal ${styles.cred}`} style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <span className={styles.credYear}>{c.year}</span>
              <div>
                <h3>{c.title}</h3>
                <p className={styles.credIssuer}>{c.issuer}</p>
                <p className={styles.credDetail}>{c.detail}</p>
              </div>
              <span className={`${styles.stamp} ${styles[c.status]}`}>{stamp[c.status]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
