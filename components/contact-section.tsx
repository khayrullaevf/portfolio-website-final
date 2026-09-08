import Image from "next/image"
import { ContactFormLazy } from "@/components/contact-form-lazy";
import { SocialLinks } from "@/components/social-links";
import type { getPersonalInfo } from "@/lib/data";

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  if (!value) return null;

  return (
    <div className="grid gap-1.5 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 break-words">
        {href ? (
          <a
            href={href}
            className="rounded-sm outline-none transition-colors duration-fast ease-smooth hover:text-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/**
 * The form no longer lives inside a `max-h-[500px] overflow-y-auto` box — a
 * scroll container nested in a scrolling page, which made the message field
 * fight the viewport on every screen it was supposed to help.
 */
export function ContactSection({
  personalInfo,
}: {
  personalInfo: Awaited<ReturnType<typeof getPersonalInfo>>;
}) {
  return (
    <div className="space-y-12">
      <p className="max-w-measure text-pretty leading-relaxed text-muted-foreground">
        I&apos;m open to new projects and roles. Send a message, or reach me
        directly — either way it lands in the same inbox.
      </p>

      {/* The portrait lives here rather than in the hero: at this size it is a
          detail beside the contact details, not the thing the page opens on. */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-8">
        {personalInfo.avatar && (
          <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden border border-border bg-card sm:w-32">
            <Image
              src={personalInfo.avatar}
              alt={`Portrait of ${personalInfo.name}`}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        )}

        <dl className="min-w-0 flex-1 divide-y divide-border border-y border-border">
          <Detail
            label="Email"
            value={personalInfo.email}
            href={personalInfo.email ? `mailto:${personalInfo.email}` : undefined}
          />
          <Detail
            label="Phone"
            value={personalInfo.phone}
            href={personalInfo.phone ? `tel:${personalInfo.phone}` : undefined}
          />
          <Detail label="Location" value={personalInfo.location} />
          <Detail label="Hours" value={personalInfo.workingHours} />
        </dl>
      </div>

      {personalInfo.social.length > 0 && (
        <SocialLinks socialLinks={personalInfo.social} />
      )}

      <div className="border-t border-border pt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Send a message
        </h3>
        <div className="mt-8">
          <ContactFormLazy />
        </div>
      </div>
    </div>
  );
}
