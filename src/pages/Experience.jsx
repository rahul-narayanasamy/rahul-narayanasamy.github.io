import { useRef } from 'react'
import { EDUCATION, EXPERIENCE } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './experience.css'

export default function Experience() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">05</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> Career history{' '}
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">
              Where I&apos;ve
              <br />
              worked
            </h2>
          </div>
        </header>

        <ul className="xp-list">
          {EXPERIENCE.map((job) => (
            <li className="xp-item" key={job.id} data-reveal>
              <div className="xp-when">
                <strong>{job.period}</strong>
                <span>{job.location}</span>
                {job.current && (
                  <span className="xp-current">
                    <i className="dot" /> Current
                  </span>
                )}
              </div>

              <div className="xp-body">
                <h3 className="xp-company">{job.company}</h3>
                <p className="xp-role">{job.role}</p>
                <p className="xp-summary">{job.summary}</p>
                <ul className="xp-stack">
                  {job.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="edu" data-reveal>
          <p className="sec-kicker">
            <span className="tick">[</span> Education{' '}
            <span className="tick">]</span>
          </p>
          <div className="edu-row">
            <div>
              <h3 className="xp-company">{EDUCATION.degree}</h3>
              <p className="xp-role">{EDUCATION.place}</p>
            </div>
            <span className="edu-period">{EDUCATION.period}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
