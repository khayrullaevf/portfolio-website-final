import type { getAboutInfo } from "@/lib/data";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 py-6 first:pt-0 md:grid-cols-[9rem_1fr] md:gap-10">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pt-1">
        {label}
      </dt>
      <dd className="text-pretty leading-relaxed">{children}</dd>
    </div>
  );
}

/**
 * The half of the old profile card worth keeping: focus, interests, languages.
 *
 * Deliberately unheadlined — the hero above it already introduces the person,
 * so this is a quiet metadata block rather than a second "About me" section.
 * The languages lost their percentage bars: "Uzbek — Native" is the fact; a
 * bar at 95% was decoration pretending to be data.
 */
export function AboutSection({
  aboutInfo,
}: {
  aboutInfo: Awaited<ReturnType<typeof getAboutInfo>>;
}) {
  const { focus, interests, languages } = aboutInfo;

  if (focus.length === 0 && interests.length === 0 && languages.length === 0) {
    return null;
  }

  return (
    <section
      id="about"
      aria-label="About"
      className="reveal scroll-mt-24 border-t border-border pt-12"
    >
      <dl className="divide-y divide-border">
        {focus.length > 0 && <Row label="Focus">{focus.join(" · ")}</Row>}

        {languages.length > 0 && (
          <Row label="Languages">
            {languages
              .map((language) =>
                [language.name, language.proficiency].filter(Boolean).join(" — ")
              )
              .join(" · ")}
          </Row>
        )}

        {interests.length > 0 && (
          <Row label="Interests">{interests.join(" · ")}</Row>
        )}
      </dl>
    </section>
  );
}
