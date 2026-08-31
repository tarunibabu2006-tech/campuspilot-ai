import React, { useEffect, useRef } from 'react';

/**
 * MoleculeBackground
 * - Soft, subtle ambient floating molecules with gentle, low-alpha glowing cores (not overly bright/distracting)
 * - Delicate constellation bonding lines connecting neighboring nodes
 * - Smooth, subtle mouse cursor gravitational reaction
 * - Central blended platform brand watermark & orbital halo for CampusPilot AI (⚡)
 * - Ultra-smooth 60 FPS performance
 */
const MoleculeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle, soft, harmonious color palette
    const PALETTE = [
      { r: 56,  g: 189, b: 248, hex: '#38bdf8' }, // Soft Cyan
      { r: 168, g: 85,  b: 247, hex: '#a855f7' }, // Soft Violet
      { r: 52,  g: 211, b: 153, hex: '#34d399' }, // Soft Emerald
      { r: 245, g: 158, b: 11,  hex: '#f59e0b' }, // Soft Amber
      { r: 236, g: 72,  b: 153, hex: '#ec4899' }, // Soft Pink
      { r: 99,  g: 102, b: 241, hex: '#6366f1' }  // Soft Indigo
    ];

    const isMobile = width < 768;
    const MOLECULE_COUNT = isMobile ? 40 : 75;
    const BOND_DISTANCE = isMobile ? 85 : 120;
    const MOUSE_RADIUS = 160;

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      vx: 0,
      vy: 0,
      active: false,
      lastMoved: 0
    };

    // Molecules with light, ambient opacity
    const molecules = [];
    for (let i = 0; i < MOLECULE_COUNT; i++) {
      const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      molecules.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.8 + Math.random() * 2.8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        color: col,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.015,
        baseAlpha: 0.22 + Math.random() * 0.2
      });
    }

    // Central Emblem Rotation State
    let emblemAngle = 0;
    let emblemPulse = 0;

    // Mouse & Touch listeners
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.lastMoved = Date.now();
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
        mouse.lastMoved = Date.now();
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let rafId;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      if (mouse.active) {
        const dx = mouse.targetX - mouse.x;
        const dy = mouse.targetY - mouse.y;
        mouse.vx = dx * 0.12;
        mouse.vy = dy * 0.12;
        mouse.x += mouse.vx;
        mouse.y += mouse.vy;

        if (Date.now() - mouse.lastMoved > 3000) {
          mouse.active = false;
        }
      }

      const centerX = width / 2;
      const centerY = height / 2;
      emblemAngle += 0.003;
      emblemPulse += 0.02;

      // ── 1. DRAW CENTER BLENDED PLATFORM EMBLEM ───────────────────────
      const pulseFactor = 1 + Math.sin(emblemPulse) * 0.06;
      const ringRadius = (isMobile ? 120 : 180) * pulseFactor;

      // Ambient radial glow behind emblem
      const centerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, ringRadius * 1.8
      );
      centerGlow.addColorStop(0, 'rgba(124, 58, 237, 0.14)');
      centerGlow.addColorStop(0.4, 'rgba(56, 189, 248, 0.08)');
      centerGlow.addColorStop(0.8, 'rgba(15, 23, 42, 0.03)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Outer delicate orbital ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(emblemAngle);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner counter-rotating ring
      ctx.rotate(-emblemAngle * 2.2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 0.75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Central Blended Brand Icon & Text
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // ⚡ Central Lightning Icon
      ctx.font = `${isMobile ? '64px' : '96px'} -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.globalAlpha = 0.22 + Math.sin(emblemPulse) * 0.05;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 24;
      ctx.fillText('⚡', centerX, centerY - (isMobile ? 18 : 24));

      // Brand Text "CampusPilot AI"
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#a855f7';
      ctx.font = `800 ${isMobile ? '16px' : '22px'} Inter, -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.letterSpacing = '2px';
      ctx.fillText('CAMPUSPILOT AI', centerX, centerY + (isMobile ? 48 : 64));

      ctx.font = `600 ${isMobile ? '10px' : '12px'} Inter, -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(196, 181, 253, 0.18)';
      ctx.fillText('PLACEMENT & CAREER OS', centerX, centerY + (isMobile ? 68 : 90));
      ctx.restore();

      // ── 2. DRAW SOFT MOLECULAR CONSTELLATION BONDS ──────────────────
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x;
          const dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < BOND_DISTANCE) {
            // Light, subtle alpha
            const alpha = (1 - dist / BOND_DISTANCE) * 0.18;
            ctx.strokeStyle = `rgba(${molecules[i].color.r}, ${molecules[i].color.g}, ${molecules[i].color.b}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.stroke();
          }
        }

        // Connect nearby molecules softly to cursor position
        if (mouse.active) {
          const mdx = molecules[i].x - mouse.x;
          const mdy = molecules[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < MOUSE_RADIUS) {
            const mAlpha = (1 - mDist / MOUSE_RADIUS) * 0.35;
            ctx.strokeStyle = `rgba(${molecules[i].color.r}, ${molecules[i].color.g}, ${molecules[i].color.b}, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gentle magnetic attraction towards cursor
            const force = ((MOUSE_RADIUS - mDist) / MOUSE_RADIUS) * 1.5;
            molecules[i].x += (mdx / (mDist || 1)) * force + mouse.vx * 0.05;
            molecules[i].y += (mdy / (mDist || 1)) * force + mouse.vy * 0.05;
          }
        }
      }

      // ── 3. UPDATE & DRAW SOFT MOLECULES ─────────────────────────────
      molecules.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.pulse += m.pulseSpeed;

        // Boundary wrap
        if (m.x < -15) m.x = width + 15;
        if (m.x > width + 15) m.x = -15;
        if (m.y < -15) m.y = height + 15;
        if (m.y > height + 15) m.y = -15;

        const pulseScale = 1 + Math.sin(m.pulse) * 0.2;
        const currentR = m.r * pulseScale;
        const currentAlpha = m.baseAlpha + Math.sin(m.pulse) * 0.06;

        // Soft outer glow halo (subtle, not overly bright)
        const haloGrad = ctx.createRadialGradient(
          m.x, m.y, 0,
          m.x, m.y, currentR * 3
        );
        haloGrad.addColorStop(0, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, ${currentAlpha})`);
        haloGrad.addColorStop(0.6, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, ${currentAlpha * 0.25})`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, currentR * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner nucleus
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, Math.max(1, currentR * 0.55), 0, Math.PI * 2);
        ctx.fill();
      });

      // ── 4. SOFT MOUSE AMBIENCE ──────────────────────────────────────
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 60
        );
        mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
        mouseGlow.addColorStop(0.6, 'rgba(168, 85, 247, 0.05)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default MoleculeBackground;
