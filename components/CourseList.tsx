'use client';

import CourseCard from './CourseCard';
import type { Course } from '@/types';

interface CourseListProps {
  courses: Course[];
  isOffline?: boolean;
}

export default function CourseList({ courses, isOffline }: CourseListProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-surface-1 border border-border-1">
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="mb-3 opacity-40">
          <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="url(#empty-grad)" />
          <path d="M10 16L14 12L18 16L14 20L10 16Z" fill="rgba(255,255,255,0.6)" />
          <path d="M14 12L18 8L22 12L18 16L14 12Z" fill="rgba(255,255,255,0.3)" />
          <defs>
            <linearGradient id="empty-grad" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <p className="text-base text-muted text-center">No courses available yet.</p>
        <p className="text-base text-subtle mt-1 text-center">
          Start learning to see your progress here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isOffline && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
            <path
              d="M8 1L15 14H1L8 1Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
          </svg>
          <span>Showing offline data — database connection unavailable.</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {courses.map((course, idx) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            icon_name={course.icon_name}
            progress={course.progress}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
