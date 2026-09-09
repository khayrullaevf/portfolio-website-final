"use client"

import { useMemo, useState } from "react"
import { Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
  category: string
  color: string
}

export function SkillsProgressSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const groupedSkills = useMemo(() => {
    const groups = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)

    Object.values(groups).forEach((categorySkills) => categorySkills.sort((a, b) => b.level - a.level))
    return groups
  }, [skills])

  const categories = Object.keys(groupedSkills)
  const visibleSkills = activeCategory ? groupedSkills[activeCategory] ?? [] : skills

  if (skills.length === 0) return null

  return (
    <Card className="bg-zinc-900/70 border-zinc-800">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <Code2 className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">Skills & Expertise</h3>
        </div>

        <AnimatedSection animation="fade-up">
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                activeCategory === null
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                  : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:border-zinc-600",
              )}
            >
              Barchasi
              <span className="ml-1 opacity-60">{skills.length}</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                  activeCategory === category
                    ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                    : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:border-zinc-600",
                )}
              >
                {category}
                <span className="ml-1 opacity-60">{groupedSkills[category].length}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs hover:border-cyan-500/40 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: skill.color }} />
                {skill.name}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </CardContent>
    </Card>
  )
}
