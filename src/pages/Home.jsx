import { useRef } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import StatusPanel from '../components/StatusPanel'
import TechStrip from '../components/TechStrip'
import ContributionGraph from '../components/ContributionGraph'
import Connect from '../components/Connect'
import { CURRENT_ROLE } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import '../components/home.css'

const DIRECTORY = [
  {
    index: '01',
    label: 'About',
    desc: 'The story so far — Syncfusion grids to EPAM products.',
    href: '/about',
  },
  {
    index: '02',
    label: 'Projects',
    desc: 'APOGEE, Vault, Terminal Portfolio, Markdown Editor & more.',
    href: '/projects',
  },
  {
    index: '03',
    label: 'Skills',
    desc: 'React · TypeScript · GraphQL · GSAP · Node.js',
    href: '/skills',
  },
  {
    index: '04',
    label: 'Contact',
    desc: 'rahulkishore227@gmail.com · Open to conversations',
    href: '/contact',
  },
  {
    index: '05',
    label: 'Experience',
    desc: 'EPAM Systems & Syncfusion — the full career timeline.',
    href: '/experience',
  },
]

export default function Home({ entered }) {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <div ref={rootRef}>
      <Hero entered={entered} />
      <TechStrip />

      <section className="home-role">
        <div className="shell">
          <article className="role-card" data-reveal>
            <div className="role-head">
              <div>
                <h2 className="role-title">{CURRENT_ROLE.title}</h2>
                <span className="role-org">
                  {CURRENT_ROLE.company} · {CURRENT_ROLE.period}
                </span>
              </div>
              <span className="badge-active">
                <i className="dot" /> {CURRENT_ROLE.status}
              </span>
            </div>

            <p className="role-summary">{CURRENT_ROLE.summary}</p>

            <ul className="role-stack">
              {CURRENT_ROLE.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>

          <div className="role-more" data-reveal>
            <a className="role-link" href="/experience">
              <span>View all experience</span>
              <span className="role-link-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="home-status">
        <div className="shell home-status-wrap">
          <StatusPanel />
        </div>
      </section>

      <section className="sec home-index">
        <div className="shell">
          <header className="sec-head" data-reveal>
            <span className="sec-index">00</span>
            <div>
              <p className="sec-kicker">
                <span className="tick">[</span> Site directory{' '}
                <span className="tick">]</span>
              </p>
              <h2 className="sec-title">
                Explore
                <br />
                the rest
              </h2>
            </div>
          </header>

          <div className="dir-grid" data-reveal-group>
            {DIRECTORY.map((d) => (
              <a className="dir-card" href={d.href} key={d.index} data-reveal-item>
                <span className="dir-top">
                  <span className="dir-num">{d.index}</span>
                  <span className="dir-arrow">→</span>
                </span>
                <span className="dir-label">{d.label}</span>
                <span className="dir-desc">{d.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContributionGraph />

      <Connect />

      <Marquee
        accent
        reverse
        items={[
          'Open source',
          'Side projects',
          'Always building',
          'Clean commits',
          'Ship & iterate',
        ]}
      />
    </div>
  )
}
