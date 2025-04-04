import SectionTitle from "@/components/ui/section-title"
import ImageGallery from "@/components/ui/image-gallery"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Mock data - in a real app, this would come from a database or CMS
const galleries = {
  "festival-2022": {
    title: "V Festival de Teatro de Buin (2022)",
    description:
      "Imágenes de las presentaciones, talleres y actividades del V Festival de Teatro de Buin realizado en octubre de 2022.",
    images: Array.from({ length: 12 }, (_, i) => ({
      id: `festival-2022-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `Festival de Teatro de Buin 2022 - Imagen ${i + 1}`,
    })),
  },
  "la-tempestad-2023": {
    title: "La Tempestad (2023)",
    description:
      "Fotografías del proceso de montaje y presentaciones de nuestra adaptación de La Tempestad de William Shakespeare.",
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "el-jardin-de-los-cerezos-2022": {
    title: "El Jardín de los Cerezos (2022)",
    description: "Registro fotográfico de nuestra adaptación contemporánea de la obra clásica de Antón Chéjov.",
    images: Array.from({ length: 8 }, (_, i) => ({
      id: `el-jardin-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `El Jardín de los Cerezos - Imagen ${i + 1}`,
    })),
  },
  "talleres-2022": {
    title: "Talleres de Formación Teatral (2022)",
    description:
      "Imágenes de los talleres de formación teatral realizados durante el año 2022 para niños, jóvenes y adultos.",
    images: Array.from({ length: 15 }, (_, i) => ({
      id: `talleres-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `Talleres de Formación Teatral - Imagen ${i + 1}`,
    })),
  },
  "gira-regional-2021": {
    title: "Gira Regional (2021)",
    description:
      "Fotografías de nuestra gira por diversas comunas de la Región Metropolitana durante el segundo semestre de 2021.",
    images: Array.from({ length: 11 }, (_, i) => ({
      id: `gira-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `Gira Regional 2021 - Imagen ${i + 1}`,
    })),
  },
  "ensayos-y-procesos": {
    title: "Ensayos y Procesos Creativos",
    description: "Una mirada al trabajo interno de la compañía: ensayos, procesos creativos y preparación de montajes.",
    images: Array.from({ length: 20 }, (_, i) => ({
      id: `ensayos-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `Ensayos y Procesos Creativos - Imagen ${i + 1}`,
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

