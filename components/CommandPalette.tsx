'use client';

import { useEffect, useState, useRef, useCallback, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Command } from 'lucide-react';
import { getIcon } from '@/lib/icon-utils';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  href: string;
  category: string;
}

const commands: CommandItem[] = [
  { id: 'go-dash', label: 'Go to Dashboard', icon: 'Home', href: '/', category: 'Navigate' },
  {
    id: 'go-courses',
    label: 'Go to Courses',
    icon: 'BookOpen',
    href: '/courses',
    category: 'Navigate',
  },
  {
    id: 'go-analytics',
    label: 'Go to Analytics',
    icon: 'BarChart3',
    href: '/analytics',
    category: 'Navigate',
  },
  {
    id: 'go-settings',
    label: 'Go to Settings',
    icon: 'Settings',
    href: '/settings',
    category: 'Navigate',
  },
];

const courseShortcuts = [
  {
    id: 'course-1',
    label: 'Advanced React Patterns',
    icon: 'Code',
    href: '/courses',
    category: 'Courses',
  },
  {
    id: 'course-2',
    label: 'AI & Machine Learning',
    icon: 'Brain',
    href: '/courses',
    category: 'Courses',
  },
  {
    id: 'course-3',
    label: 'Cloud Architecture with AWS',
    icon: 'Cloud',
    href: '/courses',
    category: 'Courses',
  },
  {
    id: 'course-4',
    label: 'Web Design Mastery',
    icon: 'Palette',
    href: '/courses',
    category: 'Courses',
  },
];

const fallbackIcon: Record<string, string> = {
  Home: 'Home',
  BookOpen: 'BookOpen',
  BarChart3: 'BarChart3',
  Settings: 'Settings',
  Code: 'Code',
  Brain: 'Brain',
  Cloud: 'Cloud',
  Palette: 'Palette',
  Search: 'Search',
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allItems = [...commands, ...courseShortcuts];

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((p) => {
          const next = !p;
          if (next) {
            setQuery('');
            setSelectedIdx(0);
            setTimeout(() => inputRef.current?.focus(), 50);
          }
          return next;
        });
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const execute = useCallback(
    (item: CommandItem) => {
      setOpen(false);
      router.push(item.href);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((p) => Math.min(p + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((p) => Math.max(p - 1, 0));
    }
    if (e.key === 'Enter' && filtered[selectedIdx]) {
      execute(filtered[selectedIdx]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-deep-1 border border-border-1 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 h-12 border-b border-border-1">
              <Search className="w-4 h-4 text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIdx(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search pages and courses..."
                className="flex-1 bg-transparent text-sm text-soft-white placeholder:text-muted focus:outline-none"
              />
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-2 text-muted border border-border-1">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-8">
                  <Search className="w-8 h-8 text-surface-3 mb-2" />
                  <p className="text-xs text-muted">No results for &quot;{query}&quot;</p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIdx;
                  const iconKey = item.icon || 'Search';
                  const iconName = fallbackIcon[iconKey] || 'BookOpen';

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.015 }}
                      onClick={() => execute(item)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-accent/10 text-soft-white'
                          : 'text-muted hover:text-soft-white hover:bg-surface-2'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-accent/15' : 'bg-surface-2'
                        }`}
                      >
                        {createElement(getIcon(iconName), { className: 'w-3.5 h-3.5' })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.label}</div>
                        <div className="text-[10px] text-subtle">{item.category}</div>
                      </div>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-opacity ${
                          isSelected ? 'opacity-100 text-accent-light' : 'opacity-0'
                        }`}
                      />
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-4 h-9 border-t border-border-1">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1 py-0.5 rounded text-[9px] font-medium bg-surface-2 text-muted border border-border-1">
                  ↑
                </kbd>
                <kbd className="px-1 py-0.5 rounded text-[9px] font-medium bg-surface-2 text-muted border border-border-1">
                  ↓
                </kbd>
                <span className="text-[10px] text-subtle">navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-surface-2 text-muted border border-border-1">
                  ↵
                </kbd>
                <span className="text-[10px] text-subtle">open</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-surface-2 text-muted border border-border-1">
                  esc
                </kbd>
                <span className="text-[10px] text-subtle">close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
