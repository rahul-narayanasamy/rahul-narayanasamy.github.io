import { useEffect, useMemo, useState } from 'react'
import './contrib.css'

import { GH_USER } from '../data/content'
const API = `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`

const LEVEL_COLORS = [
  'rgba(234, 228, 214, 0.07)',
  'rgba(232, 56, 42, 0.26)',
  'rgba(232, 56, 42, 0.48)',
  'rgba(232, 56, 42, 0.74)',
  '#ff4530',
]

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export default function ContributionGraph() {
  const [contribs, setContribs] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(API)
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return
        if (Array.isArray(d?.contributions)) setContribs(d.contributions)
        else setFailed(true)
      })
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  const { weeks, total, activeDays } = useMemo(() => {
    if (!contribs || contribs.length === 0) return { weeks: [], total: 0, activeDays: 0 }

    const parsed = contribs.map((c) => {
      const [y, m, d] = c.date.split('-').map(Number)
      return { date: new Date(y, m - 1, d), count: c.count, level: c.level ?? 0 }
    })

    const total = parsed.reduce((sum, day) => sum + day.count, 0)
    const activeDays = parsed.reduce((sum, day) => sum + (day.count > 0 ? 1 : 0), 0)

    const lead = parsed[0].date.getDay()
    const cols = []
    let col = Array.from({ length: lead }, () => null)
    parsed.forEach((day) => {
      col.push(day)
      if (col.length === 7) {
        cols.push(col)
        col = []
      }
    })
    if (col.length > 0) {
      while (col.length < 7) col.push(null)
      cols.push(col)
    }

    return { weeks: cols, total, activeDays }
  }, [contribs])

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = -1
    weeks.forEach((week, wi) => {
      const first = week.find(Boolean)
      if (!first) return
      if (first.date.getMonth() !== lastMonth && wi !== 0) {
        labels.push({ x: wi * 14, name: MONTHS[first.date.getMonth()] })
        lastMonth = first.date.getMonth()
      } else if (wi === 0) {
        lastMonth = first.date.getMonth()
      }
    })
    return labels
  }, [weeks])

  return (
    <section className="home-contrib">
      <div className="shell">
        <div className="contrib-panel" data-reveal>
          <div className="contrib-head">
            <p className="contrib-kicker">
              <span className="tick">[</span> GitHub ·{' '}
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">
                @{GH_USER}
              </a>{' '}
              <span className="tick">]</span>
            </p>
            <div className="contrib-stats">
              <div>
                <strong>{failed ? '—' : total.toLocaleString()}</strong>
                <span>contributions</span>
              </div>
              <div>
                <strong>{failed ? '—' : activeDays.toLocaleString()}</strong>
                <span>active days</span>
              </div>
            </div>
          </div>

          {!failed && (
            <div className="contrib-scroll">
              <div className="contrib-inner">
                {monthLabels.length > 0 && (
                  <div className="contrib-months">
                    {monthLabels.map((m) => (
                      <span key={`${m.name}-${m.x}`} style={{ left: `${m.x}px` }}>
                        {m.name}
                      </span>
                    ))}
                  </div>
                )}

                {weeks.length > 0 ? (
                  <div className="contrib-grid">
                    {weeks.map((week, wi) => (
                      <div className="contrib-col" key={wi}>
                        {week.map((day, di) =>
                          day ? (
                            <span
                              key={di}
                              className="contrib-cell"
                              style={{ background: LEVEL_COLORS[day.level] }}
                              title={`${day.count} contribution${day.count === 1 ? '' : 's'} — ${day.date.toDateString()}`}
                            />
                          ) : (
                            <span key={di} className="contrib-cell empty" />
                          ),
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  !failed && <p className="contrib-loading">Loading contribution data…</p>
                )}
              </div>
            </div>
          )}

          {failed && (
            <p className="contrib-error">
              Couldn&apos;t load the graph right now —{' '}
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">
                view the profile on GitHub ↗
              </a>
            </p>
          )}

          <div className="contrib-legend">
            <span>Less</span>
            {LEVEL_COLORS.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
            <span>More</span>
            <em>Last 12 months</em>
          </div>
        </div>
      </div>
    </section>
  )
}
