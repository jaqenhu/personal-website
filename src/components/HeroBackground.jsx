import { useEffect, useRef } from 'react'

/**
 * 克制的科技感背景：缓慢漂移的粒子星座 + 近邻连线。
 * 红色调、低透明度，配合 CSS 的红色辉光与细网格构成首屏氛围。
 */
export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const pointer = { x: -9999, y: -9999 }
    let particles = []

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 按面积决定粒子数，控制密度，保持克制
      const count = Math.round(Math.min(120, (width * height) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // 近邻连线（星座）
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.32
            ctx.strokeStyle = `rgba(255, 70, 78, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        // 指针附近的高亮连线，制造交互呼吸感
        const pdx = p.x - pointer.x
        const pdy = p.y - pointer.y
        const pdist = Math.hypot(pdx, pdy)
        if (pdist < 200) {
          const alpha = (1 - pdist / 200) * 0.5
          ctx.strokeStyle = `rgba(255, 110, 116, ${alpha})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.stroke()
        }

        // 节点
        ctx.fillStyle = 'rgba(255, 90, 96, 0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    if (prefersReduced) {
      step()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}
