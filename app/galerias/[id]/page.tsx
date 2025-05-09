import SectionTitle from "@/components/ui/section-title"
import ImageGallery from "@/components/ui/image-gallery"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Mock data - in a real app, this would come from a database or CMS
const galleries = {
  "festival-2023": {
    title: "XV Festival de Teatro de Buin (2023)",
    description:
      "Imágenes de las presentaciones, talleres y actividades del XV Festival de Teatro de Buin realizado en 2023.",
    images: Array.from({ length: 38 }, (_, i) => ({
      id: `festival-2022-${i}`,
      src: `/galery/festival2023/${i + 1}.webp`,
      alt: `Festival de Teatro de Buin 2023 - Imagen ${i + 1}`,
    })),
  },
  "festival-2022": {
    title: "XIV Festival de Teatro de Buin (2022)",
    description:
      "Imágenes de las presentaciones, talleres y actividades del XIV Festival de Teatro de Buin realizado en 2022.",
    images: Array.from({ length: 55 }, (_, i) => ({
      id: `festival-2023-${i}`,
      src: `/galery/festival2022/${i + 1}.webp`,
      alt: `Festival de Teatro de Buin 2022 - Imagen ${i + 1}`,
    })),
  },
  "festival-2024": {
    title: "XVI Festival de Teatro de Buin (2024)",
    description: "Imágenes de las presentaciones, talleres y actividades del XIII Festival de Teatro de Buin realizado en 2024.",
    images: Array.from({ length: 68 }, (_, i) => ({
      id: `festival-2021-${i}`,
      src: `/galery/festival2024/${i + 1}.webp`,
      alt: `Festival de Teatro de Buin 2024 - Imagen ${i + 1}`,
    })),
  },
  "talleres": {
    title: "Talleres de Formación Teatral",
    description:
      "Imágenes de los talleres de formación teatral realizados por la compañía",
    images: Array.from({ length: 37 }, (_, i) => ({
      id: `talleres-${i}`,
      src: `/galery/talleres/${i + 1}.webp`,
      alt: `Talleres de Formación Teatral - Imagen ${i + 1}`,
    })),
  },
  "angue-pangue": {
    title: "Angë Pangue",
    description:
      "Fotografías de la obra de teatro 'Angë Pangue', una producción de la compañía.",
    images: Array.from({ length: 86 }, (_, i) => ({
      id: `angue-pangue-${i}`,
      src: `/galery/angue-pangue/${i + 1}.webp`,
      alt: `Angë Pangue - Imagen ${i + 1}`,
    })),
  },
  "foto-sintesis": {
    title: "Foto Síntesis",
    description: "Fotografías de la obra de teatro 'Foto Síntesis', una producción de la compañía.",
    images: Array.from({ length: 49 }, (_, i) => ({
      id: `foto-sintesis-${i}`,
      src: `/galery/foto-sintesis/${i + 1}.webp`,
      alt: `Foto Síntesis - Imagen ${i + 1}`,
    })),
  },
}

export default function GalleryDetailPage({ params }: { params: { id: string } }) {
  const galleryId = params.id
  const gallery = galleries[galleryId as keyof typeof galleries]

  if (!gallery) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Galería no encontrada</h1>
        <p className="text-gray-600 mb-8">La galería que estás buscando no existe o ha sido eliminada.</p>
        <Link href="/galerias" className="inline-flex items-center text-red-600 hover:text-red-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a galerías
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/galerias" className="inline-flex items-center text-red-600 hover:text-red-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a galerías
          </Link>
        </div>

        <SectionTitle title={gallery.title} subtitle={gallery.description} />

        <div className="mt-12">
          <ImageGallery images={gallery.images} columns={3} gap="medium" />
        </div>
      </div>
    </div>
  )
}