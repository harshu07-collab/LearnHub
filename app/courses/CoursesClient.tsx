'use client';

import { useState, useMemo, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3X3, List, ArrowRight, Bookmark, Clock, TrendingUp } from 'lucide-react';
import { getIcon } from '@/lib/icon-utils';
import GrainOverlay from '@/components/GrainOverlay';
import type { Course } from '@/types';

const categories = ['All', 'Frontend', 'AI/ML', 'Cloud', 'Design'];

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return initialCourses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const catKeywords: Record<string, string[]> = {
        Frontend: [
          'typescript',
          'react',
          'web',
          'css',
          'javascript',
          'html',
          'ui',
          'ux',
          'frontend',
          'mobile',
        ],
        'AI/ML': [
          'ai',
          'machine',
          'data science',
          'python',
          'neural',
          'brain',
          'intelligence',
          'system design',
        ],
        Cloud: [
          'cloud',
          'aws',
          'azure',
          'devops',
          'ci/cd',
          'ci',
          'cd',
          'deployment',
          'infrastructure',
          'security',
          'cyber',
        ],
        Design: ['design', 'palette', 'figma', 'ui', 'ux', 'graphic'],
      };
      if (category === 'All') return matchSearch;
      const keywords = catKeywords[category] || [];
      const matchCat = keywords.some((kw) => c.title.toLowerCase().includes(kw));
      return matchSearch && matchCat;
    });
  }, [initialCourses, search, category]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl md:text-4xl font-black text-soft-white leading-[1.05] tracking-tight text-glow-accent"
            style={{ WebkitTextStroke: '1.5px rgba(129, 140, 248, 0.15)' }}
          >
            <span className="bg-gradient-to-r from-accent-light via-accent-lighter to-purple-300 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="text-base text-muted mt-1">Explore your learning path</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg border transition-all ${
              view === 'grid'
                ? 'bg-accent/10 border-accent/20 text-accent-light'
                : 'border-border-1 text-muted hover:text-soft-white'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg border transition-all ${
              view === 'list'
                ? 'bg-accent/10 border-accent/20 text-accent-light'
                : 'border-border-1 text-muted hover:text-soft-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full bg-surface-2 border border-border-1 rounded-lg pl-9 pr-3 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                category === cat
                  ? 'bg-accent/10 border-accent/20 text-accent-light'
                  : 'border-border-1 text-muted hover:text-soft-white hover:border-border-2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Course count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-base text-subtle"
      >
        {filtered.length} course{filtered.length !== 1 && 's'} found
      </motion.p>

      {/* Course Grid / List */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-border-1 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted" />
            </div>
            <p className="text-base text-muted">No courses match your search</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="text-base text-accent-light mt-2 hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : view === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative group rounded-xl bg-gradient-to-br from-surface-1 via-surface-2 to-deep-3 border border-border-1 p-5 overflow-hidden cursor-pointer"
              >
                <GrainOverlay opacity={0.035} />
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute -top-1/3 -right-1/3 w-full h-full bg-gradient-to-bl from-accent/[0.06] to-transparent rounded-full blur-3xl transition-all duration-500 group-hover:blur-2xl group-hover:from-accent/[0.12]" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/15 flex items-center justify-center flex-shrink-0 border border-accent/10">
                      {createElement(getIcon(course.icon_name), {
                        className: 'w-5 h-5 text-accent-light',
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-soft-white leading-snug">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base text-subtle uppercase tracking-wider">
                          Progress
                        </span>
                        <span className="text-base font-semibold text-accent-light">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-surface-3 text-muted hover:text-accent-light transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{
                        delay: 0.1 + idx * 0.05,
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-purple-400 relative"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-2 rounded-lg bg-accent/10 border border-accent/15 text-accent-light text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-accent/20 transition-all"
                  >
                    Continue Learning
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{ opacity: hoveredId === course.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    boxShadow:
                      'inset 0 0 0 1px rgba(99,102,241,0.25), 0 0 25px rgba(99,102,241,0.08)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * idx, duration: 0.3 }}
                whileHover={{ scale: 1.005, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-surface-1 to-surface-2 border border-border-1 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0">
                  {createElement(getIcon(course.icon_name), {
                    className: 'w-[18px] h-[18px] text-accent-light',
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-soft-white truncate">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted" />
                      <span className="text-base text-subtle">12h left</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-base text-emerald-400">{course.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="w-24">
                  <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-1000"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent-light transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
