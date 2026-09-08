import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ResourceCrud } from "@/components/admin/resource-crud"
import type { FieldConfig } from "@/lib/admin/field"

const fields: FieldConfig[] = [
  { key: "name", label: "Nomi", type: "text", required: true, list: "primary" },
  { key: "level", label: "Daraja", type: "number", list: "meta" },
  { key: "category", label: "Kategoriya", type: "text", list: "secondary" },
  {
    key: "color",
    label: "Rang (masalan #61DAFB yoki tailwind class)",
    type: "text",
    list: "swatch",
  },
  { key: "sort_order", label: "Tartib", type: "number", list: "meta" },
]

export default async function SkillsAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from("skills").select("*").order("sort_order")

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Ko'nikmalar</h1>
      <ResourceCrud
        table="skills"
        fields={fields}
        rows={data ?? []}
        titleField="name"
        revalidatePaths={["/", "/admin/skills"]}
      />
    </div>
  )
}
