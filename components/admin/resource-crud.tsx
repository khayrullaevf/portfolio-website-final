"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { ImageOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react"
import type { FieldConfig } from "@/lib/admin/field"
import type { ListTable } from "@/lib/actions/crud"
import { createRecord, updateRecord, deleteRecord } from "@/lib/actions/crud"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export interface ResourceRow {
  id: string
  [key: string]: unknown
}

function asText(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (Array.isArray(value)) return value.join(", ")
  return String(value).trim()
}

/** Splits the field config into the pieces a list row renders. */
function buildRowLayout(fields: FieldConfig[], titleField: string) {
  const primary = fields.find((f) => f.list === "primary")
  return {
    primaryKey: primary?.key ?? titleField,
    secondary: fields.filter((f) => f.list === "secondary"),
    meta: fields.filter((f) => f.list === "meta"),
    badges: fields.filter((f) => f.list === "badge"),
    thumb: fields.find((f) => f.list === "thumb"),
    swatch: fields.find((f) => f.list === "swatch"),
  }
}

function RowSummary({
  row,
  layout,
  emptyPrimaryLabel,
}: {
  row: ResourceRow
  layout: ReturnType<typeof buildRowLayout>
  emptyPrimaryLabel: string
}) {
  const title = asText(row[layout.primaryKey]) || emptyPrimaryLabel
  const thumbUrl = layout.thumb ? asText(row[layout.thumb.key]) : ""
  const swatchColor = layout.swatch ? asText(row[layout.swatch.key]) : ""

  const secondary = layout.secondary
    .map((f) => asText(row[f.key]))
    .filter(Boolean)
    .join(" · ")

  const meta = layout.meta
    .map((f) => ({ label: f.label, value: asText(row[f.key]) }))
    .filter((m) => m.value !== "")

  const badges = layout.badges.filter((f) => Boolean(row[f.key]))

  return (
    <>
      {layout.thumb && (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-zinc-800 bg-zinc-800/50">
          {thumbUrl ? (
            <Image src={thumbUrl} alt="" fill sizes="40px" className="object-cover" />
          ) : (
            <ImageOff className="absolute inset-0 m-auto h-4 w-4 text-zinc-600" />
          )}
        </div>
      )}

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex min-w-0 items-center gap-2">
          {layout.swatch && swatchColor && (
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/20"
              style={{ backgroundColor: swatchColor }}
              aria-hidden
            />
          )}
          <p className="truncate text-sm font-medium">{title}</p>
          {badges.map((f) => (
            <Badge
              key={f.key}
              variant="outline"
              className="shrink-0 border-cyan-500/30 bg-cyan-500/10 text-[10px] text-cyan-400"
            >
              {f.label}
            </Badge>
          ))}
        </div>

        {secondary && <p className="truncate text-xs text-zinc-400">{secondary}</p>}

        {meta.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
            {meta.map((m) => (
              <span key={m.label} className="truncate text-[11px] text-zinc-500">
                {m.label}: <span className="text-zinc-400">{m.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export function ResourceCrud({
  table,
  fields,
  rows,
  titleField,
  revalidatePaths,
  createDefaults,
  emptyPrimaryLabel = "Nomsiz",
}: {
  table: ListTable
  fields: FieldConfig[]
  rows: ResourceRow[]
  titleField: string
  revalidatePaths: string[]
  createDefaults?: Record<string, unknown>
  /** Shown instead of a raw UUID when the primary column is empty. */
  emptyPrimaryLabel?: string
}) {
  const [editing, setEditing] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()
  const layout = buildRowLayout(fields, titleField)

  function report(result: { ok: true } | { ok: false; message: string }, success: string) {
    if (result.ok) {
      toast({ title: success })
    } else {
      toast({ variant: "destructive", title: "Xatolik", description: result.message })
    }
    return result.ok
  }

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      const result = await createRecord(table, fields, formData, revalidatePaths)
      if (report(result, "Qo'shildi")) setCreating(false)
    })
  }

  function handleUpdate(id: string, formData: FormData) {
    startTransition(async () => {
      const result = await updateRecord(table, id, fields, formData, revalidatePaths)
      if (report(result, "Saqlandi")) setEditing(null)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      report(await deleteRecord(table, id, revalidatePaths), "O'chirildi")
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Qo&apos;shish
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Yangi qo&apos;shish</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <ResourceFormFields fields={fields} values={createDefaults} />
              <Button type="submit" disabled={pending} className="w-full">
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                Saqlash
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-sm text-zinc-400">Hozircha yozuv yo&apos;q.</p>
          </div>
        )}

        {rows.map((row) => (
          <Card key={row.id} className="bg-zinc-900/70 border-zinc-800">
            <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
              <RowSummary row={row} layout={layout} emptyPrimaryLabel={emptyPrimaryLabel} />

              <div className="flex shrink-0 items-center gap-2">
                <Dialog
                  open={editing === row.id}
                  onOpenChange={(open) => setEditing(open ? row.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" aria-label="Tahrirlash">
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline">Tahrirlash</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Tahrirlash</DialogTitle>
                    </DialogHeader>
                    <form
                      action={(formData) => handleUpdate(row.id, formData)}
                      className="space-y-4"
                    >
                      <ResourceFormFields fields={fields} values={row} />
                      <Button type="submit" disabled={pending} className="w-full">
                        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Saqlash
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <ConfirmDialog
                  trigger={
                    <Button variant="destructive" size="sm" aria-label="O'chirish">
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">O&apos;chirish</span>
                    </Button>
                  }
                  title="O'chirishni tasdiqlaysizmi?"
                  description="Bu amalni orqaga qaytarib bo'lmaydi."
                  pending={pending}
                  onConfirm={() => handleDelete(row.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
