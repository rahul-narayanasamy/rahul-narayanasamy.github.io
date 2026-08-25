import { useEffect } from 'react'
import { startAnalytics } from '../lib/analytics'

export function useAnalytics(route, pageTitle) {
  useEffect(() => {
    return startAnalytics(route, pageTitle)
  }, [route, pageTitle])
}
