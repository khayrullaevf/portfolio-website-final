"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { AdminNav } from "@/components/admin/admin-nav"
import { adminSectionTitle } from "@/lib/admin/nav"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function AdminMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // A soft navigation keeps the drawer mounted, so close it whenever the route
  // actually changes rather than only on click.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-black/90 px-4 backdrop-blur md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menyuni ochish">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetTitle className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500 text-xs font-bold text-black">
              F
            </span>
            Admin panel
          </SheetTitle>
          <div className="flex-1 overflow-y-auto">
            <AdminNav onNavigate={() => setOpen(false)} />
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <SignOutButton className="w-full justify-start" />
          </div>
        </SheetContent>
      </Sheet>

      <span className="truncate text-sm font-medium">{adminSectionTitle(pathname)}</span>
    </header>
  )
}
