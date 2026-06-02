'use client';

import { useState } from 'react';
import { LayoutDashboard, BookOpen, BarChart3, Settings } from 'lucide-react';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  const [active, setActive] = useState('dashboard');

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-deep-1/90 backdrop-blur-xl border-t border-border-1 z-50">
      <div className="flex items-center justify-around h-full px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
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
      </div>
    </nav>
  );
}
