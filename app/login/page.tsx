'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Eye, EyeOff, Mail, Lock, Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const { user, signIn, signUp } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const redirecting = useRef(false);

  useEffect(() => {
    if (user && !redirecting.current) {
      redirecting.current = true;
      router.replace('/');
    }
  }, [user, router]);

  if (user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
    } else {
      const { error: err } = await signUp(email, password);
      if (err) setError(err);
      else {
        setRegistered(true);
        setMode('login');
      }
    }

    setLoading(false);
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-deep-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-soft-white mb-2">Check your email</h2>
          <p className="text-base text-muted mb-6 leading-relaxed">
            We sent a verification link to <strong className="text-soft-white">{email}</strong>.
            Click the link to activate your account.
          </p>
          <p className="text-base text-subtle">
            Didn&apos;t receive it? Check your spam folder or try signing up again.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-0 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo header */}
        <div className="flex justify-center mb-8">
          <Logo size={40} showText={true} />
        </div>

        <div className="bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 rounded-2xl p-6 md:p-8">
          {/* Tabs */}
          <div className="flex bg-surface-2 rounded-lg p-1 mb-6">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError('');
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  mode === m
                    ? 'bg-deep-1 text-soft-white shadow-sm'
                    : 'text-muted hover:text-soft-white'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-surface-2 border border-border-1 rounded-lg pl-9 pr-3 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-surface-2 border border-border-1 rounded-lg pl-9 pr-10 py-2.5 text-sm text-soft-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-soft-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/5 border border-red-500/15"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-base text-red-300">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          {mode === 'login' && (
            <p className="text-base text-subtle text-center mt-4">
              Demo: use any email (no verification needed in development)
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
