'use client';

import { AuthProvider, useAuth } from './AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login' || pathname.startsWith('/auth/');

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace('/login');
    }
    if (!loading && user && isLoginPage) {
      router.replace('/');
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="h-screen bg-deep-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <Logo size={44} showText={false} />
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthCheck>{children}</AuthCheck>
    </AuthProvider>
  );
}
