import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf-8');

const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1]?.trim();
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1]?.trim();

if (!url || !key) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  // Try to add columns via update (to test write access)
  const { error: testErr } = await supabase
    .from('courses')
    .update({ title: 'test' })
    .eq('id', '00000000-0000-0000-0000-000000000000');

  if (testErr) {
    console.log('Write test:', testErr.message);
    if (testErr.message.includes('permission') || testErr.message.includes('violates')) {
      console.log('Service key has write access');
    }
  }

  // Try rpc
  const { error: rpcErr } = await supabase.rpc('exec_sql', {
    query: `ALTER TABLE courses ADD COLUMN IF NOT EXISTS icon_name text DEFAULT 'BookOpen'`,
  });
  if (rpcErr) {
    console.log('rpc exec_sql failed:', rpcErr.message);
  } else {
    console.log('rpc exec_sql succeeded');
    return;
  }

  // Try pgquery
  const { error: pgErr } = await supabase.rpc('pgquery', {
    query: `ALTER TABLE courses ADD COLUMN IF NOT EXISTS icon_name text DEFAULT 'BookOpen'`,
  });
  if (pgErr) {
    console.log('rpc pgquery failed:', pgErr.message);
  } else {
    console.log('rpc pgquery succeeded');
    return;
  }

  console.log('Could not alter schema automatically.');
  console.log('Please run the following SQL in Supabase SQL Editor:');
  console.log(`
ALTER TABLE courses ADD COLUMN IF NOT EXISTS icon_name text DEFAULT 'BookOpen';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS progress integer DEFAULT 0;
UPDATE courses SET icon_name = 'Code', progress = 75 WHERE title LIKE '%React%';
UPDATE courses SET icon_name = 'Brain', progress = 52 WHERE title LIKE '%AI%' OR title LIKE '%ML%';
UPDATE courses SET icon_name = 'Cloud', progress = 88 WHERE title LIKE '%Cloud%';
UPDATE courses SET icon_name = 'Palette', progress = 45 WHERE title LIKE '%Design%' OR title LIKE '%Web%';
  `.trim());
}

main().catch(console.error);
