import Link from "next/link"
import Image from "next/image"
import { ImageOff, Pencil, Plus } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectDeleteButton } from "@/components/admin/project-delete-button"

export default async function ProjectsAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order")

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Loyihalar</h1>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            Yangi loyiha
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        {(projects ?? []).length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-sm text-zinc-400">Hozircha loyiha yo&apos;q.</p>
          </div>
        )}

        {(projects ?? []).map((project) => {
          const thumb = project.thumbnail_image_url || project.cover_image_url

          return (
            <Card key={project.id} className="bg-zinc-900/70 border-zinc-800">
              <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-zinc-800 bg-zinc-800/50">
                  {thumb ? (
                    <Image src={thumb} alt="" fill sizes="40px" className="object-cover" />
                  ) : (
                    <ImageOff className="absolute inset-0 m-auto h-4 w-4 text-zinc-600" />
                  )}
                </div>

                {/* min-w-0 is what lets the title truncate instead of pushing
                    the action buttons off a narrow screen. */}
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-medium">{project.title}</p>
                  <p className="truncate text-xs text-zinc-400">
                    {[project.slug, project.category].filter(Boolean).join(" · ")}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Tartib: <span className="text-zinc-400">{project.sort_order}</span>
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
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
