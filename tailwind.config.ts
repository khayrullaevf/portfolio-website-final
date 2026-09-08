import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // The three families are loaded in app/layout.tsx via next/font and
      // handed over as CSS variables, so nothing here fetches a font.
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        // Editorial display scale. Fluid, so the hero never needs breakpoints.
        //
        // Tracking is zero-to-positive, not negative. Negative tracking is a
        // sans-serif convention — Inter and friends are wide by default and
        // want tightening at display sizes. Instrument Serif is already a
        // condensed, high-contrast face; pulling it tighter jammed the letters
        // together ("Frontend" read as one blot). Larger sizes need less of it
        // than smaller ones, hence the scale below.
        "display-sm": ["clamp(1.875rem, 4vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "0.02em" }],
        "display-md": ["clamp(2.5rem, 7vw, 4rem)", { lineHeight: "1.08", letterSpacing: "0.015em" }],
        "display-lg": ["clamp(3rem, 11vw, 6rem)", { lineHeight: "1.02", letterSpacing: "0.005em" }],
      },
      maxWidth: {
        // Reading measure for body copy; the shell column is max-w-3xl.
        measure: "68ch",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        /** The single brand accent. Also mirrored into --primary/--ring. */
        sand: "hsl(var(--sand))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      // Motion tokens. Three durations, one easing — see app/globals.css.
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
