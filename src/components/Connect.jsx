import { CONNECT } from '../data/content'
import { CONNECT_ICONS } from './connectIcons'
import './connect.css'

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
              const Icon = CONNECT_ICONS[m.icon]
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
