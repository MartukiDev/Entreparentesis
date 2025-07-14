import Image from "next/image"
import { Clock } from "lucide-react"

interface RadioSectionCardProps {
  title: string
  imageSrc: string
  description: string
  schedule: string
  linkfanpage: string
}

export default function RadioSectionCard({ title, imageSrc, description, schedule, linkfanpage }: RadioSectionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-red-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{schedule}</span>
          </div>
          <a 
            href={linkfanpage}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Fanpage
          </a>
        </div>
      </div>
    </div>
  )
}
