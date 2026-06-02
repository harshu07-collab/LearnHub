'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  delay: number;
}

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'burst' | 'fade'>('logo');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  // Logo phase → burst phase → fade phase → done
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burst'), 800);
    const t2 = setTimeout(() => setPhase('fade'), 1500);
    const t3 = setTimeout(() => onFinish(), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  // Particle burst animation
  useEffect(() => {
    if (phase !== 'burst') return;
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

    // Create particles
    const count = 60;
    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 200;
      const dist = 10 + Math.random() * 30;
      return {
        x: canvas.width / 2 + Math.cos(angle) * dist,
        y: canvas.height / 2 + Math.sin(angle) * dist,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.3,
      };
    });

    const startTime = performance.now();
    const draw = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particlesRef.current) {
        const t = Math.max(0, elapsed - p.delay);
        if (t <= 0) {
          alive = true;
          continue;
        }

        const decay = Math.exp(-t * 1.2);
        const x = p.x + p.vx * t * 0.3;
        const y = p.y + p.vy * t * 0.3;
        const size = p.size * Math.min(1, t * 3) * decay;
        const opacity = p.opacity * decay;

        if (opacity > 0.01) {
          alive = true;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.fill();
        }
      }

      if (alive) animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'fade' && (
        <motion.div
          className="fixed inset-0 z-[200] bg-deep-0 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Ambient glow */}
          <div className="absolute w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={phase === 'logo' ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.15 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              scale:
                phase === 'logo'
                  ? { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
                  : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Animated logo mark */}
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-5">
              <motion.rect
                x="2"
                y="2"
                width="68"
                height="68"
                rx="16"
                fill="url(#splash-grad)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              {/* Left wing */}
              <motion.path
                d="M18 48V26L30 18L30 40L18 48Z"
                fill="rgba(255,255,255,0.92)"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />
              {/* Center spine */}
              <motion.rect
                x="30"
                y="18"
                width="8"
                height="34"
                rx="3"
                fill="rgba(255,255,255,0.85)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                style={{ transformOrigin: 'center' }}
              />
              {/* Right wing upper */}
              <motion.path
                d="M38 18L50 26L50 48L38 40L38 18Z"
                fill="rgba(255,255,255,0.92)"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              {/* Right wing lower */}
              <motion.path
                d="M50 26L56 30L56 52L50 48L50 26Z"
                fill="rgba(255,255,255,0.4)"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              {/* Accent bars */}
              <motion.rect
                x="20"
                y="14"
                width="20"
                height="4"
                rx="2"
                fill="rgba(255,255,255,0.3)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.rect
                x="20"
                y="54"
                width="20"
                height="4"
                rx="2"
                fill="rgba(255,255,255,0.18)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.85 }}
                style={{ transformOrigin: 'left' }}
              />

              <defs>
                <linearGradient id="splash-grad" x1="0" y1="0" x2="72" y2="72">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold text-white tracking-tight">LearnHub</h1>
              <p className="text-sm text-white/40 mt-1 tracking-[0.2em] uppercase">
                Next-Gen Learning
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
