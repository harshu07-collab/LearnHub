'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconZap, IconBrain, IconCode, IconFlame, IconTrophy } from './CustomIcons';
import GrainOverlay from './GrainOverlay';

const achievements = [
  {
    name: 'Quick Starter',
    desc: 'Complete first lesson',
    icon: IconZap,
    progress: 100,
    color: 'text-amber-400',
  },
  {
    name: 'Code Master',
    desc: 'Finish React course',
    icon: IconCode,
    progress: 75,
    color: 'text-accent-light',
  },
  {
    name: 'AI Explorer',
    desc: 'Complete ML module',
    icon: IconBrain,
    progress: 52,
    color: 'text-purple-400',
  },
  {
    name: 'Streak King',
    desc: '7-day streak',
    icon: IconFlame,
    progress: 100,
    color: 'text-orange-400',
  },
];

export default function AchievementsTile() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      className="relative rounded-xl bg-gradient-to-br from-surface-1 via-surface-2 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden group"
    >
      <GrainOverlay opacity={0.03} />

      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
            <IconTrophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-soft-white">Achievements</h3>
            <p className="text-[10px] text-subtle">Your recent milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            const unlocked = ach.progress >= 100;
            return (
              <motion.div
                key={ach.name}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.3 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-xl p-3.5 border text-center transition-all duration-300 ${
                  unlocked
                    ? 'bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.04] border-amber-500/15'
                    : 'bg-surface-2/50 border-border-1'
                } ${hovered === idx ? 'scale-[1.03]' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {unlocked && hovered === idx && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      boxShadow:
                        '0 0 30px rgba(251, 191, 36, 0.15), inset 0 0 30px rgba(251, 191, 36, 0.05)',
                    }}
                  />
                )}
                <div
                  className={`w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${
                    unlocked ? 'bg-amber-500/10' : 'bg-surface-3'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] ${unlocked ? ach.color : 'text-muted'}`} />
                </div>
                <h4
                  className={`text-xs font-semibold ${unlocked ? 'text-soft-white' : 'text-muted'}`}
                >
                  {ach.name}
                </h4>
                <p className="text-[9px] text-subtle mt-0.5">{ach.desc}</p>
                {!unlocked && (
                  <div className="mt-2 h-1 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ach.progress}%` }}
                      transition={{
                        delay: 0.3 + idx * 0.08,
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="h-full rounded-full bg-accent/50"
                    />
                  </div>
                )}
                {unlocked && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[9px] text-amber-400 font-medium mt-1.5 block"
                  >
                    ★ Unlocked
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(251, 191, 36, 0.15), 0 0 30px rgba(251, 191, 36, 0.04)',
        }}
      />
    </motion.article>
  );
}
