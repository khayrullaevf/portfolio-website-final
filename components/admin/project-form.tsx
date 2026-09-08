"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createRecord, updateRecord } from "@/lib/actions/crud"
import { projectFields } from "@/lib/admin/project-fields"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { Button } from "@/components/ui/button"

export function ProjectForm({
  project,
}: {
  project?: Record<string, unknown> & { id: string }
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (project) {
        await updateRecord("projects", project.id, projectFields, formData, [
          "/",
          "/admin/projects",
          `/projects/${project.slug}`,
        ])
      } else {
        await createRecord("projects", projectFields, formData, ["/", "/admin/projects"])
      }
      router.push("/admin/projects")
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-xl">
      <ResourceFormFields fields={projectFields} values={project} />
      <Button type="submit" disabled={pending}>
        Saqlash
      </Button>
    </form>
  )
}
