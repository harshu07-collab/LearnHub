'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Eye,
  Shield,
  Palette,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Trash2,
  Save,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import GrainOverlay from '@/components/GrainOverlay';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'accessibility', label: 'Accessibility', icon: Eye },
  { id: 'danger', label: 'Danger Zone', icon: Shield },
];

export default function SettingsClient() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [displayName, setDisplayName] = useState(user?.email?.split('@')[0] || 'User');

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-soft-white">Settings</h1>
        <p className="text-base text-muted mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Side nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="md:w-48 flex-shrink-0"
        >
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-accent/10 text-accent-light border border-accent/15'
                      : 'text-muted hover:text-soft-white hover:bg-surface-2 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sec.label}
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div className="relative rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 overflow-hidden">
            <GrainOverlay opacity={0.025} />

            {activeSection === 'profile' && (
              <div className="relative z-10 space-y-5">
                <h2 className="text-base font-semibold text-soft-white flex items-center gap-2">
                  <User className="w-4 h-4 text-accent-light" />
                  Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-surface-2 border border-border-1 rounded-lg px-3 py-2.5 text-sm text-soft-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-surface-2/50 border border-border-1 rounded-lg px-3 py-2.5 text-sm text-muted cursor-not-allowed"
                    />
                    <p className="text-base text-subtle mt-1">Email cannot be changed</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:brightness-110 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </motion.button>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="relative z-10 space-y-5">
                <h2 className="text-base font-semibold text-soft-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-accent-light" />
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Theme</label>
                    <div className="flex gap-2">
                      {[
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'system', label: 'System', icon: Monitor },
                      ].map((t) => {
                        const Icon = t.icon;
                        const active = t.id === 'dark';
                        return (
                          <button
                            key={t.id}
                            disabled={t.id !== 'dark'}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                              active
                                ? 'bg-accent/10 border-accent/20 text-accent-light'
                                : 'bg-surface-2 border-border-1 text-muted opacity-40 cursor-not-allowed'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-base text-subtle mt-1.5">
                      Dark mode is the only theme available
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="relative z-10 space-y-5">
                <h2 className="text-base font-semibold text-soft-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent-light" />
                  Notifications
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: 'achievements',
                      label: 'Achievement unlocks',
                      desc: 'When you earn a new badge',
                    },
                    {
                      id: 'progress',
                      label: 'Progress reminders',
                      desc: 'Weekly learning summary',
                    },
                    { id: 'courses', label: 'Course updates', desc: 'New content and modules' },
                    { id: 'streak', label: 'Streak alerts', desc: "Don't break your streak" },
                  ].map((n) => (
                    <label
                      key={n.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-2/50 border border-border-1 cursor-pointer hover:bg-surface-2 transition-colors"
                    >
                      <div>
                        <p className="text-base font-medium text-soft-white">{n.label}</p>
                        <p className="text-base text-subtle">{n.desc}</p>
                      </div>
                      <div className="relative w-9 h-5 rounded-full bg-accent/30 border border-accent/20 cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-accent-light shadow-sm" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'accessibility' && (
              <div className="relative z-10 space-y-5">
                <h2 className="text-base font-semibold text-soft-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent-light" />
                  Accessibility
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'animations', label: 'Reduced motion', desc: 'Minimize animations' },
                    { id: 'contrast', label: 'High contrast', desc: 'Increase text contrast' },
                    { id: 'font', label: 'Larger font', desc: 'Increase base font size' },
                  ].map((a) => (
                    <label
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-2/50 border border-border-1 cursor-pointer hover:bg-surface-2 transition-colors"
                    >
                      <div>
                        <p className="text-base font-medium text-soft-white">{a.label}</p>
                        <p className="text-base text-subtle">{a.desc}</p>
                      </div>
                      <div className="w-9 h-5 rounded-full bg-surface-3 border border-border-1 cursor-pointer" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'danger' && (
              <div className="relative z-10 space-y-5">
                <h2 className="text-base font-semibold text-red-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Danger Zone
                </h2>
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-4">
                  <div>
                    <p className="text-base font-medium text-soft-white">
                      Sign out of your account
                    </p>
                    <p className="text-base text-muted mt-0.5">You can sign back in anytime</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </motion.button>
                </div>

                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-4">
                  <div>
                    <p className="text-base font-medium text-soft-white">Delete account</p>
                    <p className="text-base text-muted mt-0.5">Permanently remove all your data</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
