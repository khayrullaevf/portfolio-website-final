import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 sm:px-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>

      <h1 className="mt-4 font-display text-display-md">Project not found</h1>

      <p className="mt-6 max-w-measure text-pretty leading-relaxed text-muted-foreground">
        This case study doesn&apos;t exist, or it has moved since you last saw
        the link.
      </p>

      <Link
        href="/#projects"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm border-b border-sand/40 pb-1 text-sm text-sand outline-none transition-colors duration-fast ease-smooth hover:border-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All work
      </Link>
    </main>
  )
}
