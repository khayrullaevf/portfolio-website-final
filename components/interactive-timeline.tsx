"use client"

import { useState } from "react"
import { Calendar, MapPin, Building } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  isActive?: boolean
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Team Lead & Frontend Developer",
    company: "Freelance Projects",
    location: "Tashkent, Uzbekistan",
    period: "May 2025 – Present",
    description:
      "Founded and lead a 6-person cross-functional team (3 Java backend, 1 frontend developer) delivering full-stack web solutions. Architected scalable frontend systems using Next.js, React, TypeScript and TailwindCSS. Led cross-functional team of 6 developers, architected scalable frontend systems, and directed project planning and code review processes.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Team Leadership"],
    isActive: true,
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "TenzorSoft",
    location: "Tashkent, Uzbekistan",
    period: "Feb 2025 – Aug 2025",
    description:
      "Engineered complex platforms (logistics, warehouse management, university portals) using React/Next.js/Angular. Integrated payment systems and SMS services. Developed logistics and warehouse management platforms, integrated Payme, Click payment systems, and optimized API performance achieving 30% faster response times.",
    technologies: ["React", "Next.js", "Angular", "Payme", "Click", "Eskiz"],
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "UzbekGidroEnergo",
    location: "Tashkent, Uzbekistan",
    period: "Feb 2024 – Jan 2025",
    description:
      "Developed real-time water aggregation and reservoir monitoring dashboards with Angular, Tailwind CSS, and Ant Design. Collaborated with backend team to digitize hydro infrastructure operations. Built real-time monitoring dashboards for water management, implemented data visualization for reservoir analytics, and digitized hydro infrastructure operations.",
    technologies: ["Angular", "Tailwind CSS", "Ant Design", "Data Visualization", "Real-time Systems"],
  },
]

export function InteractiveTimeline() {
  const [activeItem, setActiveItem] = useState<string>(timelineData[0].id)

  return (
    <div className="py-16 bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
          Professional Journey
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line - faqat katta ekranlarda ko'rinadi */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative md:pl-20 cursor-pointer transition-all duration-300 ${
                    activeItem === item.id ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  {/* Timeline Dot - faqat katta ekranlarda ko'rinadi */}
                  <div
                    className={`absolute left-6 w-4 h-4 rounded-full border-2 transition-all duration-300 hidden md:block ${
                      activeItem === item.id
                        ? "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50"
                        : item.isActive
                          ? "bg-blue-500 border-blue-400"
                          : "bg-zinc-600 border-zinc-500"
                    }`}
                  >
                    {activeItem === item.id && (
                      <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`bg-zinc-800/50 rounded-lg p-6 backdrop-blur-sm border transition-all duration-300 ${
                      activeItem === item.id
                        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : "border-zinc-700/50 hover:border-zinc-600/50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <div className="flex items-center text-cyan-400 mb-2">
                          <Building className="w-4 h-4 mr-2" />
                          {item.company}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end text-sm text-zinc-400">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {item.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-300 mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-zinc-700/50 text-cyan-400 rounded-full text-sm border border-zinc-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}