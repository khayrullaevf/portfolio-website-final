"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    content:
      "Fazliddin delivered exceptional frontend solutions for our warehouse management system. His attention to detail and technical expertise made our project a huge success.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "CTO at LogiFlow",
    content:
      "Working with Fazliddin was a game-changer. His leadership skills and React expertise helped us build a scalable logistics platform that exceeded our expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Developer at EduTech",
    content:
      "Fazliddin's work on our education CRM was outstanding. His ability to integrate complex systems and lead the team made the project seamless and efficient.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  return (
    <AnimatedSection animation="fade-up" id="testimonials">
      <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <Quote className="w-5 h-5 mr-2 text-cyan-400" />
            <h3 className="text-lg font-medium">Client Testimonials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="zoom-in" delay={100 * (index + 1)}>
                <Card className="bg-zinc-800/50 border-zinc-700 h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-zinc-700 mr-3 flex items-center justify-center">
                        <span className="text-sm font-medium">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{testimonial.name}</p>
                        <p className="text-xs text-zinc-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
