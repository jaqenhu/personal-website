import { useEffect, useRef } from 'react'

/** 进入视口时为元素添加 .is-visible，实现克制的上浮渐显 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
