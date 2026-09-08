import { createServerSupabaseClient } from "@/lib/supabase/server"
import { SingletonForm } from "@/components/admin/singleton-form"
import type { FieldConfig } from "@/lib/admin/field"

const fields: FieldConfig[] = [
  { key: "name", label: "Ism", type: "text", required: true },
  { key: "title", label: "Lavozim", type: "text", required: true },
  { key: "location", label: "Manzil", type: "text" },
  { key: "avatar_url", label: "Avatar", type: "image", folder: "avatars" },
  { key: "email", label: "Email", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "working_hours", label: "Ish vaqti", type: "text" },
  { key: "available_for_work", label: "Ishga ochiqman", type: "boolean" },
  { key: "badges", label: "Badge'lar", type: "array" },
]

export default async function PersonalAdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from("personal_info").select("*").eq("id", 1).single()

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Shaxsiy ma'lumot</h1>
      <SingletonForm
        table="personal_info"
        fields={fields}
        values={data ?? {}}
        revalidatePaths={["/", "/admin/personal"]}
      />
    </div>
  )
}
