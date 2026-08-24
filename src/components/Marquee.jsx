export default function Marquee({ accent = false, reverse = false, items = [] }) {
  const phrases =
    items.length > 0
      ? items
      : ['React · TypeScript', 'Building interfaces', 'Shipping since 2018']

  const half = []
  for (let r = 0; r < 2; r++) {
    half.push(...phrases)
  }

  const cells = []
  ;[...half, ...half].forEach((text, i) => {
    cells.push(
      <span className="marquee-item" key={`t-${i}`}>
        {text}
      </span>,
      <span className="marquee-sep" key={`s-${i}`}>
        {'</>'}
      </span>,
    )
  })

  return (
    <div
      className={`marquee${accent ? ' accent' : ''}${reverse ? ' reverse' : ''}`}
      aria-hidden="true"
    >
      <div className="marquee-track">{cells}</div>
    </div>
  )
}
