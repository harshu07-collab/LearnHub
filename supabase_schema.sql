-- Supabase schema for Next-Gen Learning Dashboard

-- Enable pgcrypto for gen_random_uuid (if available)
-- create extension if not exists pgcrypto;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  full_name text,
  user_streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_name text DEFAULT 'BookOpen',
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Progress (user progress per course)
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress numeric DEFAULT 0,
  icon_name text DEFAULT 'BookOpen',
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course ON progress(course_id);
