'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import SplashScreen from './SplashScreen';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login' || pathname.startsWith('/auth/');
  const [showSplash, setShowSplash] = useState(true);
  const [splashDone, setSplashDone] = useState(false);

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
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              style={{ animation: `pulse 0.8s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (user && !splashDone && showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          setShowSplash(false);
          setSplashDone(true);
        }}
      />
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
