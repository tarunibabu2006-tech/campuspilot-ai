import React, { useEffect, useRef } from 'react'

export default function ParticlesBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle high DPI displays for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', handleResize)

    // ── Mouse state for interactive attraction & connection ───────
    const mouse = {
      x: null,
      y: null,
      radius: 170,
      targetX: null,
      targetY: null,
      active: false
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchend', handleMouseLeave)

    // ── Color palette for molecules ───────────────────────────────
    const COLORS = [
      { r: 139, g: 92, b: 246, hex: '#8b5cf6' }, // Violet
      { r: 59, g: 130, b: 246, hex: '#3b82f6' },  // Electric Blue
      { r: 6, g: 182, b: 212, hex: '#06b6d4' },   // Cyan
      { r: 245, g: 158, b: 11, hex: '#f59e0b' },  // Amber/Gold
      { r: 236, g: 72, b: 153, hex: '#ec4899' }   // Magenta
    ]

    // ── Molecular Particle setup ──────────────────────────────────
    const particleCount = Math.min(85, Math.max(35, Math.floor((width * height) / 18000)))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const colorObj = COLORS[i % COLORS.length]
      const hasElectrons = i % 4 === 0 // 25% of molecules have revolving satellite electrons
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        baseRadius: Math.random() * 2.5 + 2,
        radius: Math.random() * 2.5 + 2,
        color: colorObj,
        hasElectrons,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        orbitDist: Math.random() * 8 + 9,
        pulsePhase: Math.random() * Math.PI * 2,
        density: Math.random() * 20 + 10
      })
    }

    let time = 0

    // ── Draw blended CampusPilot brand icon in background ─────────
    const drawBrandWatermark = (t) => {
      const cx = width / 2
      const cy = height / 2.3
      const baseScale = Math.min(width, height) * 0.35
      const pulse = Math.sin(t * 0.0015) * 0.05 + 1
      const size = baseScale * pulse

      ctx.save()
      ctx.translate(cx, cy)
      ctx.globalAlpha = 0.07 // Subtle professional blend

      // Outer glowing orbital ring
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.85, size * 0.35, Math.PI / 6 + Math.sin(t * 0.001) * 0.1, 0, Math.PI * 2)
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 1.5
      ctx.setLineDash([8, 12])
      ctx.stroke()

      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.85, size * 0.35, -Math.PI / 6 - Math.sin(t * 0.001) * 0.1, 0, Math.PI * 2)
      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 10])
      ctx.stroke()
      ctx.setLineDash([])

      // Academic graduation cap emblem
      ctx.beginPath()
      // Cap diamond
      ctx.moveTo(0, -size * 0.4)
      ctx.lineTo(size * 0.55, -size * 0.15)
      ctx.lineTo(0, size * 0.1)
      ctx.lineTo(-size * 0.55, -size * 0.15)
      ctx.closePath()
      ctx.fillStyle = 'rgba(124, 58, 237, 0.18)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(196, 181, 253, 0.45)'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Cap base/skullcap
      ctx.beginPath()
      ctx.moveTo(-size * 0.32, -size * 0.08)
      ctx.quadraticCurveTo(0, size * 0.28, size * 0.32, -size * 0.08)
      ctx.lineTo(size * 0.32, size * 0.05)
      ctx.quadraticCurveTo(0, size * 0.38, -size * 0.32, size * 0.05)
      ctx.closePath()
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Tassel
      ctx.beginPath()
      ctx.moveTo(0, -size * 0.15)
      ctx.lineTo(size * 0.48, -size * 0.05)
      ctx.lineTo(size * 0.52, size * 0.22)
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2
      ctx.stroke()

      // Tassel bob
      ctx.beginPath()
      ctx.arc(size * 0.52, size * 0.24, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#fbbf24'
      ctx.fill()

      ctx.restore()
    }

    // ── Main Animation Loop ───────────────────────────────────────
    const draw = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      // 1. Draw subtle holographic brand watermark in the center
      drawBrandWatermark(time)

      // 2. Interactive mouse aura glow
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius)
        mouseGlow.addColorStop(0, 'rgba(139, 92, 246, 0.18)')
        mouseGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.08)')
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = mouseGlow
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3. Update and render particles & molecular physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Base floating motion
        p.x += p.vx
        p.y += p.vy

        // Gentle floating wobble
        p.pulsePhase += 0.03
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.6

        // Bounce off canvas edges smoothly
        if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx) }
        if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx) }
        if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy) }
        if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy) }

        // ── Mouse Interaction: Magnetic attraction & interaction ─────
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouse.radius) {
            // Smooth gravitational pull towards the mouse cursor
            const forceDirectionX = dx / dist
            const forceDirectionY = dy / dist
            const force = (mouse.radius - dist) / mouse.radius
            const directionX = forceDirectionX * force * (p.density / 12)
            const directionY = forceDirectionY * force * (p.density / 12)

            p.x += directionX * 0.7
            p.y += directionY * 0.7

            // Draw direct dynamic energetic bond to mouse cursor
            const mouseBondAlpha = (1 - dist / mouse.radius) * 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            const bondGrad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y)
            bondGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${mouseBondAlpha})`)
            bondGrad.addColorStop(1, `rgba(6, 182, 212, ${mouseBondAlpha * 0.9})`)
            ctx.strokeStyle = bondGrad
            ctx.lineWidth = (1 - dist / mouse.radius) * 1.6 + 0.4
            ctx.stroke()
          }
        }

        // ── Draw Molecular Core (Atom Nucleus) ────────────────────────
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color.hex
        ctx.shadowBlur = 14
        ctx.shadowColor = p.color.hex
        ctx.fill()
        ctx.shadowBlur = 0 // reset shadow for performance

        // Outer translucent aura ring around each atom
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.25)`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // ── Draw Orbiting Electron (for 25% of molecules) ─────────────
        if (p.hasElectrons) {
          p.orbitAngle += p.orbitSpeed
          const ex = p.x + Math.cos(p.orbitAngle) * p.orbitDist
          const ey = p.y + Math.sin(p.orbitAngle) * (p.orbitDist * 0.55)

          // Orbit trajectory ring
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, p.orbitDist, p.orbitDist * 0.55, p.orbitAngle * 0.2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.15)`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Revolving satellite electron
          ctx.beginPath()
          ctx.arc(ex, ey, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = '#67e8f9'
          ctx.shadowBlur = 8
          ctx.shadowColor = '#67e8f9'
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // ── Inter-Molecular Bonds (Connecting nearby molecules) ───────
        const maxConnDist = 135
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnDist) {
            const alpha = (1 - dist / maxConnDist) * 0.45
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)

            const lineGrad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y)
            lineGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`)
            lineGrad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`)

            ctx.strokeStyle = lineGrad
            ctx.lineWidth = (1 - dist / maxConnDist) * 1.1 + 0.3
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchend', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.75, // Rich visible aesthetic
        transition: 'opacity 0.5s ease'
      }}
    />
  )
}
