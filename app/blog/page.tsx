import type { Metadata } from "next";
import { articles } from "@/content/writing";
import { profile } from "@/content/profile";
import { PageHead } from "@/components/shell/PageHead";
import styles from "@/components/pages/Misc.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI agents, agentic loops and multi-agent orchestration, published on Medium.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  return (
    <div className="wrap">
      <PageHead
        no="07"
        eyebrow="Writing · Medium"
        title="Blog"
        lead="Notes, insights, and lessons in AI, frontend engineering, and building with agents."
      />
      <ol className={styles.posts}>
        {articles.map((a, i) => (
          <li key={a.href} className="reveal" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
            <a href={a.href} target="_blank" rel="noopener noreferrer" className={styles.post}>
              <span className={styles.postNo}>{String(articles.length - i).padStart(2, "0")}</span>
              <span className={styles.postMeta}>
                <span className="red">{a.topic}</span> · {a.date} · {a.minutes} min read
              </span>
              <span className={styles.postTitle}>{a.title}</span>
              <span className={styles.postSummary}>{a.summary}</span>
              <span className={styles.postCta}>
                Read on Medium <span aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className={styles.centerRow}>
        <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="btn">
          View all posts on Medium <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}
