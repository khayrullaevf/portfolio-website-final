import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ResourceCrud } from "@/components/admin/resource-crud"
import type { FieldConfig } from "@/lib/admin/field"

const fields: FieldConfig[] = [
  { key: "platform", label: "Platforma (masalan GitHub)", type: "text", required: true },
  { key: "url", label: "URL", type: "text", required: true },
  { key: "icon", label: "Ikonka nomi (lucide-react, masalan Github)", type: "text" },
  { key: "sort_order", label: "Tartib raqami", type: "number" },
]

export default async function SocialAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from("social_links").select("*").order("sort_order")

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Ijtimoiy tarmoqlar</h1>
      <ResourceCrud
        table="social_links"
        fields={fields}
        rows={data ?? []}
        titleField="platform"
        revalidatePaths={["/", "/admin/social"]}
      />
    </div>
  )
}
