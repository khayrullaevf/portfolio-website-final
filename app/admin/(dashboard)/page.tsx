import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ADMIN_NAV } from "@/lib/admin/nav"

/** Sections backed by a list table, so a row count is meaningful. */
const COUNTED = [
  { href: "/admin/social", table: "social_links", unit: "havola" },
  { href: "/admin/about", table: "languages", unit: "til" },
  { href: "/admin/experience", table: "experience", unit: "ish joyi" },
  { href: "/admin/skills", table: "skills", unit: "ko'nikma" },
  { href: "/admin/credentials", table: "certifications", unit: "sertifikat" },
  { href: "/admin/projects", table: "projects", unit: "loyiha" },
] as const

export default async function AdminHomePage() {
  const supabase = await createServerSupabaseClient()

  // head: true sends no rows over the wire — just the count.
  const counts = await Promise.all(
    COUNTED.map(async ({ table }) => {
      const { count } = await supabase.from(table).select("*", { count: "exact", head: true })
      return count ?? 0
    }),
  )

  const cards = COUNTED.map((section, i) => {
    const nav = ADMIN_NAV.find((item) => item.href === section.href)!
    return { ...section, label: nav.label, icon: nav.icon, count: counts[i] }
  })

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Boshqaruv
          </p>
          <h1 className="mt-2 text-xl font-semibold">Xush kelibsiz</h1>
          <p className="mt-2 max-w-measure text-sm text-muted-foreground">
            Bo&apos;limni tanlab tahrirlang. O&apos;zgarishlar saytda bir necha soniya ichida
            ko&apos;rinadi.
          </p>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" />
            Saytni ochish
          </Link>
        </Button>
      </div>

      {/* Flat rows on hairlines rather than a grid of cards: the counts are the
          information, the boxes were not. */}
      <ul className="divide-y divide-border border-y border-border">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex items-center gap-4 rounded-sm py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-fast ease-smooth group-hover:text-sand"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-sm transition-colors duration-fast ease-smooth group-hover:text-sand">
                  {card.label}
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {card.count} ta {card.unit}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-fast ease-smooth group-hover:translate-x-0.5 group-hover:text-sand"
                  aria-hidden
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
