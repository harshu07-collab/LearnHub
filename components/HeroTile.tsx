'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, TrendingUp } from 'lucide-react';
import { useAuth } from './AuthProvider';
import GrainOverlay from './GrainOverlay';

interface HeroTileProps {
  userName?: string;
}

export default function HeroTile({ userName: propName }: HeroTileProps) {
  const { user } = useAuth();
  const userName = propName || user?.email?.split('@')[0] || 'Alex';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < 3; i++) {
        const x = w * (0.2 + i * 0.3) + Math.sin(t + i * 2) * 40;
        const y = h * (0.3 + i * 0.2) + Math.cos(t * 0.7 + i * 1.5) * 30;
        const r = 180 + Math.sin(t + i) * 30;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(99, 102, 241, ${0.12 - i * 0.03})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.06 - i * 0.02})`);
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const tileVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-2 via-deep-2 to-deep-3 border border-border-1 min-h-[240px] md:min-h-[260px]"
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grain texture */}
      <GrainOverlay opacity={0.025} />

      {/* Subtle top-right glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
        {/* Top */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-[10px] font-medium text-subtle tracking-widest uppercase">
              Dashboard
            </span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            <span className="text-[10px] font-medium text-subtle tracking-widest uppercase">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-soft-white mb-1.5"
          >
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-accent-light via-accent-lighter to-purple-300 bg-clip-text text-transparent">
              {userName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm text-muted"
          >
            Continue your learning journey
          </motion.p>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex items-center gap-6 md:gap-8 mt-6"
        >
          <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.03 }}>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame className="w-5 h-5 text-orange-400" />
            </motion.div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                7
              </span>
              <span className="text-xs text-muted">day streak</span>
            </div>
          </motion.div>

          <div className="w-px h-8 bg-border-1" />

          <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.03 }}>
            <Target className="w-4 h-4 text-accent-light" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-medium text-soft-white">Advanced React</span>
              <span className="text-xs text-muted">current focus</span>
            </div>
          </motion.div>

          <div className="w-px h-8 bg-border-1" />

          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.03 }}>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-muted">+12% this week</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.15), 0 0 40px rgba(99, 102, 241, 0.05)',
        }}
      />
    </motion.article>
  );
}
