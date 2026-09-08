"use client"

import { useTransition } from "react"
import { deleteRecord } from "@/lib/actions/crud"
import { Button } from "@/components/ui/button"

export function ProjectDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm("Loyihani o'chirishni tasdiqlaysizmi?")) return
    startTransition(() => {
      deleteRecord("projects", id, ["/", "/admin/projects", `/projects/${id}`])
    })
  }

  return (
    <Button variant="destructive" size="sm" disabled={pending} onClick={handleDelete}>
      O'chirish
    </Button>
  )
}
