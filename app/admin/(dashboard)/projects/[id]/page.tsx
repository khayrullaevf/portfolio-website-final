import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ProjectForm } from "@/components/admin/project-form"
import { ResourceCrud } from "@/components/admin/resource-crud"
import type { FieldConfig } from "@/lib/admin/field"

const galleryFields: FieldConfig[] = [
  { key: "project_id", label: "", type: "hidden" },
  { key: "url", label: "Rasm", type: "image", folder: "projects", list: "thumb" },
  { key: "caption", label: "Izoh", type: "text", list: "primary" },
  { key: "sort_order", label: "Tartib", type: "number", list: "meta" },
]

export default async function EditProjectAdminPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createServerSupabaseClient()
  const [{ data: project }, { data: gallery }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", params.id).single(),
    supabase
      .from("project_gallery")
      .select("*")
      .eq("project_id", params.id)
      .order("sort_order"),
  ])

  if (!project) notFound()

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold mb-4">Loyihani tahrirlash</h1>
        <ProjectForm project={project} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Galereya</h2>
        <ResourceCrud
          table="project_gallery"
          fields={galleryFields}
          rows={gallery ?? []}
          titleField="caption"
          emptyPrimaryLabel="Izohsiz rasm"
          revalidatePaths={["/", `/projects/${project.slug}`, `/admin/projects/${project.id}`]}
          createDefaults={{ project_id: project.id }}
        />
      </div>
    </div>
  )
}
