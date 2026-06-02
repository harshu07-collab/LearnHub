import { Suspense } from 'react';
import AnalyticsClient from './AnalyticsClient';

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto">
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          }
        >
          <AnalyticsClient />
        </Suspense>
      </div>
    </div>
  );
}
