'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconTrendingUp, IconActivity } from './CustomIcons';
import GrainOverlay from './GrainOverlay';
import AnimatedCounter from './AnimatedCounter';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyData = [5, 8, 3, 9, 6, 7, 4];
const maxVal = Math.max(...weeklyData);
const total = weeklyData.reduce((a, b) => a + b, 0);
const avg = Math.round(total / weeklyData.length);

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: 0.1 },
  },
};

export default function ActivityTile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverBar, setHoverBar] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;
    let lastFrame = 0;
    const FPS_INTERVAL = 1000 / 30;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);

      const delta = now - lastFrame;
      if (delta < FPS_INTERVAL) return;
      lastFrame = now - (delta % FPS_INTERVAL);

      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Sparkline wave across bottom
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 2) {
        const y = h - 20 + Math.sin(x * 0.03 + t) * 6 + Math.sin(x * 0.07 + t * 1.3) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.03)';
      ctx.fill();

      // Pulsing glow dot on sparkline peak
      const peakX = (t * 30) % w;
      const peakY = h - 20 + Math.sin(peakX * 0.03 + t) * 6 + Math.sin(peakX * 0.07 + t * 1.3) * 3;
      const glowR = 8 + Math.sin(t * 2) * 3;
      const dotGrad = ctx.createRadialGradient(peakX, peakY, 0, peakX, peakY, glowR);
      dotGrad.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
      dotGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = dotGrad;
      ctx.fillRect(peakX - glowR, peakY - glowR, glowR * 2, glowR * 2);

      // Floating dots
      for (let i = 0; i < 3; i++) {
        const fx = (t * 20 + i * 80) % w;
        const fy = 20 + Math.sin(t + i * 2) * 10;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.06 + Math.sin(t + i) * 0.03})`;
        ctx.fill();
      }
    };
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      className="relative h-full rounded-xl bg-gradient-to-br from-surface-1 via-surface-2 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden group"
    >
      <GrainOverlay opacity={0.03} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/3 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/3 w-72 h-72 bg-blue-500/[0.04] rounded-full blur-3xl" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: [0, 0.025, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.04) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center"
            >
              <IconActivity className="w-4 h-4 text-accent-light" />
            </motion.div>
            <div>
              <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] text-glow-accent">
                Weekly Activity
              </h3>
              <p className="text-base text-subtle">Your learning streak</p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/15"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IconTrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </motion.div>
            <span className="text-base font-semibold text-emerald-400">+{avg}</span>
          </motion.div>
        </div>

        {/* Pulsing live indicator */}
        <motion.div
          className="flex items-center gap-1.5 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] text-emerald-400/70 font-medium uppercase tracking-widest">
            Live
          </span>
        </motion.div>

        {/* Chart */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end justify-between gap-1.5 h-28 md:h-32">
            {weeklyData.map((value, idx) => {
              const heightPct = (value / maxVal) * 100;
              return (
                <motion.div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 group/bar"
                  onMouseEnter={() => setHoverBar(idx)}
                  onMouseLeave={() => setHoverBar(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: hoverBar === idx ? 1 : 0, y: hoverBar === idx ? 0 : 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-base font-medium text-accent-light">{value}</span>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${heightPct}%`, opacity: 1 }}
                    transition={{
                      delay: 0.2 + idx * 0.06,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                    whileHover={{ scale: 1.08, transformOrigin: 'bottom' }}
                    className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-light relative cursor-pointer"
                    style={{ minHeight: 4 }}
                  >
                    <motion.div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-white/15 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200" />
                    {hoverBar === idx && (
                      <motion.div
                        className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-t-md pointer-events-none"
                        layoutId="bar-glow"
                        style={{
                          boxShadow:
                            '0 0 12px rgba(99, 102, 241, 0.3), 0 0 30px rgba(99, 102, 241, 0.1)',
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Day labels */}
          <div className="flex justify-between gap-1.5 mt-2.5">
            {days.map((day, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.06, duration: 0.3 }}
                className="text-base text-subtle text-center flex-1 font-medium"
              >
                {day}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 pt-4 border-t border-border-1 grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Total', value: total, color: 'text-accent-light' },
            { label: 'Average', value: avg, color: 'text-purple-400' },
            { label: 'Peak', value: maxVal, color: 'text-emerald-400' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <AnimatedCounter
                to={stat.value}
                className={`text-xl font-bold ${stat.color}`}
                duration={1.2}
              />
              <div className="text-base text-subtle mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.06)',
        }}
      />
    </motion.article>
  );
}
