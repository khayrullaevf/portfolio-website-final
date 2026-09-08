// Site navigation is structural (tied to in-page anchor ids), not editorial
// content, so it stays hardcoded rather than living in Supabase.
//
// It lives in its own module rather than in lib/data.ts because the header is a
// Client Component: importing this as a *value* from lib/data.ts would drag
// that module's `createPublicClient` — and with it the whole
// @supabase/supabase-js bundle — into the browser on every public page.
export function getNavItems() {
  return [
    { label: "Home", href: "/" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]
}
