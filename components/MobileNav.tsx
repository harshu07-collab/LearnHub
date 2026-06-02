'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconBookOpen,
  IconBarChart,
  IconLogOut,
  IconHome,
  IconSettings,
  IconAward,
  IconLeaderboard,
} from './CustomIcons';
import { useAuth } from './AuthProvider';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: IconHome, href: '/' },
  { id: 'courses', label: 'Courses', icon: IconBookOpen, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: IconBarChart, href: '/analytics' },
  { id: 'achievements', label: 'Awards', icon: IconAward, href: '/achievements' },
  { id: 'leaderboard', label: 'Top', icon: IconLeaderboard, href: '/leaderboard' },
  { id: 'settings', label: 'Settings', icon: IconSettings, href: '/settings' },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.04, type: 'spring' as const, stiffness: 200, damping: 20 },
  }),
};

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const activeItem = '/' + pathname.split('/')[1];

  return (
    <motion.nav
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-deep-1/90 backdrop-blur-xl border-t border-border-1 z-50"
    >
      <div className="flex items-center justify-around h-full px-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;
          return (
            <motion.button
              key={item.id}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(item.href)}
              className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-full transition-all duration-200"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-pill"
                  className="absolute -top-px w-8 h-0.5 bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? 'text-accent-light' : 'text-muted'
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-accent-light' : 'text-muted'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}

        <motion.button
          custom={items.length}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1, color: '#f87171' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => signOut()}
          className="flex flex-col items-center justify-center gap-0.5 w-14 h-full"
        >
          <IconLogOut className="w-5 h-5 text-muted" />
          <span className="text-[10px] font-medium text-muted">Sign Out</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
