"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import MemberCard from "./member-card"

interface TeamMember {
  id: string
  name: string
  role: string
  imageSrc: string
  description: string
}

interface TeamSectionProps {
  title: string
  description?: string
  members: TeamMember[]
  collapsible?: boolean
}

export default function TeamSection({ title, description, members, collapsible = false }: TeamSectionProps) {
  const [isOpen, setIsOpen] = useState(!collapsible)

  return (
    <div className="mb-16">
      <div
        className={`flex justify-between items-center mb-6 ${collapsible ? "cursor-pointer" : ""}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {collapsible && (
          <ChevronDown className={`h-6 w-6 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        )}
      </div>

      {description && <p className="text-gray-600 mb-8 max-w-3xl">{description}</p>}

      {(isOpen || !collapsible) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              description={member.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}

