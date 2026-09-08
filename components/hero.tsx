import { ArrowUpRight, FileText } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import type { getPersonalInfo, getAboutInfo } from "@/lib/data";

/**
 * The first screen, and the page's only <h1>.
 *
 * Deliberately a Server Component: the CV is a plain anchor rather than the
 * imperative `document.createElement("a")` dance the old profile card used, so
 * this whole block ships zero JavaScript.
 */
export function Hero({
  personalInfo,
  aboutInfo,
}: {
  personalInfo: Awaited<ReturnType<typeof getPersonalInfo>>;
  aboutInfo: Awaited<ReturnType<typeof getAboutInfo>>;
}) {
  const meta = [personalInfo.location, personalInfo.workingHours].filter(
    Boolean
  );

  return (
    <section className="flex min-h-[86vh] flex-col justify-center pb-16 pt-24">
      {personalInfo.title && (
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {personalInfo.title}
        </p>
      )}

      <h1 className="text-display-lg font-display text-balance">
        {personalInfo.name}
      </h1>

      {aboutInfo.bio && (
        <p className="mt-8 max-w-measure text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {aboutInfo.bio}
        </p>
      )}

      {meta.length > 0 && (
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {meta.join(" · ")}
        </p>
      )}

      <p className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
        <span
          className={
            personalInfo.availableForWork
              ? "h-1.5 w-1.5 rounded-full bg-sand"
              : "h-1.5 w-1.5 rounded-full bg-muted-foreground"
          }
          aria-hidden
        />
        <span
          className={
            personalInfo.availableForWork ? "text-sand" : "text-muted-foreground"
          }
        >
          {personalInfo.availableForWork
            ? "Available for new work"
            : "Not currently available"}
        </span>
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        {personalInfo.cvUrl && (
          <a
            href={personalInfo.cvUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm border-b border-sand/40 pb-1 text-sm text-sand outline-none transition-colors duration-fast ease-smooth hover:border-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <FileText className="h-4 w-4" />
            Curriculum vitae
          </a>
        )}

        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-1.5 rounded-sm border-b border-border pb-1 text-sm outline-none transition-colors duration-fast ease-smooth hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {personalInfo.email}
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-fast ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>

      {personalInfo.social.length > 0 && (
        <div className="mt-10">
          <SocialLinks socialLinks={personalInfo.social} />
        </div>
      )}
    </section>
  );
}
