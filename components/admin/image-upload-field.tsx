"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { FileText, Loader2, Upload, X } from "lucide-react"
import { uploadFile } from "@/lib/actions/upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

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
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const isPdf = url.toLowerCase().endsWith(".pdf")

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const result = await uploadFile(folder, file)
      if (result.ok) {
        setUrl(result.url)
        toast({ title: "Yuklandi" })
      } else {
        toast({ variant: "destructive", title: "Yuklanmadi", description: result.message })
      }
    } finally {
      setUploading(false)
      // Let the same file be re-picked after a failure.
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`${name}-file`}>{label}</Label>
      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900/50 p-2">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border border-zinc-800 bg-zinc-800/50">
            {isPdf ? (
              <FileText className="absolute inset-0 m-auto h-5 w-5 text-zinc-400" />
            ) : (
              <Image src={url} alt="" fill sizes="48px" className="object-cover" />
            )}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate text-xs text-zinc-400 underline hover:text-cyan-400"
          >
            {url.split("/").pop()}
          </a>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label="Faylni olib tashlash"
            onClick={() => setUrl("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          id={`${name}-file`}
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="text-base file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-2 file:py-1 file:text-xs file:text-zinc-300 sm:text-sm"
        />
        {uploading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-zinc-400" />
        ) : (
          <Upload className="h-4 w-4 shrink-0 text-zinc-600" />
        )}
      </div>
    </div>
  )
}
