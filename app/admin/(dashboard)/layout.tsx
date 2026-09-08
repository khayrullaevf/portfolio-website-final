import Link from "next/link"
import { SignOutButton } from "@/components/admin/sign-out-button"

const navItems = [
  { href: "/admin", label: "Bosh sahifa" },
  { href: "/admin/personal", label: "Shaxsiy ma'lumot" },
  { href: "/admin/social", label: "Ijtimoiy tarmoqlar" },
  { href: "/admin/about", label: "Men haqimda" },
  { href: "/admin/experience", label: "Tajriba" },
  { href: "/admin/skills", label: "Ko'nikmalar" },
  { href: "/admin/credentials", label: "Sertifikat / Ta'lim" },
  { href: "/admin/projects", label: "Loyihalar" },
  { href: "/admin/meta", label: "SEO / Meta" },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-56 shrink-0 border-r border-zinc-800 p-4 space-y-1">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-sm">Admin</span>
          <SignOutButton />
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-x-auto">{children}</main>
    </div>
  )
}
