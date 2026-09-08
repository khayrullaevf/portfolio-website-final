"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";

/**
 * Opens the palette by dispatching a window event, so nothing has to share
 * state with it — the header and the admin sidebar both use this without
 * either of them knowing the palette exists.
 */
export function CommandPaletteTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
      aria-label="Buyruqlar oynasini ochish"
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Search className="h-3 w-3" aria-hidden />
      <span aria-hidden>⌘K</span>
    </button>
  );
}
