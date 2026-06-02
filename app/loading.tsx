import { HeroTileSkeleton, CourseListSkeleton, ActivityTileSkeleton } from '@/components/Loading';

export default function Loading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <HeroTileSkeleton />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="h-3 w-28 bg-surface-2 rounded animate-pulse" />
                <div className="h-3 w-16 bg-surface-2 rounded animate-pulse" />
              </div>
              <CourseListSkeleton />
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <ActivityTileSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
