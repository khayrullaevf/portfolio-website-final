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
    <div className="space-y-6 animate-pulse" aria-hidden="true">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-16 rounded-md bg-zinc-800/60" />
        <div className="h-16 rounded-md bg-zinc-800/60" />
      </div>
      <div className="h-16 rounded-md bg-zinc-800/60" />
      <div className="h-32 rounded-md bg-zinc-800/60" />
      <div className="h-10 w-32 rounded-md bg-zinc-800/60" />
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
