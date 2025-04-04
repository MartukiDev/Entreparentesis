import Image from "next/image"

interface MemberCardProps {
  name: string
  role: string
  imageSrc: string
  description: string
}

export default function MemberCard({ name, role, imageSrc, description }: MemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image src={imageSrc || "/placeholder.svg"} alt={`${name} - ${role}`} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-red-600 mb-4">{role}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

