import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Experience from './pages/Experience'
import Blog from './pages/Blog'
import Resume from './pages/Resume'
import { useAnalytics } from './hooks/useAnalytics'

const ROUTES = {
  '/': 'RAHUL NARAYANASAMY — Software Engineer',
  '/about': 'About — Rahul Narayanasamy',
  '/projects': 'Projects — Rahul Narayanasamy',
  '/skills': 'Skills — Rahul Narayanasamy',
  '/experience': 'Experience — Rahul Narayanasamy',
  '/blog': 'Blog — Rahul Narayanasamy',
  '/contact': 'Contact — Rahul Narayanasamy',
  '/resume': 'Resume — Rahul Narayanasamy',
}

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const lower = path.toLowerCase()
  return lower in ROUTES ? lower : path
}

function getRoute() {
  return normalizePath(window.location.pathname)
}

function getPageTitle(route) {
  return ROUTES[route] ?? `Page not found — Rahul Narayanasamy (${route})`
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [route, setRoute] = useState(getRoute)
  const pageTitle = getPageTitle(route)

  useAnalytics(route, pageTitle)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  useEffect(() => {
    const onPop = () => setRoute(getRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return
      const a = e.target.closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      const nextRoute = normalizePath(href)
      if (nextRoute !== getRoute()) {
        window.history.pushState({}, '', nextRoute)
        setRoute(nextRoute)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [entered])

  let page
  switch (route) {
    case '/about':
      page = <About />
      break
    case '/projects':
      page = <Projects />
      break
    case '/skills':
      page = <Skills />
      break
    case '/experience':
      page = <Experience />
      break
    case '/blog':
      page = <Blog />
      break
    case '/contact':
      page = <Contact />
      break
    case '/resume':
      page = <Resume />
      break
    default:
      page = <Home entered={entered} />
  }

  return (
    <>
      {!entered && <Loader onEnter={() => setEntered(true)} />}

      <Nav visible={entered} route={route} />

      <main className="site">
        <div className="page" key={route}>
          {page}
        </div>
      </main>

      <Footer key={route} />

      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}
