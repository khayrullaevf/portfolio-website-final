"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function EnhancedScrollIndicator() {
  // Only visibility lives in state — it flips once, unlike the scroll percentage.
  const [isVisible, setIsVisible] = useState(false)
  const circleRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress))
      }
      if (labelRef.current) {
        labelRef.current.textContent = `${Math.min(Math.round(progress * 100), 100)}%`
      }

      setIsVisible(scrollTop > 100)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    update()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800/80 cursor-pointer hover:bg-zinc-700/80 transition-colors"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 48 48" className="w-full h-full absolute top-0 left-0 -rotate-90">
            <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#27272a" strokeWidth="2" />
            <circle
              ref={circleRef}
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="url(#scroll-gradient)"
              strokeWidth="2"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="scroll-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          <span className="absolute inset-0 flex items-center justify-center">
            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
          </span>
        </button>

        <div
          ref={labelRef}
          className="mt-1 sm:mt-2 text-xs font-medium bg-zinc-800/80 text-white px-2 py-1 rounded-md"
        >
          0%
        </div>
      </div>
    </div>
  )
}
