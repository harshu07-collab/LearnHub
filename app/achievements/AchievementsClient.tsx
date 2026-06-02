'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconZap,
  IconBrain,
  IconCode,
  IconCloud,
  IconPalette,
  IconFlame,
  IconStar,
  IconBookOpen,
  IconTrophy,
  IconAward,
} from '@/components/CustomIcons';
import GrainOverlay from '@/components/GrainOverlay';

const achievements = [
  {
    name: 'Quick Starter',
    desc: 'Complete your first lesson',
    icon: IconZap,
    progress: 100,
    color: 'text-amber-400',
    bg: 'from-amber-500/10 to-orange-500/5',
  },
  {
    name: 'Code Master',
    desc: 'Finish the React course',
    icon: IconCode,
    progress: 75,
    color: 'text-accent-light',
    bg: 'from-accent/10 to-purple-500/5',
  },
  {
    name: 'AI Explorer',
    desc: 'Complete the ML module',
    icon: IconBrain,
    progress: 52,
    color: 'text-purple-400',
    bg: 'from-purple-500/10 to-pink-500/5',
  },
  {
    name: 'Cloud Champ',
    desc: 'Deploy your first app',
    icon: IconCloud,
    progress: 88,
    color: 'text-sky-400',
    bg: 'from-sky-500/10 to-cyan-500/5',
  },
  {
    name: 'Design Guru',
    desc: 'Master UI principles',
    icon: IconPalette,
    progress: 45,
    color: 'text-pink-400',
    bg: 'from-pink-500/10 to-rose-500/5',
  },
  {
    name: 'Streak King',
    desc: 'Maintain a 7-day streak',
    icon: IconFlame,
    progress: 100,
    color: 'text-orange-400',
    bg: 'from-orange-500/10 to-red-500/5',
  },
  {
    name: 'Night Owl',
    desc: 'Study after 10 PM',
    icon: IconStar,
    progress: 30,
    color: 'text-indigo-400',
    bg: 'from-indigo-500/10 to-purple-500/5',
  },
  {
    name: 'Bookworm',
    desc: 'Read 10 articles',
    icon: IconBookOpen,
    progress: 60,
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-teal-500/5',
  },
];

export default function AchievementsPageClient() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <IconAward className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-soft-white">Achievements</h1>
              <p className="text-sm text-muted mt-1">Your learning milestones and badges</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Badges', value: '8', color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Unlocked', value: '3', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'In Progress', value: '5', color: 'text-accent-light', bg: 'bg-accent/10' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
              className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 overflow-hidden group"
            >
              <GrainOverlay opacity={0.03} />
              <div
                className={`w-9 h-9 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-3`}
              >
                <IconTrophy className={`w-[18px] h-[18px] ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-soft-white">{stat.value}</div>
              <div className="text-xs text-muted mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((ach, idx) => {
                const Icon = ach.icon;
                const unlocked = ach.progress >= 100;
                return (
                  <motion.div
                    key={ach.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + idx * 0.04, duration: 0.3 }}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative rounded-xl p-5 border text-center transition-all duration-300 ${
                      unlocked
                        ? `bg-gradient-to-br ${ach.bg} border-amber-500/20`
                        : 'bg-surface-2/50 border-border-1'
                    } ${hovered === idx ? 'scale-[1.02]' : ''}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {unlocked && hovered === idx && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          boxShadow: `0 0 40px rgba(251, 191, 36, 0.12), inset 0 0 40px rgba(251, 191, 36, 0.04)`,
                        }}
                      />
                    )}
                    <div className="flex justify-center mb-3">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        className="transform -rotate-90"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-surface-3"
                        />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 24}
                          initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                          animate={{
                            strokeDashoffset: 2 * Math.PI * 24 * (1 - ach.progress / 100),
                          }}
                          transition={{
                            delay: 0.3 + idx * 0.04,
                            duration: 1.2,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className={unlocked ? 'text-amber-400' : 'text-accent/50'}
                        />
                        <text
                          x="28"
                          y="32"
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill="currentColor"
                          className={unlocked ? 'text-amber-400' : 'text-muted'}
                          transform="rotate(90 28 28)"
                        >
                          {ach.progress}%
                        </text>
                      </svg>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-xl mx-auto mb-2.5 flex items-center justify-center ${unlocked ? 'bg-amber-500/10' : 'bg-surface-3'}`}
                    >
                      <Icon className={`w-5 h-5 ${unlocked ? ach.color : 'text-muted'}`} />
                    </div>
                    <h4
                      className={`text-sm font-semibold ${unlocked ? 'text-soft-white' : 'text-muted'}`}
                    >
                      {ach.name}
                    </h4>
                    <p className="text-[10px] text-subtle mt-0.5">{ach.desc}</p>
                    {unlocked && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-amber-400 font-semibold mt-2 block"
                      >
                        Unlocked
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
