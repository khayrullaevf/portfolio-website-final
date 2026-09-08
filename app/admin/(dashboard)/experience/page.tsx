import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ResourceCrud } from "@/components/admin/resource-crud"
import type { FieldConfig } from "@/lib/admin/field"

const fields: FieldConfig[] = [
  { key: "title", label: "Lavozim", type: "text", required: true },
  { key: "company", label: "Kompaniya", type: "text", required: true },
  { key: "location", label: "Manzil", type: "text" },
  { key: "period", label: "Davr (masalan Aug 2026 – Present)", type: "text" },
  { key: "description", label: "Tavsif", type: "textarea" },
  { key: "technologies", label: "Texnologiyalar", type: "array" },
  { key: "is_active", label: "Hozirgi ish joyi", type: "boolean" },
  { key: "sort_order", label: "Tartib raqami", type: "number" },
]

export default async function ExperienceAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from("experience").select("*").order("sort_order")

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Ish tajribasi</h1>
      <ResourceCrud
        table="experience"
        fields={fields}
        rows={data ?? []}
        titleField="title"
        revalidatePaths={["/", "/admin/experience"]}
      />
    </div>
  )
}
