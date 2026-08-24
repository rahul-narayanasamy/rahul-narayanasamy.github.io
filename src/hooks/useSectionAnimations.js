import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSectionAnimations(scopeRef) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        })
      })

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        const children = group.querySelectorAll('[data-reveal-item]')
        gsap.from(children, {
          y: 36,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 82%' },
        })
      })
    }, scopeRef)

    return () => ctx.revert()
  }, [scopeRef])
}
