import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Cookie-aware client for Server Components / Server Actions / middleware
// that need to know about the admin's session (RLS sees auth.role()).
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // called from a Server Component that can't set cookies;
            // middleware refreshes the session instead.
          }
        },
      },
    },
  )
}
