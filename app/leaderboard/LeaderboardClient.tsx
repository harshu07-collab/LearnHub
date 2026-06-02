'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconTrophy, IconStar, IconLeaderboard, IconFlame } from '@/components/CustomIcons';
import GrainOverlay from '@/components/GrainOverlay';
import AnimatedCounter from '@/components/AnimatedCounter';

interface Leader {
  rank: number;
  name: string;
  email: string;
  points: number;
  streak: number;
  courses: number;
  progress: number;
  isCurrentUser?: boolean;
}

const leaders: Leader[] = [
  {
    rank: 1,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    points: 2840,
    streak: 15,
    courses: 12,
    progress: 92,
  },
  {
    rank: 2,
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    points: 2520,
    streak: 12,
    courses: 10,
    progress: 88,
  },
  {
    rank: 3,
    name: 'Vivaan Patel',
    email: 'vivaan.patel@example.com',
    points: 2310,
    streak: 10,
    courses: 9,
    progress: 85,
  },
  {
    rank: 4,
    name: 'Kavya Reddy',
    email: 'kavya.reddy@example.com',
    points: 1980,
    streak: 8,
    courses: 7,
    progress: 76,
  },
  {
    rank: 5,
    name: 'Arjun Nair',
    email: 'arjun.nair@example.com',
    points: 1750,
    streak: 7,
    courses: 6,
    progress: 70,
  },
  {
    rank: 6,
    name: 'Ishaan Joshi',
    email: 'ishaan.joshi@example.com',
    points: 1520,
    streak: 5,
    courses: 5,
    progress: 64,
  },
  {
    rank: 7,
    name: 'You',
    email: 'you@example.com',
    points: 1280,
    streak: 7,
    courses: 4,
    progress: 55,
    isCurrentUser: true,
  },
  {
    rank: 8,
    name: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@example.com',
    points: 1100,
    streak: 3,
    courses: 4,
    progress: 48,
  },
  {
    rank: 9,
    name: 'Diya Singh',
    email: 'diya.singh@example.com',
    points: 980,
    streak: 4,
    courses: 3,
    progress: 42,
  },
  {
    rank: 10,
    name: 'Aditya Verma',
    email: 'aditya.verma@example.com',
    points: 850,
    streak: 2,
    courses: 3,
    progress: 38,
  },
];

const rankColors = ['text-amber-400', 'text-gray-300', 'text-amber-600'];

function LeaderRow({ leader, idx }: { leader: Leader; idx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const isTop3 = idx < 3;

  const handleMouse = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + idx * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setGlow({ x: 50, y: 50 });
      }}
      onMouseMove={handleMouse}
      whileHover={{ scale: 1.008, y: -1 }}
      className={`relative grid grid-cols-12 gap-4 px-5 py-4 items-center transition-all duration-200 cursor-default ${
        leader.isCurrentUser
          ? 'bg-accent/5 border-b border-accent/10'
          : 'border-b border-border-1 last:border-0'
      }`}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.06) 0%, transparent 60%)`,
        }}
      />

      {/* Rank */}
      <div className="col-span-2 md:col-span-1 flex items-center gap-2 relative z-10">
        {isTop3 ? (
          <motion.span
            className={`text-lg font-bold ${rankColors[idx]}`}
            animate={hovered ? { scale: 1.2, rotate: [0, -5, 5, 0] } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {leader.rank}
          </motion.span>
        ) : (
          <span className="text-sm font-medium text-muted">{leader.rank}</span>
        )}
        {isTop3 && (
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            animate={hovered ? { rotate: 15, scale: 1.3 } : { rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <path
              d="M8 2L9.5 5.5L13 6L10.5 8.5L11 12L8 10.5L5 12L5.5 8.5L3 6L6.5 5.5L8 2Z"
              fill="currentColor"
              className={
                idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-gray-300' : 'text-amber-600'
              }
            />
          </motion.svg>
        )}
      </div>

      {/* Name */}
      <div className="col-span-5 md:col-span-4 flex items-center gap-3 relative z-10">
        <motion.div
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
            leader.isCurrentUser
              ? 'bg-accent/20 text-accent-light border border-accent/30'
              : 'bg-surface-3 text-muted'
          }`}
        >
          {leader.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </motion.div>
        <div>
          <span
            className={`text-sm font-medium ${leader.isCurrentUser ? 'text-accent-light' : 'text-soft-white'}`}
          >
            {leader.name}
          </span>
          {leader.isCurrentUser && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-2 text-[9px] text-accent-light font-semibold uppercase tracking-wider"
            >
              You
            </motion.span>
          )}
        </div>
      </div>

      {/* Points with AnimatedCounter */}
      <div className="col-span-3 md:col-span-2 text-right relative z-10">
        <motion.span
          className="text-sm font-semibold text-soft-white inline-block"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        >
          <AnimatedCounter to={leader.points} duration={1.5} />
        </motion.span>
      </div>

      {/* Streak */}
      <div className="hidden md:flex col-span-2 items-center justify-end gap-1.5 relative z-10">
        <motion.div
          animate={hovered ? { scale: 1.2, rotate: -15 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        >
          <IconFlame className="w-3.5 h-3.5 text-orange-400" />
        </motion.div>
        <span className="text-sm text-muted">{leader.streak}</span>
      </div>

      {/* Courses */}
      <div className="hidden md:block col-span-2 text-right relative z-10">
        <motion.span
          className="text-sm text-muted inline-block"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        >
          {leader.courses}
        </motion.span>
      </div>

      {/* Badge */}
      <div className="hidden md:block col-span-1 text-right relative z-10">
        {isTop3 && idx === 0 && (
          <motion.span
            className="text-[10px] text-amber-400 font-semibold inline-block"
            animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          >
            Leader
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

export default function LeaderboardPageClient() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"
            >
              <IconLeaderboard className="w-5 h-5 text-accent-light" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-soft-white">Leaderboard</h1>
              <p className="text-sm text-muted mt-1">Top learners this month</p>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: 'Your Rank',
              value: 7,
              icon: IconStar,
              color: 'text-accent-light',
              bg: 'bg-accent/10',
              suffix: '',
            },
            {
              label: 'Total Points',
              value: 1280,
              icon: IconTrophy,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
              suffix: '',
            },
            {
              label: 'Day Streak',
              value: 7,
              icon: IconFlame,
              color: 'text-orange-400',
              bg: 'bg-orange-500/10',
              suffix: '',
            },
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden group cursor-default"
              >
                <GrainOverlay opacity={0.03} />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)',
                  }}
                />
                <div
                  className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2 relative z-10`}
                >
                  <StatIcon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="relative z-10">
                  {stat.label === 'Your Rank' ? (
                    <span className="text-xl font-bold text-soft-white">#{stat.value}</span>
                  ) : (
                    <AnimatedCounter
                      to={stat.value}
                      suffix={stat.suffix}
                      className="text-xl font-bold text-soft-white"
                      duration={1.2}
                    />
                  )}
                </div>
                <div className="text-[10px] text-muted mt-0.5 relative z-10">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Leaderboard table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <div className="relative z-10">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border-1">
              <span className="col-span-1 text-[10px] text-subtle font-semibold uppercase tracking-widest">
                Rank
              </span>
              <span className="col-span-4 text-[10px] text-subtle font-semibold uppercase tracking-widest">
                Name
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-semibold uppercase tracking-widest text-right">
                Points
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-semibold uppercase tracking-widest text-right">
                Streak
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-semibold uppercase tracking-widest text-right">
                Courses
              </span>
              <span className="col-span-1" />
            </div>

            {leaders.map((leader, idx) => (
              <LeaderRow key={leader.name} leader={leader} idx={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
