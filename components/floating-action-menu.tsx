"use client"

import { useState } from "react"
import { Plus, Mail, Github, Linkedin, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:fazliddin@example.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/fazliddin",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/fazliddin",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: MessageCircle,
      label: "Contact",
      href: "#contact",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-20 right-6 z-40">
      {/* Menu Items */}
      <div
        className={`flex flex-col-reverse gap-3 mb-4 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={`group relative transition-all duration-300 ${isOpen ? "delay-" + (index * 50) : ""}`}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
          >
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} hover:scale-110 transition-all duration-200 shadow-lg`}
            >
              <item.icon className="h-5 w-5 text-white" />
            </Button>

            {/* Tooltip */}
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {item.label}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-800" />
            </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={toggleMenu}
        size="icon"
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg transition-all duration-300 ${
          isOpen ? "rotate-45 scale-110" : "rotate-0 scale-100"
        }`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
      </Button>
    </div>
  )
}
