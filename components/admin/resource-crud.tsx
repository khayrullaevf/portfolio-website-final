"use client"

import { useState, useTransition } from "react"
import type { FieldConfig } from "@/lib/admin/field"
import type { ListTable } from "@/lib/actions/crud"
import { createRecord, updateRecord, deleteRecord } from "@/lib/actions/crud"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export interface ResourceRow {
  id: string
  [key: string]: unknown
}

export function ResourceCrud({
  table,
  fields,
  rows,
  titleField,
  revalidatePaths,
  createDefaults,
}: {
  table: ListTable
  fields: FieldConfig[]
  rows: ResourceRow[]
  titleField: string
  revalidatePaths: string[]
  createDefaults?: Record<string, unknown>
}) {
  const [editing, setEditing] = useState<ResourceRow | null>(null)
  const [creating, setCreating] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      await createRecord(table, fields, formData, revalidatePaths)
      setCreating(false)
    })
  }

  function handleUpdate(id: string, formData: FormData) {
    startTransition(async () => {
      await updateRecord(table, id, fields, formData, revalidatePaths)
      setEditing(null)
    })
  }

  function handleDelete(id: string) {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return
    startTransition(async () => {
      await deleteRecord(table, id, revalidatePaths)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger asChild>
            <Button>+ Qo'shish</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi qo'shish</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <ResourceFormFields fields={fields} values={createDefaults} />
              <Button type="submit" disabled={pending} className="w-full">
                Saqlash
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <p className="text-sm text-zinc-400">Hozircha yozuv yo'q.</p>
        )}
        {rows.map((row) => (
          <Card key={row.id} className="bg-zinc-900/70 border-zinc-800">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <span className="text-sm truncate">{String(row[titleField] ?? row.id)}</span>
              <div className="flex gap-2 shrink-0">
                <Dialog
                  open={editing?.id === row.id}
                  onOpenChange={(open) => setEditing(open ? row : null)}
                >
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Tahrirlash
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tahrirlash</DialogTitle>
                    </DialogHeader>
                    <form
                      action={(formData) => handleUpdate(row.id, formData)}
                      className="space-y-4"
                    >
                      <ResourceFormFields fields={fields} values={row} />
                      <Button type="submit" disabled={pending} className="w-full">
                        Saqlash
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={pending}
                  onClick={() => handleDelete(row.id)}
                >
                  O'chirish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
