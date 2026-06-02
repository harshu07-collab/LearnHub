'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconBookOpen,
  IconBarChart,
  IconLogOut,
  IconChevronLeft,
  IconChevronRight,
  IconUser,
  IconHome,
  IconAward,
  IconLeaderboard,
} from './CustomIcons';
import CursorGlow from './CursorGlow';
import Logo from './Logo';
import { useAuth } from './AuthProvider';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IconHome, href: '/' },
  { id: 'courses', label: 'Courses', icon: IconBookOpen, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: IconBarChart, href: '/analytics' },
  { id: 'achievements', label: 'Achievements', icon: IconAward, href: '/achievements' },
  { id: 'leaderboard', label: 'Leaderboard', icon: IconLeaderboard, href: '/leaderboard' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 25 },
  },
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 768 && w < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const resolvedCollapsed = collapsed || isTablet;
  const activeItem = '/' + pathname.split('/')[1];

  return (
    <>
      <CursorGlow />
      <nav
        className={`hidden md:flex flex-col h-full bg-deep-1 border-r border-border-1 transition-all duration-300 ease-out relative ${
          resolvedCollapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border-1 flex-shrink-0">
          <Logo size={26} showText={false} />
          <span
            className={`text-sm font-semibold text-soft-white whitespace-nowrap overflow-hidden transition-all duration-300 ${
              resolvedCollapsed ? 'w-0 opacity-0' : 'opacity-100'
            }`}
          >
            LearnHub
          </span>
        </div>

        {/* Nav Items with layoutId */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col gap-1 p-2 relative"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            return (
              <motion.div key={item.id} variants={itemVariants}>
                <button
                  onClick={() => router.push(item.href)}
                  className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-full"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-surface-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <>
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                      {/* Active glow ring */}
                      <motion.span
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          boxShadow:
                            'inset 0 0 0 1px rgba(99, 102, 241, 0.15), 0 0 12px rgba(99, 102, 241, 0.05)',
                        }}
                      />
                    </>
                  )}
                  <span className="relative z-10 flex items-center gap-3 w-full">
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      <Icon
                        className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200 ${
                          isActive ? 'text-accent-light' : 'text-muted'
                        }`}
                      />
                    </motion.span>
                    <span
                      className={`text-sm whitespace-nowrap transition-all duration-200 ${
                        resolvedCollapsed
                          ? 'w-0 opacity-0 overflow-hidden'
                          : isActive
                            ? 'text-soft-white'
                            : 'text-muted'
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* User & Logout */}
        <div className="p-2 border-t border-border-1 space-y-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0">
              <IconUser className="w-[14px] h-[14px] text-accent-light" />
            </div>
            <span
              className={`text-xs text-muted truncate transition-all duration-200 ${
                resolvedCollapsed ? 'w-0 opacity-0 overflow-hidden' : ''
              }`}
            >
              {user?.email?.split('@')[0] || 'User'}
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signOut()}
            className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all duration-200 hover:bg-red-500/5 text-red-400/70 hover:text-red-400"
          >
            <span className="relative z-10 flex items-center gap-3">
              <IconLogOut className="w-[18px] h-[18px] flex-shrink-0" />
              <span
                className={`text-sm whitespace-nowrap transition-all duration-200 ${
                  resolvedCollapsed ? 'w-0 opacity-0 overflow-hidden' : ''
                }`}
              >
                Sign Out
              </span>
            </span>
          </motion.button>
        </div>

        {/* Collapse Toggle */}
        {!isTablet && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-14 w-6 h-6 rounded-full bg-deep-2 border border-border-2 flex items-center justify-center text-muted hover:text-soft-white hover:border-border-3 transition-all duration-200"
          >
            {collapsed ? (
              <IconChevronRight className="w-3 h-3" />
            ) : (
              <IconChevronLeft className="w-3 h-3" />
            )}
          </button>
        )}
      </nav>
    </>
  );
}
