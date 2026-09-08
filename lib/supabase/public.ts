import { createClient } from "@supabase/supabase-js"

// Anon-key client for public-facing pages. No cookies/session — safe to use
// from Server Components rendered with ISR/static generation.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
