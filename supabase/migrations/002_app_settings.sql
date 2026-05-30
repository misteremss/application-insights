-- ── APP SETTINGS (admin-controlled) ──
create table app_settings (
  key        text primary key,
  value      jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Seed defaults
insert into app_settings (key, value) values
  ('theme', '{}'),
  ('landing_content', '{}'),
  ('app_config', '{}')
on conflict (key) do nothing;

-- No RLS — only accessible via service role key (admin only)
