import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react"
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  getPersonalInfo,
} from "@/lib/data"
import { PortfolioHeader } from "@/components/portfolio-header"
import { CommandPaletteMount } from "@/components/command-palette-mount"
import { SiteFooter } from "@/components/site-footer"
import { SkillTag } from "@/components/skill-tag"

export const revalidate = 60

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  }
}

/** A titled block that renders nothing when it has nothing to say. */
function Block({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="reveal border-t border-border pt-10">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item, index) => (
        <li key={index} className="grid gap-3 py-4 md:grid-cols-[2rem_1fr] md:gap-6">
          <span className="font-mono text-[11px] text-muted-foreground md:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="max-w-measure text-pretty leading-relaxed">{item}</p>
        </li>
      ))}
    </ul>
  )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const [relatedProjects, personalInfo, allProjects] = await Promise.all([
    getRelatedProjects(params.slug),
    getPersonalInfo(),
    getAllProjects(),
  ])

  const meta = [
    project.role && { label: "Role", value: project.role },
    project.timeline && { label: "Timeline", value: project.timeline },
    { label: "Client", value: project.client || "Personal project" },
    project.year && { label: "Year", value: project.year },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <>
      <PortfolioHeader personalInfo={personalInfo} />

      <main id="main" className="grain relative mx-auto max-w-3xl px-5 sm:px-6">
        <div className="pt-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All work
          </Link>
        </div>

        <header className="pb-14 pt-10">
          {project.category && (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </p>
          )}

          <h1 className="mt-4 text-balance font-display text-display-md">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="mt-6 max-w-measure text-pretty text-lg leading-relaxed text-muted-foreground">
              {project.shortDescription}
            </p>
          )}

          {meta.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {/* Paired with the project card's [data-vt] on the home page. Unique on
            this page, which is what makes the morph fire at all. */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-card"
          style={{ viewTransitionName: `project-cover-${project.slug}` }}
        >
          <Image
            src={project.coverImage || project.thumbnailImage || "/placeholder.svg"}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="space-y-16 py-16">
          {project.problem && (
            <Block label="Problem">
              <p className="max-w-measure text-pretty leading-relaxed">
                {project.problem}
              </p>
            </Block>
          )}

          {project.approach.length > 0 && (
            <Block label="Approach">
              <Points items={project.approach} />
            </Block>
          )}

          {project.tradeoffs.length > 0 && (
            <Block label="Tradeoffs">
              <Points items={project.tradeoffs} />
            </Block>
          )}

          {project.impact.length > 0 && (
            <Block label="Impact">
              <Points items={project.impact} />
            </Block>
          )}

          {project.description.length > 0 && (
            <Block label="Overview">
              <div className="max-w-measure space-y-4 text-pretty leading-relaxed text-muted-foreground">
                {project.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Block>
          )}

          {project.features.length > 0 && (
            <Block label="What it does">
              <ul className="max-w-measure space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sand" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <Block label="Gallery">
              <div className="space-y-8">
                {project.gallery.map((image, index) => (
                  <figure key={index}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-card">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.caption || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </div>
                    {image.caption && (
                      <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Block>
          )}

          {project.technologies.length > 0 && (
            <Block label="Stack">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <SkillTag key={tech}>{tech}</SkillTag>
                ))}
              </div>
            </Block>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <Block label="Links">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border-b border-sand/40 pb-1 text-sm text-sand outline-none transition-colors duration-fast ease-smooth hover:border-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Live site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border-b border-border pb-1 text-sm outline-none transition-colors duration-fast ease-smooth hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    Source code
                  </a>
                )}
              </div>
            </Block>
          )}

          {relatedProjects.length > 0 && (
            <Block label="More work">
              <ul className="divide-y divide-border border-y border-border">
                {relatedProjects.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/projects/${related.slug}`}
                      className="group flex items-baseline justify-between gap-4 rounded-sm py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="min-w-0 truncate transition-colors duration-fast ease-smooth group-hover:text-sand">
                        {related.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        {related.category}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-fast ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        <SiteFooter name={personalInfo.name} email={personalInfo.email} />
      </main>

      <CommandPaletteMount
        projects={allProjects.map((item) => ({
          slug: item.slug,
          title: item.title,
          category: item.category,
        }))}
        email={personalInfo.email}
        cvUrl={personalInfo.cvUrl}
        social={personalInfo.social.map((link) => ({
          platform: link.platform,
          url: link.url,
        }))}
      />
    </>
  )
}
