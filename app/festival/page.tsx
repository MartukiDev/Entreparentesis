import Image from "next/image"
import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"
import CarouselVertical from "@/components/ui/carousel-vertical"

// This would typically come from a database or CMS
const festivalEditions = [
  {
    id: 1,
    title: "XIV Festival de Teatro de Buin (2022)",
    imageSrc: "/images/carrousel-festival/2022_1.webp",
    description: "14.ª edición del Festival de teatro de Buin."
  },
  {
    id: 2,
    title: "XV Festival de Teatro de Buin (2023)",
    imageSrc: "/images/carrousel-festival/2023_1.webp",
    description: "15.ª edición del Festival de teatro de Buin.",
  },
  {
    id: 3,
    title: "XVI Festival de Teatro de Buin (2024)",
    imageSrc: "/images/carrousel-festival/2024_1.webp",
    description: "16.ª edición del Festival de teatro de Buin.",
  },
]

// Images for the vertical carousel in the announcement section
const festivalImages = [
  {
    id: 1,
    title: "Festival 2025 - Imagen 1",
    imageSrc: "/images/carrousel-festival-section/1.webp",
  },
  {
    id: 2,
    title: "Festival 2025 - Imagen 2",
    imageSrc: "/images/carrousel-festival-section/2.webp",
  },
  {
    id: 3,
    title: "Festival 2025 - Imagen 3",
    imageSrc: "/images/carrousel-festival-section/3.webp",
  },
  {
    id: 4,
    title: "Festival 2025 - Imagen 4",
    imageSrc: "/images/carrousel-festival-section/4.webp",
  },
  {
    id: 5,
    title: "Festival 2025 - Imagen 5",
    imageSrc: "/images/carrousel-festival-section/5.webp",
  },
  {
    id: 6,
    title: "Festival 2025 - Imagen 6",
    imageSrc: "/images/carrousel-festival-section/6.webp",
  },
  {
    id: 7,
    title: "Festival 2025 - Imagen 7",
    imageSrc: "/images/carrousel-festival-section/7.webp",
  },
]

export default function FestivalPage() {
  return (
    <div className="bg-white">
      <HeroSection
        title="Festival de Teatro de Buin"
        subtitle="Un espacio para la creación y el encuentro teatral"
        imageSrc="/images/festivaldeteatro.webp"
        imageAlt="Festival de Teatro de Buin"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="🎭 XVII Festival de Teatro de Buin - 2025 🎭"
            subtitle="Desde el 14 al 18 de octubre."
          />

          <div className="grid md:grid-cols-2 gap-12 items-center justify-center mb-12 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-6 text-justify">
               Nos emociona anunciar que este año se celebrará la 17ª edición del Festival de Teatro de Buin, 
               un espacio que reúne lo mejor de las artes escénicas en la zona sur de la Región Metropolitana. 
              </p>
              <p className="text-gray-600 mb-6 text-justify">
              Agradecemos profundamente a todas las compañías que postularon sus montajes. Actualmente, estamos en proceso de evaluación y curaduría de las obras.
              📬 Les recordamos que las respuestas oficiales serán enviadas directamente al correo electrónico registrado en la postulación.
              </p>
              <p className="text-gray-600 mb-6 text-justify">
              A su derecha, encontrará fotos de montajes teatrales que participaron en ediciones anteriores del Festival de Teatro de Buin.
              Reviva algunos de los momentos más destacados y sienta la esencia de nuestro escenario.
              </p>
              <p className="text-gray-600 mb-6 text-justify">
              ¡Estén atentos y atentas! Muy pronto compartiremos más novedades de esta gran fiesta teatral.
              </p>

             
            </div>

            <div className="flex justify-center">
              <CarouselVertical 
                items={festivalImages} 
                autoPlay={true}
                interval={4000}
                showControls={true}
                showIndicators={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Historia del Festival" />

          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-gray-600 mb-4">
              El Festival de Teatro de Buin nació en 2018 como una iniciativa de la Compañía Arte Entreparéntesis para
              crear un espacio de encuentro, difusión y formación teatral en la zona sur de la Región Metropolitana. Lo
              que comenzó como un pequeño evento local con cinco compañías participantes, se ha convertido en un
              referente cultural que atrae a artistas y público de todo el país.
            </p>
            <p className="text-gray-600 mb-4">
              A lo largo de sus cinco ediciones anteriores, el festival ha presentado más de 60 obras de teatro, ha
              realizado más de 20 talleres formativos y ha convocado a un público estimado de 15.000 personas. Además,
              ha generado importantes vínculos con instituciones educativas, organizaciones culturales y empresas
              locales, creando una red de colaboración que fortalece el desarrollo cultural de la comuna.
            </p>
            <p className="text-gray-600">
              El festival se ha adaptado a diversos desafíos, incluyendo la realización de una edición completamente
              virtual durante la pandemia en 2020, demostrando su capacidad de innovación y resiliencia. Cada año,
              buscamos ampliar nuestro alcance y mejorar la experiencia tanto para los artistas participantes como para
              el público asistente.
            </p>
          </div>

          <SectionTitle title="Ediciones Anteriores" />

          <div className="mb-12">
            <Carousel items={festivalEditions} />
          </div>
        </div>
      </section>
    </div>
  )
}

