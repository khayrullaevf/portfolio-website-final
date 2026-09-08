"use server"

import { requireAdminClient } from "@/lib/actions/require-admin"

export type UploadResult = { ok: true; url: string } | { ok: false; message: string }

export async function uploadFile(folder: string, file: File): Promise<UploadResult> {
  try {
    const supabase = await requireAdminClient()

    const ext = file.name.split(".").pop()
    const path = `${folder}/${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage.from("portfolio").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })
    if (error) return { ok: false, message: error.message }

    const { data } = supabase.storage.from("portfolio").getPublicUrl(path)
    return { ok: true, url: data.publicUrl }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : String(error) }
  }
}
