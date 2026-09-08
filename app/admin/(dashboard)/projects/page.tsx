import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectDeleteButton } from "@/components/admin/project-delete-button"

export default async function ProjectsAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order")

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Loyihalar</h1>
        <Button asChild>
          <Link href="/admin/projects/new">+ Yangi loyiha</Link>
        </Button>
      </div>

      <div className="space-y-2">
        {(projects ?? []).length === 0 && (
          <p className="text-sm text-zinc-400">Hozircha loyiha yo'q.</p>
        )}
        {(projects ?? []).map((project) => (
          <Card key={project.id} className="bg-zinc-900/70 border-zinc-800">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{project.title}</p>
                <p className="text-xs text-zinc-400">{project.slug}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/admin/projects/${project.id}`}>Tahrirlash</Link>
                </Button>
                <ProjectDeleteButton id={project.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
