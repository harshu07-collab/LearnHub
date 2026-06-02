'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';
import GrainOverlay from './GrainOverlay';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyData = [5, 8, 3, 9, 6, 7, 4];
const maxVal = Math.max(...weeklyData);
const total = weeklyData.reduce((a, b) => a + b, 0);
const avg = Math.round(total / weeklyData.length);

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: 0.1 },
  },
};

export default function ActivityTile() {
  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      className="relative h-full rounded-xl bg-gradient-to-br from-surface-1 via-surface-2 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden group"
    >
      {/* Grain texture */}
      <GrainOverlay opacity={0.03} />

      {/* Background mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/3 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/3 w-72 h-72 bg-blue-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-accent-light" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-soft-white">Weekly Activity</h3>
              <p className="text-[10px] text-subtle">Your learning streak</p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/15"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-400">+{avg}</span>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end justify-between gap-1.5 h-28 md:h-32">
            {weeklyData.map((value, idx) => {
              const heightPct = (value / maxVal) * 100;
              return (
                <motion.div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 group/bar"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.06, duration: 0.3 }}
                    className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
                  >
                    <span className="text-[10px] font-medium text-accent-light">{value}</span>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${heightPct}%`, opacity: 1 }}
                    transition={{
                      delay: 0.2 + idx * 0.06,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                    whileHover={{ scale: 1.08, transformOrigin: 'bottom' }}
                    className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-light relative cursor-pointer"
                    style={{ minHeight: 4 }}
                  >
                    <motion.div className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-white/15 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Day labels */}
          <div className="flex justify-between gap-1.5 mt-2.5">
            {days.map((day, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.06, duration: 0.3 }}
                className="text-[10px] text-subtle text-center flex-1 font-medium"
              >
                {day}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 pt-4 border-t border-border-1 grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Total', value: total, color: 'text-accent-light' },
            { label: 'Average', value: avg, color: 'text-purple-400' },
            { label: 'Peak', value: maxVal, color: 'text-emerald-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-subtle mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.06)',
        }}
      />
    </motion.article>
  );
}
