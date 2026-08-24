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

const ROUTES = {
  '/': 'RAHUL NARAYANASAMY — Software Engineer',
  '/about': 'About — Rahul Narayanasamy',
  '/projects': 'Projects — Rahul Narayanasamy',
  '/skills': 'Skills — Rahul Narayanasamy',
  '/experience': 'Experience — Rahul Narayanasamy',
  '/contact': 'Contact — Rahul Narayanasamy',
}

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path in ROUTES ? path : '/'
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [route, setRoute] = useState(getRoute)

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
      const path = href.replace(/\/+$/, '') || '/'
      if (path !== window.location.pathname) {
        window.history.pushState({}, '', path)
        setRoute(path)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    document.title = ROUTES[route]
    window.scrollTo(0, 0)
  }, [route])

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
    case '/contact':
      page = <Contact />
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
