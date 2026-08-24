import { useRef } from 'react'
import { SKILLS, TOOLS } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './skills.css'

export default function Skills() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" id="skills" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">03</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> What I work with
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">Skills &amp; tools</h2>
          </div>
        </header>

        <ul className="skill-list" data-reveal-group>
          {SKILLS.map((s) => (
            <li className="skill-row" key={s.id} data-reveal-item>
              <span className="skill-num">{s.id}</span>
              <h3 className="skill-name">{s.name}</h3>
              <span className="skill-role">{s.role}</span>
            </li>
          ))}
        </ul>

        <div className="tools" data-reveal>
          <p className="tools-label">[ Also in my toolbox ]</p>
          <ul>
            {TOOLS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
