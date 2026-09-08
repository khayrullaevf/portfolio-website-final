import { createServerSupabaseClient } from "@/lib/supabase/server"
import { SingletonForm } from "@/components/admin/singleton-form"
import type { FieldConfig } from "@/lib/admin/field"

const fields: FieldConfig[] = [
  { key: "title", label: "Sayt sarlavhasi (SEO title)", type: "text", required: true },
  { key: "description", label: "Sayt tavsifi (SEO description)", type: "textarea" },
]

export default async function MetaAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from("meta_info").select("*").eq("id", 1).single()

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">SEO / Meta</h1>
      <SingletonForm
        table="meta_info"
        fields={fields}
        values={data ?? {}}
        revalidatePaths={["/", "/admin/meta"]}
      />
    </div>
  )
}
