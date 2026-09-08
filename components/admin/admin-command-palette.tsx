import { ADMIN_NAV } from "@/lib/admin/nav"
import { CommandPaletteMount } from "@/components/command-palette-mount"

/**
 * The same ⌘K palette the public site uses, fed the admin sidebar instead.
 *
 * A Server Component wrapper exists only so ADMIN_NAV's icon components — which
 * are not serializable — never cross the boundary: the palette takes labels and
 * hrefs and resolves its own icons.
 */
export function AdminCommandPalette() {
  return (
    <CommandPaletteMount
      adminSections={ADMIN_NAV.map((item) => ({
        label: item.label,
        href: item.href,
      }))}
    />
  )
}
