'use client';

import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    let time = 0;

    const draw = () => {
      time += 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cellSize = 60;

      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);

      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 0.5;

      for (let row = 0; row <= rows; row++) {
        ctx.beginPath();
        for (let col = 0; col <= cols; col++) {
          const x = col * cellSize;
          const y = row * cellSize;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const intensity = 1 - Math.min(dist / maxDist, 1);
          const alpha = intensity * intensity * 0.06;
          const wave = Math.sin((y + x) * 0.01 + time) * 0.15;

          const px = x + Math.sin(time * 0.3 + y * 0.02) * 2;
          const py = y + Math.cos(time * 0.25 + x * 0.02) * 2;

          ctx.globalAlpha = Math.max(0, alpha + wave * alpha);
          if (col === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let col = 0; col <= cols; col++) {
        ctx.beginPath();
        for (let row = 0; row <= rows; row++) {
          const x = col * cellSize;
          const y = row * cellSize;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const intensity = 1 - Math.min(dist / maxDist, 1);
          const alpha = intensity * intensity * 0.06;
          const wave = Math.sin((x + y) * 0.01 + time) * 0.15;

          const px = x + Math.sin(time * 0.3 + y * 0.02) * 2;
          const py = y + Math.cos(time * 0.25 + x * 0.02) * 2;

          ctx.globalAlpha = Math.max(0, alpha + wave * alpha);
          if (row === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
