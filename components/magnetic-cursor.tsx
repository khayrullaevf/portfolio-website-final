"use client"

import { useEffect, useRef } from "react"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = "1"
      cursorDot.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = "0"
      cursorDot.style.opacity = "0"
    }

    const handleMouseDown = () => {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(0.8)`
    }

    const handleMouseUp = () => {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`
    }

    const animateCursor = () => {
      const speed = 0.15
      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

      requestAnimationFrame(animateCursor)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    animateCursor()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-full h-full border-2 border-cyan-400/50 rounded-full animate-pulse" />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
