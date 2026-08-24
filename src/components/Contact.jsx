import { useRef } from 'react'
import { OWNER } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
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
          Open to conversations — full-time roles, freelance work, or
          interesting experiments. Messages get a reply within 24 hours.
        </p>

        <div data-reveal>
          <a className="contact-cta" href={`mailto:${OWNER.email}`}>
            {OWNER.email} ↗
          </a>
          <div className="contact-status">
            <i className="dot" /> Status: open to conversations · Response &lt;
            24h
          </div>
        </div>

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
