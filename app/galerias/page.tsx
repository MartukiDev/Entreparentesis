import SectionTitle from "@/components/ui/section-title"
import GalleryCard from "@/components/galerias/gallery-card"

// This would typically come from a database or CMS
const galleries = [
  {
    id: "festival-2023",
    title: "XV Festival de Teatro de Buin (2023)",
    coverImage: "/galery/festival2023/1.webp",
    description:
      "Imágenes de las presentaciones, talleres y actividades del XV Festival de Teatro de Buin realizado en 2023.",
    imageCount: 38,
  },
  {
    id: "festival-2022",
    title: "XIV Festival de Teatro de Buin (2022)",
    coverImage: "/galery/festival2022/1.webp",
    description:
      "Imágenes de las presentaciones, talleres y actividades del XIV Festival de Teatro de Buin realizado en 2022.",
    imageCount: 55,
  },
  {
    id: "festival-2024",
    title: "XVI Festival de Teatro de Buin (2024)",
    coverImage: "/galery/festival2024/4.webp",
    description: "Imágenes de las presentaciones, talleres y actividades del XII Festival de Teatro de Buin realizado en 2024.",
    imageCount: 68,
  },
  {
    id: "talleres",
    title: "Talleres de Formación Teatral",
    coverImage: "/galery/talleres/1.webp",
    description:
      "Imágenes de los talleres de formación teatral realizados por la compañía",
    imageCount: 37,
  },
  {
    id: "angue-pangue",
    title: "Angë Pangue",
    coverImage: "/galery/angue-pangue/41.webp",
    description:
      "Fotografías de la obra de teatro 'Angë Pangue', una producción de la compañía.",
    imageCount: 86,
  },
  {
    id: "foto-sintesis",
    title: "Foto Síntesis",
    coverImage: "/galery/foto-sintesis/7.webp",
    description: "Fotografías de la obra de teatro 'Foto Síntesis', una producción de la compañía.",
    imageCount: 49,
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

