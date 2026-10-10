import Link from "next/link";
import { roles } from "@/content/experience";
import { profile } from "@/content/profile";
import { pages } from "@/lib/pages";
import styles from "./Home.module.css";

export function CurrentRole() {
  const r = roles[0];
  return (
    <section className={`wrap section ${styles.role}`} aria-labelledby="now-title">
      <div className={`card reveal ${styles.roleCard}`}>
        <div className={styles.roleTop}>
          <div>
            <p className="label">Currently</p>
            <h2 id="now-title" className={styles.roleTitle}>
              {r.title}
            </h2>
            <p className={styles.roleOrg}>
              {r.org} · {r.period}
            </p>
          </div>
          <span className={styles.active}>
            <span className="status-dot" /> Active
          </span>
        </div>
        <p className={styles.roleSummary}>
          Building scalable web products for global clients. {r.summary}
        </p>
        <ul className="chips">
          {r.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <ol className={styles.engagements} aria-label="Recent engagements">
          {r.engagements.map((e) => (
            <li key={e.context}>
              <span>{e.period}</span>
              <b>{e.context}</b>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.center}>
        <Link href="/experience/" className="btn">
          View all experience <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

export function Directory() {
  const list = pages.filter((p) => p.no !== "00");
  return (
    <section className={`wrap section ${styles.directory}`} aria-labelledby="dir-title">
      <header className={`page-head ${styles.dirHead}`}>
        <span className="sec-index" aria-hidden="true">
          00
        </span>
        <p className="eyebrow">Site directory</p>
        <h2 id="dir-title">
          Explore
          <br />
          the rest
        </h2>
        <p className="lead">
          {list.length} pages. Use <kbd className={styles.kbd}>[</kbd> <kbd className={styles.kbd}>]</kbd> to flip between
          them, or <kbd className={styles.kbd}>⌘K</kbd> to jump anywhere.
        </p>
      </header>
      <ol className={styles.dirGrid}>
        {list.map((p, i) => (
          <li key={p.href} className="reveal" style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}>
            <Link href={p.href} className={styles.dirCard}>
              <span className={styles.dirNo}>{p.no}</span>
              <span className={styles.dirArrow} aria-hidden="true">
                →
              </span>
              <span className={styles.dirTitle}>{p.title}</span>
              <span className={styles.dirBlurb}>{p.blurb}</span>
              <span className={styles.dirGhost} aria-hidden="true">
                {p.no}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ConnectCards({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as "h1" | "h2";
  const items = [
    {
      title: "Book a quick chat",
      body: "Discuss code, projects, or just say hello.",
      href: `mailto:${profile.email}?subject=Quick%20chat`,
      icon: "☏",
    },
    {
      title: "Write an email",
      body: "For collaborations, roles, or quick questions.",
      href: `mailto:${profile.email}`,
      icon: "✉",
    },
    {
      title: "Connect on LinkedIn",
      body: "Work history, recommendations, and updates.",
      href: profile.linkedin,
      icon: "in",
      external: true,
    },
  ];
  return (
    <div className={`card ${styles.connect}`}>
      <p className="eyebrow">Let&apos;s work together</p>
      <H className={styles.connectTitle}>Get in touch</H>
      <p className={styles.connectLead}>Choose your preferred way to connect and let&apos;s discuss your project.</p>
      <ul className={styles.connectGrid}>
        {items.map((it, i) => (
          <li key={it.title} className="reveal" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
            <a
              href={it.href}
              className={styles.connectCard}
              {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className={styles.connectIcon} aria-hidden="true">
                {it.icon}
              </span>
              <span className={styles.connectArrow} aria-hidden="true">
                ↗
              </span>
              <b>{it.title}</b>
              <span>{it.body}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.connectFoot}>
        <span className="status-dot" /> Response within 24 hours · {profile.availability}
      </p>
    </div>
  );
}
