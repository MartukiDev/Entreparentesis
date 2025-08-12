import { Metadata } from "next"
import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import NewsCard from "@/components/noticias/news-card"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Noticias | Compañía de Teatro Entreparéntesis",
  description: "Últimas noticias y novedades de la Compañía de Teatro Entreparéntesis y el Festival de Teatro de Buin.",
  keywords: "noticias teatro, Festival de Teatro de Buin noticias, Compañía Entreparéntesis actualidad",
}

// Datos de ejemplo de noticias - normalmente vendrían de una base de datos o CMS
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


export default function NoticiasPage() {
  return (
    <>
      <Script
        id="schema-noticias"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "Noticias de la Compañía de Teatro Entreparéntesis",
            "description": "Últimas noticias y novedades del Festival de Teatro de Buin y la Compañía Entreparéntesis",
            "publisher": {
              "@type": "Organization",
              "name": "Compañía de Teatro Entreparéntesis",
              "url": "https://www.entreparentesis.cl"
            }
          })
        }}
      />
      
      <div className="bg-white">
        <HeroSection
          title="Noticias y Actualidad"
          subtitle="Mantente informado sobre las últimas novedades de nuestra compañía y el Festival de Teatro de Buin"
          imageSrc="/images/hero-foto.webp"
          imageAlt="Noticias Compañía de Teatro Entreparéntesis"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Últimas Noticias" 
              subtitle="Descubre las novedades más recientes de nuestra compañía"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {noticias.map((noticia) => (
                <NewsCard key={noticia.id} noticia={noticia} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
