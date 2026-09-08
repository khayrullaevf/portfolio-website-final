"use client"

import dynamic from "next/dynamic"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// The form drags in react-hook-form + zod, so keep it out of the initial
// bundle and only load it once the contact section is actually approached.
const ContactForm = dynamic(() => import("@/components/contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <ContactFormSkeleton />,
})

function ContactFormSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="h-16 rounded-sm bg-muted" />
        <div className="h-16 rounded-sm bg-muted" />
      </div>
      <div className="h-16 rounded-sm bg-muted" />
      <div className="h-40 rounded-sm bg-muted" />
      <div className="h-10 w-40 rounded-sm bg-muted" />
    </div>
  )
}

export function ContactFormLazy() {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin: "200px",
    freezeOnceVisible: true,
  })

  return <div ref={ref as any}>{isIntersecting ? <ContactForm /> : <ContactFormSkeleton />}</div>
}
