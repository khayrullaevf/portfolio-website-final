import {
  BarChart3,
  Briefcase,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Search,
  Share2,
  User,
  type LucideProps,
} from "lucide-react"
import type { ComponentType } from "react"

export interface AdminNavItem {
  href: string
  label: string
  icon: ComponentType<LucideProps>
}

// Shared by the sidebar, the mobile drawer and the dashboard cards, so it lives
// outside the client nav component.
export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Bosh sahifa", icon: LayoutDashboard },
  { href: "/admin/personal", label: "Shaxsiy ma'lumot", icon: User },
  { href: "/admin/social", label: "Ijtimoiy tarmoqlar", icon: Share2 },
  { href: "/admin/about", label: "Men haqimda", icon: FileText },
  { href: "/admin/experience", label: "Tajriba", icon: Briefcase },
  { href: "/admin/skills", label: "Ko'nikmalar", icon: BarChart3 },
  { href: "/admin/credentials", label: "Sertifikat / Ta'lim", icon: GraduationCap },
  { href: "/admin/projects", label: "Loyihalar", icon: FolderKanban },
  { href: "/admin/meta", label: "SEO / Meta", icon: Search },
]

/** "/admin" only matches exactly; every other section also owns its subroutes. */
export function isActiveNav(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)
}

export function adminSectionTitle(pathname: string) {
  const match = [...ADMIN_NAV].reverse().find((item) => isActiveNav(pathname, item.href))
  return match?.label ?? "Admin"
}
