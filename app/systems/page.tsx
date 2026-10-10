import type { Metadata } from "next";
import { designQuestions } from "@/content/system";
import { PageHead } from "@/components/shell/PageHead";
import { SystemDiagram } from "@/components/pages/SystemDiagram";
import styles from "@/components/pages/Systems.module.css";

export const metadata: Metadata = {
  title: "Systems",
  description: "How Rahul draws a frontend platform: edge, Next.js, BFF, domain services, design system and data layer.",
  alternates: { canonical: "/systems/" },
};

export default function Systems() {
  return (
    <div className="wrap">
      <PageHead
        no="05"
        eyebrow="System design"
        title={
          <>
            How I draw
            <br />a frontend
          </>
        }
        lead="The reference shape I start from on a large product. Select any block to read what it owns, the decision I make there, and the trade-off."
      />
      <div className="reveal">
        <SystemDiagram />
      </div>
      <section className="section" aria-labelledby="q-title">
        <div className="section-title">
          <h2 id="q-title">Asked before drawing any boxes</h2>
          <span className="label">Review checklist</span>
        </div>
        <ol className={styles.questions}>
          {designQuestions.map((q, i) => (
            <li key={q.q} className="reveal" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <span className={styles.qNo}>Q{i + 1}</span>
              <b>{q.q}</b>
              <p>{q.a}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
