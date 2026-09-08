import { createPublicClient } from "@/lib/supabase/public"

export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  /** Featured projects lead the work section; the rest fall into the archive. */
  featured: boolean
  /** Sortable label for the archive row. `timeline` holds prose, so it can't serve. */
  year: string
  problem: string
  approach: string[]
  tradeoffs: string[]
  impact: string[]
}

// The case-study columns land via 0003_project_case_study.sql. Every fallback
// below matches that migration's default, so a row read before the migration is
// applied maps to the same shape it will have afterwards — nothing breaks in
// between, the new sections simply render as empty and are omitted.
function mapProject(row: any, gallery?: any[]): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description ?? [],
    features: row.features ?? [],
    technologies: row.technologies ?? [],
    coverImage: row.cover_image_url,
    thumbnailImage: row.thumbnail_image_url,
    gallery: gallery?.map((g) => ({ url: g.url, caption: g.caption ?? undefined })),
    client: row.client ?? undefined,
    timeline: row.timeline,
    role: row.role,
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    featured: row.featured ?? false,
    year: row.year ?? "",
    problem: row.problem ?? "",
    approach: row.approach ?? [],
    tradeoffs: row.tradeoffs ?? [],
    impact: row.impact ?? [],
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = createPublicClient()
  const { data } = await supabase.from("projects").select("*").order("sort_order")
  return (data ?? []).map((row) => mapProject(row))
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const supabase = createPublicClient()
  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).single()
  if (!project) return undefined

  const { data: gallery } = await supabase
    .from("project_gallery")
    .select("*")
    .eq("project_id", project.id)
    .order("sort_order")

  return mapProject(project, gallery ?? [])
}

// Was `limit = 2`, which silently capped "More projects" at two rows no matter
// how many existed.
export async function getRelatedProjects(
  currentSlug: string,
  limit = 4,
): Promise<RelatedProject[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from("projects")
    .select("slug, title, category, thumbnail_image_url")
    .neq("slug", currentSlug)
    .order("sort_order")
    .limit(limit)

  return (data ?? []).map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    image: row.thumbnail_image_url,
  }))
}
