"use client"

import { useState, useTransition } from "react"
import type { FieldConfig } from "@/lib/admin/field"
import type { SingletonTable } from "@/lib/actions/crud"
import { updateSingleton } from "@/lib/actions/crud"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { Button } from "@/components/ui/button"

export function SingletonForm({
  table,
  fields,
  values,
  revalidatePaths,
}: {
  table: SingletonTable
  fields: FieldConfig[]
  values: Record<string, unknown>
  revalidatePaths: string[]
}) {
  const [pending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateSingleton(table, fields, formData, revalidatePaths)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-xl">
      <ResourceFormFields fields={fields} values={values} />
      <Button type="submit" disabled={pending}>
        Saqlash
      </Button>
      {saved && <p className="text-sm text-green-500">Saqlandi</p>}
    </form>
  )
}
