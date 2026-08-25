// Captured once when the app bundle first loads — survives client-side
// navigation, so the timer keeps counting across page switches.
const SESSION_START = Date.now()

import { useEffect, useState } from 'react'

export default function useUptime() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const s = Math.max(0, Math.floor((now - SESSION_START) / 1000))
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}
