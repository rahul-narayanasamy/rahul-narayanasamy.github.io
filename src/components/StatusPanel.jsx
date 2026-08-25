import { OWNER } from '../data/content'
import useUptime from '../hooks/useUptime'
import './status.css'

const META = [
  { label: 'Location', value: OWNER.location },
  { label: 'Experience', value: OWNER.experience },
  { label: 'Focus', value: OWNER.focus },
]

export default function StatusPanel() {
  const uptime = useUptime()

  return (
    <aside className="status-panel" data-reveal-group>
      <div className="uptime" data-reveal-item>
        <span className="uptime-label">Session lock</span>
        <strong className="uptime-clock">{uptime}</strong>
        <span className="uptime-note">
          Time since you opened this portfolio
        </span>
      </div>

      {META.map((m) => (
        <div className="meta-row" key={m.label} data-reveal-item>
          <span>{m.label}</span>
          <strong>{m.value}</strong>
        </div>
      ))}

      <div className="route-strip" data-reveal-item>
        <span>Origin · {OWNER.location.split(',')[0]}</span>
        <span>Destination · Your team</span>
        <span className="route-ok">
          <i className="dot" /> Route status · Open
        </span>
      </div>
    </aside>
  )
}
