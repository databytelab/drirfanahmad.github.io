import { useEffect } from 'react'

/**
 * Cascade reveal-on-scroll using IntersectionObserver.
 * Add className="reveal" (and optionally reveal-1, reveal-2... for stagger)
 * to any element. When it scrolls into view it gets .is-visible.
 */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}
