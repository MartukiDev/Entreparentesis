import SectionTitle from "@/components/ui/section-title"
import GalleryCard from "@/components/galerias/gallery-card"

// This would typically come from a database or CMS
const galleries = [
  {
    id: "festival-2022",
    title: "V Festival de Teatro de Buin (2022)",
    coverImage: "/placeholder.svg?height=600&width=800",
    description:
      "Imágenes de las presentaciones, talleres y actividades del V Festival de Teatro de Buin realizado en octubre de 2022.",
    imageCount: 24,
  },
  {
    id: "la-tempestad-2023",
    title: "La Tempestad (2023)",
    coverImage: "/placeholder.svg?height=600&width=800",
    description:
      "Fotografías del proceso de montaje y presentaciones de nuestra adaptación de La Tempestad de William Shakespeare.",
    imageCount: 18,
  },
  {
    id: "el-jardin-de-los-cerezos-2022",
    title: "El Jardín de los Cerezos (2022)",
    coverImage: "/placeholder.svg?height=600&width=800",
    description: "Registro fotográfico de nuestra adaptación contemporánea de la obra clásica de Antón Chéjov.",
    imageCount: 15,
  },
  {
    id: "talleres-2022",
    title: "Talleres de Formación Teatral (2022)",
    coverImage: "/placeholder.svg?height=600&width=800",
    description:
      "Imágenes de los talleres de formación teatral realizados durante el año 2022 para niños, jóvenes y adultos.",
    imageCount: 30,
  },
  {
    id: "gira-regional-2021",
    title: "Gira Regional (2021)",
    coverImage: "/placeholder.svg?height=600&width=800",
    description:
      "Fotografías de nuestra gira por diversas comunas de la Región Metropolitana durante el segundo semestre de 2021.",
    imageCount: 22,
  },
  {
    id: "ensayos-y-procesos",
    title: "Ensayos y Procesos Creativos",
    coverImage: "/placeholder.svg?height=600&width=800",
    description: "Una mirada al trabajo interno de la compañía: ensayos, procesos creativos y preparación de montajes.",
    imageCount: 40,
  },
]

export default function GalleryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Galerías Fotográficas"
          subtitle="Explora el registro visual de nuestras producciones y actividades"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <GalleryCard
              key={gallery.id}
              id={gallery.id}
              title={gallery.title}
              coverImage={gallery.coverImage}
              description={gallery.description}
              imageCount={gallery.imageCount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

