"use client"

import { useTransition } from "react"
import { Loader2, Save } from "lucide-react"
import type { FieldConfig } from "@/lib/admin/field"
import type { SingletonTable } from "@/lib/actions/crud"
import { updateSingleton } from "@/lib/actions/crud"
import { ResourceFormFields } from "@/components/admin/resource-form-fields"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateSingleton(table, fields, formData, revalidatePaths)

      if (result.ok) {
        toast({ title: "Saqlandi" })
      } else {
        toast({ variant: "destructive", title: "Saqlanmadi", description: result.message })
      }
    })
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <ResourceFormFields fields={fields} values={values} />
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Saqlash
      </Button>
    </form>
  )
}
