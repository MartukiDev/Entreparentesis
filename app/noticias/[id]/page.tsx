import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { getNewsBySlug, getPublishedNews } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export async function generateStaticParams() {
  const cmsNews = await getPublishedNews()
  return cmsNews.map((noticia) => ({ id: noticia.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const noticia = await getNewsBySlug(id)
  
  if (!noticia) {
    return {
      title: "Noticia no encontrada"
    }
  }

  return {
    title: `${noticia.title || "Noticia"} | Noticias Entreparéntesis`,
    description: noticia.summary,
    keywords: `${noticia.title}, noticias teatro, Festival de Teatro de Buin, Compañía Entreparéntesis`,
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const noticia = (await getNewsBySlug(id)) || null

  if (!noticia) {
    notFound()
  }

  const fechaFormateada = new Date(noticia.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/noticias"
          className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a noticias
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Imagen principal */}
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={resolvePublicImage(noticia.image_path, "/placeholder.svg")}
              alt={noticia.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Encabezado del artículo */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {noticia.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={noticia.published_at}>{fechaFormateada}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{noticia.author}</span>
              </div>
            </div>
          </header>

          {/* Resumen */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-lg text-gray-700 font-medium">
              {noticia.summary}
            </p>
          </div>

          {/* Contenido principal */}
          <div className="prose prose-lg max-w-none">
            {noticia.content.split('\n').map((parrafo, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {parrafo}
              </p>
            ))}
          </div>

          {/* Botón de vuelta */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/noticias"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ver más noticias
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
