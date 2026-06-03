'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  IconSettings,
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
  { id: 'profile', label: 'Profile', icon: IconUser, href: '/profile' },
  { id: 'settings', label: 'Settings', icon: IconSettings, href: '/settings' },
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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    if (mobileOpen) setTimeout(() => setMobileOpen(false), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const resolvedCollapsed = collapsed || isTablet;
  const activeItem = '/' + pathname.split('/')[1];

  const handleNav = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <>
      <CursorGlow />

      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl bg-deep-2/80 backdrop-blur-md border border-border-1 flex items-center justify-center text-soft-white hover:bg-surface-2 transition-all duration-200"
        aria-label="Open navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <nav
        className={`hidden md:flex flex-col h-full bg-deep-1 border-r border-border-1 relative ${
          resolvedCollapsed ? 'w-16' : 'w-56'
        }`}
        style={{
          transition: 'width 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          willChange: 'width',
          contain: 'layout style',
        }}
      >
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
              className={`text-sm text-muted truncate transition-all duration-200 ${
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

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              key="mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-deep-1 border-r border-border-1 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-border-1 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <Logo size={26} showText={false} />
                  <span className="text-sm font-semibold text-soft-white">LearnHub</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-surface-2 flex items-center justify-center text-muted hover:text-soft-white transition-all duration-200"
                  aria-label="Close navigation"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-1 p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.href;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.href)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-surface-2 text-soft-white'
                          : 'text-muted hover:text-soft-white hover:bg-surface-1'
                      }`}
                    >
                      <Icon
                        className={`w-[18px] h-[18px] flex-shrink-0 ${
                          isActive ? 'text-accent-light' : ''
                        }`}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-border-1 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center flex-shrink-0">
                    <IconUser className="w-[14px] h-[14px] text-accent-light" />
                  </div>
                  <span className="text-sm text-muted truncate">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all duration-200 hover:bg-red-500/5 text-red-400/70 hover:text-red-400"
                >
                  <IconLogOut className="w-[18px] h-[18px] flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
