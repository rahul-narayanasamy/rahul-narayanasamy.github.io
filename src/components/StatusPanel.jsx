import { useEffect, useState } from 'react'
import { OWNER } from '../data/content'
import './status.css'

const META = [
  { label: 'Location', value: OWNER.location },
  { label: 'Experience', value: OWNER.experience },
  { label: 'Focus', value: OWNER.focus },
]

// Captured once when the app bundle first loads — survives client-side
// navigation, so the timer keeps counting across page switches.
const SESSION_START = Date.now()

function useUptime() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const s = Math.max(0, Math.floor((now - SESSION_START) / 1000))
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

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
