'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    let rafId: number;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: pos.x,
        top: pos.y,
        width: 500,
        height: 500,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.3s ease-out, top 0.3s ease-out',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
