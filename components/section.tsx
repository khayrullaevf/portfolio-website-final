import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The one section shell every home-page block uses.
 *
 * Structure comes from a hairline rule and whitespace, not from a card. The id
 * is load-bearing: lib/nav.ts and the command palette both jump to these
 * anchors, so the set of ids must not drift.
 */
export function Section({
  id,
  label,
  title,
  children,
  className,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("reveal scroll-mt-24 border-t border-border pt-16", className)}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>

      <h2 id={`${id}-title`} className="mt-4 font-display text-display-sm">
        {title}
      </h2>

      <div className="mt-12">{children}</div>
    </section>
  );
}
