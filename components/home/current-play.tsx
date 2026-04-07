import Image from "next/image"
import SectionTitle from "@/components/ui/section-title"
import { getCurrentPlay } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export default async function CurrentPlay() {
  const play = await getCurrentPlay()

  if (!play) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Obra Actual" subtitle="No te pierdas nuestra producción en cartelera" />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96">
            <Image
              src={resolvePublicImage(play.cover_image_path, "/placeholder.svg")}
              alt={`Obra Actual: ${play.title}`}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{play.title}</h3>
            <p className="text-gray-600 mb-6 text-justify">
              {play.description || "Esta obra forma parte de la cartelera actual de la compañía."}
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>Dirección:</strong> {play.director}
              </p>
              <p className="text-gray-800">
                <strong>Elenco:</strong> {play.cast || "Por confirmar"}
              </p>
              <p className="text-gray-800">
                <strong>Funciones:</strong> {play.show_dates || "Por definir"}
              </p>
              <p className="text-gray-800">
                <strong>Lugar:</strong> {play.location || "Por definir"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

