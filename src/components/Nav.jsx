import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, OWNER } from '../data/content'
import useUptime from '../hooks/useUptime'
import { trackThemeChange } from '../lib/analytics'
import './nav.css'

const RESTORE_SLACK = 180

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

export default function Nav({ visible, route }) {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(0)
  const [theme, setTheme] = useState(getInitialTheme)
  const uptime = useUptime()

  const navRef = useRef(null)
  const linksRef = useRef(null)
  const hiddenRef = useRef(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!moreOpen) return
    const onDown = (e) => {
      if (!e.target.closest('.nav-more')) setMoreOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setMoreOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  useEffect(() => {
    const applyHidden = (n) => {
      hiddenRef.current = n
      setHiddenCount(n)
    }

    const fit = () => {
      const el = linksRef.current
      if (!el) return
      if (el.scrollWidth > el.clientWidth + 2) {
        if (hiddenRef.current < NAV_LINKS.length - 1) {
          applyHidden(hiddenRef.current + 1)
        } else if (hiddenRef.current !== NAV_LINKS.length - 1) {
          applyHidden(NAV_LINKS.length - 1)
        }
      } else if (
        hiddenRef.current > 0 &&
        el.scrollWidth < el.clientWidth - RESTORE_SLACK
      ) {
        applyHidden(hiddenRef.current - 1)
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    if (navRef.current) ro.observe(navRef.current)
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [hiddenCount])

  const visibleLinks =
    hiddenCount > 0 ? NAV_LINKS.slice(0, -hiddenCount) : NAV_LINKS
  const hiddenLinks =
    hiddenCount > 0 ? NAV_LINKS.slice(-hiddenCount) : []
  const hiddenActive = hiddenLinks.some((l) => l.href === route)

  return (
    <>
      <header className={`nav${visible ? ' visible' : ''}`} ref={navRef}>
        <a className="nav-logo" href="/">
          {OWNER.firstName.charAt(0)}
          {OWNER.lastName.charAt(0)}<span>/{OWNER.role}</span>
        </a>

        <nav className="nav-links" ref={linksRef}>
          {visibleLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={route === l.href ? 'active' : ''}
            >
              <span>{l.index}</span>
              {l.label}
            </a>
          ))}

          {hiddenCount > 0 && (
            <div className="nav-more">
              <button
                type="button"
                className={`nav-more-btn${moreOpen ? ' open' : ''}${hiddenActive ? ' active' : ''}`}
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
              >
                More · {hiddenCount} <span className="caret">▾</span>
              </button>

              {moreOpen && (
                <div className="nav-more-menu">
                  {hiddenLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className={route === l.href ? 'active' : ''}
                      onClick={() => setMoreOpen(false)}
                    >
                      <span>{l.index}</span>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="nav-actions">
          <span
            className="nav-clock"
            title="Time since you opened this portfolio"
          >
            {uptime}
          </span>

          <button
            type="button"
            className="theme-btn"
            onClick={() =>
              setTheme((t) => {
                const next = t === 'dark' ? 'light' : 'dark'
                trackThemeChange(next)
                return next
              })
            }
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <div className={`menu-overlay${open ? ' open' : ''}`}>
        <button
          type="button"
          className="menu-close"
          onClick={() => setOpen(false)}
        >
          Close ✕
        </button>
        <nav className="menu-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={route === l.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <span className="menu-index">{l.index}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="menu-foot">
          {OWNER.location} · Open to conversations
        </p>
      </div>
    </>
  )
}
