'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = ['<', '/', '>', '{', '}', ';', '(', ')', '=', '0', '1', '#'];

export default function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cell = 26;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0;
    let chars: string[] = [];
    const mouse = { x: -999, y: -999 };
    const start = performance.now();

    const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
      chars = Array.from({ length: cols * rows }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const base = css('--glyph'), glow = css('--glow');
      ctx.clearRect(0, 0, w, h);
      ctx.font = '14px ui-monospace, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cell + cell / 2, y = i * cell + cell / 2;
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          const near = Math.max(0, 1 - d / 190);
          const wave = reduce ? 0 : (Math.sin(t * 0.8 + j * 0.35 + i * 0.22) + 1) * 0.5;
          const a = 0.07 + wave * 0.05 + near * 0.85;
          ctx.fillStyle = near > 0.05 ? `rgba(${glow}, ${a})` : `rgba(${base}, ${a})`;
          const push = near * 10;
          const ang = Math.atan2(y - mouse.y, x - mouse.x);
          ctx.fillText(chars[i * cols + j], x + Math.cos(ang) * push, y + Math.sin(ang) * push);
          if (near > 0.6 && Math.random() < 0.04) chars[i * cols + j] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (reduce) draw(performance.now());
    };
    const leave = () => { mouse.x = mouse.y = -999; };

    resize();
    draw(start);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
