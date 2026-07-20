# HomePro — home repair & maintenance lead-gen site

A Next.js 16 (App Router) landing page that captures homeowner leads, stores them
in Supabase, and pings Telegram on every new lead.

## Stack

- **Next.js 16** + TypeScript + Tailwind CSS
- **Supabase** — Postgres `leads` table (server-side inserts via service-role key)
- **Telegram** — optional new-lead notification via the Bot API
- **Vercel** — hosting / deploys from GitHub

## How it works

```
Landing page (/)  →  POST /api/leads  →  Supabase.leads  +  Telegram ping
   LeadForm.tsx        route.ts             supabase.ts       notify.ts
```

## Local setup

1. `cp .env.example .env.local` and fill in the values.
2. In Supabase, run `supabase/schema.sql` (Dashboard → SQL editor) to create the
   `leads` table.
3. `npm install`
4. `npm run dev` → http://localhost:3000

## Environment variables

| Var | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **Secret** — server only |
| `TELEGRAM_BOT_TOKEN` | @BotFather / existing bot | Optional |
| `TELEGRAM_CHAT_ID` | Your chat id | Optional |

If the Telegram vars are unset, notifications are skipped — leads still save.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the four env vars in the Vercel project settings.
4. Deploy.
