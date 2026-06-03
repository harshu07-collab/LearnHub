'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  IconBookOpen,
  IconFlame,
  IconTrendingUp,
  IconClock,
  IconTrophy,
  IconTarget,
  IconAward,
  IconZap,
  IconBrain,
  IconCode,
  IconCloud,
  IconPalette,
  IconStar,
  IconBarChart,
} from '@/components/CustomIcons';
import GrainOverlay from '@/components/GrainOverlay';
import AnimatedCounter from '@/components/AnimatedCounter';

const statCards = [
  {
    label: 'Total Courses',
    value: 4,
    icon: IconBookOpen,
    color: 'text-accent-light',
    bg: 'bg-accent/10',
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
  {
    label: 'Avg Progress',
    value: 65,
    icon: IconTrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    suffix: '%',
  },
  {
    label: 'Hours Learned',
    value: 28,
    icon: IconClock,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    suffix: '',
  },
  {
    label: 'Achievements',
    value: 5,
    icon: IconTrophy,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    suffix: '',
  },
  {
    label: 'Focus Score',
    value: 82,
    icon: IconTarget,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    suffix: '',
  },
];

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
    name: 'Cloud Champ',
    desc: 'Deploy first app',
    icon: IconCloud,
    progress: 88,
    color: 'text-sky-400',
  },
  {
    name: 'Design Guru',
    desc: 'Master UI principles',
    icon: IconPalette,
    progress: 45,
    color: 'text-pink-400',
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

function StatCard({ stat, idx }: { stat: (typeof statCards)[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({
      x: (y - rect.height / 2) / 20,
      y: (rect.width / 2 - x) / 20,
    });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * idx, duration: 0.4 }}
      className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-4 overflow-hidden group cursor-default"
      style={{
        transform: `perspective(600px) rotateX(${rotate.x}px) rotateY(${rotate.y}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <GrainOverlay opacity={0.03} />
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.08) 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className={`w-8 h-8 rounded-lg ${stat.bg} border border-border-1 flex items-center justify-center mb-2.5`}
        >
          <Icon className={`w-4 h-4 ${stat.color}`} />
        </motion.div>
        <AnimatedCounter
          to={stat.value}
          suffix={stat.suffix}
          className="text-2xl font-bold text-soft-white"
          duration={1.2}
        />
        <div className="text-base text-subtle mt-0.5">{stat.label}</div>
      </div>
    </motion.div>
  );
}

function ChartSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Floating sparkles
      for (let i = 0; i < 4; i++) {
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
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function RadialChart({ size = 160 }: { size?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
          <motion.path
            key={cat.label}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill="none"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            style={{ fill: `var(--color-${cat.bg.replace('bg-', '')})` }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.6} fill="var(--color-surface-1)" />
      <motion.text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        className="text-soft-white text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        100%
      </motion.text>
      <motion.text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="text-muted text-[9px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Total
      </motion.text>
    </svg>
  );
}

function AchievementCard({ ach, idx }: { ach: (typeof achievements)[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const unlocked = ach.progress >= 100;
  const Icon = ach.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35 + idx * 0.04, duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -2 }}
      className={`relative rounded-xl p-4 border text-center transition-all duration-300 cursor-default ${
        unlocked
          ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20'
          : 'bg-surface-2 border-border-1 opacity-50'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {unlocked && hovered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.12), inset 0 0 40px rgba(251, 191, 36, 0.04)',
          }}
        />
      )}
      <motion.div
        animate={
          unlocked && hovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className={`w-10 h-10 rounded-xl mx-auto mb-2.5 flex items-center justify-center ${unlocked ? 'bg-amber-500/10' : 'bg-surface-3'}`}
      >
        <Icon className={`w-5 h-5 ${unlocked ? ach.color : 'text-muted'}`} />
      </motion.div>
      <h4 className={`text-base font-semibold ${unlocked ? 'text-soft-white' : 'text-muted'}`}>
        {ach.name}
      </h4>
      <p className="text-[9px] text-subtle mt-0.5">{ach.desc}</p>
      {!unlocked && (
        <div className="mt-2 h-1 bg-surface-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ach.progress}%` }}
            transition={{ delay: 0.3 + idx * 0.04, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full rounded-full bg-accent/50"
          />
        </div>
      )}
      {unlocked && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: hovered ? 1.1 : 1 }}
          className="text-[9px] text-amber-400 font-medium mt-1.5 block"
        >
          Unlocked
        </motion.span>
      )}
    </motion.div>
  );
}

export default function AnalyticsClient() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
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
              <IconBarChart className="w-5 h-5 text-accent-light" />
            </motion.div>
            <div>
              <h1
                className="text-3xl md:text-4xl font-black text-soft-white leading-[1.05] tracking-tight text-glow-accent"
                style={{ WebkitTextStroke: '1.5px rgba(129, 140, 248, 0.15)' }}
              >
                <span className="bg-gradient-to-r from-accent-light via-accent-lighter to-purple-300 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-base text-muted mt-1">Your learning journey at a glance</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statCards.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden group"
          >
            <GrainOverlay opacity={0.03} />
            <ChartSparkles />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconClock className="w-4 h-4" />
              </motion.div>
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
                      className="text-base text-accent-light font-medium"
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
                      className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-light relative cursor-pointer"
                      style={{ minHeight: 4 }}
                      whileHover={{ scale: 1.08, transformOrigin: 'bottom' }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-white/15 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>
                    <span className="text-base text-subtle font-medium">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
          >
            <GrainOverlay opacity={0.03} />
            <h3 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-accent">
              <IconTarget className="w-4 h-4" />
              Learning Distribution
            </h3>
            <div className="flex items-center justify-center mb-6">
              <RadialChart size={180} />
            </div>
            <div className="space-y-3">
              {categoryData.map((cat, idx) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className={`w-2 h-2 rounded-full ${cat.bg}`}
                      />
                      <span className="text-base text-muted">{cat.label}</span>
                    </div>
                    <span className="text-base font-semibold text-soft-white">{cat.value}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{
                        delay: 0.3 + idx * 0.1,
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={`h-full rounded-full ${cat.bg} relative`}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden"
        >
          <GrainOverlay opacity={0.03} />
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-glow-amber">
            <IconAward className="w-4 h-4" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((ach, idx) => (
              <AchievementCard key={ach.name} ach={ach} idx={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
