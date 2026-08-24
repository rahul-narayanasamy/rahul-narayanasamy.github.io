import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { HERO_TIMES, OWNER } from '../data/content'
import './hero.css'

const FIRST = OWNER.firstName
const LAST = OWNER.lastName

const TZ = 'Asia/Kolkata'
const BLR = { lat: 12.9716, lon: 77.5946 }

const timeFmt = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZone: TZ,
})

function useLocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return timeFmt.format(now)
}

function useBengaluruTemp() {
  const [temp, setTemp] = useState(null)
  useEffect(() => {
    let alive = true
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${BLR.lat}&longitude=${BLR.lon}&current=temperature_2m`,
    )
      .then((r) => r.json())
      .then((d) => {
        const v = d?.current?.temperature_2m
        if (alive && typeof v === 'number') setTemp(Math.round(v))
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  return temp
}

function useYearProgress() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(id)
  }, [])

  const year = now.getFullYear()
  const start = new Date(year, 0, 1).getTime()
  const end = new Date(year + 1, 0, 1).getTime()
  const totalDays = Math.round((end - start) / 86400000)
  const day = Math.floor((now.getTime() - start) / 86400000) + 1
  const pct = ((now.getTime() - start) / (end - start)) * 100

  return { year, day, totalDays, pct }
}

const IconClock = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

const IconTemp = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 4a2 2 0 1 1 4 0v9.5a4.5 4.5 0 1 1-4 0Z" />
    <path d="M12 9v6" />
  </svg>
)

const IconPin = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export default function Hero({ entered }) {
  const rootRef = useRef(null)
  const played = useRef(false)
  const typed = useRef(false)
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const time = useLocalTime()
  const temp = useBengaluruTemp()
  const { year, day, totalDays, pct } = useYearProgress()
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (!entered) return
    const t = setTimeout(() => setBarWidth(pct), 850)
    return () => clearTimeout(t)
  }, [entered, pct])

  useLayoutEffect(() => {
    if (!entered || played.current || !rootRef.current) return
    played.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', {
        y: 70,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.hero-times li', {
        x: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.14,
        delay: 0.5,
        ease: 'power3.out',
      })
    }, rootRef)

    return () => {
      ctx.revert()
      played.current = false
    }
  }, [entered])

  useEffect(() => {
    if (!entered || typed.current) return
    typed.current = true

    const timers = []
    let t = 350

    const cleanup = () => {
      timers.forEach(clearTimeout)
      typed.current = false
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.push(setTimeout(() => {
        setFirst(FIRST)
        setLast(LAST)
      }, 0))
      return cleanup
    }

    const scheduleWord = (word, setter, ms) => {
      for (let k = 1; k <= word.length; k++) {
        timers.push(setTimeout(() => setter(word.slice(0, k)), t))
        t += ms
      }
    }

    scheduleWord(FIRST, setFirst, 105)
    t += 280
    scheduleWord(LAST, setLast, 85)

    return cleanup
  }, [entered])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="shell hero-inner">
        <span className="hero-corner left">RN / PORTFOLIO 2026</span>

        <div
          className="hero-corner right hero-weather"
          aria-label="Local time and weather in Bengaluru"
        >
          <span className="weather-row">
            <IconClock />
            <strong>{time}</strong>
          </span>
          <span className="weather-row">
            <IconTemp />
            <strong>{temp !== null ? `${temp}°C` : '--°C'}</strong>
          </span>
          <span className="weather-row">
            <IconPin />
            <span>Bengaluru, IN</span>
          </span>
        </div>

        <p className="hero-kicker" data-hero>
          {OWNER.role} — Portfolio
        </p>

        <div className="hero-id">
          <div className="hero-avatar" data-hero>
            <img src="/avatar.png" alt="Rahul Narayanasamy" />
            <span className="avatar-status">
              <i className="dot" />
            </span>
          </div>

          <h1
            className="hero-title"
            aria-label={`${OWNER.firstName} ${OWNER.lastName}`}
          >
            <span className="hero-line" aria-hidden="true">
              {first || '\u00A0'}
              {!last && <span className="type-cursor">_</span>}
            </span>
            <span className="hero-line outline" aria-hidden="true">
              {last || '\u00A0'}
              {!!last && <span className="type-cursor">_</span>}
            </span>
          </h1>
        </div>

        <p className="hero-sub" data-hero>
          {OWNER.tagline}
        </p>

        <div className="hero-cta" data-hero>
          <a className="btn solid" href="/projects">View projects</a>
          <a className="btn" href="/contact">Get in touch</a>
        </div>

        <div className="hero-progress" data-hero>
          <div className="progress-meta">
            <span>{year} · Progress</span>
            <strong>
              {pct.toFixed(1)}% · Day {day}/{totalDays}
            </strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${barWidth}%` }} />
          </div>
        </div>

        <ul className="hero-times">
          {HERO_TIMES.map((t) => (
            <li key={t.time}>
              <strong>{t.time}</strong>
              <span>{t.label}</span>
            </li>
          ))}
        </ul>

        <a className="hero-descend" href="/about">
          Explore <span>↓</span>
        </a>
      </div>
    </section>
  )
}
