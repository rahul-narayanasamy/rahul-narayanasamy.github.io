import { useRef } from 'react'
import {
  ABOUT,
  ABOUT_PARAGRAPHS,
  ABOUT_QUOTE,
  MILESTONES,
  OWNER,
  PROFILE,
} from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './about.css'

const IconPin = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const HIGHLIGHTS = [
  'Rahul',
  'Software Engineer',
  'React',
  'TypeScript',
  'Syncfusion',
  'EPAM',
  'performance',
  'design fidelity',
  'maintainability',
]

const escapeRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const HL_RX = new RegExp(
  `\\b(${[...HIGHLIGHTS]
    .sort((a, b) => b.length - a.length)
    .map(escapeRx)
    .join('|')})\\b`,
  'g',
)

function renderWithHighlights(text) {
  return text.split(HL_RX).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="hl">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

export default function About() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" id="about" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">01</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> Who I am{' '}
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">{ABOUT.title}</h2>
            <p className="about-intro">{ABOUT.intro}</p>
          </div>
        </header>

        <div className="about-grid" data-reveal-group>
          <aside className="about-profile" data-reveal-item>
            <div className="profile-photo">
              <img src={PROFILE.photo} alt={PROFILE.name} />
              <span className="avatar-status">
                <i className="dot" />
              </span>
            </div>
            <h3 className="profile-name">{PROFILE.name}</h3>
            <p className="profile-role">{PROFILE.role}</p>
            <p className="profile-location">
              <IconPin /> {PROFILE.location}
            </p>
          </aside>

          <div className="about-copy" data-reveal-item>
            <h3 className="who-title">Who I Am</h3>
            {ABOUT_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)}>{renderWithHighlights(p)}</p>
            ))}
          </div>
        </div>

        <figure className="about-quote" data-reveal>
          <span className="about-quote-l1">{ABOUT_QUOTE.line1}</span>
          <span className="about-quote-l2">{ABOUT_QUOTE.line2}</span>
        </figure>

        <section className="journey" data-reveal-group>
          <h3 className="journey-title">My Journey &amp; Milestones</h3>
          <ol className="journey-list">
            {MILESTONES.map((m, i) => (
              <li
                key={m.year}
                className={`journey-item${i % 2 ? ' flip' : ''}`}
                data-reveal-item
              >
                <article className="journey-card">
                  <p className="journey-meta">
                    <span className="journey-tag">{m.tag}</span>
                    <span className="journey-year">{m.year}</span>
                  </p>
                  <h4 className="journey-head">{m.title}</h4>
                  <p className="journey-desc">{m.desc}</p>
                </article>
                <div className="journey-node">
                  <span
                    className={`journey-dot${i === MILESTONES.length - 1 ? ' now' : ''}`}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-cta" data-reveal>
          <h3 className="cta-line">
            Let&apos;s build something{' '}
            <span className="cta-accent">extraordinary</span> together.
          </h3>
          <div className="cta-links">
            <a className="btn" href={`mailto:${OWNER.email}`}>
              Email
            </a>
            {OWNER.socials.map((s) => (
              <a
                key={s.label}
                className="btn"
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
