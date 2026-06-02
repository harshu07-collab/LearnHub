-- Seed data for Next-Gen Learning Dashboard

-- Insert example courses with icon names and progress
INSERT INTO courses (title, description, icon_name, progress) VALUES
  ('Advanced React Patterns', 'Master hooks, context, and performance optimization in React', 'Code', 75),
  ('AI & Machine Learning Fundamentals', 'Introduction to neural networks, algorithms, and real-world AI applications', 'Brain', 52),
  ('Cloud Architecture with AWS', 'Design scalable, secure cloud solutions using AWS services', 'Cloud', 88),
  ('Web Design Mastery', 'Create stunning responsive designs with modern CSS and UX principles', 'Palette', 45);

-- Insert example users
INSERT INTO users (email, full_name, user_streak) VALUES
  ('alice@example.com', 'Alice Johnson', 7),
  ('bob@example.com', 'Bob Smith', 12);

