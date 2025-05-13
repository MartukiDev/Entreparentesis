import Image from "next/image"
import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"

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
            title="Próxima Edición: DÉCIMO SÉPTIMO FESTIVAL DE TEATRO DE BUIN 2025"
            subtitle="Desde el 14 al 18 de octubre."
          />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="text-gray-600 mb-6">
              Nos complace anunciar que las Bases del Décimo Séptimo Festival de Teatro de Buin, 
              serán lanzadas en el contexto del Día Nacional del Teatro, que celebraremos con un 
              Seminario de Dramaturgia y la presentación de una de nuestras obras de teatro mapuche: 
              El hombre y la lluvia.  Este año, como cada año participarán 10 compañías teatrales de Chile,
              presentando una variada programación. 
              </p>
              <p className="text-gray-600 mb-6">
              Además de las funciones teatrales, el festival ofrecerá talleres, conversatorios y actividades paralelas para toda la comunidad. Las presentaciones
              se realizarán en diversos espacios de la comuna de Buin, incluyendo el Teatro Municipal, la Plaza de Armas y establecimientos educacionales.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://drive.google.com/drive/u/1/folders/1o8gMRkmT0qotWXrjGieaAVzcjOFqjBUY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors"
                >
                  ¡Descarga las bases aquí!
                </a>
              </div>
            </div>

            <div className="relative h-96">
              <Image
                src="/images/foto-section-festival.webp"
                alt="Afiche del VI Festival de Teatro de Buin"
                fill
                className="object-contain"
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

