import type { getExperienceInfo } from "@/lib/data";

/**
 * Replaces the old interactive timeline.
 *
 * The click-to-expand state it used to carry had no keyboard path (an onClick
 * on a bare <div>) and hid content behind an interaction nobody asked for.
 * Everything is visible at once now, which also makes this a Server Component:
 * one less bundle on the critical path.
 */
export function ExperienceList({
  items,
}: {
  items: Awaited<ReturnType<typeof getExperienceInfo>>;
}) {
  if (items.length === 0) return null;

  return (
    <ol className="divide-y divide-border border-b border-border">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid gap-3 py-8 first:pt-0 md:grid-cols-[9rem_1fr] md:gap-10"
        >
          <div className="space-y-2 md:pt-1.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {item.period}
            </p>
            {item.isActive && (
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-sand">
                <span className="h-1.5 w-1.5 rounded-full bg-sand" aria-hidden />
                Current
              </p>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg leading-snug">
              {item.title}
              {item.company && (
                <>
                  <span className="text-muted-foreground"> — </span>
                  <span className="text-muted-foreground">{item.company}</span>
                </>
              )}
            </h3>

            {item.location && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {item.location}
              </p>
            )}

            {item.description && (
              <p className="mt-4 max-w-measure text-pretty leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}

            {item.technologies?.length > 0 && (
              <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                {item.technologies.join(" · ")}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
