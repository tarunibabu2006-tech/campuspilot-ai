import React, { useEffect, useRef } from 'react';

/**
 * MoleculeBackground
 * - 80 glowing molecule particles bouncing around the canvas
 * - 12 arrow markers that drift in their fixed direction
 * - Platform logo blended in the centre with heavy blur + low opacity
 */
const MoleculeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const arrows = [];
    const PARTICLE_COUNT = 80;
    const ARROW_COUNT = 12;
    const COLORS = ['#7dd3fc', '#a7f3d0', '#fef08a', '#c4b5fd', '#f9a8d4'];
    const ARROW_COL = 'rgba(125,209,252,0.55)';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // molecule particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.6 + Math.random() * 0.4,
      });
    }

    // arrow particles
    for (let i = 0; i < ARROW_COUNT; i++) {
      const size = 14 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      arrows.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        angle,
        speed: 0.4 + Math.random() * 0.4,
      });
    }

    // draw a single arrow (line + triangle head)
    const drawArrow = (a) => {
      const { x, y, size, angle } = a;
      const headLen = size * 0.42;
      const tx = x - Math.cos(angle) * size;
      const ty = y - Math.sin(angle) * size;

      ctx.strokeStyle = ARROW_COL;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      ctx.fillStyle = ARROW_COL;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(
        tx + Math.cos(angle - Math.PI + Math.PI / 6) * headLen,
        ty + Math.sin(angle - Math.PI + Math.PI / 6) * headLen
      );
      ctx.lineTo(
        tx + Math.cos(angle - Math.PI - Math.PI / 6) * headLen,
        ty + Math.sin(angle - Math.PI - Math.PI / 6) * headLen
      );
      ctx.closePath();
      ctx.fill();
    };

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // molecules
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, 'transparent');
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // arrows
      arrows.forEach(a => {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
        if (a.x < -a.size) a.x = canvas.width + a.size;
        if (a.x > canvas.width + a.size) a.x = -a.size;
        if (a.y < -a.size) a.y = canvas.height + a.size;
        if (a.y > canvas.height + a.size) a.y = -a.size;
        drawArrow(a);
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {/* Blended platform icon */}
      <img
        src="/logo192.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '320px',
          height: '320px',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(18px) saturate(200%) brightness(1.4)',
          opacity: 0.18,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default MoleculeBackground;
