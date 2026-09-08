"use client"

import { useMemo, useState, useTransition } from "react"
import Image from "next/image"
import { ImageOff, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export interface ResourceRow {
  id: string
  [key: string]: unknown
}

/**
 * Per-resource empty-state copy. Kept here rather than threaded through every
 * call site: the table name already identifies the resource.
 */
const EMPTY_COPY: Partial<Record<ListTable, string>> = {
  social_links: "Hali birorta ijtimoiy tarmoq havolasi qo'shilmagan.",
  languages: "Hali birorta til qo'shilmagan.",
  experience: "Hali birorta ish tajribasi qo'shilmagan.",
  skills: "Hali birorta ko'nikma qo'shilmagan.",
  certifications: "Hali birorta sertifikat qo'shilmagan.",
  education: "Hali birorta ta'lim ma'lumoti qo'shilmagan.",
  projects: "Hali birorta loyiha qo'shilmagan.",
  project_gallery: "Bu loyihada hali galereya rasmi yo'q.",
}

/** Below this many rows a search box is noise, not help. */
const FILTER_THRESHOLD = 6

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
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border bg-card">
          {thumbUrl ? (
            <Image src={thumbUrl} alt="" fill sizes="40px" className="object-cover" />
          ) : (
            <ImageOff className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" />
          )}
        </div>
      )}

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex min-w-0 items-center gap-2">
          {layout.swatch && swatchColor && (
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-border"
              style={{ backgroundColor: swatchColor }}
              aria-hidden
            />
          )}
          <p className="truncate text-sm font-medium">{title}</p>
          {badges.map((f) => (
            <Badge
              key={f.key}
              variant="outline"
              className="shrink-0 border-sand/30 bg-sand/10 font-mono text-[10px] uppercase tracking-[0.1em] text-sand"
            >
              {f.label}
            </Badge>
          ))}
        </div>

        {secondary && (
          <p className="truncate text-xs text-muted-foreground">{secondary}</p>
        )}

        {meta.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
            {meta.map((m) => (
              <span
                key={m.label}
                className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {m.label}: <span className="text-foreground/70">{m.value}</span>
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
  const [query, setQuery] = useState("")
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()
  const layout = buildRowLayout(fields, titleField)

  // Filtering happens over the rows already fetched — the pages select("*"),
  // so narrowing the list costs no extra query and no round trip.
  const visibleRows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return rows

    return rows.filter((row) =>
      fields
        .map((field) => asText(row[field.key]))
        .join(" ")
        .toLowerCase()
        .includes(needle),
    )
  }, [fields, query, rows])

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {query.trim() ? `${visibleRows.length} / ${rows.length}` : `${rows.length} ta yozuv`}
        </p>

        <div className="flex items-center gap-2">
          {rows.length >= FILTER_THRESHOLD && (
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Qidirish…"
                aria-label="Ro'yxatdan qidirish"
                className="h-9 w-44 pl-8 text-base sm:w-52 sm:text-sm"
              />
            </div>
          )}

          <Dialog open={creating} onOpenChange={setCreating}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Qo&apos;shish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
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
      </div>

      {rows.length === 0 && (
        <div className="border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            {EMPTY_COPY[table] ?? "Hozircha yozuv yo'q."}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Yuqoridagi &laquo;Qo&apos;shish&raquo; tugmasi bilan boshlang
          </p>
        </div>
      )}

      {rows.length > 0 && visibleRows.length === 0 && (
        <div className="border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            &laquo;{query.trim()}&raquo; bo&apos;yicha hech narsa topilmadi.
          </p>
        </div>
      )}

      {visibleRows.length > 0 && (
        <ul className="divide-y divide-border border-y border-border">
          {visibleRows.map((row) => (
            <li key={row.id} className="flex items-center gap-3 py-3 sm:gap-4">
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
                  <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
