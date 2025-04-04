import Image from "next/image"
import Link from "next/link"

interface PlayCardProps {
  id: string
  title: string
  imageSrc: string
  description: string
  year: string
  director: string
}

export default function PlayCard({ id, title, imageSrc, description, year, director }: PlayCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {year} • Dirección: {director}
        </p>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Link href={`/obras/${id}`} className="text-red-600 font-medium hover:text-red-800 transition-colors">
          Leer más →
        </Link>
      </div>
    </div>
  )
}

