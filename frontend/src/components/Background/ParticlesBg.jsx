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

    // ── Mouse / Arrow Tracker for Dynamic Molecule Interaction ────
    const mouse = {
      x: null,
      y: null,
      radius: 190,
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

    // ── Vibrant neon molecular colors ─────────────────────────────
    const COLORS = [
      { r: 139, g: 92, b: 246, hex: '#8b5cf6' }, // Neon Violet
      { r: 59, g: 130, b: 246, hex: '#3b82f6' },  // Electric Blue
      { r: 6, g: 182, b: 212, hex: '#06b6d4' },   // Cyan
      { r: 245, g: 158, b: 11, hex: '#f59e0b' },  // Gold / Amber
      { r: 16, g: 185, b: 129, hex: '#10b981' }   // Emerald Green
    ]

    // ── Molecular Particle setup ──────────────────────────────────
    const particleCount = Math.min(90, Math.max(40, Math.floor((width * height) / 16000)))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const colorObj = COLORS[i % COLORS.length]
      const hasElectrons = i % 3 === 0
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.95,
        vy: (Math.random() - 0.5) * 0.95,
        baseRadius: Math.random() * 2.5 + 2.2,
        radius: Math.random() * 2.5 + 2.2,
        color: colorObj,
        hasElectrons,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.035 + 0.015) * (Math.random() > 0.5 ? 1 : -1),
        orbitDist: Math.random() * 10 + 11,
        pulsePhase: Math.random() * Math.PI * 2,
        density: Math.random() * 20 + 12
      })
    }

    // ── Main Animation Loop ───────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Interactive mouse aura glow
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius)
        mouseGlow.addColorStop(0, 'rgba(139, 92, 246, 0.22)')
        mouseGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.10)')
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = mouseGlow
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Update and render particles & molecular physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Base floating motion
        p.x += p.vx
        p.y += p.vy

        // Gentle floating breathing wobble
        p.pulsePhase += 0.035
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.7

        // Bounce off canvas edges smoothly
        if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx) }
        if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx) }
        if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy) }
        if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy) }

        // ── Mouse Cursor Attraction & Magnetic Interactive Lines ─────
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouse.radius) {
            // Smooth gravitational pull towards the arrow position
            const forceDirectionX = dx / dist
            const forceDirectionY = dy / dist
            const force = (mouse.radius - dist) / mouse.radius
            const directionX = forceDirectionX * force * (p.density / 10)
            const directionY = forceDirectionY * force * (p.density / 10)

            p.x += directionX * 0.85
            p.y += directionY * 0.85

            // Draw direct dynamic energetic bond to mouse cursor
            const mouseBondAlpha = (1 - dist / mouse.radius) * 0.75
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            const bondGrad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y)
            bondGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${mouseBondAlpha})`)
            bondGrad.addColorStop(1, `rgba(6, 182, 212, ${mouseBondAlpha})`)
            ctx.strokeStyle = bondGrad
            ctx.lineWidth = (1 - dist / mouse.radius) * 2.0 + 0.5
            ctx.stroke()
          }
        }

        // ── Draw Molecular Core (Atom Nucleus) ────────────────────────
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color.hex
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color.hex
        ctx.fill()
        ctx.shadowBlur = 0

        // Outer translucent aura ring around each atom
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.3)`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // ── Draw Orbiting Electron ────────────────────────────────────
        if (p.hasElectrons) {
          p.orbitAngle += p.orbitSpeed
          const ex = p.x + Math.cos(p.orbitAngle) * p.orbitDist
          const ey = p.y + Math.sin(p.orbitAngle) * (p.orbitDist * 0.6)

          // Orbit trajectory ring
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, p.orbitDist, p.orbitDist * 0.6, p.orbitAngle * 0.2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.2)`
          ctx.lineWidth = 0.6
          ctx.stroke()

          // Revolving satellite electron
          ctx.beginPath()
          ctx.arc(ex, ey, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = '#67e8f9'
          ctx.shadowBlur = 10
          ctx.shadowColor = '#67e8f9'
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // ── Inter-Molecular Chemical Bonds ────────────────────────────
        const maxConnDist = 145
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnDist) {
            const alpha = (1 - dist / maxConnDist) * 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)

            const lineGrad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y)
            lineGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`)
            lineGrad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`)

            ctx.strokeStyle = lineGrad
            ctx.lineWidth = (1 - dist / maxConnDist) * 1.3 + 0.4
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* ── 1. LIGHT BLENDED CAMPUSPILOT BRAND ICON EMBLEM WATERMARK ── */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 80vw)',
          height: 'min(500px, 80vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.18, // Light, elegant professional blend
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          userSelect: 'none',
          filter: 'drop-shadow(0 0 50px rgba(139,92,246,0.35))'
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbital Glowing Gyro Rings */}
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="36"
            transform="rotate(-25 100 100)"
            stroke="url(#grad1)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="36"
            transform="rotate(25 100 100)"
            stroke="url(#grad2)"
            strokeWidth="1.8"
            strokeDasharray="6 8"
          />

          {/* Glowing Center Radial Aura */}
          <circle cx="100" cy="100" r="55" fill="url(#centerAura)" />

          {/* Academic Graduation Cap (CampusPilot Core Icon) */}
          {/* Cap Diamond Top */}
          <path
            d="M100 45 L165 72 L100 98 L35 72 Z"
            fill="url(#capGrad)"
            stroke="#c4b5fd"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Skullcap Base */}
          <path
            d="M58 84 Q100 128 142 84 L142 98 Q100 144 58 98 Z"
            fill="url(#baseGrad)"
            stroke="#93c5fd"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Tassel */}
          <path
            d="M100 72 L150 82 L154 116"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="154" cy="118" r="4" fill="#fbbf24" />

          {/* Gradients */}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <div
          style={{
            marginTop: '0.5rem',
            fontWeight: '900',
            fontSize: '1.25rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#c4b5fd',
            fontFamily: 'inherit'
          }}
        >
          CampusPilot AI
        </div>
      </div>

      {/* ── 2. INTERACTIVE MOLECULE CONSTELATION CANVAS ───────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85
        }}
      />
    </div>
  )
}
