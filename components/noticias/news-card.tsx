import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

interface Noticia {
  id: number
  titulo: string
  resumen: string
  contenido: string
  fecha: string
  imagen: string
  autor: string
}

interface NewsCardProps {
  noticia: Noticia
}

export default function NewsCard({ noticia }: NewsCardProps) {
  // Formatear fecha
  const fechaFormateada = new Date(noticia.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={noticia.imagen}
          alt={noticia.titulo}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={noticia.fecha}>{fechaFormateada}</time>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-1" />
          <span>{noticia.autor}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {noticia.titulo}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {noticia.resumen}
        </p>
        
        <Link 
          href={`/noticias/${noticia.id}`}
          className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
        >
          Leer más
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
