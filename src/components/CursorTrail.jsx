import { useEffect, useRef } from 'react'

const TRAIL_LIFETIME = 960
const MAX_POINTS = 72
const DOT_RADIUS = 6
// 与 Hero 标题截图一致的暖色段：奶油白 → 蜜桃橙 → 珊瑚粉。
const GRADIENT_COLORS = ['#fff4ed', '#ffcda8', '#ff7585']

/** 暖色渐变长拖尾与圆形跟随标记，停止移动后渐隐。 */
export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const createGradient = (x1, y1, x2, y2) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      GRADIENT_COLORS.forEach((color, index) => {
        gradient.addColorStop(index / (GRADIENT_COLORS.length - 1), color)
      })
      return gradient
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose = () => {}

    const syncPreferences = () => {
      dispose()
      dispose = () => {}
      if (!finePointer.matches || reducedMotion.matches) return

      let frame = 0
      let width = 0
      let height = 0
      let previousTime = 0
      let lastMove = 0
      let current = null
      let target = null
      let points = []

      const clear = () => {
        cancelAnimationFrame(frame)
        frame = 0
        current = null
        target = null
        points = []
        previousTime = 0
        ctx.clearRect(0, 0, width, height)
      }

      const resize = () => {
        clear()
        width = window.innerWidth
        height = window.innerHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const draw = (time) => {
        frame = 0
        if (!current || !target) return

        const delta = Math.min(time - (previousTime || time - 16.67), 32)
        previousTime = time
        const follow = 1 - Math.exp(-delta / 42)
        current.x += (target.x - current.x) * follow
        current.y += (target.y - current.y) * follow

        points = points.filter((point) => time - point.time < TRAIL_LIFETIME)
        const latest = points.at(-1)
        if (!latest || Math.hypot(current.x - latest.x, current.y - latest.y) > 0.3) {
          points.push({ ...current, time })
          if (points.length > MAX_POINTS) points.shift()
        }

        ctx.clearRect(0, 0, width, height)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        const visibility = Math.max(0, 1 - (time - lastMove) / TRAIL_LIFETIME)
        const tail = points[0]
        ctx.strokeStyle = createGradient(tail.x, tail.y, current.x, current.y)

        for (let i = 1; i < points.length; i += 1) {
          const point = points[i]
          const progress = i / (points.length - 1)
          const freshness = 1 - (time - point.time) / TRAIL_LIFETIME
          ctx.globalAlpha = progress ** 1.6 * freshness * visibility * 0.85
          ctx.lineWidth = 0.65 + progress * 1.15
          ctx.beginPath()
          ctx.moveTo(points[i - 1].x, points[i - 1].y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
        }

        ctx.globalAlpha = visibility * 0.9
        ctx.fillStyle = createGradient(
          current.x - DOT_RADIUS,
          current.y,
          current.x + DOT_RADIUS,
          current.y,
        )
        ctx.beginPath()
        ctx.arc(current.x, current.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        if (visibility > 0) {
          frame = requestAnimationFrame(draw)
        } else {
          clear()
        }
      }

      const onMove = (event) => {
        if (event.pointerType !== 'mouse' || document.hidden) return
        lastMove = performance.now()
        target = { x: event.clientX, y: event.clientY }
        if (!current) current = { ...target }
        if (!frame) {
          previousTime = 0
          frame = requestAnimationFrame(draw)
        }
      }

      const onExit = (event) => {
        if (!event.relatedTarget) clear()
      }
      const onVisibility = () => {
        if (document.hidden) clear()
      }

      resize()
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('resize', resize)
      window.addEventListener('blur', clear)
      document.addEventListener('pointerout', onExit)
      document.addEventListener('visibilitychange', onVisibility)

      dispose = () => {
        clear()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('resize', resize)
        window.removeEventListener('blur', clear)
        document.removeEventListener('pointerout', onExit)
        document.removeEventListener('visibilitychange', onVisibility)
      }
    }

    syncPreferences()
    finePointer.addEventListener('change', syncPreferences)
    reducedMotion.addEventListener('change', syncPreferences)
    return () => {
      dispose()
      finePointer.removeEventListener('change', syncPreferences)
      reducedMotion.removeEventListener('change', syncPreferences)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
