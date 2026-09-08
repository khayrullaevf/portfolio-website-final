"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Copy,
  ExternalLink,
  FileText,
  LayoutGrid,
  Search,
  Shield,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
// Plain module, no Supabase client — safe to import from a Client Component.
// Never import lib/data here (see the note in lib/nav.ts).
import { getNavItems } from "@/lib/nav";
import { useToast } from "@/hooks/use-toast";

/** Event any component can fire to open the palette without prop-drilling. */
export const OPEN_COMMAND_PALETTE = "open-command-palette";

export interface PaletteProject {
  slug: string;
  title: string;
  category: string;
}

export interface PaletteLink {
  platform: string;
  url: string;
}

export interface CommandPaletteProps {
  projects?: PaletteProject[];
  email?: string;
  cvUrl?: string;
  social?: PaletteLink[];
  /** Admin sidebar entries; only rendered while on an /admin route. */
  adminSections?: { label: string; href: string }[];
}

interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  icon: typeof ArrowRight;
  run: () => void;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * ⌘K / Ctrl+K palette.
 *
 * Built straight on @radix-ui/react-dialog — already a dependency, and the same
 * call components/ui/sheet.tsx and components/admin/confirm-dialog.tsx made —
 * rather than pulling in cmdk for a list and a filter.
 *
 * Every command is derived from serializable props, so the Server Components
 * that mount this never have to ship a callback across the boundary.
 */
export function CommandPalette({
  projects = [],
  email = "",
  cvUrl = "",
  social = [],
  adminSections = [],
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const isAdmin = pathname.startsWith("/admin");

  // ⌘K anywhere, plus the header's search affordance.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const goToSection = useCallback(
    (href: string) => {
      setOpen(false);

      if (pathname !== "/") {
        router.push(href === "/" ? "/" : `/${href}`);
        return;
      }

      const behavior = prefersReducedMotion() ? "auto" : "smooth";

      if (href === "/") {
        window.scrollTo({ top: 0, behavior });
        return;
      }

      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        window.history.replaceState(null, "", href);
      }
    },
    [pathname, router]
  );

  const commands = useMemo<Command[]>(() => {
    const items: Command[] = [];

    if (isAdmin) {
      for (const section of adminSections) {
        items.push({
          id: `admin:${section.href}`,
          label: section.label,
          group: "Admin",
          icon: LayoutGrid,
          run: () => go(section.href),
        });
      }

      items.push({
        id: "admin:site",
        label: "Saytni ochish",
        group: "Admin",
        icon: ExternalLink,
        run: () => go("/"),
      });

      return items;
    }

    for (const item of getNavItems()) {
      items.push({
        id: `section:${item.href}`,
        label: item.label,
        group: "Go to",
        icon: ArrowRight,
        run: () => goToSection(item.href),
      });
    }

    for (const project of projects) {
      items.push({
        id: `project:${project.slug}`,
        label: project.title,
        group: "Projects",
        hint: project.category,
        keywords: project.category,
        icon: LayoutGrid,
        run: () => go(`/projects/${project.slug}`),
      });
    }

    if (email) {
      items.push({
        id: "action:copy-email",
        label: "Copy email address",
        group: "Actions",
        hint: email,
        keywords: "mail contact clipboard",
        icon: Copy,
        run: () => {
          setOpen(false);
          navigator.clipboard
            ?.writeText(email)
            .then(() => toast({ title: "Email copied to clipboard" }))
            .catch(() =>
              toast({
                variant: "destructive",
                title: "Could not copy",
                description: email,
              })
            );
        },
      });
    }

    if (cvUrl) {
      items.push({
        id: "action:cv",
        label: "Download CV",
        group: "Actions",
        keywords: "resume curriculum vitae pdf",
        icon: FileText,
        run: () => {
          setOpen(false);
          window.open(cvUrl, "_blank", "noreferrer");
        },
      });
    }

    for (const link of social) {
      items.push({
        id: `social:${link.url}`,
        label: link.platform,
        group: "Elsewhere",
        hint: "Opens in a new tab",
        icon: ExternalLink,
        run: () => {
          setOpen(false);
          window.open(link.url, "_blank", "noreferrer");
        },
      });
    }

    items.push({
      id: "action:admin",
      label: "Admin panel",
      group: "Actions",
      keywords: "cms edit dashboard",
      icon: Shield,
      run: () => go("/admin"),
    });

    return items;
  }, [adminSections, cvUrl, email, go, goToSection, isAdmin, projects, social, toast]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;

    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""} ${
        command.keywords ?? ""
      }`
        .toLowerCase()
        .includes(needle)
    );
  }, [commands, query]);

  // Reset the cursor whenever the result set changes underneath it.
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Keep the highlighted row inside the scroll box.
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]'
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[activeIndex]?.run();
    }
  }

  // Group headings, in the order the commands were declared.
  const groups = results.reduce<{ group: string; commands: Command[] }[]>(
    (acc, command) => {
      const bucket = acc.find((g) => g.group === command.group);
      if (bucket) bucket.commands.push(command);
      else acc.push({ group: command.group, commands: [command] });
      return acc;
    },
    []
  );

  let cursor = -1;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-label="Command palette"
          className="fixed left-1/2 top-[12vh] z-[90] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 border border-border bg-card shadow-2xl duration-150 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-sm"
        >
          <DialogPrimitive.Title className="sr-only">
            Command palette
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search sections, projects and actions. Use the arrow keys to move
            and Enter to select.
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            {/* autoFocus is correct here: the dialog exists to take this input,
                and Radix restores focus to the trigger on close. */}
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search…"
              aria-label="Search commands"
              role="combobox"
              aria-expanded
              aria-controls="command-palette-list"
              aria-activedescendant={
                results[activeIndex] ? `cmd-${results[activeIndex].id}` : undefined
              }
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div
            ref={listRef}
            id="command-palette-list"
            role="listbox"
            aria-label="Commands"
            className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
          >
            {results.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No matches.
              </p>
            )}

            {groups.map((group) => (
              <div key={group.group} className="mb-1 last:mb-0">
                <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {group.group}
                </p>

                {group.commands.map((command) => {
                  cursor += 1;
                  const index = cursor;
                  const Icon = command.icon;
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={command.id}
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={command.run}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors duration-fast ease-smooth",
                        isActive
                          ? "bg-foreground/[0.07] text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="min-w-0 flex-1 truncate">
                        {command.label}
                      </span>
                      {command.hint && (
                        <span className="shrink-0 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {command.hint}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>↑↓ navigate · ↵ select</span>
            <span>esc close</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
