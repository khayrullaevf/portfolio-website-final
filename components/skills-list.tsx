import type { getSkills } from "@/lib/data";

type Skills = Awaited<ReturnType<typeof getSkills>>;

/**
 * Replaces the animated percentage bars.
 *
 * A self-assigned "React 92%" tells a reader nothing they can act on, so the
 * numbers are gone from the page entirely — `level` now only decides the order
 * within a category, and the old component's uncleared setInterval goes with it.
 */
export function SkillsList({ skills }: { skills: Skills }) {
  if (skills.length === 0) return null;

  // Preserve first-seen category order (sort_order from the query), then sort
  // within each group by level descending — the one surviving use of `level`.
  const groups: { category: string; items: Skills }[] = [];

  for (const skill of skills) {
    const category = skill.category || "Other";
    const bucket = groups.find((g) => g.category === category);
    if (bucket) bucket.items.push(skill);
    else groups.push({ category, items: [skill] });
  }

  for (const group of groups) {
    group.items.sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
  }

  return (
    <dl className="divide-y divide-border border-b border-border">
      {groups.map((group) => (
        <div
          key={group.category}
          className="grid gap-3 py-6 first:pt-0 md:grid-cols-[9rem_1fr] md:gap-10"
        >
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pt-1">
            {group.category}
          </dt>
          <dd className="text-pretty leading-relaxed">
            {group.items.map((skill, index) => (
              <span key={skill.name}>
                {index > 0 && (
                  <span className="text-muted-foreground" aria-hidden>
                    {" · "}
                  </span>
                )}
                {skill.name}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
