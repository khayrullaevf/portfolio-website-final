import { AdminNav } from "@/components/admin/admin-nav"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { SignOutButton } from "@/components/admin/sign-out-button"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white md:flex">
      {/* Desktop sidebar. Hidden below md, where AdminMobileNav takes over. */}
      <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col border-r border-zinc-800 p-4">
        <div className="mb-6 flex items-center gap-2 px-3">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-cyan-500 text-sm font-bold text-black">
            F
          </span>
          <span className="text-sm font-semibold">Admin panel</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AdminNav />
        </div>

        <div className="border-t border-zinc-800 pt-3">
          <SignOutButton className="w-full justify-start" />
        </div>
      </aside>

      <AdminMobileNav />

      <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}
