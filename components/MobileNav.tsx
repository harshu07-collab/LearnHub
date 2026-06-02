'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, BarChart3, LogOut, Home, Settings } from 'lucide-react';
import { useAuth } from './AuthProvider';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
  { id: 'courses', label: 'Courses', icon: BookOpen, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const activeItem = '/' + pathname.split('/')[1];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-deep-1/90 backdrop-blur-xl border-t border-border-1 z-50">
      <div className="flex items-center justify-around h-full px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-full transition-all duration-200"
            >
              {isActive && (
                <span className="absolute -top-px w-8 h-0.5 bg-accent rounded-full transition-all duration-300" />
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
            </button>
          );
        })}

        <button
          onClick={() => signOut()}
          className="flex flex-col items-center justify-center gap-0.5 w-14 h-full"
        >
          <LogOut className="w-5 h-5 text-muted" />
          <span className="text-[10px] font-medium text-muted">Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
