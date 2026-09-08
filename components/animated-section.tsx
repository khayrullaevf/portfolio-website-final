"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { useAnimation } from "@/contexts/animation-context"

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "bounce"

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
  id?: string
  forceAnimate?: boolean
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className,
  threshold = 0.1,
  rootMargin = "-50px",
  id,
  forceAnimate = false,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  })

  const { settings } = useAnimation()
  const shouldAnimate = settings.enabled || forceAnimate

  const actualDelay = (delay * settings.delay) / 100

  // Scale the movement distance by the configured intensity.
  const offset = (baseValue: number) => baseValue * settings.intensity

  const getTransformStyle = () => {
    if (isIntersecting) return "translate3d(0, 0, 0) scale(1)"

    switch (animation) {
      case "fade-up":
        return `translate3d(0, ${offset(10)}px, 0)`
      case "slide-left":
        return `translate3d(-${offset(10)}px, 0, 0)`
      case "slide-right":
        return `translate3d(${offset(10)}px, 0, 0)`
      case "zoom-in":
        return `translate3d(0, 0, 0) scale(${1 - offset(0.05)})`
      case "bounce":
        return `translate3d(0, -${offset(4)}px, 0)`
      default:
        return "translate3d(0, 0, 0)"
    }
  }

  const style = shouldAnimate
    ? {
        transitionProperty: "opacity, transform",
        transitionDuration: `${settings.duration}ms`,
        transitionTimingFunction: settings.easing,
        transitionDelay: actualDelay ? `${actualDelay}ms` : undefined,
        transform: getTransformStyle(),
        opacity: isIntersecting ? 1 : 0,
      }
    : undefined

  return (
    <section ref={ref as any} className={cn(className)} style={style} id={id}>
      {children}
    </section>
  )
}
