export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  user_streak?: number;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  icon_name?: string;
  progress?: number;
}

export interface Progress {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  icon_name?: string;
  updated_at?: string;
}
