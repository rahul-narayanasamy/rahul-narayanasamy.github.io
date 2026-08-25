import { useRef } from 'react'
import { RESUME } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './resume.css'

export default function Resume() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">06</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> Curriculum vitae{' '}
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">{RESUME.title}</h2>
            <p className="resume-intro">{RESUME.intro}</p>
          </div>
        </header>

        <div className="resume-actions" data-reveal>
          <a
            className="btn solid"
            href={RESUME.pdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF <span aria-hidden="true">↗</span>
          </a>
          <a className="btn" href={RESUME.pdfUrl} download>
            Download <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="resume-viewer" data-reveal>
          <iframe
            src={RESUME.pdfUrl}
            title={`${RESUME.title} — PDF viewer`}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
