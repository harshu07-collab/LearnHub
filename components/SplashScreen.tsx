'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('exit'), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const timer = setTimeout(onFinish, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-deep-0 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-6">
          <defs>
            <linearGradient id="splash-grad" x1="0" y1="0" x2="80" y2="80">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          {/* Capsule background */}
          <motion.rect
            x="2"
            y="2"
            width="76"
            height="76"
            rx="16"
            fill="url(#splash-grad)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Diamond outline draw */}
          <motion.path
            d="M40 10 L64 40 L40 70 L16 40 Z"
            fill="rgba(255,255,255,0.92)"
            strokeLinejoin="round"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          />

          {/* L vertical stem — grows downward */}
          <motion.rect
            x="26"
            y="24"
            width="10"
            height="24"
            rx="2"
            fill="url(#splash-grad)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.35, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'top' }}
          />

          {/* L horizontal base — grows rightward */}
          <motion.rect
            x="26"
            y="44"
            width="23"
            height="10"
            rx="2"
            fill="url(#splash-grad)"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Hub glow ring */}
          <motion.circle
            cx="40"
            cy="40"
            r="9"
            fill="rgba(99,102,241,0.08)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />

          {/* Hub outer */}
          <motion.circle
            cx="40"
            cy="40"
            r="5"
            fill="rgba(99,102,241,0.25)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          />

          {/* Hub inner */}
          <motion.circle
            cx="40"
            cy="40"
            r="3"
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: 1 }}
          />

          {/* Hub core pulse */}
          <motion.circle
            cx="40"
            cy="40"
            r="1.2"
            fill="rgba(99,102,241,0.6)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Diamond corner sparkles */}
          <motion.circle
            cx="40"
            cy="10"
            r="1.5"
            fill="rgba(255,255,255,0.3)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          <motion.circle
            cx="64"
            cy="40"
            r="1.5"
            fill="rgba(255,255,255,0.2)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 1.3 }}
          />
          <motion.circle
            cx="40"
            cy="70"
            r="1.5"
            fill="rgba(255,255,255,0.15)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">LearnHub</h1>
          <p className="text-base text-white/40 mt-1 tracking-[0.2em] uppercase">
            Next-Gen Learning
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
