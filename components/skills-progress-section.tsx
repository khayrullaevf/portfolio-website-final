import { Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

interface Skill {
  name: string
  level: number
  category: string
  color: string
}

export function SkillsProgressSection({ skills }: { skills: Skill[] }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  Object.values(groupedSkills).forEach((categorySkills) => categorySkills.sort((a, b) => b.level - a.level))

  return (
    <Card className="bg-zinc-900/70 border-zinc-800">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Code2 className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">Technical Skills</h3>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
            <AnimatedSection key={category} animation="fade-up" delay={index * 100}>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-zinc-200 border-b border-zinc-800 pb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs sm:text-sm hover:border-cyan-500/40 transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: skill.color }} />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
