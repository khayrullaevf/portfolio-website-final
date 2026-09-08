"use client"

import { useState, useEffect } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface Skill {
  name: string
  level: number
  category: string
  color: string
}

export function SkillsProgressSection({ skills }: { skills: Skill[] }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  })

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 border-b border-zinc-700/50 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill, index) => (
                  <SkillProgressBar 
                    key={skill.name} 
                    skill={skill} 
                    delay={index * 50} 
                    animate={isIntersecting} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface SkillProgressBarProps {
  skill: Skill
  delay: number
  animate: boolean
}

function SkillProgressBar({ skill, delay, animate }: SkillProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= skill.level) {
              clearInterval(interval)
              return skill.level
            }
            return prev + 2
          })
        }, 20)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [animate, skill.level, delay])

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 backdrop-blur-sm border border-zinc-700/50 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-white text-sm">{skill.name}</h4>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-cyan-400">{progress}%</span>
        </div>
      </div>

      <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  )
}