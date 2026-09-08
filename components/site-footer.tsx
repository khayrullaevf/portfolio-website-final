import Link from "next/link";

/**
 * Takes the name as a prop rather than hardcoding it, unlike the inline footer
 * this replaces — the name is editorial content and lives in Supabase.
 */
export function SiteFooter({
  name,
  email,
}: {
  name: string;
  email?: string;
}) {
  return (
    <footer className="mt-24 border-t border-border py-10">
      <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {name}
        </p>

        <div className="flex items-center gap-6">
          {email && (
            <a
              href={`mailto:${email}`}
              className="rounded-sm outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Email
            </a>
          )}
          <Link
            href="/admin"
            className="rounded-sm outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
