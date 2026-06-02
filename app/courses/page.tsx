import { Suspense } from 'react';
import { fetchCourses } from '@/lib/supabase.server';
import CoursesClient from './CoursesClient';
import { CourseListSkeleton } from '@/components/Loading';

export default async function CoursesPage() {
  let courses;
  try {
    courses = await fetchCourses();
  } catch {
    courses = [
      { id: '1', title: 'TypeScript Mastery', icon_name: 'Code', progress: 75 },
      { id: '2', title: 'System Design & Architecture', icon_name: 'Brain', progress: 52 },
      { id: '3', title: 'Cloud Architecture with AWS', icon_name: 'Cloud', progress: 88 },
      { id: '4', title: 'Web Design Mastery', icon_name: 'Palette', progress: 45 },
    ];
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<CourseListSkeleton />}>
          <CoursesClient initialCourses={courses} />
        </Suspense>
      </div>
    </div>
  );
}
