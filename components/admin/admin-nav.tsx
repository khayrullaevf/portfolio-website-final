"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_NAV, isActiveNav } from "@/lib/admin/nav"
import { cn } from "@/lib/utils"

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {ADMIN_NAV.map((item) => {
        const active = isActiveNav(pathname, item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-cyan-500/10 font-medium text-cyan-400"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
