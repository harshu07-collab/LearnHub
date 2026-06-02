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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
      {/* Grain texture overlay */}
      <GrainOverlay opacity={0.04} />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-accent/[0.08] to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:blur-2xl group-hover:from-accent/[0.15]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/[0.05] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hover spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.08, duration: 0.3 }}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/15 flex items-center justify-center flex-shrink-0 border border-accent/10"
          >
            {createElement(getIcon(icon_name), {
              className: 'w-[18px] h-[18px] text-accent-light',
            })}
          </motion.div>
          <h3 className="font-semibold text-sm text-soft-white leading-snug flex-1 pt-1">
            {title}
          </h3>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-medium text-subtle uppercase tracking-wider">
              Progress
            </span>
            <motion.span
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.08, duration: 0.3 }}
              className="text-xs font-semibold text-accent-light"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                delay: 0.3 + index * 0.08,
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-purple-400 relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 20px rgba(99, 102, 241, 0.08)',
        }}
      />
    </motion.div>
  );
}
