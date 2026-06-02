import React from 'react';
import { fetchCourses } from '@/lib/supabase.server';
import CourseList from './CourseList';

const fallbackCourses = [
  { id: '1', title: 'TypeScript Mastery', icon_name: 'Code', progress: 75 },
  { id: '2', title: 'System Design & Architecture', icon_name: 'Brain', progress: 52 },
  { id: '3', title: 'Cloud Architecture with AWS', icon_name: 'Cloud', progress: 88 },
  { id: '4', title: 'Web Design Mastery', icon_name: 'Palette', progress: 45 },
];

async function getCourses() {
  try {
    return await fetchCourses();
  } catch (e) {
    console.error('Failed to fetch courses from Supabase, using fallback:', e);
    return fallbackCourses;
  }
}

export default async function CourseListServer() {
  const courses = await getCourses();
  return <CourseList courses={courses} />;
}
