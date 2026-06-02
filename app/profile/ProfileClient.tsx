'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  IconUser,
  IconTrophy,
  IconFlame,
  IconClock,
  IconBookOpen,
  IconTrendingUp,
  IconTarget,
  IconZap,
  IconAward,
} from '@/components/CustomIcons';
import GrainOverlay from '@/components/GrainOverlay';
import AnimatedCounter from '@/components/AnimatedCounter';
import TypewriterText from '@/components/TypewriterText';
import { useAuth } from '@/components/AuthProvider';

const stats = [
  {
    label: 'Courses',
    value: 8,
    icon: IconBookOpen,
    color: 'text-accent-light',
    bg: 'bg-accent/10',
  },
  {
    label: 'Day Streak',
    value: 7,
    icon: IconFlame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    label: 'Achievements',
    value: 3,
    icon: IconTrophy,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Hours Learned',
    value: 28,
    icon: IconClock,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    label: 'Focus Score',
    value: 82,
    icon: IconTarget,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    label: 'Rank',
    value: 7,
    icon: IconTrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    prefix: '#',
  },
];

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Python',
  'Cloud Architecture',
  'UI/UX Design',
  'System Design',
  'DevOps',
  'Cybersecurity',
  'Data Science',
];

const recentActivity = [
  {
    action: 'Completed TypeScript module',
    course: 'TypeScript Mastery',
    time: '2 hours ago',
    icon: IconZap,
  },
  {
    action: 'Scored 92% on quiz',
    course: 'System Design & Architecture',
    time: '5 hours ago',
    icon: IconTarget,
  },
  {
    action: 'Started new course',
    course: 'Python for Data Science',
    time: '1 day ago',
    icon: IconBookOpen,
  },
  {
    action: 'Earned Quick Starter badge',
    course: 'Achievement Unlocked',
    time: '2 days ago',
    icon: IconAward,
  },
  {
    action: '7-day streak achieved',
    course: 'Daily Learning',
    time: '3 days ago',
    icon: IconFlame,
  },
];

export default function ProfileClient() {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const name = user?.email?.split('@')[0] || 'Alex';
  const initials = name.slice(0, 2).toUpperCase();
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let id: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < 3; i++) {
        const x = w * (0.15 + i * 0.35) + Math.sin(t * 0.3 + i * 2) * 40;
        const y = h * (0.2 + i * 0.3) + Math.cos(t * 0.25 + i * 1.5) * 30;
        const r = 200 + Math.sin(t * 0.15 + i) * 30;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(99, 102, 241, ${0.08 - i * 0.02})`);
        grad.addColorStop(0.5, `rgba(139, 92, 246, ${0.04 - i * 0.01})`);
        grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Floating dots
      for (let i = 0; i < 3; i++) {
        const fx = (t * 25 + i * 100) % w;
        const fy = 30 + Math.sin(t + i * 2) * 12;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.05 + Math.sin(t + i) * 0.02})`;
        ctx.fill();
      }

      // Shimmer
      const sx = ((t * 50) % (w + 200)) - 100;
      const sg = ctx.createLinearGradient(sx, 0, sx + 150, 0);
      sg.addColorStop(0, 'rgba(99, 102, 241, 0)');
      sg.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
      sg.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, w, h);

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-2 via-deep-2 to-deep-3 border border-border-1 min-h-[200px] group"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          <GrainOverlay opacity={0.025} />

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent/30 to-purple-500/20 border border-accent/20 flex items-center justify-center flex-shrink-0"
            >
              <span className="text-2xl md:text-3xl font-bold text-accent-light">{initials}</span>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-soft-white"
              >
                <TypewriterText text={name} delay={0.2} />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-sm text-muted mt-1"
              >
                {user?.email || 'learner@example.com'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center justify-center md:justify-start gap-4 mt-3"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-[10px] text-emerald-400/80 font-medium uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <span className="text-xs text-subtle">Member since {joinDate}</span>
              </motion.div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent-light text-xs font-semibold hover:bg-accent/20 transition-all"
            >
              Edit Profile
            </motion.button>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow:
                'inset 0 0 0 1px rgba(99, 102, 241, 0.15), 0 0 40px rgba(99, 102, 241, 0.05)',
            }}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.04, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden group cursor-default"
              >
                <GrainOverlay opacity={0.03} />
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2.5`}
                >
                  <StatIcon className={`w-4 h-4 ${stat.color}`} />
                </motion.div>
                <AnimatedCounter
                  to={stat.value}
                  prefix={stat.prefix || ''}
                  className="text-xl font-bold text-soft-white"
                  duration={1.2}
                />
                <div className="text-[10px] text-subtle mt-0.5">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-sm font-semibold text-soft-white mb-4 flex items-center gap-2">
              <IconZap className="w-4 h-4 text-accent-light" />
              Skills & Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + idx * 0.03, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -1 }}
                  className="px-3 py-1.5 rounded-lg bg-accent/8 border border-accent/10 text-xs font-medium text-accent-light cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-sm font-semibold text-soft-white mb-4 flex items-center gap-2">
              <IconClock className="w-4 h-4 text-accent-light" />
              Recent Activity
            </h3>
            <div className="space-y-1">
              {recentActivity.map((act, idx) => {
                const ActIcon = act.icon;
                return (
                  <motion.div
                    key={act.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.005, x: 3 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-2/50 transition-all cursor-default"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                      className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <ActIcon className="w-4 h-4 text-accent-light" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-soft-white truncate">{act.action}</p>
                      <p className="text-[10px] text-subtle mt-0.5">
                        {act.course} &middot; {act.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
