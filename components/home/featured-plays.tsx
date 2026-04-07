import Link from "next/link"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"
import { getFeaturedPlays } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export default async function FeaturedPlays() {
  const plays = await getFeaturedPlays()
  const featuredPlays = plays.map((play) => ({
    id: play.slug,
    title: play.title,
    imageSrc: resolvePublicImage(play.cover_image_path, "/placeholder.svg"),
    description: play.description || "Sin descripción",
  }))

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
            className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 transition-colors duration-300"
          >
            Conoce nuestras obras
          </Link>
        </div>
      </div>
    </section>
  )
}

