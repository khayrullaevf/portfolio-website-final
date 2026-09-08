import { AdminNav } from "@/components/admin/admin-nav"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { AdminCommandPalette } from "@/components/admin/admin-command-palette"
import { CommandPaletteTrigger } from "@/components/command-palette-trigger"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      {/* Desktop sidebar. Hidden below md, where AdminMobileNav takes over. */}
      <aside className="hidden border-r border-border p-4 md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col">
        <div className="mb-8 flex items-center gap-2.5 px-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-sand font-display text-base text-primary-foreground">
            F
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Admin panel
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AdminNav />
        </div>

        <div className="space-y-3 border-t border-border pt-3">
          <CommandPaletteTrigger className="w-full justify-center" />
          <SignOutButton className="w-full justify-start" />
        </div>
      </aside>

      <AdminMobileNav />

      <main id="main" className="min-w-0 flex-1 p-4 md:p-8">{children}</main>

      <AdminCommandPalette />
    </div>
  )
}
