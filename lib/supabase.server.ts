import { createClient } from '@supabase/supabase-js';
import type { Course } from '@/types';
const COURSES_TARGET = 8;

// Server-side: use non-public env vars (never exposed to client bundle)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const extraCourses: Course[] = [
  { id: 'extra-1', title: 'Python for Data Science', icon_name: 'Code', progress: 35 },
  { id: 'extra-2', title: 'Cybersecurity Fundamentals', icon_name: 'Shield', progress: 22 },
  { id: 'extra-3', title: 'Mobile App Development', icon_name: 'Smartphone', progress: 18 },
  { id: 'extra-4', title: 'DevOps & CI/CD Pipelines', icon_name: 'Cloud', progress: 15 },
];

const iconDefaults: Record<string, { icon_name: string; progress: number }> = {
  react: { icon_name: 'Code', progress: 75 },
  ai: { icon_name: 'Brain', progress: 52 },
  machine: { icon_name: 'Brain', progress: 52 },
  cloud: { icon_name: 'Cloud', progress: 88 },
  aws: { icon_name: 'Cloud', progress: 88 },
  design: { icon_name: 'Palette', progress: 45 },
  web: { icon_name: 'Palette', progress: 45 },
  css: { icon_name: 'Palette', progress: 45 },
  javascript: { icon_name: 'Code', progress: 68 },
  typescript: { icon_name: 'Code', progress: 70 },
  python: { icon_name: 'Code', progress: 60 },
  database: { icon_name: 'Database', progress: 40 },
  security: { icon_name: 'Shield', progress: 35 },
  network: { icon_name: 'Network', progress: 30 },
  data: { icon_name: 'Brain', progress: 35 },
  mobile: { icon_name: 'Smartphone', progress: 18 },
  devops: { icon_name: 'Cloud', progress: 15 },
  ci: { icon_name: 'Cloud', progress: 15 },
};

const titleRemap: Record<string, string> = {
  'Intro to AI': 'System Design & Architecture',
  'Advanced React': 'TypeScript Mastery',
};

function deriveCourseDefaults(title: string) {
  const lower = title.toLowerCase();
  for (const [keyword, vals] of Object.entries(iconDefaults)) {
    if (lower.includes(keyword)) return vals;
  }
  return { icon_name: 'BookOpen', progress: 50 };
}

export async function fetchCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, icon_name, progress')
    .order('created_at', { ascending: true });
  if (error) throw error;

  // Deduplicate by title and remap old names
  const seen = new Set<string>();
  const courses: Course[] = [];
  for (const row of data || []) {
    const title = titleRemap[row.title] || row.title;
    if (seen.has(title)) continue;
    seen.add(title);
    const derived = deriveCourseDefaults(row.title);
    courses.push({
      id: row.id,
      title,
      icon_name: row.icon_name || derived.icon_name,
      progress: row.progress ?? derived.progress,
    });
  }
  // Pad with extras when Supabase has fewer courses than target
  for (const extra of extraCourses) {
    if (courses.length >= COURSES_TARGET) break;
    if (!seen.has(extra.title)) {
      seen.add(extra.title);
      courses.push({ ...extra });
    }
  }
  return courses;
}
