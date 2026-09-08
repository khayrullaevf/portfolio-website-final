import Link from "next/link"
import Image from "next/image"
import { ImageOff, Pencil, Plus } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ProjectDeleteButton } from "@/components/admin/project-delete-button"

export default async function ProjectsAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order")

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Loyihalar</h1>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            Yangi loyiha
          </Link>
        </Button>
      </div>

      {(projects ?? []).length === 0 && (
        <div className="border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Hali birorta loyiha qo&apos;shilmagan.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            &laquo;Yangi loyiha&raquo; bilan birinchi case study&apos;ni yarating
          </p>
        </div>
      )}

      {(projects ?? []).length > 0 && (
        <ul className="divide-y divide-border border-y border-border">
          {(projects ?? []).map((project) => {
            const thumb = project.thumbnail_image_url || project.cover_image_url

            return (
              <li key={project.id} className="flex items-center gap-3 py-3 sm:gap-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border bg-card">
                  {thumb ? (
                    <Image src={thumb} alt="" fill sizes="40px" className="object-cover" />
                  ) : (
                    <ImageOff className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* min-w-0 is what lets the title truncate instead of pushing
                    the action buttons off a narrow screen. */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-medium">{project.title}</p>
                    {project.featured && (
                      <span className="shrink-0 border border-sand/30 bg-sand/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sand">
                        Tanlangan
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {[project.slug, project.category].filter(Boolean).join(" · ")}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    Tartib: <span className="text-foreground/70">{project.sort_order}</span>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button asChild variant="secondary" size="sm" aria-label="Tahrirlash">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline">Tahrirlash</span>
                    </Link>
                  </Button>
                  <ProjectDeleteButton
                    id={project.id}
                    slug={project.slug}
                    title={project.title}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
