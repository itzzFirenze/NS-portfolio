'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

export default function FlourParticlesOverlay({
  count = 120,
  color = '255, 248, 240',
  position = 'fixed',
}: {
  count?: number
  color?: string
  position?: 'fixed' | 'absolute'
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const getSize = () => {
      if (position === 'absolute') {
        const parent = canvas.parentElement
        return {
          w: parent ? parent.offsetWidth : window.innerWidth,
          h: parent ? parent.offsetHeight : window.innerHeight,
        }
      }
      return { w: window.innerWidth, h: window.innerHeight }
    }

    const resize = () => {
      const { w, h } = getSize()
      canvas.width = w
      canvas.height = h
    }

    const spawn = (): Particle => {
      const { w, h } = getSize()
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.15),
        radius: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.35 + 0.05,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: (Math.random() - 0.5) * 0.025,
      }
    }

    const init = () => {
      particles = Array.from({ length: count }, spawn)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.wobble += p.wobbleSpeed
        p.x += p.vx + Math.sin(p.wobble) * 0.15
        p.y += p.vy

        // Wrap around edges
        if (p.y < -4) p.y = canvas.height + 4
        if (p.x < -4) p.x = canvas.width + 4
        if (p.x > canvas.width + 4) p.x = -4

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count, color, position])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position,
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
