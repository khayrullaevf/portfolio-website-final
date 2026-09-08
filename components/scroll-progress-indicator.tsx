"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null)
  // Mounted by the root layout, which also wraps /admin — but a reading-progress
  // bar makes no sense over a dashboard, where it just overlays the sidebar.
  const isAdmin = usePathname().startsWith("/admin")

  useEffect(() => {
    if (isAdmin) return

    let frame = 0

    // Write the width straight to the DOM instead of through state, so
    // scrolling never triggers a React re-render.
    const updateScrollProgress = () => {
      frame = 0
      const bar = barRef.current
      if (!bar) return

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0

      bar.style.width = `${percent}%`
      bar.setAttribute("aria-valuenow", String(Math.round(percent)))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(updateScrollProgress)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    updateScrollProgress()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [isAdmin])

  if (isAdmin) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-cyan-500 to-blue-500"
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </div>
  )
}
