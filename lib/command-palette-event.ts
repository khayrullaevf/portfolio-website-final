/**
 * Event any component can fire to open the ⌘K palette.
 *
 * It lives in its own module so a trigger button can import the name without
 * importing the palette itself — the palette is loaded on demand, and pulling
 * it in for a string constant would defeat that.
 */
export const OPEN_COMMAND_PALETTE = "open-command-palette"
