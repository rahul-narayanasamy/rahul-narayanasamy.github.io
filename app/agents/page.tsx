import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";
import { PageHead } from "@/components/shell/PageHead";
import { AgentTrace } from "@/components/pages/AgentTrace";
import styles from "@/components/pages/Agents.module.css";

export const metadata: Metadata = {
  title: "Agents",
  description: "Agentic engineering from the interface out: one tool-using turn traced through the model and an MCP server.",
  alternates: { canonical: "/agents/" },
};

const focus = [
  {
    tag: "Interface",
    title: "Agent UIs people can trust",
    body: "Streaming output, every tool call visible, approve-or-reject for risky actions, and an interrupt that really stops the loop.",
  },
  {
    tag: "Protocol",
    title: "MCP servers with real contracts",
    body: "Small, well-described tools with strict input schemas. The same discipline I bring to component APIs, applied to what a model can call.",
  },
  {
    tag: "Runtime",
    title: "Loop control",
    body: "Explicit branching on stop_reason, tool results returned with matching ids and errors, and iteration caps so a confused agent fails loudly.",
  },
];

export default function Agents() {
  return (
    <div className="wrap">
      <PageHead
        no="06"
        eyebrow="AI · MCP"
        title={
          <>
            Agents, from
            <br />
            the interface out
          </>
        }
        lead="An agent is a loop: the model asks for a tool, the app runs it, the result goes back, until the model says it's done. The engineering is in making that loop visible, safe and fast for a person."
      />
      <div className="reveal">
        <AgentTrace />
      </div>

      <section className="section" aria-labelledby="focus-title">
        <div className="section-title">
          <h2 id="focus-title">Where I focus</h2>
          <span className="label">3 layers</span>
        </div>
        <div className={styles.focus}>
          {focus.map((f, i) => (
            <article key={f.tag} className="reveal" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <span className="label red">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
        <p className="label" style={{ marginTop: 28 }}>
          Written up in more depth:{" "}
          {articles.map((a, i) => (
            <span key={a.href}>
              {i > 0 && " · "}
              <a className="red" href={a.href} target="_blank" rel="noopener noreferrer">
                {a.title.split(":")[0]} ↗
              </a>
            </span>
          ))}{" "}
          · <Link href="/blog/">All writing →</Link>
        </p>
      </section>
    </div>
  );
}
