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
    <div className="flex justify-center gap-2 sm:gap-3 my-2 sm:my-3">
      {socialLinks.map((link, index) => {
        const IconComponent = ICONS[link.icon] ?? LinkIcon

        return (
          <a
            key={index}
            href={link.url}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label={link.platform}
          >
            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        )
      })}
    </div>
  )
}
