"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OPEN_COMMAND_PALETTE } from "@/lib/command-palette-event";
import type { CommandPaletteProps } from "@/components/command-palette";

// The palette itself — Radix Dialog, the command list, the filter — is worth
// about 14 kB on first load and nobody sees it until they ask for it. This
// mount keeps only the key listener eagerly, and pulls the rest in on the first
// ⌘K or trigger click. Same call components/contact-form-lazy.tsx makes.
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function CommandPaletteMount(props: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  // Sticky: once loaded, keep it mounted so reopening is instant.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setLoaded(true);
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => {
      setLoaded(true);
      setOpen(true);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, []);

  if (!loaded) return null;

  return <CommandPalette {...props} open={open} onOpenChange={setOpen} />;
}
