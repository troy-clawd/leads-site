import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client. Uses the service-role key so the API route can
// insert leads even with row-level security enabled. NEVER import this from a
// client component — the service-role key must never reach the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
