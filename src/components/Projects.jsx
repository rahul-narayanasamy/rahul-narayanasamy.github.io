import { useRef } from 'react'
import { PROJECTS } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './projects.css'

export default function Projects() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" id="projects" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">02</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> Selected projects{' '}
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">
              Things I&apos;ve
              <br />
              built
            </h2>
          </div>
        </header>

        <div className="proj-list">
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`proj${i % 2 === 1 ? ' flip' : ''}`}
              data-reveal
            >
              <a
                className={`proj-visual v${(i % 4) + 1}`}
                href={p.code}
                aria-label={`Open ${p.title}`}
              >
                <span className="proj-ghost">{p.id}</span>
                <span className="proj-stamp">Project {p.id}</span>
              </a>

              <div className="proj-info">
                <p className="proj-kicker">
                  Project {p.id} — {p.type} · {p.year}
                </p>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <ul className="proj-stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="proj-links">
                  {p.live && (
                    <a className="btn" href={p.live}>Live site ↗</a>
                  )}
                  <a className="btn" href={p.code}>Source ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
