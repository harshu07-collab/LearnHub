'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconTrophy, IconStar, IconLeaderboard, IconFlame } from '@/components/CustomIcons';
import GrainOverlay from '@/components/GrainOverlay';

interface Leader {
  rank: number;
  name: string;
  email: string;
  points: number;
  streak: number;
  courses: number;
  isCurrentUser?: boolean;
}

const leaders: Leader[] = [
  {
    rank: 1,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    points: 2840,
    streak: 15,
    courses: 12,
  },
  {
    rank: 2,
    name: 'Alex Rivera',
    email: 'alex@example.com',
    points: 2520,
    streak: 12,
    courses: 10,
  },
  {
    rank: 3,
    name: 'Jordan Kim',
    email: 'jordan@example.com',
    points: 2310,
    streak: 10,
    courses: 9,
  },
  { rank: 4, name: 'Morgan Lee', email: 'morgan@example.com', points: 1980, streak: 8, courses: 7 },
  { rank: 5, name: 'Priya Patel', email: 'priya@example.com', points: 1750, streak: 7, courses: 6 },
  {
    rank: 6,
    name: 'Taylor Reed',
    email: 'taylor@example.com',
    points: 1520,
    streak: 5,
    courses: 5,
  },
  {
    rank: 7,
    name: 'You',
    email: 'you@example.com',
    points: 1280,
    streak: 7,
    courses: 4,
    isCurrentUser: true,
  },
  { rank: 8, name: 'Casey Brown', email: 'casey@example.com', points: 1100, streak: 3, courses: 4 },
];

const rankColors = ['text-amber-400', 'text-gray-300', 'text-amber-600'];

export default function LeaderboardPageClient() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <IconLeaderboard className="w-5 h-5 text-accent-light" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-soft-white">Leaderboard</h1>
              <p className="text-sm text-muted mt-1">Top learners this month</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: 'Your Rank',
              value: '#7',
              icon: IconStar,
              color: 'text-accent-light',
              bg: 'bg-accent/10',
            },
            {
              label: 'Total Points',
              value: '1,280',
              icon: IconTrophy,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              label: 'Day Streak',
              value: '7',
              icon: IconFlame,
              color: 'text-orange-400',
              bg: 'bg-orange-500/10',
            },
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden"
              >
                <GrainOverlay opacity={0.03} />
                <div
                  className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2`}
                >
                  <StatIcon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-xl font-bold text-soft-white">{stat.value}</div>
                <div className="text-[10px] text-muted mt-0.5">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <div className="relative z-10">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border-1">
              <span className="col-span-1 text-[10px] text-subtle font-medium uppercase tracking-wider">
                Rank
              </span>
              <span className="col-span-4 text-[10px] text-subtle font-medium uppercase tracking-wider">
                Name
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-medium uppercase tracking-wider text-right">
                Points
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-medium uppercase tracking-wider text-right">
                Streak
              </span>
              <span className="col-span-2 text-[10px] text-subtle font-medium uppercase tracking-wider text-right">
                Courses
              </span>
              <span className="col-span-1" />
            </div>

            {leaders.map((leader, idx) => {
              const isTop3 = idx < 3;
              return (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.03, duration: 0.3 }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className={`grid grid-cols-12 gap-4 px-5 py-4 items-center transition-all duration-200 ${
                    leader.isCurrentUser
                      ? 'bg-accent/5 border-b border-accent/10'
                      : 'border-b border-border-1 last:border-0 hover:bg-surface-2/50'
                  } ${hovered === idx && !leader.isCurrentUser ? 'bg-surface-2/50' : ''}`}
                >
                  <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                    {isTop3 ? (
                      <span className={`text-lg font-bold ${rankColors[idx]}`}>{leader.rank}</span>
                    ) : (
                      <span className="text-sm font-medium text-muted">{leader.rank}</span>
                    )}
                    {isTop3 && (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2L9.5 5.5L13 6L10.5 8.5L11 12L8 10.5L5 12L5.5 8.5L3 6L6.5 5.5L8 2Z"
                          fill="currentColor"
                          className={
                            idx === 0
                              ? 'text-amber-400'
                              : idx === 1
                                ? 'text-gray-300'
                                : 'text-amber-600'
                          }
                        />
                      </svg>
                    )}
                  </div>

                  <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                    <div
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
                    </div>
                    <div>
                      <span
                        className={`text-sm font-medium ${leader.isCurrentUser ? 'text-accent-light' : 'text-soft-white'}`}
                      >
                        {leader.name}
                      </span>
                      {leader.isCurrentUser && (
                        <span className="ml-2 text-[9px] text-accent-light font-medium uppercase">
                          You
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 text-right">
                    <span className="text-sm font-semibold text-soft-white">
                      {leader.points.toLocaleString()}
                    </span>
                  </div>

                  <div className="hidden md:block col-span-2 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconFlame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-sm text-muted">{leader.streak}</span>
                    </div>
                  </div>

                  <div className="hidden md:block col-span-2 text-right">
                    <span className="text-sm text-muted">{leader.courses}</span>
                  </div>

                  <div className="hidden md:block col-span-1 text-right">
                    {isTop3 && idx === 0 && (
                      <span className="text-[10px] text-amber-400 font-medium">Leader</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
