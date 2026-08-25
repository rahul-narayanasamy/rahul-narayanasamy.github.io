import { useEffect, useState } from 'react'
import { OWNER, QUOTES } from '../data/content'
import './footer.css'

const COUNTER_KEY = 'rn-portfolio-visits'
const VISITOR_SEED = 2140

const SIGNATURE_QUOTE = QUOTES[0]
const REMOTE_TIMEOUT_MS = 6000
const REFRESH_MS = 45000

let currentQuote = null

async function fetchCodingQuote() {
  const opts = { signal: AbortSignal.timeout(REMOTE_TIMEOUT_MS) }
  try {
    const r = await fetch('https://dummyjson.com/quotes/random', opts)
    if (r.ok) {
      const d = await r.json()
      if (d?.quote && d?.author) return { text: d.quote, author: d.author }
    }
  } catch {}
  try {
    const r = await fetch(
      'https://api.realinspire.xyz/v1/quotes/random?tag=technology',
      opts,
    )
    if (r.ok) {
      const d = await r.json()
      const q = Array.isArray(d) ? d[0] : d
      if (q?.content && q?.author) return { text: q.content, author: q.author }
    }
  } catch {}
  return null
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n.toLocaleString() + (s[(v - 20) % 10] || s[v] || s[0])
}

function useRotatingQuote() {
  const [quote, setQuote] = useState(() => currentQuote ?? SIGNATURE_QUOTE)

  useEffect(() => {
    let alive = true
    let idx = Math.floor(Math.random() * QUOTES.length)

    const pickLocal = () => {
      idx = (idx + 1) % QUOTES.length
      return QUOTES[idx]
    }

    const apply = (q) => {
      currentQuote = q
      if (alive) setQuote(q)
    }

    const tick = async () => {
      apply((await fetchCodingQuote()) ?? pickLocal())
    }

    const id = setInterval(tick, REFRESH_MS)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  return quote
}

export default function Footer() {
  const quote = useRotatingQuote()
  const [visitors, setVisitors] = useState(() => {
    try {
      const next = Number(localStorage.getItem(COUNTER_KEY) || VISITOR_SEED) + 1
      localStorage.setItem(COUNTER_KEY, String(next))
      return next
    } catch {
      return VISITOR_SEED + 1
    }
  })

  useEffect(() => {
    let alive = true
    fetch('https://abacus.jasoncameron.dev/hit/rn-portfolio-2026/hits.json')
      .then((r) => r.json())
      .then((d) => {
        if (alive && typeof d?.value === 'number' && d.value > 0) {
          setVisitors(d.value)
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return (
    <footer className="footer">
      <div className="shell">
        <figure className="foot-quote" key={`${quote.text}-${quote.author}`}>
          <span className="foot-mark" aria-hidden="true">“</span>
          <blockquote>{quote.text}</blockquote>
          <figcaption>— {quote.author}</figcaption>
        </figure>

        <div className="foot-bar">
          <p className="foot-visitor">
            You are the <strong>{ordinal(visitors)}</strong> visitor
          </p>
          <p className="foot-meta">
            © {new Date().getFullYear()} {OWNER.firstName} {OWNER.lastName} ·{' '}
            {OWNER.location}
          </p>
          <a
            className="to-top"
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
