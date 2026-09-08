"use server"

import { requireAdminClient } from "@/lib/actions/require-admin"

export async function uploadFile(folder: string, file: File) {
  const supabase = await requireAdminClient()

  const ext = file.name.split(".").pop()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from("portfolio").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from("portfolio").getPublicUrl(path)
  return data.publicUrl
}
