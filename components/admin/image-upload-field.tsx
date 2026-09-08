"use client"

import { useState } from "react"
import { uploadFile } from "@/lib/actions/upload"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ImageUploadField({
  name,
  label,
  folder,
  defaultValue,
}: {
  name: string
  label: string
  folder: string
  defaultValue?: string
}) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const publicUrl = await uploadFile(folder, file)
      setUrl(publicUrl)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} />
      <Input type="file" accept="image/*,.pdf" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p className="text-xs text-zinc-400">Yuklanmoqda...</p>}
      {url && (
        <p className="text-xs text-zinc-400 break-all">
          Joriy: <a href={url} target="_blank" rel="noreferrer" className="underline">{url}</a>
        </p>
      )}
    </div>
  )
}
