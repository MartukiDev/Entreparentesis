import Image from "next/image"
import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"

// This would typically come from a database or CMS
const festivalEditions = [
  {
    id: 1,
    title: "I Festival de Teatro de Buin (2018)",
    imageSrc: "/images/1.jpg",
    description: "Primera edición con 5 compañías participantes",
  },
  {
    id: 2,
    title: "II Festival de Teatro de Buin (2019)",
    imageSrc: "/images/2.jpg",
    description: "Segunda edición con 8 compañías de la Región Metropolitana",
  },
  {
    id: 3,
    title: "III Festival de Teatro de Buin (2020)",
    imageSrc: "/images/3.jpg",
    description: "Edición virtual debido a la pandemia, con 10 compañías participantes",
  },
  {
    id: 4,
    title: "IV Festival de Teatro de Buin (2021)",
    imageSrc: "/images/4.jpg",
    description: "Formato híbrido con funciones presenciales y transmisiones online",
  },
  {
    id: 5,
    title: "V Festival de Teatro de Buin (2022)",
    imageSrc: "/images/5.jpg",
    description: "Retorno a la presencialidad con 12 compañías de todo Chile",
  },
]

export default function FestivalPage() {
  return (
    <div className="bg-white">
      <HeroSection
        title="Festival de Teatro de Buin"
        subtitle="Un espacio para la creación y el encuentro teatral"
        imageSrc="/images/festivaldeteatro.jpg"
        imageAlt="Festival de Teatro de Buin"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Próxima Edición: VI Festival de Teatro de Buin"
            subtitle="Del 15 al 22 de octubre de 2023"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="text-gray-600 mb-6">
                Nos complace anunciar la sexta edición de nuestro Festival de Teatro, que se realizará en octubre de
                2023. Este año contaremos con la participación de 15 compañías teatrales de todo Chile, presentando una
                variada programación que incluye teatro clásico, contemporáneo, familiar y experimental.
              </p>
              <p className="text-gray-600 mb-6">
                Además de las funciones teatrales, el festival ofrecerá talleres, conversatorios y actividades paralelas
                para toda la comunidad. Las presentaciones se realizarán en diversos espacios de la comuna de Buin,
                incluyendo el Teatro Municipal, la Plaza de Armas y centros culturales.
              </p>
            </div>

            <div className="relative h-96">
              <Image
                src="/images/poster.png"
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

