import type { Metadata } from "next";
import { toolbox } from "@/content/skills";
import { PageHead } from "@/components/shell/PageHead";
import { SkillRows } from "@/components/pages/SkillRows";
import styles from "@/components/pages/Skills.module.css";

export const metadata: Metadata = {
  title: "Skills",
  description: "TypeScript, React and Next.js, GraphQL and Node.js, GSAP, system design and the rest of the toolbox.",
  alternates: { canonical: "/skills/" },
};

export default function Skills() {
  return (
    <div className="wrap">
      <PageHead
        no="03"
        eyebrow="What I work with"
        title="Skills & tools"
        lead="Ten things I reach for, and the job each one does. Open a row to see where I've used it."
      />
      <SkillRows />
      <section className="section" aria-labelledby="toolbox-title">
        <p id="toolbox-title" className="eyebrow" style={{ marginBottom: 20 }}>
          Also in my toolbox
        </p>
        <ul className={styles.toolbox}>
          {toolbox.map((t) => (
            <li key={t} className={styles.pill}>
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
