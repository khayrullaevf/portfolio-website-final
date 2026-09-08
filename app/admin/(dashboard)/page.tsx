import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Xush kelibsiz</h1>
          <p className="mt-1 text-sm text-zinc-400">
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.href} href={card.href} className="group">
              <Card className="h-full border-zinc-800 bg-zinc-900/70 transition-colors group-hover:border-cyan-500/40 group-hover:bg-zinc-900">
                <CardContent className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{card.label}</p>
                    <p className="text-xs text-zinc-400">
                      {card.count} ta {card.unit}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-cyan-400" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
