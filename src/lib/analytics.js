const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID

const SCROLL_MILESTONES = [25, 50, 75, 90, 100]

let initialized = false
let clarityInitialized = false

function canTrack() {
  return Boolean(MEASUREMENT_ID && window.gtag)
}

function getContext() {
  const screen = window.screen

  return {
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen_resolution: screen ? `${screen.width}x${screen.height}` : undefined,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    color_scheme:
      document.documentElement.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
    referrer: document.referrer || '(direct)',
    connection_type: navigator.connection?.effectiveType,
  }
}

export function initAnalytics() {
  if (!MEASUREMENT_ID || initialized) return
  initialized = true

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function initClarity() {
  if (!CLARITY_ID || clarityInitialized) return
  clarityInitialized = true

  window.clarity =
    window.clarity ||
    function clarity() {
      ;(window.clarity.q = window.clarity.q || []).push(arguments)
    }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
}

export function trackEvent(eventName, params = {}) {
  if (!canTrack()) return
  window.gtag('event', eventName, params)
}

export function trackPageview(pathname, title) {
  if (!canTrack()) return

  const path = pathname.startsWith('/') ? pathname : `/${pathname}`

  trackEvent('page_view', {
    page_title: title,
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    ...getContext(),
  })
}

function getLinkMeta(anchor) {
  const href = anchor.getAttribute('href') || ''
  const text = (anchor.textContent || anchor.getAttribute('aria-label') || '')
    .trim()
    .slice(0, 100)

  if (anchor.hasAttribute('download')) {
    return { type: 'download', href, text, file_name: anchor.getAttribute('download') || href }
  }
  if (href.startsWith('mailto:')) return { type: 'mailto', href, text }
  if (href.startsWith('tel:')) return { type: 'tel', href, text }
  if (href.startsWith('#')) return { type: 'anchor', href, text }

  if (href.startsWith('http') || href.startsWith('//')) {
    try {
      const url = new URL(href, window.location.origin)
      const outbound = url.origin !== window.location.origin
      return {
        type: outbound ? 'outbound' : 'internal',
        href: url.href,
        text,
        link_domain: url.hostname,
        outbound,
      }
    } catch {
      return { type: 'link', href, text }
    }
  }

  if (href.startsWith('/')) return { type: 'internal', href, text, outbound: false }
  return { type: 'link', href, text }
}

function trackLinkClick(anchor) {
  const meta = getLinkMeta(anchor)
  const base = {
    link_url: meta.href,
    link_text: meta.text,
    link_type: meta.type,
    page_path: window.location.pathname,
    ...getContext(),
  }

  if (meta.type === 'download') {
    trackEvent('file_download', {
      ...base,
      file_name: meta.file_name,
      file_extension: meta.href.split('.').pop()?.split('?')[0],
    })
    return
  }

  trackEvent('click', {
    ...base,
    outbound: Boolean(meta.outbound),
    link_domain: meta.link_domain,
  })
}

function trackButtonClick(button) {
  if (button.classList.contains('theme-btn')) return

  trackEvent('button_click', {
    button_text: (button.textContent || button.getAttribute('aria-label') || 'button')
      .trim()
      .slice(0, 100),
    button_class: button.className || undefined,
    page_path: window.location.pathname,
    ...getContext(),
  })
}

function getScrollPercent() {
  const root = document.documentElement
  const scrollTop = window.scrollY || root.scrollTop
  const scrollHeight = root.scrollHeight - root.clientHeight
  if (scrollHeight <= 0) return 100
  return Math.min(100, Math.round((scrollTop / scrollHeight) * 100))
}

export function trackSiteEnter() {
  trackEvent('site_enter', {
    page_path: window.location.pathname,
    ...getContext(),
  })
}

export function trackThemeChange(theme) {
  trackEvent('theme_change', {
    theme,
    page_path: window.location.pathname,
    ...getContext(),
  })
}

export function setupInteractionTracking(route) {
  const scrollSeen = new Set()
  const pageStartedAt = Date.now()
  let maxScroll = 0

  const onClick = (event) => {
    const anchor = event.target.closest('a')
    if (anchor) {
      trackLinkClick(anchor)
      return
    }

    const button = event.target.closest('button')
    if (button) trackButtonClick(button)
  }

  const onScroll = () => {
    const percent = getScrollPercent()
    maxScroll = Math.max(maxScroll, percent)

    for (const milestone of SCROLL_MILESTONES) {
      if (percent >= milestone && !scrollSeen.has(milestone)) {
        scrollSeen.add(milestone)
        trackEvent('scroll', {
          percent_scrolled: milestone,
          page_path: window.location.pathname,
          page_title: document.title,
        })
      }
    }
  }

  const flushEngagement = () => {
    const seconds = Math.round((Date.now() - pageStartedAt) / 1000)
    if (seconds < 1) return

    trackEvent('engagement', {
      engagement_seconds: seconds,
      max_scroll_percent: maxScroll,
      page_path: window.location.pathname,
      page_title: document.title,
    })
  }

  document.addEventListener('click', onClick, true)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('beforeunload', flushEngagement)

  onScroll()

  return () => {
    flushEngagement()
    document.removeEventListener('click', onClick, true)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('beforeunload', flushEngagement)
  }
}

export function startAnalytics(route, pageTitle) {
  initAnalytics()
  initClarity()
  document.title = pageTitle
  trackPageview(window.location.pathname, pageTitle)
  return setupInteractionTracking(route)
}
