import type { ReactNode } from "react";

export function SkillTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}
