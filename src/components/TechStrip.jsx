import './techstrip.css'

const M = "'JetBrains Mono', monospace"

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <g fill="none" stroke="#61dafb" strokeWidth="1">
      <ellipse cx="12" cy="12" rx="10.5" ry="4" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
    </g>
    <circle cx="12" cy="12" r="2" fill="#61dafb" />
  </svg>
)

const JsIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#f7df1e" />
    <text x="12.5" y="20" fontFamily={M} fontWeight="800" fontSize="11" fill="#111">JS</text>
  </svg>
)

const TsIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#3178c6" />
    <text x="12.5" y="20" fontFamily={M} fontWeight="800" fontSize="11" fill="#fff">TS</text>
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#fff" />
    <text x="12" y="17" textAnchor="middle" fontFamily={M} fontWeight="800" fontSize="13" fill="#000">N</text>
    <path d="M15.5 18.5 7 7" stroke="#000" strokeWidth="1.4" />
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <path d="M12 1.5 21.5 7v10L12 22.5 2.5 17V7Z" fill="#83cd29" />
    <text x="12" y="16.5" textAnchor="middle" fontFamily={M} fontWeight="800" fontSize="8.5" fill="#111">node</text>
  </svg>
)

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <path
      fill="#06b6d4"
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35C13.39 10.87 14.62 12 18 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C16.61 7.13 15.38 6 12 6ZM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35C8.39 16.87 9.62 18 13 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C11.61 13.13 10.38 12 7 12Z"
    />
  </svg>
)

const GqlIcon = () => {
  const pts = [
    [12, 2],
    [20.66, 7],
    [20.66, 17],
    [12, 22],
    [3.34, 17],
    [3.34, 7],
  ]
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
      <polygon
        points={pts.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="#e10098"
        strokeWidth="1.3"
      />
      <g stroke="#e10098" strokeWidth="1.3">
        <line x1="12" y1="2" x2="20.66" y2="17" />
        <line x1="20.66" y1="7" x2="3.34" y2="17" />
        <line x1="20.66" y1="17" x2="3.34" y2="7" />
        <line x1="12" y1="22" x2="20.66" y2="7" />
        <line x1="12" y1="22" x2="3.34" y2="7" />
        <line x1="3.34" y1="17" x2="12" y2="2" />
      </g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#e10098" />
      ))}
    </svg>
  )
}

const GsapIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="none" stroke="#0ae448" strokeWidth="1.5" />
    <text x="12" y="16" textAnchor="middle" fontFamily={M} fontWeight="800" fontSize="8" fill="#0ae448">GSAP</text>
  </svg>
)

const PrismaIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <path d="M12 2 21.5 19.5 12 22 2.5 19.5Z" fill="#16a394" opacity="0.25" />
    <path d="M12 2 21.5 19.5 12 22Z" fill="#16a394" />
    <path d="M12 2v20" stroke="#0d7a70" strokeWidth="1" />
  </svg>
)

const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <path d="M13.5 1.5 3.5 14h6.5l-1 8.5 10-12.5h-6.5Z" fill="#3ecf8e" />
  </svg>
)

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <g fill="none" stroke="#336791" strokeWidth="1.6">
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </g>
  </svg>
)

const FramerIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <path d="M5 2h14v6.6h-7Z" fill="#eae4d6" />
    <path d="M5 8.6h7l7 6.8H5Z" fill="#8f8779" />
    <path d="M5 15.4h7V22Z" fill="#55503f" />
  </svg>
)

const CsIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#512bd4" />
    <text x="12" y="17" textAnchor="middle" fontFamily={M} fontWeight="800" fontSize="10.5" fill="#fff">C#</text>
  </svg>
)

const TECHS = [
  { name: 'React', Icon: ReactIcon },
  { name: 'JavaScript', Icon: JsIcon },
  { name: 'TypeScript', Icon: TsIcon },
  { name: 'Next.js', Icon: NextIcon },
  { name: 'Node.js', Icon: NodeIcon },
  { name: 'Tailwind CSS', Icon: TailwindIcon },
  { name: 'GraphQL', Icon: GqlIcon },
  { name: 'GSAP', Icon: GsapIcon },
  { name: 'Prisma', Icon: PrismaIcon },
  { name: 'Supabase', Icon: SupabaseIcon },
  { name: 'PostgreSQL', Icon: PostgresIcon },
  { name: 'Framer Motion', Icon: FramerIcon },
  { name: 'C# / .NET', Icon: CsIcon },
]

export default function TechStrip() {
  const renderTiles = (hidden) =>
    TECHS.map(({ name, Icon }) => (
      <li
        key={`${name}-${hidden ? 'b' : 'a'}`}
        className="tech-tile"
        title={name}
        aria-hidden={hidden || undefined}
      >
        <Icon />
      </li>
    ))

  return (
    <div className="tech-strip" role="list" aria-label="Tools and technologies I use">
      <div className="tech-track">
        <ul className="tech-set">{renderTiles(false)}</ul>
        <ul className="tech-set">{renderTiles(true)}</ul>
      </div>
    </div>
  )
}
