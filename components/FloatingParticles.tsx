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
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cellSize = 64;

      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);

      const cx = w / 2;
      const cy = h / 2;

      ctx.lineWidth = 0.5;

      // Horizontal lines — perfectly straight, no bending
      for (let row = 0; row <= rows; row++) {
        const y = row * cellSize;
        const dy = Math.abs(y - cy);
        const intensity = 1 - Math.min(dy / cy, 1);
        const alpha = intensity * intensity * 0.3;

        // Subtle pulse on center lines only
        const centerPulse = Math.max(0, 1 - dy / (cy * 0.4));
        const pulse = 1 + Math.sin(time * 0.5 + row * 0.3) * 0.15 * centerPulse;

        ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0, alpha * pulse)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Vertical lines — perfectly straight, no bending
      for (let col = 0; col <= cols; col++) {
        const x = col * cellSize;
        const dx = Math.abs(x - cx);
        const intensity = 1 - Math.min(dx / cx, 1);
        const alpha = intensity * intensity * 0.3;

        const centerPulse = Math.max(0, 1 - dx / (cx * 0.4));
        const pulse = 1 + Math.sin(time * 0.5 + col * 0.3) * 0.15 * centerPulse;

        ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0, alpha * pulse)})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

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
