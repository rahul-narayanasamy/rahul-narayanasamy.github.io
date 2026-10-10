import type { ReactNode } from "react";

export function PageHead({
  no,
  eyebrow,
  title,
  lead,
  aside,
}: {
  no: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="page-head">
      <span className="sec-index" aria-hidden="true">
        {no}
      </span>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {aside}
    </header>
  );
}

/** Renders "[word]" segments of a content string as highlighted marks. */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) => (p.startsWith("[") ? <mark key={i}>{p.slice(1, -1)}</mark> : p))}
    </>
  );
}
