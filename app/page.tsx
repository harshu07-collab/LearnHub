import React, { Suspense } from 'react';
import BentoGrid, { GridItem } from '@/components/BentoGrid';
import HeroTile from '@/components/HeroTile';
import CourseListServer from '@/components/CourseListServer';
import ActivityTile from '@/components/ActivityTile';
import AchievementsTile from '@/components/AchievementsTile';
import { CourseListSkeleton, ActivityTileSkeleton } from '@/components/Loading';

export default async function Home() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto">
        <BentoGrid>
          <GridItem cols={4}>
            <HeroTile />
          </GridItem>
          <GridItem cols={2}>
            <section className="h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xs font-bold text-accent-light uppercase tracking-[0.2em] text-glow-accent">
                  Active Courses
                </h2>
                <span className="text-sm text-subtle">8 enrolled</span>
              </div>
              <Suspense fallback={<CourseListSkeleton />}>
                <CourseListServer />
              </Suspense>
            </section>
          </GridItem>
          <GridItem cols={2}>
            <Suspense fallback={<ActivityTileSkeleton />}>
              <ActivityTile />
            </Suspense>
          </GridItem>
          <GridItem cols={4}>
            <AchievementsTile />
          </GridItem>
        </BentoGrid>
      </div>
    </div>
  );
}
