'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let rafId: number;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-50 gpu-accelerated"
      aria-hidden="true"
      style={{
        left: 0,
        top: 0,
        width: 500,
        height: 500,
        transform: 'translate(-50%, -50%)',
        transition:
          'left 0.15s cubic-bezier(0.32, 0.72, 0, 1), top 0.15s cubic-bezier(0.32, 0.72, 0, 1)',
        willChange: 'left, top',
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
