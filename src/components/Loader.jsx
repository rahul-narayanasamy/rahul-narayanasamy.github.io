import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './loader.css'

const LOG_LINES = [
  '> PORTFOLIO / RAHUL NARAYANASAMY',
  '> LOADING ASSETS ................ OK',
  '> ALMOST READY',
]

export default function Loader({ onEnter }) {
  const [pct, setPct] = useState(0)
  const leaving = useRef(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const enter = () => {
      if (leaving.current || !rootRef.current) return
      leaving.current = true
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: onEnter,
      })
    }

    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(obj.v)),
      onComplete: () => setTimeout(enter, 450),
    })
    return () => tween.kill()
  }, [onEnter])

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-log">
        <p className="log-line">{LOG_LINES[0]}</p>
        <p className="log-line dim">{LOG_LINES[1]}</p>
        <p className="log-line dim">{LOG_LINES[2]}</p>
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
