"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createBrowserSupabaseClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError("Email yoki parol noto'g'ri")
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return (
    <main id="main" className="flex min-h-screen items-center justify-center p-5">
      {/* No card: a hairline and whitespace, same as the public site. */}
      <div className="w-full max-w-sm">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-sand font-display text-xl text-primary-foreground">
          F
        </span>

        <h1 className="mt-6 font-display text-3xl">Admin kirish</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Portfolio kontentini boshqarish uchun kiring.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 border-t border-border pt-8">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              Email
            </Label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 text-base sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              Parol
            </Label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 pr-10 text-base sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Kirilmoqda..." : "Kirish"}
          </Button>
        </form>
      </div>
    </main>
  )
}
