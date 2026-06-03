import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingParticles from '@/components/FloatingParticles';
import AuthGuard from '@/components/AuthGuard';
import CommandPalette from '@/components/CommandPalette';
import PageTransition from '@/components/PageTransition';
import { ToastProvider } from '@/components/Toast';
import { GrainFilterDefs } from '@/components/GrainOverlay';

const bricolage = Bricolage_Grotesque({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" className={`${bricolage.variable} ${geistMono.variable}`}>
      <body className="h-screen flex flex-col bg-deep-0 text-soft-white overflow-hidden selection:bg-accent/30">
        <AuthGuard>
          <ToastProvider>
            <GrainFilterDefs />
            <AmbientBackground />
            <FloatingParticles />
            <CommandPalette />
            <div className="flex flex-1 overflow-hidden relative z-10">
              <Sidebar />
              <main className="flex-1 overflow-y-auto overflow-x-hidden smooth-scroll">
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
