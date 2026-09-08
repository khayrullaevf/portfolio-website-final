"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Bo&apos;limni yuklab bo&apos;lmadi</h2>
        <p className="max-w-sm text-sm text-zinc-400">
          Ma&apos;lumotlarni olishda xatolik yuz berdi. Internet aloqasini tekshirib, qayta urinib
          ko&apos;ring.
        </p>
      </div>
      <Button onClick={reset} variant="secondary" size="sm">
        <RotateCw className="h-4 w-4" />
        Qayta urinish
      </Button>
    </div>
  )
}
