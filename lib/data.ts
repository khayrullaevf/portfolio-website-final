import { createPublicClient } from "@/lib/supabase/public"

// Site navigation is structural (tied to in-page anchor ids), not editorial
// content, so it stays hardcoded rather than living in Supabase.
export function getNavItems() {
  return [
    { label: "Home", href: "/" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]
}

export async function getPersonalInfo() {
  const supabase = createPublicClient()
  const [{ data: personal }, { data: social }] = await Promise.all([
    supabase.from("personal_info").select("*").eq("id", 1).single(),
    supabase.from("social_links").select("*").order("sort_order"),
  ])

  return {
    name: personal?.name ?? "",
    title: personal?.title ?? "",
    location: personal?.location ?? "",
    avatar: personal?.avatar_url ?? "",
    email: personal?.email ?? "",
    phone: personal?.phone ?? "",
    workingHours: personal?.working_hours ?? "",
    availableForWork: personal?.available_for_work ?? false,
    badges: (personal?.badges ?? []) as string[],
    social: (social ?? []).map((s) => ({ platform: s.platform, url: s.url, icon: s.icon })),
  }
}

export async function getAboutInfo() {
  const supabase = createPublicClient()
  const [{ data: about }, { data: languages }] = await Promise.all([
    supabase.from("about_info").select("*").eq("id", 1).single(),
    supabase.from("languages").select("*").order("sort_order"),
  ])

  return {
    bio: about?.bio ?? "",
    focus: (about?.focus ?? []) as string[],
    interests: (about?.interests ?? []) as string[],
    languages: (languages ?? []).map((l) => ({
      name: l.name,
      proficiency: l.proficiency,
      level: l.level,
      flag: l.flag,
    })),
  }
}

export async function getExperienceInfo() {
  const supabase = createPublicClient()
  const { data } = await supabase.from("experience").select("*").order("sort_order")

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    period: row.period,
    description: row.description,
    technologies: row.technologies,
    isActive: row.is_active,
  }))
}

export async function getSkills() {
  const supabase = createPublicClient()
  const { data } = await supabase.from("skills").select("*").order("sort_order")

  return (data ?? []).map((row) => ({
    name: row.name,
    level: row.level,
    category: row.category,
    color: row.color,
  }))
}

export async function getCredentialsInfo() {
  const supabase = createPublicClient()
  const [{ data: certifications }, { data: education }, { data: skills }] = await Promise.all([
    supabase.from("certifications").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("skills").select("name").order("sort_order"),
  ])

  return {
    certifications: (certifications ?? []).map((c) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      logo: c.logo_url,
      pdfPath: c.pdf_url,
    })),
    education: (education ?? []).map((e) => ({
      degree: e.degree,
      institution: e.institution,
      year: e.year,
      logo: e.logo_url,
    })),
    skills: (skills ?? []).map((s) => s.name),
  }
}

export async function getMetaInfo() {
  const supabase = createPublicClient()
  const { data } = await supabase.from("meta_info").select("*").eq("id", 1).single()

  return {
    title: data?.title ?? "Fazliddin Khayrullaev | Software Engineer",
    description: data?.description ?? "",
  }
}

export {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  type Project,
  type ProjectGalleryImage,
} from "@/lib/projects"
