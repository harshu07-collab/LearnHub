import React from 'react';
import { fetchCourses } from '@/lib/supabase.server';
import CourseList from './CourseList';
import type { Course } from '@/types';

const fallbackCourses: Course[] = [
  { id: '1', title: 'TypeScript Mastery', icon_name: 'Code', progress: 75 },
  { id: '2', title: 'System Design & Architecture', icon_name: 'Brain', progress: 52 },
  { id: '3', title: 'Cloud Architecture with AWS', icon_name: 'Cloud', progress: 88 },
  { id: '4', title: 'Web Design Mastery', icon_name: 'Palette', progress: 45 },
  { id: '5', title: 'Python for Data Science', icon_name: 'Code', progress: 35 },
  { id: '6', title: 'Cybersecurity Fundamentals', icon_name: 'Shield', progress: 22 },
  { id: '7', title: 'Mobile App Development', icon_name: 'Smartphone', progress: 18 },
  { id: '8', title: 'DevOps & CI/CD Pipelines', icon_name: 'Cloud', progress: 15 },
];

async function getCourses(): Promise<{ courses: Course[]; isOffline: boolean }> {
  try {
    const courses = await fetchCourses();
    return { courses, isOffline: false };
  } catch (e) {
    console.error('Failed to fetch courses from Supabase, using fallback:', e);
    return { courses: fallbackCourses, isOffline: true };
  }
}

export default async function CourseListServer() {
  const { courses, isOffline } = await getCourses();
  return <CourseList courses={courses} isOffline={isOffline} />;
}
