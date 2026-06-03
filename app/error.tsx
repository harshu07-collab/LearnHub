'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>

        <h2 className="text-xl font-black text-soft-white mb-2 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-base text-muted mb-6 leading-relaxed">
          {error.message || 'Could not load dashboard data. Please try again.'}
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-dark text-white text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
