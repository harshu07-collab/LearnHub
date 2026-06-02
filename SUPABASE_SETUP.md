Supabase setup notes

1. Create a new project at https://app.supabase.com
2. Open Project Settings -> API and copy the anon and service_role keys into .env.local (see .env.local.example).
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (keep secret, do NOT commit)
3. Apply the database schema:
   - Option A: Open Supabase SQL Editor and paste the contents of supabase_schema.sql (repo root), then run.
   - Option B: Use the Supabase CLI (supabase db push) if you prefer migrations.
4. Enable Auth providers (Email, OAuth) in Supabase Auth settings as needed.
5. Test using the lib/supabase.server.ts and lib/supabaseAdmin.ts helpers.

Security note: Never commit service role keys to the repo. Use environment secrets in deployment (Vercel/Netlify).
