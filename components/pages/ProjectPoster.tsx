import type { SideProject } from "@/content/types";

/**
 * A small generative poster per project, drawn in SVG so it stays crisp and themeable.
 * Each motif hints at what the project is, instead of a stock screenshot.
 */
export function ProjectPoster({ motif }: { motif: SideProject["motif"] }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="poster">
      {motif === "orbit" && (
        <g fill="none" stroke="currentColor">
          {[40, 75, 110, 145].map((r, i) => (
            <ellipse key={r} cx="200" cy="170" rx={r * 1.5} ry={r * 0.55} opacity={0.18 + i * 0.12} transform={`rotate(-14 200 170)`} />
          ))}
          <circle cx="200" cy="170" r="22" fill="currentColor" opacity="0.9" />
          <g transform="translate(200 170) rotate(-14)">
            <circle r="5" fill="currentColor">
              <animateMotion dur="9s" repeatCount="indefinite" path="M -165 0 a 165 60.5 0 1 0 330 0 a 165 60.5 0 1 0 -330 0" />
            </circle>
          </g>
          <path d="M40 60 L360 60" opacity="0.2" strokeDasharray="2 6" />
        </g>
      )}
      {motif === "ledger" && (
        <g stroke="currentColor" fill="none">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1="40" x2="360" y1={60 + i * 24} y2={60 + i * 24} opacity="0.15" />
          ))}
          {[120, 80, 150, 60, 170, 110, 190, 140].map((h, i) => (
            <rect key={i} x={56 + i * 38} y={252 - h} width="20" height={h} fill="currentColor" opacity={0.25 + (i % 3) * 0.2} className="p-bar" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
          <polyline points="66,170 104,150 142,190 180,120 218,130 256,80 294,100 332,60" strokeWidth="2" />
        </g>
      )}
      {motif === "terminal" && (
        <g fontFamily="inherit" fontSize="15" fill="currentColor">
          <rect x="40" y="46" width="320" height="210" fill="none" stroke="currentColor" opacity="0.4" />
          <line x1="40" x2="360" y1="72" y2="72" stroke="currentColor" opacity="0.3" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={56 + i * 14} cy="59" r="4" opacity="0.6" />
          ))}
          <text x="58" y="104" opacity="0.9">$ whoami</text>
          <text x="58" y="128" opacity="0.5">rahul — software engineer</text>
          <text x="58" y="160" opacity="0.9">$ ls projects/</text>
          <text x="58" y="184" opacity="0.5">apogee vault signal ...</text>
          <text x="58" y="216" opacity="0.9">
            $ <tspan className="p-caret">█</tspan>
          </text>
        </g>
      )}
      {motif === "split" && (
        <g stroke="currentColor" fill="currentColor">
          <line x1="200" x2="200" y1="40" y2="260" opacity="0.4" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`l${i}`} x="48" y={64 + i * 30} width={[110, 70, 130, 90, 120, 60][i]} height="8" opacity="0.35" />
          ))}
          <text x="226" y="84" fontSize="30" fontWeight="800" stroke="none">
            H1
          </text>
          {[0, 1, 2, 3].map((i) => (
            <rect key={`r${i}`} x="226" y={112 + i * 26} width={[120, 96, 128, 70][i]} height="6" opacity="0.7" />
          ))}
          <text x="52" y="58" fontSize="12" stroke="none" opacity="0.6">
            # md
          </text>
        </g>
      )}
      {motif === "signal" && (
        <g fill="none" stroke="currentColor">
          {Array.from({ length: 5 }, (_, k) => (
            <path
              key={k}
              d={Array.from({ length: 41 }, (_, i) => {
                const x = 30 + i * 8.5;
                const y = 150 + Math.sin(i / 2.2 + k) * (8 + k * 9) * Math.exp(-((i - 20) ** 2) / 160);
                return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
              }).join(" ")}
              opacity={0.2 + k * 0.18}
              strokeWidth={k === 4 ? 2 : 1}
            />
          ))}
          <circle cx="200" cy="150" r="70" opacity="0.2" strokeDasharray="3 5" />
        </g>
      )}
      {motif === "isobar" && (
        <g fill="none" stroke="currentColor">
          {[30, 60, 90, 120, 150, 180].map((r, i) => (
            <path
              key={r}
              d={`M ${260 - r} 150 C ${260 - r} ${150 - r * 0.9}, ${260 + r * 0.8} ${150 - r * 0.7}, ${260 + r} 150 S ${260 - r * 0.6} ${150 + r}, ${260 - r} 150`}
              opacity={0.55 - i * 0.07}
            />
          ))}
          <text x="248" y="156" fontSize="14" fill="currentColor" stroke="none">
            H
          </text>
          <text x="40" y="260" fontSize="44" fontWeight="800" fill="currentColor" stroke="none" opacity="0.85">
            23°
          </text>
        </g>
      )}
      {motif === "grid" && (
        <g stroke="currentColor" fill="currentColor">
          {Array.from({ length: 8 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={40 + c * 54}
                y={50 + r * 26}
                width="52"
                height="24"
                fill={r === 0 ? "currentColor" : r === 3 ? "currentColor" : "none"}
                opacity={r === 0 ? 0.55 : r === 3 ? 0.22 : 0.18}
              />
            ))
          )}
        </g>
      )}
    </svg>
  );
}
