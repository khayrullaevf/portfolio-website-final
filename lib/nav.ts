// Site navigation is structural (tied to in-page anchor ids), not editorial
// content, so it stays hardcoded rather than living in Supabase.
//
// It lives in its own module rather than in lib/data.ts because the header is a
// Client Component: importing this as a *value* from lib/data.ts would drag
// that module's `createPublicClient` — and with it the whole
// @supabase/supabase-js bundle — into the browser on every public page.
export function getNavItems() {
  // Order matches app/page.tsx: work before experience. The hrefs are the
  // contract — `#projects` keeps its id even though it reads "Work", because
  // every existing link, the command palette and the case-study back link all
  // resolve against it.
  return [
    { label: "Home", href: "/" },
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Credentials", href: "#credentials" },
    { label: "Contact", href: "#contact" },
  ]
}
