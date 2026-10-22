'use client';

import { useEffect, useRef } from 'react';

export default function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
    const start = performance.now();
    const LINES = 22;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;
      for (let i = 0; i < LINES; i++) {
        const k = i / (LINES - 1);
        const baseY = h * (0.28 + k * 0.78);
        const hue = 205 - k * 150;
        ctx.strokeStyle = `hsla(${hue}, 95%, ${62 + k * 6}%, ${0.25 + k * 0.6})`;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          let y = baseY + Math.sin(x * 0.006 + t * 0.9 + i * 0.35) * (14 + k * 16) + Math.sin(x * 0.015 - t * 0.6 + i) * 5;
          const dx = x - mouse.x, dy = baseY - mouse.y;
          const d = Math.hypot(dx, dy);
          y -= Math.max(0, 1 - d / 240) ** 2 * 70 * (dy < 0 ? -1 : 1) * -1;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
      if (mouse.x < -900) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
      if (reduce) draw(performance.now());
    };

    resize();
    draw(start);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
