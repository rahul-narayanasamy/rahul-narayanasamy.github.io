import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { trackSiteEnter } from '../lib/analytics'
import './loader.css'

const LOG_LINES = [
  '> PORTFOLIO / RAHUL NARAYANASAMY',
  '> LOADING ASSETS ................ OK',
  '> ALMOST READY',
]

const PER_CHAR_MS = 16
const LINE_PAUSE_MS = 130

function useStableRef(value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref
}

export default function Loader({ onEnter }) {
  const [pct, setPct] = useState(0)
  const [typedLines, setTypedLines] = useState(
    () => LOG_LINES.map(() => ''),
  )
  const leaving = useRef(false)
  const rootRef = useRef(null)
  const onEnterRef = useStableRef(onEnter)

  useEffect(() => {
    let killed = false
    let activeTween = null
    const timers = []

    const later = (fn, ms) => {
      timers.push(setTimeout(fn, ms))
    }

    const enter = () => {
      if (killed || leaving.current || !rootRef.current) return
      leaving.current = true
      trackSiteEnter()
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => onEnterRef.current(),
      })
    }

    const startProgress = (duration) => {
      const obj = { v: 0 }
      activeTween = gsap.to(obj, {
        v: 100,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => setPct(Math.round(obj.v)),
        onComplete: () => later(enter, 400),
      })
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      later(() => setTypedLines(LOG_LINES), 0)
      startProgress(0.6)
    } else {
      let t = 200
      LOG_LINES.forEach((line, li) => {
        for (let k = 1; k <= line.length; k++) {
          later(() => {
            setTypedLines((prev) => {
              const next = [...prev]
              next[li] = line.slice(0, k)
              return next
            })
          }, t)
          t += PER_CHAR_MS
        }
        t += LINE_PAUSE_MS
      })

      later(() => startProgress(1.5), t)
    }

    return () => {
      killed = true
      if (activeTween) activeTween.kill()
      timers.forEach(clearTimeout)
    }
  }, [onEnterRef])

  const activeIdx = LOG_LINES.findIndex(
    (line, i) => typedLines[i].length < line.length,
  )

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-log">
        {LOG_LINES.map((line, i) => (
          <p key={i} className={`log-line${i > 0 ? ' dim' : ''}`}>
            {typedLines[i]}
            {activeIdx === i && <span className="type-cursor">_</span>}
          </p>
        ))}

        <h1 className="loader-count">
          Loading portfolio{' '}
          <span className="count-num">
            {String(pct).padStart(3, '0')}%
          </span>
        </h1>
        <div className="loader-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
