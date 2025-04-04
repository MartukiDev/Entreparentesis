import Link from "next/link"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"

const featuredPlays = [
  {
    id: 1,
    title: "Candado de Estrellas",
    imageSrc: "/images/candado-de-estrellas.jpg",
    description: "Obra de Teatro que explora el daltonismo y la percepción del color.",
  },
  {
    id: 2,
    title: "Cuando la musica se acaba",
    imageSrc: "/images/cuando-la-musica-se-acaba.jpg",
    description: "Obra que habla de la importancia de las influencias musicales de los años 90.",
  },
  {
    id: 3,
    title: "¿Hay selva en chile?",
    imageSrc: "/images/hay-selva-en-chile.jpg",
    description: "Un avión cae en el sur de Chile y dos estudiantes junto a su profesor y piloto deben buscar la forma de sobrevivir.",
  },
  {
    id: 4,
    title: "Foto-Síntesis",
    imageSrc: "/images/foto-sintesis.webp",
    description: "Veronica y su encrucijada por el viaje en el tiempo.",
  },
]

export default function FeaturedPlays() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-1">
        <SectionTitle title="Obras Destacadas" />

        <div className="mb-12">
          <Carousel items={featuredPlays} />
        </div>

        <div className="text-center">
          <Link
            href="/obras"
            className="inline-block rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
          >
            Conoce nuestras obras
          </Link>
        </div>
      </div>
    </section>
  )
}

