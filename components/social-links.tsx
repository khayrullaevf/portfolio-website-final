import {
  Codepen,
  Dribbble,
  Facebook,
  Github,
  Globe,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Rss,
  Send,
  Twitch,
  Twitter,
  Youtube,
  type LucideProps,
} from "lucide-react"
import type { ComponentType } from "react"

// Named lookup instead of `import * as LucideIcons` — the namespace import
// pulled lucide's entire icon set (~560 kB) into the first-load bundle.
const ICONS: Record<string, ComponentType<LucideProps>> = {
  Codepen,
  Dribbble,
  Facebook,
  Github,
  Globe,
  Instagram,
  Link: LinkIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Rss,
  Send,
  Twitch,
  Twitter,
  Youtube,
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface SocialLinksProps {
  socialLinks: SocialLink[]
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    // No `justify-center`: the caller decides alignment, and everything on this
    // site is left-aligned.
    <ul className="flex flex-wrap items-center gap-5">
      {socialLinks.map((link, index) => {
        const IconComponent = ICONS[link.icon] ?? LinkIcon

        return (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <IconComponent className="h-3.5 w-3.5" aria-hidden />
              {link.platform}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
