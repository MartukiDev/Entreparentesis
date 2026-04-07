import SectionTitle from "@/components/ui/section-title"
import ImageGallery from "@/components/ui/image-gallery"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { getGalleryBySlug } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getGalleryBySlug(id)

  if (!data) {
    notFound()
  }

  const gallery = data.gallery
  const images = data.images.map((image, index) => ({
    id: image.id,
    src: resolvePublicImage(image.image_path, "/placeholder.svg"),
    alt: image.alt_text || `${gallery.title} - Imagen ${index + 1}`,
  }))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/galerias" className="inline-flex items-center text-red-600 hover:text-red-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a galerías
          </Link>
        </div>

        <SectionTitle title={gallery.title} subtitle={gallery.description || "Sin descripción"} />

        <div className="mt-12">
          <ImageGallery images={images} columns={3} gap="medium" />
        </div>
      </div>
    </div>
  )
}