'use client';

import { useRef, useState, createElement } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icon-utils';
import GrainOverlay from './GrainOverlay';

interface CourseCardProps {
  id: string;
  title: string;
  progress?: number;
  icon_name?: string;
  index?: number;
}

export default function CourseCard({
  title,
  progress = 0,
  icon_name = 'BookOpen',
  index = 0,
}: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [iconShake, setIconShake] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight({ x: 50, y: 50 });
    setIconShake(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const handleIconHover = () => {
    setIconShake(true);
    setTimeout(() => setIconShake(false), 500);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      whileHover={{
        scale: 1.015,
        y: -3,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.99 }}
      style={{
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="relative group rounded-xl bg-gradient-to-br from-surface-1 via-surface-2 to-deep-3 border border-border-1 p-5 overflow-hidden cursor-pointer transition-shadow duration-300"
    >
      <GrainOverlay opacity={0.04} />

      {/* Click ripples */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 pointer-events-none"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        />
      ))}

      {/* Pulsing gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.04)',
        }}
      />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-accent/[0.08] to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:blur-2xl group-hover:from-accent/[0.15]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/[0.05] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.03) 50%, transparent 100%)',
        }}
      />

      {/* Real mouse-tracking spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(99,102,241,0.07) 0%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4" onMouseEnter={handleIconHover}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: iconShake ? [0, -10, 10, -8, 8, 0] : 0,
            }}
            transition={{
              delay: 0.15 + index * 0.08,
              duration: iconShake ? 0.5 : 0.3,
              rotate: iconShake ? { duration: 0.5 } : { duration: 0.3 },
            }}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/15 flex items-center justify-center flex-shrink-0 border border-accent/10"
          >
            {createElement(getIcon(icon_name), {
              className: 'w-[18px] h-[18px] text-accent-light',
            })}
          </motion.div>
          <h3
            className="font-semibold text-base text-soft-white leading-snug flex-1 pt-1"
            style={{ transform: 'translateZ(24px)' }}
          >
            {title}
          </h3>
        </div>

        <div className="mt-auto" style={{ transform: 'translateZ(16px)' }}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-base font-medium text-subtle uppercase tracking-wider">
              Progress
            </span>
            <motion.span
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.08, duration: 0.3 }}
              className="text-base font-semibold text-accent-light"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 rounded-full shadow-[0_0_6px_rgba(99,102,241,0.15)]" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                delay: 0.3 + index * 0.08,
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-purple-400 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
