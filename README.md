# LearnHub — Next-Gen Learning Dashboard

A premium, futuristic learning dashboard built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion v12**, and **Supabase**. Features dark-only theme, bento grid layout, server-rendered data, spring animations, and Supabase Auth with email verification.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| Animation | Framer Motion v12 (spring physics, layoutId) |
| Icons | Lucide React |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (email/password + verification) |
| Font | Geist (Vercel) |

## Features

- **Dark-only theme**: Deep blacks, charcoal grays, indigo accent
- **Bento grid layout**: Responsive dashboard with hero, course cards, activity chart
- **Supabase Auth**: Email sign-up/login with verification flow
- **Server-rendered data**: Course data fetched via RSC from Supabase
- **Framer Motion animations**: Staggered entrance, spring hovers, `layoutId` nav indicator
- **Grain texture**: Subtle noise overlay on all bento tiles
- **Custom SVG logo**: Hand-crafted geometric mark (not AI-generated)
- **Zero layout shifts**: All animations use `transform` and `opacity` only
- **Responsive**: Desktop sidebar, tablet icon-only, mobile bottom nav

## Architecture

### Server/Client Component Split

```
app/
├── layout.tsx          # Server — wraps AuthGuard
├── page.tsx            # Server — composes bento grid, passes children
├── login/page.tsx      # Client — auth form (login/register)
├── auth/callback       # Server — OAuth email confirmation handler
├── loading.tsx         # Server — skeleton loader for page shell
└── error.tsx           # Client — error boundary with retry

components/
├── AuthGuard.tsx       # Client — auth provider + redirect logic
├── AuthProvider.tsx    # Client — React context for auth state
├── Sidebar.tsx         # Client — nav with layoutId, user info, sign out
├── HeroTile.tsx        # Client — greeting + streak with canvas orbs
├── CourseListServer.tsx# Server — fetches Supabase data with fallback
├── CourseList.tsx      # Client — renders course grid or empty state
├── CourseCard.tsx      # Client — card with tilt, grain, animated progress
├── ActivityTile.tsx    # Client — bar chart with spring animation
├── MobileNav.tsx       # Client — bottom nav for mobile
├── GrainOverlay.tsx    # Client — SVG noise texture overlay
└── Logo.tsx            # Client — custom SVG logo mark
```

### Data Flow

1. **Auth**: `AuthProvider` checks Supabase session → if no user, redirects to `/login`
2. **Courses**: `CourseListServer` (RSC) calls `fetchCourses()` via anon key → falls back to local data if Supabase unreachable
3. **Icons**: `lib/icon-utils.ts` maps `icon_name` strings to Lucide components
4. **Defaults**: Since Supabase schema lacks `icon_name`/`progress` columns, `supabase.server.ts` derives them from course title keywords

## Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the SQL below in Supabase SQL Editor
3. Copy your project URL, anon key, and service role key

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO courses (title, description, icon_name, progress) VALUES
  ('Advanced React Patterns', 'Master composition, render props, and hooks', 'Code', 75),
  ('AI & Machine Learning Fundamentals', 'Neural networks, supervised learning', 'Brain', 52),
  ('Cloud Architecture with AWS', 'Scalable infra with EC2, S3, Lambda', 'Cloud', 88),
  ('Web Design Mastery', 'UI/UX principles, color theory, typography', 'Palette', 45);
```

### 3. Environment

```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials
```

Enable **Email Auth** in Supabase Dashboard → Authentication → Providers → Email.

### 4. Run

```bash
npm run dev        # Development
npm run build      # Production build + type check
npm start          # Start production server
```

## Auth Flow

1. User visits `/` → redirected to `/login`
2. Sign up with email/password → verification email sent
3. Click verification link → auto-redirects to dashboard
4. `AuthGuard` wraps the layout, checks session on mount
5. Sidebar shows user avatar and sign-out button
6. `HeroTile` reads user email from auth context for the greeting

## Animations

| Element | Technique |
|---------|-----------|
| Page load | Framer Motion staggered entrance (opacity + translateY) |
| Card hover | Spring physics (`stiffness: 300, damping: 20`) + 3D tilt |
| Progress bar | Animates from 0 → value with shimmer overlay |
| Nav indicator | `layoutId="nav-indicator"` — snaps between items with spring |
| Sidebar collapse | CSS transitions (width, opacity) |
| Canvas orbs | GPU-accelerated `<canvas>` gradient animation |
| Grain texture | SVG `<feTurbulence>` filter, transforms only |

## Key Decisions

- **Framer Motion v12**: Import from `framer-motion` (not `/client`) with `'use client'` boundaries. Layout-level components avoid framer-motion to prevent SSR issues with `_not-found` static generation.
- **Tailwind v4**: No `tailwind.config.js` — all tokens in `globals.css` via `@theme` directive.
- **Supabase anon key**: Used for both client auth and server data fetching (with RLS). Service role key avoided due to table permission constraints.
- **Fallback data**: If Supabase is unreachable, course data renders from hardcoded defaults to prevent blank screen.
- **Custom logo**: Abstract geometric mark with two overlapping wings + center spine — represents continuous learning. Not an AI-generated icon.

## Challenges Faced

### 1. RLS (Row Level Security) Permission Denied on Server
Initially, I tried using the `SUPABASE_SERVICE_ROLE_KEY` for server-side data fetching to avoid exposing the anon key. However, Vercel production builds failed with `permission denied for table courses` because the service role lacked `SELECT` privileges on the `courses` table. I resolved this by switching back to the `NEXT_PUBLIC_SUPABASE_ANON_KEY` on the server, which is the standard pattern for Supabase RLS-enabled tables. I then added the necessary RLS policies in Supabase to allow `anon` and `authenticated` roles to read the `courses` table.

### 2. TypeScript Type Mismatch with Shared Interfaces
When I refactored `CourseListServer.tsx` to use the shared `Course` type from `@/types`, I encountered a type mismatch. The `fallbackCourses` array was typed with required fields (`icon_name: string`, `progress: number`), while the shared `Course` interface had optional fields (`icon_name?: string`, `progress?: number`). I fixed this by explicitly typing `fallbackCourses` as `Course[]` and updating the `getCourses()` return type to use `Course[]` instead of `typeof fallbackCourses`.

### 3. Zero Layout Shifts with Framer Motion
The challenge required "zero layout shifts" for hover and entrance animations. Using `AnimatePresence mode="wait"` caused a brief blank gap between page transitions (CLS). I fixed this by switching to `mode="popLayout"` with `initial={false}`, which crossfades pages without ever collapsing the layout container. I also added `contain: layout style` to key containers to isolate reflows.

### 4. Performance: Mouse Move Causing Excessive Re-renders
`CourseCard` and `CursorGlow` were using `useState` to track mouse position, triggering a React re-render on every `mousemove` event (60+ times per second). I eliminated this by using CSS custom properties (`--spot-x`, `--spot-y`) and direct DOM manipulation via `useRef` + `requestAnimationFrame`, bringing the component to zero re-renders during mouse interaction.

### 5. Canvas Animations Running at 60fps Unnecessarily
The ambient canvas backgrounds (`AmbientBackground`, `FloatingParticles`, `ActivityTile`) were rendering at 60fps, which is overkill for decorative effects and wastes GPU/battery. I implemented frame-delta throttling to cap them at 30fps, halving the GPU cost without any visible quality loss.

## Project Structure

```
├── app/            # Next.js App Router pages
├── components/     # React components (server + client)
├── hooks/          # Custom hooks
├── lib/            # Utilities, Supabase clients
├── types/          # TypeScript interfaces
├── public/         # Static assets
├── scripts/        # Helper scripts
└── supabase/       # SQL schema + seeds
```
