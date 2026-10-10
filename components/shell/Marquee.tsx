/** Infinite ticker. Items are rendered twice so the -50% loop is seamless. */
export function Marquee({
  items,
  sep = "</>",
  accent,
  reverse,
}: {
  items: readonly string[];
  sep?: string;
  accent?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${accent ? "accent" : ""} ${reverse ? "reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} style={{ display: "flex" }}>
            {row.map((item, i) => (
              <span key={`${k}-${i}`} style={{ display: "flex" }}>
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep">{sep}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
