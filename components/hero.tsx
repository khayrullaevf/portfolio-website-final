import { ArrowUpRight, FileText } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import type {
  getPersonalInfo,
  getAboutInfo,
  getExperienceInfo,
  getSkills,
} from "@/lib/data";

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div className="grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-10">
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:pt-0.5">
        {label}
      </dt>
      <dd className="min-w-0 text-pretty leading-relaxed">{value}</dd>
    </div>
  );
}

/**
 * The first screen, and the page's only <h1>.
 *
 * The claim leads and the name is demoted to an eyebrow, because a 96px name
 * over a paragraph of "Frontend Developer with around 3 years of experience"
 * proves nothing — the evidence was two screens down, in the experience list.
 * The three rows below the claim pull that evidence up, and every one of them
 * is derived from data the page already fetches: no new column carries them.
 *
 * Typography only, no portrait. A hero image has to be a genuinely good one to
 * survive at this scale; the photo lives in the contact block instead.
 *
 * Deliberately a Server Component: the CV is a plain anchor rather than the
 * imperative `document.createElement("a")` dance the old profile card used, so
 * this whole block ships zero JavaScript. The entrance is CSS (`.enter` in
 * globals.css), for the same reason.
 */
export function Hero({
  personalInfo,
  aboutInfo,
  experienceItems,
  skills,
}: {
  personalInfo: Awaited<ReturnType<typeof getPersonalInfo>>;
  aboutInfo: Awaited<ReturnType<typeof getAboutInfo>>;
  experienceItems: Awaited<ReturnType<typeof getExperienceInfo>>;
  skills: Awaited<ReturnType<typeof getSkills>>;
}) {
  // The hero wants the short claim. `bio` is the fallback only until the
  // headline is filled in (0004_about_headline.sql) — once it is, the long form
  // lives in the About block instead of being printed twice.
  const lead = aboutInfo.headline || aboutInfo.bio;

  // A three-line claim carries display size; a four-sentence CV paragraph does
  // not. Size the lead by what it actually is, so the fallback still reads.
  const leadIsShort = lead.length < 180;

  const current = experienceItems.find((item) => item.isActive);

  const past = Array.from(
    new Set(
      experienceItems
        .filter((item) => item !== current && item.company)
        .map((item) => item.company)
    )
  ).slice(0, 4);

  // `level` is the sort key here, same as in skills-list — it decides which six
  // names surface, and never appears on the page as a number.
  //
  // The category filter is load-bearing: "Team Leadership" and "Problem
  // Solving" score high and would otherwise land in a row labelled STACK. If
  // the Soft Skills category is ever renamed in the admin, add the new name
  // here — the row degrades by including them again, it does not break.
  const NON_TECHNICAL = ["soft skills"];

  const stack = skills
    .filter(
      (skill) => !NON_TECHNICAL.includes((skill.category ?? "").toLowerCase())
    )
    .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
    .slice(0, 6)
    .map((skill) => skill.name);

  const status = [
    personalInfo.availableForWork
      ? "Available for new work"
      : "Not currently available",
    personalInfo.location,
    personalInfo.workingHours,
  ].filter(Boolean);

  return (
    <section className="pb-20 pt-32 sm:pt-40">
      <p className="enter enter-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {personalInfo.name}
        {personalInfo.title && (
          <>
            <span aria-hidden> · </span>
            {personalInfo.title}
          </>
        )}
      </p>

      <h1
        className={
          leadIsShort
            ? "enter enter-2 mt-10 max-w-[22ch] text-balance font-display text-display-md"
            : "enter enter-2 mt-10 max-w-[58ch] text-pretty text-xl leading-loose text-foreground/85"
        }
      >
        {lead}
      </h1>

      {(current || past.length > 0 || stack.length > 0) && (
        <dl className="enter enter-3 mt-16 divide-y divide-border border-y border-border">
          {current && (
            <Row
              label="Now"
              value={[current.title, current.company]
                .filter(Boolean)
                .join(" — ")}
            />
          )}
          <Row label="Previously" value={past.join(" · ")} />
          <Row label="Stack" value={stack.join(" · ")} />
        </dl>
      )}

      <p className="enter enter-4 mt-12 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span
          className={
            personalInfo.availableForWork
              ? "h-1.5 w-1.5 rounded-full bg-sand"
              : "h-1.5 w-1.5 rounded-full bg-muted-foreground"
          }
          aria-hidden
        />
        {status.map((part, index) => (
          <span key={part}>
            {index > 0 && <span aria-hidden>· </span>}
            <span
              className={
                index === 0 && personalInfo.availableForWork ? "text-sand" : ""
              }
            >
              {part}
            </span>
          </span>
        ))}
      </p>

      <div className="enter enter-5 mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
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
        <div className="enter enter-6 mt-12">
          <SocialLinks socialLinks={personalInfo.social} />
        </div>
      )}
    </section>
  );
}
