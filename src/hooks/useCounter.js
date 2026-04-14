import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `target` when the ref element enters the viewport.
 * Respects prefers-reduced-motion by jumping directly to the final value.
 */
export function useCounter(target, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        if (prefersReduced.current) {
          setValue(target)
          return
        }

        const start = performance.now()
        const animate = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
          else setValue(target)
        }
        requestAnimationFrame(animate)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}
