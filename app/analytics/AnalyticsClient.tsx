'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Clock,
  Target,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Brain,
  Code,
  Cloud,
  Palette,
  Star,
} from 'lucide-react';
import GrainOverlay from '@/components/GrainOverlay';

const statCards = [
  {
    label: 'Total Courses',
    value: '4',
    icon: BookOpen,
    color: 'text-accent-light',
    bg: 'bg-accent/10',
  },
  {
    label: 'Day Streak',
    value: '7',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    label: 'Avg Progress',
    value: '65%',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Hours Learned',
    value: '28',
    icon: Clock,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    label: 'Achievements',
    value: '5',
    icon: Trophy,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  { label: 'Focus Score', value: '82', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

const achievements = [
  {
    name: 'Quick Starter',
    desc: 'Complete first lesson',
    icon: Zap,
    progress: 100,
    color: 'text-amber-400',
  },
  {
    name: 'Code Master',
    desc: 'Finish React course',
    icon: Code,
    progress: 75,
    color: 'text-accent-light',
  },
  {
    name: 'AI Explorer',
    desc: 'Complete ML module',
    icon: Brain,
    progress: 52,
    color: 'text-purple-400',
  },
  {
    name: 'Cloud Champ',
    desc: 'Deploy first app',
    icon: Cloud,
    progress: 88,
    color: 'text-sky-400',
  },
  {
    name: 'Design Guru',
    desc: 'Master UI principles',
    icon: Palette,
    progress: 45,
    color: 'text-pink-400',
  },
  {
    name: 'Streak King',
    desc: '7-day streak',
    icon: Flame,
    progress: 100,
    color: 'text-orange-400',
  },
  {
    name: 'Night Owl',
    desc: 'Study after 10 PM',
    icon: Star,
    progress: 30,
    color: 'text-indigo-400',
  },
  {
    name: 'Bookworm',
    desc: 'Read 10 articles',
    icon: BookOpen,
    progress: 60,
    color: 'text-emerald-400',
  },
];

const weeklyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 3.8 },
];
const maxHours = Math.max(...weeklyData.map((d) => d.hours));

const categoryData = [
  { label: 'Frontend', value: 35, color: 'bg-accent' },
  { label: 'AI/ML', value: 25, color: 'bg-purple-500' },
  { label: 'Cloud', value: 25, color: 'bg-sky-500' },
  { label: 'Design', value: 15, color: 'bg-pink-500' },
];

export default function AnalyticsClient() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-soft-white">Analytics</h1>
        <p className="text-sm text-muted mt-1">Your learning journey at a glance</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.4 }}
              className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden group"
            >
              <GrainOverlay opacity={0.03} />
              <div className="relative z-10">
                <div
                  className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2.5`}
                >
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-xl font-bold text-soft-white">{stat.value}</div>
                <div className="text-[10px] text-subtle mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Hours Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <h3 className="text-sm font-semibold text-soft-white mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-light" />
            Weekly Study Time
          </h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((d, idx) => {
              const h = (d.hours / maxHours) * 100;
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="text-[10px] text-accent-light font-medium"
                  >
                    {d.hours}h
                  </motion.span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 0.3 + idx * 0.05,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-light relative"
                    style={{ minHeight: 4 }}
                  >
                    <div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-[10px] text-subtle font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <h3 className="text-sm font-semibold text-soft-white mb-5 flex items-center gap-2">
            <Target className="w-4 h-4 text-accent-light" />
            Learning Distribution
          </h3>
          <div className="space-y-4">
            {categoryData.map((cat, idx) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted">{cat.label}</span>
                  <span className="text-xs font-semibold text-soft-white">{cat.value}%</span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`h-full rounded-full ${cat.color} relative`}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
      >
        <GrainOverlay opacity={0.03} />
        <h3 className="text-sm font-semibold text-soft-white mb-5 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            const unlocked = ach.progress >= 100;
            return (
              <motion.div
                key={ach.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.04, duration: 0.3 }}
                className={`relative rounded-xl p-4 border text-center transition-all ${
                  unlocked
                    ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20'
                    : 'bg-surface-2 border-border-1 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl mx-auto mb-2.5 flex items-center justify-center ${
                    unlocked ? 'bg-amber-500/10' : 'bg-surface-3'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${unlocked ? ach.color : 'text-muted'}`} />
                </div>
                <h4
                  className={`text-xs font-semibold ${unlocked ? 'text-soft-white' : 'text-muted'}`}
                >
                  {ach.name}
                </h4>
                <p className="text-[9px] text-subtle mt-0.5">{ach.desc}</p>
                {!unlocked && (
                  <div className="mt-2 h-1 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent/50 transition-all"
                      style={{ width: `${ach.progress}%` }}
                    />
                  </div>
                )}
                {unlocked && (
                  <span className="text-[9px] text-amber-400 font-medium mt-1.5 block">
                    Unlocked
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
