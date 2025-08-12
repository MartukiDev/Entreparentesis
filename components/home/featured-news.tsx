import Link from "next/link"
import NewsCard from "@/components/noticias/news-card"
import SectionTitle from "@/components/ui/section-title"

// Últimas noticias para mostrar en la página principal
const noticiasDestacadas = [
  {
    id: 1,
    titulo: "Itinerancia del Festival de Teatro de Buin.",
    fecha: "2025-08-09",
    autor: "Lía D'acosta.",
    imagen: "/images_noticias/1.webp",
    resumen: "Desde el año 2023 que la Entreparéntesis se la ha jugado para que el Festival de Teatro de Buin con el afán de descentralizar tenga la previa de una Itinerancia por las localidades de la comuna de Buin. En el 2023 sólo talleres, pero ya el año 2024 también presentaciones teatrales, y este año 2025, volverá la Itinerancia con taller y teatro desde el 29 de septiembre al 03 de octubre.",
    contenido: "La penúltima semana antes del Festival, se realizará la Itinerancia por las localidades de la comuna de Buin. Queriendo llevar el teatro a todos los rincones el recorrido tendrá los siguientes puntos de encuentro: \n- Villa Tierras del Maipo\n- Villa JM Carrera, Alto Jahuel\n- Escuela Los aromos del Recurso \n- Escuela Valdivia de Paine\n- Escuela Viluco.\n\nSe realizará un taller educativo abierto a la comunidad, donde conocerán lo esencial de las técnicas de actuación, como iniciación, y podrán apreciar de forma gratuita la presentación de la obra teatral: \"Ülkan Mapu\", que enseña sobre los instrumentos musicales mapuche y su origen. Un entretenido montaje para toda la familia. \n\nAsí que ya lo sabes si perteneces a estos lugares, infórmate y difunde por tu comunidad, el teatro llega a Buin de forma gratuita, como parte de esta hermosa fiesta cultural, el certamen de las artes escénicas, el XVII Festival de Teatro de Buin 2025."
  }
]

export default function FeaturedNews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Últimas Noticias" 
          subtitle="Mantente informado sobre las novedades de nuestra compañía"
        />
        
        <div className="flex justify-center mb-8">
          <div className="max-w-md">
            {noticiasDestacadas.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/noticias"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Ver todas las noticias
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
