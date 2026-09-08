import { ProjectCard } from "@/components/project-card";
import { WorkArchive } from "@/components/work-archive";
import type { Project } from "@/lib/projects";

/**
 * Two tiers of work.
 *
 * Featured projects get a full block each; the rest become a compact archive
 * table, so a long project list stops flattening everything into equal weight.
 * Until the `featured` column is filled in (0003_project_case_study.sql), the
 * first three projects by sort_order stand in — the section is never empty.
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const flagged = projects.filter((project) => project.featured);
  const featured = flagged.length > 0 ? flagged : projects.slice(0, 3);
  const featuredSlugs = new Set(featured.map((project) => project.slug));
  const archive = projects.filter((project) => !featuredSlugs.has(project.slug));

  return (
    <div className="space-y-20">
      {featured.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {archive.length > 0 && <WorkArchive projects={archive} />}
    </div>
  );
}
