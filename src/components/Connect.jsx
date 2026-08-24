import { CONNECT } from '../data/content'
import './connect.css'

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
    <path d="M9.5 15.5l1.8 1.8 3.4-3.6" />
  </svg>
)

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const IconX = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93ZM17.61 20.64h2.04L6.49 3.24H4.3Z" />
  </svg>
)

const ICONS = {
  calendar: IconCalendar,
  mail: IconMail,
  x: IconX,
}

export default function Connect() {
  return (
    <section className="home-connect">
      <div className="shell">
        <div className="connect-card" data-reveal>
          <p className="sec-kicker">
            <span className="tick">[</span> {CONNECT.kicker}{' '}
            <span className="tick">]</span>
          </p>
          <h2 className="connect-title">{CONNECT.title}</h2>
          <p className="connect-sub">{CONNECT.subtitle}</p>

          <div className="connect-grid">
            {CONNECT.methods.map((m) => {
              const Icon = ICONS[m.icon]
              return (
                <a
                  key={m.id}
                  className="connect-tile"
                  href={m.href}
                  {...(m.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <span className="connect-icon">
                    <Icon />
                  </span>
                  <span className="connect-name">{m.title}</span>
                  <span className="connect-desc">{m.desc}</span>
                  <span className="connect-arrow">↗</span>
                </a>
              )
            })}
          </div>

          <p className="connect-foot">
            <i className="dot" /> {CONNECT.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
