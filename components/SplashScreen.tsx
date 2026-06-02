'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-deep-0 flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onAnimationComplete={() => setTimeout(onFinish, 600)}
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

        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
            <motion.path
              d="M18 48V26L30 18L30 40L18 48Z"
              fill="rgba(255,255,255,0.92)"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
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
            <motion.path
              d="M38 18L50 26L50 48L38 40L38 18Z"
              fill="rgba(255,255,255,0.92)"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            />
            <motion.path
              d="M50 26L56 30L56 52L50 48L50 26Z"
              fill="rgba(255,255,255,0.4)"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            />
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
    </AnimatePresence>
  );
}
