-- HomePro leads table.
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query) after
-- creating your project.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  service     text not null,
  message     text,
  source      text default 'website',
  status      text not null default 'new'   -- new | contacted | won | lost
);

-- Enable row-level security. The website writes with the service-role key,
-- which bypasses RLS, so no public policies are needed — this keeps the table
-- private from the anon/public API.
alter table public.leads enable row level security;

-- Helpful index for the dashboard view (newest first).
create index if not exists leads_created_at_idx on public.leads (created_at desc);
