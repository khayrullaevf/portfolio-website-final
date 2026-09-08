"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { deleteRecord } from "@/lib/actions/crud"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ProjectDeleteButton({
  id,
  slug,
  title,
}: {
  id: string
  slug: string
  title?: string
}) {
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleDelete() {
    startTransition(async () => {
      // The public detail route is keyed by slug, not id — revalidating
      // `/projects/<uuid>` (as this did before) matched nothing.
      const result = await deleteRecord("projects", id, [
        "/",
        "/admin/projects",
        `/projects/${slug}`,
      ])

      if (result.ok) {
        toast({ title: "Loyiha o'chirildi" })
      } else {
        toast({ variant: "destructive", title: "Xatolik", description: result.message })
      }
    })
  }

  return (
    <ConfirmDialog
      trigger={
        <Button variant="destructive" size="sm" disabled={pending} aria-label="O'chirish">
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">O&apos;chirish</span>
        </Button>
      }
      title="Loyihani o'chirasizmi?"
      description={
        title
          ? `"${title}" va uning barcha galereya rasmlari o'chiriladi. Bu amalni orqaga qaytarib bo'lmaydi.`
          : "Bu amalni orqaga qaytarib bo'lmaydi."
      }
      pending={pending}
      onConfirm={handleDelete}
    />
  )
}
