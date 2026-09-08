import "server-only"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Defense in depth beyond RLS + middleware: refuse to run any mutation
// if somehow called without an authenticated session.
export async function requireAdminClient() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  return supabase
}
