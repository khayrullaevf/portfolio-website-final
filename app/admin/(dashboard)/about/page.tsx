import { createServerSupabaseClient } from "@/lib/supabase/server"
import { SingletonForm } from "@/components/admin/singleton-form"
import { ResourceCrud } from "@/components/admin/resource-crud"
import type { FieldConfig } from "@/lib/admin/field"

const aboutFields: FieldConfig[] = [
  { key: "bio", label: "Bio", type: "textarea", required: true },
  { key: "focus", label: "Fokus yo'nalishlari", type: "array" },
  { key: "interests", label: "Qiziqishlar", type: "array" },
]

const languageFields: FieldConfig[] = [
  { key: "name", label: "Til nomi", type: "text", required: true, list: "primary" },
  { key: "proficiency", label: "Daraja (matn)", type: "text", list: "secondary" },
  { key: "level", label: "Daraja (%)", type: "number", list: "meta" },
  { key: "flag", label: "Bayroq", type: "text", list: "meta" },
  { key: "sort_order", label: "Tartib", type: "number", list: "meta" },
]

export default async function AboutAdminPage() {
  const supabase = await createServerSupabaseClient()
  const [{ data: about }, { data: languages }] = await Promise.all([
    supabase.from("about_info").select("*").eq("id", 1).single(),
    supabase.from("languages").select("*").order("sort_order"),
  ])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold mb-4">Men haqimda</h1>
        <SingletonForm
          table="about_info"
          fields={aboutFields}
          values={about ?? {}}
          revalidatePaths={["/", "/admin/about"]}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Tillar</h2>
        <ResourceCrud
          table="languages"
          fields={languageFields}
          rows={languages ?? []}
          titleField="name"
          revalidatePaths={["/", "/admin/about"]}
        />
      </div>
    </div>
  )
}
