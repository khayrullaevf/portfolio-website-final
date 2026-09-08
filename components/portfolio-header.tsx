"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OPEN_COMMAND_PALETTE } from "@/lib/command-palette-event";
import { CommandPaletteTrigger } from "@/components/command-palette-trigger";
// Never import from lib/data here: that module builds a Supabase client, and a
// value import would pull @supabase/supabase-js (~80 kB gz) into this bundle.
import { getNavItems } from "@/lib/nav";
import type { getPersonalInfo } from "@/lib/data";

export function PortfolioHeader({
  personalInfo,
}: {
  personalInfo: Awaited<ReturnType<typeof getPersonalInfo>>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = getNavItems();

  // A hairline appears once the page has moved. One cheap scroll listener,
  // no layout reads beyond scrollY.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver rather than measuring every section on
  // every scroll frame. The band keeps whichever section owns the upper third
  // of the viewport marked as current.
  useEffect(() => {
    const ids = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.slice(1));

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  // Lock the page behind the mobile panel while it is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isCurrent = (href: string) =>
    href === "/" ? activeSection === "" : activeSection === href.slice(1);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-base ease-smooth",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="whitespace-nowrap rounded-sm font-display text-base leading-none tracking-[0.01em] outline-none transition-colors duration-fast ease-smooth hover:text-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {personalInfo.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isCurrent(item.href) ? "true" : undefined}
              className={cn(
                "rounded-sm px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] outline-none transition-colors duration-fast ease-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isCurrent(item.href)
                  ? "text-sand"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CommandPaletteTrigger className="hidden md:inline-flex" />

          <button
            type="button"
            className="rounded-sm p-1 text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-opacity duration-base ease-smooth md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="font-display text-lg leading-none">
            {personalInfo.name}
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="rounded-sm p-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? undefined : -1}
              className={cn(
                "rounded-sm border-b border-border py-4 font-display text-2xl outline-none transition-colors duration-fast ease-smooth focus-visible:text-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isCurrent(item.href) ? "text-sand" : "hover:text-sand"
              )}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            tabIndex={menuOpen ? undefined : -1}
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE));
            }}
            className="flex items-center gap-3 rounded-sm border-b border-border py-4 text-left font-display text-2xl outline-none transition-colors duration-fast ease-smooth hover:text-sand focus-visible:text-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search
          </button>
        </nav>
      </div>
    </header>
  );
}
