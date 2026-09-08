"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { createRecord, updateRecord } from "@/lib/actions/crud"
import { projectFields } from "@/lib/admin/project-fields"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ProjectForm({
  project,
}: {
  project?: Record<string, unknown> & { id: string }
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = project
        ? await updateRecord("projects", project.id, projectFields, formData, [
            "/",
            "/admin/projects",
            `/projects/${project.slug}`,
          ])
        : await createRecord("projects", projectFields, formData, ["/", "/admin/projects"])

      if (!result.ok) {
        toast({ variant: "destructive", title: "Saqlanmadi", description: result.message })
        return
      }

      toast({ title: project ? "Loyiha saqlandi" : "Loyiha qo'shildi" })
      router.push("/admin/projects")
    })
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <ResourceFormFields fields={projectFields} values={project} />
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Saqlash
      </Button>
    </form>
  )
}
