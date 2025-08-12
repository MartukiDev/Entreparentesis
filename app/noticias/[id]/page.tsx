import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// Datos de noticias (normalmente vendrían de una base de datos)
const noticias = [
  {
    id: 1,
    titulo: "Itinerancia del Festival de Teatro de Buin.",
    fecha: "2025-08-09",
    autor: "Lía D'acosta.",
    imagen: "/images_noticias/1.webp",
    resumen: "Desde el año 2023 que la Entreparéntesis se la ha jugado para que el Festival de Teatro de Buin con el afán de descentralizar tenga la previa de una Itinerancia por las localidades de la comuna de Buin. En el 2023 sólo talleres, pero ya el año 2024 también presentaciones teatrales, y este año 2025, volverá la Itinerancia con taller y teatro desde el 29 de septiembre al 03 de octubre.",
    contenido: "La penúltima semana antes del Festival, se realizará la Itinerancia por las localidades de la comuna de Buin. Queriendo llevar el teatro a todos los rincones el recorrido tendrá los siguientes puntos de encuentro: \n- Villa Tierras del Maipo\n- Villa JM Carrera, Alto Jahuel\n- Escuela Los aromos del Recurso \n- Escuela Valdivia de Paine\n- Escuela Viluco.\n\nSe realizará un taller educativo abierto a la comunidad, donde conocerán lo esencial de las técnicas de actuación, como iniciación, y podrán apreciar de forma gratuita la presentación de la obra teatral: \"Ülkan Mapu\", que enseña sobre los instrumentos musicales mapuche y su origen. Un entretenido montaje para toda la familia. \n\nAsí que ya lo sabes si perteneces a estos lugares, infórmate y difunde por tu comunidad, el teatro llega a Buin de forma gratuita, como parte de esta hermosa fiesta cultural, el certamen de las artes escénicas, el XVII Festival de Teatro de Buin 2025."
  },
]

export async function generateStaticParams() {
  return noticias.map((noticia) => ({
    id: noticia.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const noticia = noticias.find(n => n.id === parseInt(id))
  
  if (!noticia) {
    return {
      title: "Noticia no encontrada"
    }
  }

  return {
    title: `${noticia.titulo} | Noticias Entreparéntesis`,
    description: noticia.resumen,
    keywords: `${noticia.titulo}, noticias teatro, Festival de Teatro de Buin, Compañía Entreparéntesis`,
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const noticia = noticias.find(n => n.id === parseInt(id))

  if (!noticia) {
    notFound()
  }

  const fechaFormateada = new Date(noticia.fecha).toLocaleDateString('es-ES', {
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
              src={noticia.imagen}
              alt={noticia.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Encabezado del artículo */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {noticia.titulo}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={noticia.fecha}>{fechaFormateada}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{noticia.autor}</span>
              </div>
            </div>
          </header>

          {/* Resumen */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-lg text-gray-700 font-medium">
              {noticia.resumen}
            </p>
          </div>

          {/* Contenido principal */}
          <div className="prose prose-lg max-w-none">
            {noticia.contenido.split('\n').map((parrafo, index) => (
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
