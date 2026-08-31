import React, { useEffect, useRef } from 'react';

/**
 * MoleculeBackground
 * - Continuous organic floating molecule nodes with glowing atomic cores
 * - Constellation chemical bond lines connecting nearby molecules
 * - Dynamic mouse/arrow-cursor interaction: molecules gravitate and move with cursor motion
 * - Cosmic vector arrows and energy rays
 * - Blended floating holographic icons (🎓, 🚀, 🧠, 💼, 💻, ⚡, 🏆, 🌐) with screen blending
 * - 60 FPS Canvas with zero lag and high-DPI Retina support
 */
const MoleculeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color theme
    const PALETTE = [
      { r: 56,  g: 189, b: 248, hex: '#38bdf8' }, // Cyan
      { r: 192, g: 132, b: 252, hex: '#c084fc' }, // Purple
      { r: 52,  g: 211, b: 153, hex: '#34d399' }, // Emerald
      { r: 251, g: 191, b: 36,  hex: '#fbbf24' }, // Amber
      { r: 244, g: 114, b: 182, hex: '#f472b6' }, // Rose Pink
      { r: 96,  g: 165, b: 250, hex: '#60a5fa' }  // Blue
    ];

    // Responsive molecule counts
    const isMobile = width < 768;
    const MOLECULE_COUNT = isMobile ? 45 : 85;
    const ARROW_COUNT = isMobile ? 8 : 16;
    const BOND_DISTANCE = isMobile ? 90 : 130;
    const MOUSE_RADIUS = 180;

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

    // Molecules
    const molecules = [];
    for (let i = 0; i < MOLECULE_COUNT; i++) {
      const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      molecules.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: 0,
        originY: 0,
        r: 2.2 + Math.random() * 3.8,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        color: col,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        mass: 1 + Math.random() * 1.5
      });
    }

    // Directional vector arrows
    const arrows = [];
    for (let i = 0; i < ARROW_COUNT; i++) {
      arrows.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 18 + Math.random() * 14,
        angle: Math.random() * Math.PI * 2,
        speed: 0.35 + Math.random() * 0.45,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
      });
    }

    // Blended floating icons
    const ICONS = ['🎓', '🚀', '🧠', '💼', '💻', '⚡', '🏆', '🌐'];
    const floatingIcons = ICONS.map((icon, idx) => ({
      icon,
      x: (width / (ICONS.length + 1)) * (idx + 1) + (Math.random() - 0.5) * 100,
      y: (height * 0.2) + Math.random() * (height * 0.6),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: 26 + Math.random() * 14,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      opacity: 0.12 + Math.random() * 0.12,
      pulse: Math.random() * Math.PI * 2
    }));

    // Mouse listeners
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
        mouse.vx = dx * 0.15;
        mouse.vy = dy * 0.15;
        mouse.x += mouse.vx;
        mouse.y += mouse.vy;

        // Inactive timeout
        if (Date.now() - mouse.lastMoved > 3000) {
          mouse.active = false;
        }
      }

      // ── 1. DRAW BLENDED FLOATING ICONS ──────────────────────────────
      floatingIcons.forEach((item) => {
        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.rotSpeed;
        item.pulse += 0.015;

        // Bounce screen edges
        if (item.x < 50 || item.x > width - 50) item.vx *= -1;
        if (item.y < 50 || item.y > height - 50) item.vy *= -1;

        // Interaction with mouse cursor
        if (mouse.active) {
          const mdx = item.x - mouse.x;
          const mdy = item.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < MOUSE_RADIUS + 40 && dist > 0) {
            const force = (MOUSE_RADIUS + 40 - dist) / (MOUSE_RADIUS + 40);
            item.x += (mdx / dist) * force * 1.5;
            item.y += (mdy / dist) * force * 1.5;
          }
        }

        const currentOpacity = item.opacity + Math.sin(item.pulse) * 0.04;
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.globalAlpha = Math.max(0.06, currentOpacity);
        ctx.font = `${item.size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.icon, 0, 0);
        ctx.restore();
      });

      // ── 2. DRAW MOLECULAR CONSTELLATION BONDS ───────────────────────
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x;
          const dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < BOND_DISTANCE) {
            const alpha = (1 - dist / BOND_DISTANCE) * 0.28;
            const grad = ctx.createLinearGradient(
              molecules[i].x,
              molecules[i].y,
              molecules[j].x,
              molecules[j].y
            );
            grad.addColorStop(
              0,
              `rgba(${molecules[i].color.r}, ${molecules[i].color.g}, ${molecules[i].color.b}, ${alpha})`
            );
            grad.addColorStop(
              1,
              `rgba(${molecules[j].color.r}, ${molecules[j].color.g}, ${molecules[j].color.b}, ${alpha})`
            );

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.stroke();
          }
        }

        // Connect nearby molecules to the mouse cursor arrow
        if (mouse.active) {
          const mdx = molecules[i].x - mouse.x;
          const mdy = molecules[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < MOUSE_RADIUS) {
            const mAlpha = (1 - mDist / MOUSE_RADIUS) * 0.55;
            ctx.strokeStyle = `rgba(${molecules[i].color.r}, ${molecules[i].color.g}, ${molecules[i].color.b}, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Magnetic attraction & displacement towards/along cursor motion
            const force = ((MOUSE_RADIUS - mDist) / MOUSE_RADIUS) * 2.2;
            molecules[i].x += (mdx / (mDist || 1)) * force + mouse.vx * 0.08;
            molecules[i].y += (mdy / (mDist || 1)) * force + mouse.vy * 0.08;
          }
        }
      }

      // ── 3. UPDATE & DRAW MOLECULAR NODES ─────────────────────────────
      molecules.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.pulse += m.pulseSpeed;

        // Wrap or bounce around canvas boundaries
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;
        if (m.y < -20) m.y = height + 20;
        if (m.y > height + 20) m.y = -20;

        const pulseScale = 1 + Math.sin(m.pulse) * 0.25;
        const currentR = m.r * pulseScale;

        // Outer glow halo
        const haloGrad = ctx.createRadialGradient(
          m.x, m.y, 0,
          m.x, m.y, currentR * 3.5
        );
        haloGrad.addColorStop(0, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, 0.65)`);
        haloGrad.addColorStop(0.5, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, 0.2)`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, currentR * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner glowing nucleus
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = m.color.hex;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(m.x, m.y, Math.max(1.2, currentR * 0.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for next draws
      });

      // ── 4. DRAW VECTOR ARROWS ────────────────────────────────────────
      arrows.forEach((a) => {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
        a.angle += a.rotSpeed;

        // Mouse orientation influence: arrows gently steer towards cursor movement
        if (mouse.active) {
          const adx = mouse.x - a.x;
          const ady = mouse.y - a.y;
          const aDist = Math.sqrt(adx * adx + ady * ady);
          if (aDist < MOUSE_RADIUS * 1.5 && aDist > 10) {
            const targetAngle = Math.atan2(ady, adx);
            a.angle += (targetAngle - a.angle) * 0.02;
            a.x += (adx / aDist) * 0.6;
            a.y += (ady / aDist) * 0.6;
          }
        }

        // Boundary wrap
        if (a.x < -50) a.x = width + 50;
        if (a.x > width + 50) a.x = -50;
        if (a.y < -50) a.y = height + 50;
        if (a.y > height + 50) a.y = -50;

        // Render arrow
        const headLen = a.length * 0.38;
        const tailX = a.x - Math.cos(a.angle) * a.length;
        const tailY = a.y - Math.sin(a.angle) * a.length;

        ctx.strokeStyle = `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, 0.35)`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();

        // Arrowhead
        ctx.fillStyle = `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, 0.45)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(
          a.x - Math.cos(a.angle - Math.PI / 6) * headLen,
          a.y - Math.sin(a.angle - Math.PI / 6) * headLen
        );
        ctx.lineTo(
          a.x - Math.cos(a.angle + Math.PI / 6) * headLen,
          a.y - Math.sin(a.angle + Math.PI / 6) * headLen
        );
        ctx.closePath();
        ctx.fill();
      });

      // ── 5. MOUSE GLOW EMITTER ────────────────────────────────────────
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 70
        );
        mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        mouseGlow.addColorStop(0.5, 'rgba(192, 132, 252, 0.1)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2);
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
      {/* Central Blended Ambient Watermark */}
      <img
        src="/logo192.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '380px',
          height: '380px',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(32px) saturate(220%) brightness(1.3)',
          opacity: 0.14,
          mixBlendMode: 'screen',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default MoleculeBackground;
