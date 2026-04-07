import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"
import CarouselVertical from "@/components/ui/carousel-vertical"
import { getFestivalSettings, getPublishedFestivalItems } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export default async function FestivalPage() {
  const [settings, verticalItems, horizontalItems, previousItems] = await Promise.all([
    getFestivalSettings(),
    getPublishedFestivalItems("current_vertical"),
    getPublishedFestivalItems("current_horizontal"),
    getPublishedFestivalItems("previous_editions"),
  ])

  const verticalCarousel = verticalItems.map((item) => ({
    id: item.id,
    title: item.title,
    imageSrc: resolvePublicImage(item.image_path, "/placeholder.svg"),
  }))

  const horizontalCarousel = horizontalItems.map((item) => ({
    id: item.id,
    title: item.title,
    imageSrc: resolvePublicImage(item.image_path, "/placeholder.svg"),
    description: item.description || "",
  }))

  const previousCarousel = previousItems.map((item) => ({
    id: item.id,
    title: item.year_label ? `${item.title} (${item.year_label})` : item.title,
    imageSrc: resolvePublicImage(item.image_path, "/placeholder.svg"),
    description: item.description || "",
  }))

  return (
    <div className="bg-white">
        <HeroSection
          title={settings?.hero_title || "Festival de Teatro de Buin"}
          subtitle={settings?.hero_subtitle || "Un espacio para la creación y el encuentro teatral"}
          imageSrc={resolvePublicImage(settings?.hero_image_path, "/images/festivaldeteatro.webp")}
          imageAlt="Festival de Teatro de Buin"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionTitle
              title={settings?.current_title || "Festival de Teatro de Buin"}
              subtitle={settings?.current_subtitle || ""}
            />

            <div className="grid md:grid-cols-2 gap-12 items-center justify-center mb-12 max-w-6xl mx-auto">
              <div className="text-center md:text-left">
                {settings?.current_date ? <p className="text-gray-700 font-semibold mb-2">{settings.current_date}</p> : null}
                {settings?.current_location ? <p className="text-gray-700 mb-6">{settings.current_location}</p> : null}
                <p className="text-gray-600 mb-6 text-justify">
                  {settings?.current_description || ""}
                </p>
              </div>

              <div className="flex justify-center">
                {verticalCarousel.length > 0 ? (
                  <CarouselVertical items={verticalCarousel} autoPlay interval={4000} showControls showIndicators />
                ) : (
                  <div className="text-sm text-gray-500">Sin imágenes para carrusel vertical</div>
                )}
              </div>
            </div>

            {/* Carrusel horizontal de imágenes del festival */}
            <div className="mb-12">
              <SectionTitle title="Galería del Festival" />
              {horizontalCarousel.length > 0 ? (
                <Carousel items={horizontalCarousel} />
              ) : (
                <p className="text-center text-sm text-gray-500">Sin imágenes para carrusel horizontal</p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle title={settings?.about_title || "¿QUÉ ES EL FESTIVAL DE TEATRO DE BUIN?"} />

            <div className="max-w-3xl mx-auto mb-32 text-justify space-y-4">
              <p className="text-gray-600 mb-4">
                {settings?.about_content || ""}
              </p>
              {settings?.organizer_title ? <h1 className="text-xl font-bold text-gray-900 mb-2 text-center">{settings.organizer_title}</h1> : null}
              {settings?.organizer_content ? <p className="text-gray-600 mb-4">{settings.organizer_content}</p> : null}
              {settings?.where_title ? <h1 className="text-xl font-bold text-gray-900 mb-2 text-center">{settings.where_title}</h1> : null}
              {settings?.where_content ? <p className="text-gray-600">{settings.where_content}</p> : null}
            </div>

            <SectionTitle title="Ediciones Anteriores" />

            <div className="mb-12">
              {previousCarousel.length > 0 ? (
                <Carousel items={previousCarousel} />
              ) : (
                <p className="text-center text-sm text-gray-500">Sin imágenes para ediciones anteriores</p>
              )}
            </div>
          </div>
        </section>
      </div>
  )
}

