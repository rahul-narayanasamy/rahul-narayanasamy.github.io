"use client";

import { useRef, useState } from "react";
import { layers } from "@/content/system";
import styles from "./Systems.module.css";

/** The reference shape for a large frontend. Select a block to read what it owns and the trade-off. */
export function SystemDiagram() {
  const [selected, setSelected] = useState("next");
  const detailRef = useRef<HTMLElement>(null);

  const select = (id: string) => {
    setSelected(id);
    // Stacked layout: the detail panel sits below the diagram, so bring it into view.
    if (window.matchMedia("(max-width: 960px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };
  const layer = layers.find((l) => l.id === selected) ?? layers[0];
  const idx = layers.indexOf(layer);
  const request = layers.filter((l) => l.lane === "request");
  const app = layers.filter((l) => l.lane === "app");

  // A render helper (not a nested component) so React keeps focus on the button across re-renders.
  const node = (l: (typeof layers)[number]) => (
    <button
      key={l.id}
      type="button"
      className={styles.node}
      aria-pressed={selected === l.id}
      onClick={() => select(l.id)}
    >
      <span className={styles.nodeNo}>{String(layers.indexOf(l) + 1).padStart(2, "0")}</span>
      <b>{l.label}</b>
      <span className={styles.nodeSub}>{l.sub}</span>
    </button>
  );

  return (
    <div className={styles.layout}>
      <div className={`card ${styles.diagram}`}>
        <p className="label">Request path →</p>
        <div className={styles.lane}>
          <span className={styles.endpoint}>Browser</span>
          {request.map((l) => (
            <div key={l.id} className={styles.hop}>
              <span className={styles.wire} aria-hidden="true">
                <i />
              </span>
              {node(l)}
            </div>
          ))}
        </div>
        <div className={styles.boundary}>
          <span className={`label ${styles.boundaryLabel}`}>Inside the Next.js app</span>
          <div className={styles.appLane}>{app.map(node)}</div>
        </div>
        <p className={styles.hint}>Select any block</p>
      </div>

      <aside ref={detailRef} className={`card ${styles.detail}`} aria-live="polite">
        <div className={styles.detailHead}>
          <span className={styles.detailNo}>{String(idx + 1).padStart(2, "0")}</span>
          <span className="label">{layer.lane === "request" ? "Request path" : "App internals"}</span>
        </div>
        <h2 key={layer.id} className={styles.detailTitle}>
          {layer.label}
        </h2>
        <dl key={`${layer.id}-dl`} className={styles.detailList}>
          <div>
            <dt>Owns</dt>
            <dd>{layer.owns}</dd>
          </div>
          <div>
            <dt>Decision I make here</dt>
            <dd>{layer.decisions}</dd>
          </div>
          <div>
            <dt>Trade-off</dt>
            <dd>{layer.tradeoff}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
