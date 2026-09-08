import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ResourceCrud } from "@/components/admin/resource-crud"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FieldConfig } from "@/lib/admin/field"

const certificationFields: FieldConfig[] = [
  { key: "name", label: "Nomi", type: "text", required: true, list: "primary" },
  { key: "issuer", label: "Beruvchi tashkilot", type: "text", list: "secondary" },
  { key: "date", label: "Sana", type: "text", list: "secondary" },
  { key: "logo_url", label: "Logo", type: "image", folder: "logos", list: "thumb" },
  { key: "pdf_url", label: "Sertifikat PDF", type: "image", folder: "certificates" },
  { key: "sort_order", label: "Tartib", type: "number", list: "meta" },
]

const educationFields: FieldConfig[] = [
  { key: "degree", label: "Daraja/Yo'nalish", type: "text", required: true, list: "primary" },
  { key: "institution", label: "Muassasa", type: "text", list: "secondary" },
  { key: "year", label: "Yillar", type: "text", list: "secondary" },
  { key: "logo_url", label: "Logo", type: "image", folder: "logos", list: "thumb" },
  { key: "sort_order", label: "Tartib", type: "number", list: "meta" },
]

export default async function CredentialsAdminPage() {
  const supabase = await createServerSupabaseClient()
  const [{ data: certifications }, { data: education }] = await Promise.all([
    supabase.from("certifications").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
  ])

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Sertifikat / Ta'lim</h1>
      <Tabs defaultValue="certifications">
        <TabsList>
          <TabsTrigger value="certifications">Sertifikatlar</TabsTrigger>
          <TabsTrigger value="education">Ta'lim</TabsTrigger>
        </TabsList>
        <TabsContent value="certifications" className="mt-4">
          <ResourceCrud
            table="certifications"
            fields={certificationFields}
            rows={certifications ?? []}
            titleField="name"
            revalidatePaths={["/", "/admin/credentials"]}
          />
        </TabsContent>
        <TabsContent value="education" className="mt-4">
          <ResourceCrud
            table="education"
            fields={educationFields}
            rows={education ?? []}
            titleField="degree"
            revalidatePaths={["/", "/admin/credentials"]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
