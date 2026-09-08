import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * Everything that isn't featured, as a hairline table.
 *
 * `year` is its own column rather than a slice of `timeline`, which holds prose
 * ("Ongoing", "8 months (Q1-Q3 2023)") and would sort meaninglessly. Rows with
 * no year still line up — the column just renders empty.
 */
export function WorkArchive({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Archive
      </h3>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 rounded-sm py-5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[4rem_1fr_auto_1rem] sm:gap-6"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                {project.year}
              </span>

              <span className="truncate transition-colors duration-fast ease-smooth group-hover:text-sand">
                {project.title}
              </span>

              <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:block">
                {project.category}
              </span>

              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 self-center text-muted-foreground transition-all duration-fast ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sand"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
