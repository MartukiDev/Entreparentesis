import SectionTitle from "@/components/ui/section-title"
import GalleryCard from "@/components/galerias/gallery-card"
import { getPublishedGalleries } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export default async function GalleryPage() {
  const galleries = await getPublishedGalleries()

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
              key={gallery.id || gallery.slug}
              id={gallery.slug}
              title={gallery.title}
              coverImage={resolvePublicImage(gallery.cover_image_path, "/placeholder.svg")}
              description={gallery.description || "Galería sin descripción"}
              imageCount={gallery.image_count || 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}