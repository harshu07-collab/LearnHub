'use client';

import { motion } from 'framer-motion';
import { IconTarget, IconTrendingUp } from './CustomIcons';
import { useAuth } from './AuthProvider';
import GrainOverlay from './GrainOverlay';
import TypewriterText from './TypewriterText';
import AnimatedCounter from './AnimatedCounter';

interface HeroTileProps {
  userName?: string;
}

export default function HeroTile({ userName: propName }: HeroTileProps) {
  const { user } = useAuth();
  const userName = propName || user?.email?.split('@')[0] || 'Alex';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-2 via-deep-2 to-deep-3 border border-border-1 min-h-[240px] md:min-h-[260px] group"
    >
      <GrainOverlay opacity={0.025} />

      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between h-full p-6 md:p-8">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <motion.span
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-base font-medium text-subtle tracking-widest uppercase">
              Dashboard
            </span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            <span className="text-base font-medium text-subtle tracking-widest uppercase">
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-soft-white mb-2 leading-[1.05] tracking-tight text-glow-accent"
            style={{ WebkitTextStroke: '1.5px rgba(129, 140, 248, 0.12)' }}
          >
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-accent-light via-accent-lighter to-purple-300 bg-clip-text text-transparent">
              <TypewriterText text={userName} delay={0.5} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-muted"
          >
            Continue your learning journey
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center gap-6 md:gap-8 mt-6"
          >
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 text-orange-400"
                  aria-label="Streak"
                >
                  <path
                    d="M10 3C7 7 6 9.5 6 11.5C6 13.5 7.5 16 10 16C12.5 16 14 13.5 14 11.5C14 9.5 13 7 10 3Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    fill="none"
                  />
                  <path
                    d="M8 11C8.5 9 10 8.5 10 8.5C10 8.5 9.5 10 10 11C10.5 12 9.5 13 9 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </motion.div>
              <div className="flex items-baseline gap-1.5">
                <AnimatedCounter
                  to={7}
                  suffix=""
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
                  duration={1.2}
                />
                <span className="text-base text-muted">day streak</span>
              </div>
            </motion.div>

            <div className="w-px h-8 bg-border-1" />

            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconTarget className="w-4 h-4 text-accent-light" />
              </motion.div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-medium text-soft-white">Data Structures</span>
                <span className="text-base text-muted">current focus</span>
              </div>
            </motion.div>

            <div className="w-px h-8 bg-border-1" />

            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <IconTrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-base text-muted">
                +<AnimatedCounter to={12} suffix="%" duration={1} /> this week
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated gradient border — rotates hue */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.15), 0 0 40px rgba(99, 102, 241, 0.05)',
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1)',
        }}
      />
    </motion.article>
  );
}
