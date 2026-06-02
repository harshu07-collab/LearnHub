import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingParticles from '@/components/FloatingParticles';
import AuthGuard from '@/components/AuthGuard';
import CommandPalette from '@/components/CommandPalette';
import PageTransition from '@/components/PageTransition';
import { ToastProvider } from '@/components/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LearnHub — Next-Gen Learning Dashboard',
  description:
    'A futuristic, premium learning dashboard with dark mode, smooth animations, and server-rendered data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="h-screen flex flex-col bg-deep-0 text-soft-white overflow-hidden selection:bg-accent/30">
        <AuthGuard>
          <ToastProvider>
            <AmbientBackground />
            <FloatingParticles />
            <CommandPalette />
            <div className="flex flex-1 overflow-hidden relative z-10">
              <Sidebar />
              <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <PageTransition>{children}</PageTransition>
              </main>
            </div>
            <MobileNav />
          </ToastProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
