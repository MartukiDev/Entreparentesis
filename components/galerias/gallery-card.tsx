"use client"
import Link from "next/link"
import ImageWithLoader from "@/components/ui/image-with-loader"

interface GalleryCardProps {
  id: string
  title: string
  coverImage: string
  description: string
  imageCount: number
}

export default function GalleryCard({
  id,
  title,
  coverImage,
  description,
  imageCount,
}: GalleryCardProps) {
  return (
    <Link href={`/galerias/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative h-64">
          {/* Usamos ImageWithLoader aquí */}
          <ImageWithLoader
            src={coverImage || "/placeholder.svg"}
            alt={title}
          />
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white px-3 py-1 text-sm">
            {imageCount} fotos
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}


