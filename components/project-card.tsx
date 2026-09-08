import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * A featured project, as an editorial block rather than a thumbnail tile.
 *
 * The old card showed a cover image and a title and nothing else, which made
 * every project look interchangeable. This one leads with the work: category,
 * title, the one-line pitch, and the stack.
 */
export function ProjectCard({ project }: { project: Project }) {
  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-card">
        <Image
          src={project.coverImage || project.thumbnailImage || "/placeholder.svg"}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover transition-transform duration-slow ease-smooth group-hover:scale-[1.02]"
        />
      </div>

      {meta && (
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {meta}
        </p>
      )}

      <h3 className="mt-2 font-display text-3xl leading-tight transition-colors duration-fast ease-smooth group-hover:text-sand">
        {project.title}
      </h3>

      {project.shortDescription && (
        <p className="mt-3 max-w-measure text-pretty leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
      )}

      {project.technologies.length > 0 && (
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          {project.technologies.slice(0, 6).join(" · ")}
        </p>
      )}

      <span className="mt-5 inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-sm text-sand transition-colors duration-fast ease-smooth group-hover:border-sand">
        Read case study
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-fast ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
