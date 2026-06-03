'use client';

import { useEffect, useRef, useState } from 'react';
import {
  IconTrophy,
  IconFlame,
  IconClock,
  IconBookOpen,
  IconTrendingUp,
  IconTarget,
  IconZap,
  IconAward,
  IconStar,
  IconCode,
  IconBrain,
  IconCloud,
  IconPalette,
  IconActivity,
  IconRocket,
  IconCheckCircle,
  IconBarChart,
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
  { label: 'Frontend', value: 35, color: 'text-accent', bg: 'bg-accent' },
  { label: 'AI/ML', value: 25, color: 'text-purple-400', bg: 'bg-purple-500' },
  { label: 'Cloud', value: 25, color: 'text-sky-400', bg: 'bg-sky-500' },
  { label: 'Design', value: 15, color: 'text-pink-400', bg: 'bg-pink-500' },
];

const learningGoals = [
  { label: 'React Mastery', progress: 80, icon: IconCode, color: 'text-accent-light' },
  { label: 'Python Expert', progress: 55, icon: IconBrain, color: 'text-purple-400' },
  { label: 'AWS Certified', progress: 35, icon: IconCloud, color: 'text-sky-400' },
  { label: 'UI Design', progress: 70, icon: IconPalette, color: 'text-pink-400' },
];

const achievements = [
  {
    name: 'Quick Starter',
    desc: 'First lesson completed',
    icon: IconZap,
    progress: 100,
    color: 'text-amber-400',
  },
  {
    name: 'Code Master',
    desc: 'React course finished',
    icon: IconCode,
    progress: 75,
    color: 'text-accent-light',
  },
  {
    name: 'Streak King',
    desc: '7-day streak',
    icon: IconFlame,
    progress: 100,
    color: 'text-orange-400',
  },
  {
    name: 'Night Owl',
    desc: 'Study after 10 PM',
    icon: IconStar,
    progress: 30,
    color: 'text-indigo-400',
  },
  {
    name: 'Bookworm',
    desc: 'Read 10 articles',
    icon: IconBookOpen,
    progress: 60,
    color: 'text-emerald-400',
  },
  {
    name: 'Rocket Ship',
    desc: 'Complete 5 courses',
    icon: IconRocket,
    progress: 45,
    color: 'text-rose-400',
  },
];

const milestones = [
  {
    year: '2026',
    title: 'Started Learning Journey',
    subtitle: 'Joined LearnHub',
    icon: IconRocket,
  },
  {
    year: '2026',
    title: 'First Course Completed',
    subtitle: 'TypeScript Fundamentals',
    icon: IconCheckCircle,
  },
  { year: '2026', title: 'Reached 50 Hours', subtitle: 'Learning milestone', icon: IconClock },
  { year: '2026', title: 'Earned 5 Achievements', subtitle: 'Badge collector', icon: IconTrophy },
];

function ChartSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let id: number;
    let frame = 0;

    const timer = setTimeout(() => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let t = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const draw = () => {
        frame++;
        if (frame % 2 !== 0) {
          id = requestAnimationFrame(draw);
          return;
        }
        t += 0.005;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;

        for (let i = 0; i < 3; i++) {
          const x = (t * 15 + i * 90) % w;
          const y = 30 + Math.sin(t + i * 1.7) * 15;
          const a = 0.04 + Math.sin(t * 2 + i) * 0.02;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${a})`;
          ctx.fill();
        }

        id = requestAnimationFrame(draw);
      };
      draw();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (id) cancelAnimationFrame(id);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function RadialChart({ size = 160 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {categoryData.map((cat, idx) => {
        const total = categoryData.reduce((s, c) => s + c.value, 0);
        const offset = categoryData.slice(0, idx).reduce((s, c) => s + c.value, 0);
        const pct = cat.value / total;
        const angle = (offset / total) * 360;
        const endAngle = ((offset + cat.value) / total) * 360;
        const startRad = ((angle - 90) * Math.PI) / 180;
        const endRad = ((endAngle - 90) * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const largeArc = pct > 0.5 ? 1 : 0;

        return (
          <path
            key={cat.label}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={`var(--color-${cat.bg.replace('bg-', '')})`}
            style={{ animation: `fadeIn 0.5s ${0.15 * idx}s both` }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.6} fill="var(--color-surface-1)" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="text-soft-white text-xl font-bold">
        100%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="text-muted text-[9px]">
        Total
      </text>
    </svg>
  );
}

function AchievementCard({ ach, idx }: { ach: (typeof achievements)[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const unlocked = ach.progress >= 100;
  const Icon = ach.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-xl p-4 border text-center transition-all duration-300 cursor-default ${
        unlocked
          ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20'
          : 'bg-surface-2 border-border-1'
      }`}
      style={{
        animation: `scaleInItem 0.3s ${0.35 + idx * 0.04}s both`,
        transformStyle: 'preserve-3d',
      }}
    >
      {unlocked && hovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.12), inset 0 0 40px rgba(251, 191, 36, 0.04)',
          }}
        />
      )}
      <div
        className={`w-10 h-10 rounded-xl mx-auto mb-2.5 flex items-center justify-center transition-transform duration-300 ${
          unlocked ? 'bg-amber-500/10' : 'bg-surface-3'
        } ${hovered && unlocked ? 'scale-115 rotate-6' : ''}`}
      >
        <Icon className={`w-5 h-5 ${unlocked ? ach.color : 'text-muted'}`} />
      </div>
      <h4
        className={`text-xs font-black uppercase tracking-wider ${unlocked ? 'text-soft-white' : 'text-muted'}`}
      >
        {ach.name}
      </h4>
      <p className="text-[9px] font-medium text-subtle mt-0.5">{ach.desc}</p>
      <div className="mt-3 h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${unlocked ? 'bg-amber-400' : 'bg-accent/50'}`}
          style={{ animation: `progressGrow 1s ${0.3 + idx * 0.04}s ease-out both` }}
        />
      </div>
      {unlocked && (
        <span
          className="text-[9px] font-black text-amber-400 uppercase tracking-widest mt-1.5 block text-glow-amber"
          style={{ animation: `fadeIn 0.3s ${0.3 + idx * 0.04}s both` }}
        >
          Unlocked
        </span>
      )}
    </div>
  );
}

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
    let id: number;

    const timer = setTimeout(() => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let t = 0;
      let frame = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const draw = () => {
        frame++;
        if (frame % 2 !== 0) {
          id = requestAnimationFrame(draw);
          return;
        }
        t += 0.002;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;

        for (let i = 0; i < 2; i++) {
          const x = w * (0.2 + i * 0.5) + Math.sin(t * 0.3 + i * 2) * 40;
          const y = h * (0.25 + i * 0.35) + Math.cos(t * 0.25 + i * 1.5) * 30;
          const r = 180 + Math.sin(t * 0.15 + i) * 25;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, `rgba(99, 102, 241, ${0.06 - i * 0.01})`);
          grad.addColorStop(0.5, `rgba(139, 92, 246, ${0.03 - i * 0.005})`);
          grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }

        for (let i = 0; i < 2; i++) {
          const fx = (t * 25 + i * 120) % w;
          const fy = 30 + Math.sin(t + i * 2) * 10;
          ctx.beginPath();
          ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${0.04 + Math.sin(t + i) * 0.015})`;
          ctx.fill();
        }

        id = requestAnimationFrame(draw);
      };
      draw();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (id) cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Card */}
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-2 via-deep-2 to-deep-3 border border-border-1 min-h-[200px] group"
          style={{ animation: 'fadeSlideUp 0.7s 0s ease-out both' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          <GrainOverlay opacity={0.025} />

          <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent/30 to-purple-500/20 border border-accent/20 flex items-center justify-center flex-shrink-0"
              style={{ animation: 'scaleIn 0.5s 0.1s ease-out both' }}
            >
              <span className="text-3xl md:text-4xl font-bold text-accent-light">{initials}</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-soft-white leading-[1.05] tracking-tight"
                style={{
                  animation: 'fadeSlideUp 0.5s 0.15s ease-out both',
                  WebkitTextStroke: '1.5px rgba(129, 140, 248, 0.15)',
                  textShadow:
                    '0 0 60px rgba(99, 102, 241, 0.1), 0 0 120px rgba(99, 102, 241, 0.05)',
                }}
              >
                <span className="bg-gradient-to-r from-accent-light via-accent-lighter to-purple-300 bg-clip-text text-transparent">
                  <TypewriterText text={name} delay={0.2} />
                </span>
              </h1>

              <p
                className="text-base text-muted mt-1 tracking-wide"
                style={{ animation: 'fadeIn 0.4s 0.25s ease-out both' }}
              >
                {user?.email || 'learner@example.com'}
              </p>

              <div
                className="flex items-center justify-center md:justify-start gap-4 mt-3"
                style={{ animation: 'fadeSlideUp 0.4s 0.3s ease-out both' }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ animation: 'pulse 2s ease-in-out infinite' }}
                  />
                  <span className="text-xs font-semibold text-emerald-400/90 uppercase tracking-[0.2em] text-glow-emerald">
                    Active
                  </span>
                </div>
                <span className="text-xs text-subtle font-medium tracking-wide">
                  Member since {joinDate}
                </span>
              </div>
            </div>

            <button
              className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-all"
              style={{ animation: 'fadeIn 0.4s 0.35s ease-out both' }}
            >
              Edit Profile
            </button>
          </div>

          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              animation: 'fadeIn 1s 0s ease-out both',
              boxShadow:
                'inset 0 0 0 1px rgba(99, 102, 241, 0.15), 0 0 40px rgba(99, 102, 241, 0.05)',
            }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden group cursor-default hover:scale-104 hover:-translate-y-1 transition-all duration-200"
                style={{
                  animation: `fadeSlideUp 0.4s ${0.1 + idx * 0.04}s ease-out both`,
                }}
              >
                <GrainOverlay opacity={0.03} />
                <div
                  className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6`}
                >
                  <StatIcon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <AnimatedCounter
                  to={stat.value}
                  prefix={stat.prefix || ''}
                  className={`text-2xl md:text-3xl font-black ${stat.color} text-glow-accent`}
                  duration={1.2}
                  delay={0.1 + idx * 0.06}
                />
                <div className="text-xs font-semibold text-subtle uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills & Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skills */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s 0.2s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-glow-accent">
              <IconZap className="w-4 h-4" />
              Skills & Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/15 text-xs font-bold text-accent-light uppercase tracking-wide cursor-default text-glow-accent hover:scale-108 hover:-translate-y-0.5 transition-all duration-200"
                  style={{ animation: `scaleInItem 0.3s ${0.25 + idx * 0.03}s ease-out both` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden group"
            style={{ animation: 'fadeSlideUp 0.5s 0.25s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <ChartSparkles />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <IconActivity className="w-4 h-4" />
              Weekly Activity
            </h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((d, idx) => {
                const h = (d.hours / maxHours) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                  >
                    <span
                      className="text-[10px] font-black text-accent-light text-glow-accent"
                      style={{ animation: `fadeIn 0.3s ${0.3 + idx * 0.05}s ease-out both` }}
                    >
                      {d.hours}h
                    </span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-light relative cursor-pointer hover:scale-108 transition-all duration-200"
                      style={{
                        minHeight: 4,
                        height: `${h}%`,
                        animation: `fadeSlideUp 0.8s ${0.3 + idx * 0.05}s ease-out both`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="text-[10px] font-bold text-subtle uppercase tracking-wider">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className="mt-4 pt-3 border-t border-border-1 grid grid-cols-3 gap-2"
              style={{ animation: 'fadeIn 0.4s 0.5s ease-out both' }}
            >
              {[
                {
                  label: 'Total',
                  value: '22.8h',
                  color: 'text-accent-light',
                  glow: 'text-glow-accent',
                },
                { label: 'Avg', value: '3.3h', color: 'text-purple-400', glow: 'text-glow-accent' },
                {
                  label: 'Peak',
                  value: '5.5h',
                  color: 'text-emerald-400',
                  glow: 'text-glow-emerald',
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className={`text-xl font-black ${stat.color} ${stat.glow}`}>
                    {stat.value}
                  </span>
                  <div className="text-[9px] font-bold text-subtle uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Distribution & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Learning Distribution */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s 0.3s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <IconBarChart className="w-4 h-4" />
              Learning Distribution
            </h3>
            <div className="flex items-center justify-center mb-6">
              <RadialChart size={180} />
            </div>
            <div className="space-y-3">
              {categoryData.map((cat, idx) => (
                <div
                  key={cat.label}
                  style={{ animation: `slideInLeft 0.4s ${0.3 + idx * 0.1}s ease-out both` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cat.bg}`} />
                      <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-black text-soft-white">{cat.value}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.bg} relative`}
                      style={{ animation: `progressGrow 1s ${0.3 + idx * 0.1}s ease-out both` }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s 0.35s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <IconTarget className="w-4 h-4" />
              Learning Goals
            </h3>
            <div className="space-y-5">
              {learningGoals.map((goal, idx) => {
                const GoalIcon = goal.icon;
                return (
                  <div
                    key={goal.label}
                    className="group/goal hover:translate-x-0.5 transition-transform duration-200"
                    style={{ animation: `fadeSlideUp 0.4s ${0.3 + idx * 0.1}s ease-out both` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border-1 flex items-center justify-center transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
                          <GoalIcon className={`w-4 h-4 ${goal.color}`} />
                        </div>
                        <span className="text-xs font-bold text-soft-white uppercase tracking-wide">
                          {goal.label}
                        </span>
                      </div>
                      <span className="text-sm font-black text-accent-light text-glow-accent">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                          width: `${goal.progress}%`,
                          background:
                            'linear-gradient(90deg, rgba(99,102,241,0.6), rgba(129,140,248,1))',
                          animation: `progressGrow 1.2s ${0.3 + idx * 0.1}s ease-out both`,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{ animation: 'shimmer 2s ease-in-out infinite' }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
          style={{ animation: 'fadeSlideUp 0.5s 0.4s ease-out both' }}
        >
          <GrainOverlay opacity={0.03} />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-amber">
            <IconAward className="w-4 h-4" />
            Achievements
            <span className="ml-auto text-[9px] font-black text-accent-light uppercase tracking-widest bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20 text-glow-accent">
              {achievements.filter((a) => a.progress >= 100).length}/{achievements.length}
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {achievements.map((ach, idx) => (
              <AchievementCard key={ach.name} ach={ach} idx={idx} />
            ))}
          </div>
        </div>

        {/* Recent Activity & Learning Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s 0.45s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-glow-accent">
              <IconClock className="w-4 h-4" />
              Recent Activity
            </h3>
            <div className="space-y-1">
              {recentActivity.map((act, idx) => {
                const ActIcon = act.icon;
                return (
                  <div
                    key={act.action}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-2/50 hover:translate-x-1 transition-all duration-200 cursor-default"
                    style={{ animation: `slideInLeft 0.3s ${0.3 + idx * 0.05}s ease-out both` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 hover:scale-115 hover:rotate-6">
                      <ActIcon className="w-4 h-4 text-accent-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-soft-white truncate">{act.action}</p>
                      <p className="text-[10px] font-semibold text-subtle mt-0.5 tracking-wide">
                        {act.course} &middot; {act.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Journey Timeline */}
          <div
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s 0.5s ease-out both' }}
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <IconRocket className="w-4 h-4" />
              Learning Journey
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[9px] top-1 w-0.5 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
                style={{ animation: 'verticalGrow 0.8s 0.3s ease-out both' }}
              />
              <div className="space-y-6">
                {milestones.map((m, idx) => {
                  const MIcon = m.icon;
                  return (
                    <div
                      key={m.title}
                      className="flex items-start gap-4 relative"
                      style={{ animation: `slideInLeft 0.4s ${0.3 + idx * 0.12}s ease-out both` }}
                    >
                      <div
                        className="relative z-10 w-5 h-5 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center flex-shrink-0"
                        style={{ animation: `scaleIn 0.4s ${0.3 + idx * 0.1}s ease-out both` }}
                      >
                        <div
                          className="w-2 h-2 rounded-full bg-accent-light"
                          style={{ animation: 'pulse 2s ease-in-out infinite' }}
                        />
                      </div>
                      <div className="flex-1 bg-surface-2/50 rounded-lg p-3 border border-border-1 hover:bg-surface-2/80 hover:scale-102 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-0.5">
                          <MIcon className="w-3.5 h-3.5 text-accent-light" />
                          <span className="text-xs font-bold text-soft-white tracking-tight">
                            {m.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold text-accent/60 font-mono tracking-wider">
                            {m.year}
                          </span>
                          <span className="text-[9px] font-medium text-subtle tracking-wide">
                            {m.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
