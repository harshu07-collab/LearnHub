'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let lastFrame = 0;
    const FPS_INTERVAL = 1000 / 30; // Throttle to 30fps

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.2, y: 0.3, r: 300, color: '99, 102, 241', speed: 0.15 },
      { x: 0.8, y: 0.2, r: 400, color: '139, 92, 246', speed: 0.1 },
      { x: 0.5, y: 0.8, r: 350, color: '168, 85, 247', speed: 0.12 },
      { x: 0.1, y: 0.6, r: 250, color: '79, 70, 229', speed: 0.08 },
    ];

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);

      const delta = now - lastFrame;
      if (delta < FPS_INTERVAL) return;
      lastFrame = now - (delta % FPS_INTERVAL);

      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const x = canvas.width * orb.x + Math.sin(time * orb.speed * 2) * 60;
        const y = canvas.height * orb.y + Math.cos(time * orb.speed * 1.5) * 60;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color}, 0.08)`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, 0.04)`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 gpu-accelerated"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
