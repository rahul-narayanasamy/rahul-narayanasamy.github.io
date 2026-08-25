import { useRef } from 'react'
import { CONNECT, OWNER } from '../data/content'
import { CONNECT_ICONS } from './connectIcons'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './connect.css'
import './contact.css'

export default function Contact() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec contact" id="contact" ref={rootRef}>
      <div className="shell">
        <p className="contact-kicker" data-reveal>
          [ Available for new opportunities ]
        </p>
        <h2 className="contact-title" data-reveal>
          Get in touch
        </h2>
        <p className="contact-sub" data-reveal>
          Choose your preferred method to connect and let&apos;s discuss your
          project.
        </p>

        <div className="contact-methods" data-reveal-group>
          {CONNECT.methods.map((m) => {
            const Icon = CONNECT_ICONS[m.icon]
            return (
              <a
                key={m.id}
                className="connect-tile"
                href={m.href}
                {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                data-reveal-item
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

        <p className="connect-foot" data-reveal>
          <i className="dot" /> {CONNECT.footnote}
        </p>

        <ul className="socials" data-reveal-group>
          {OWNER.socials.map((s) => (
            <li key={s.label} data-reveal-item>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
                <span>{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
