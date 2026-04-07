import SectionTitle from "@/components/ui/section-title"
import RadioSectionCard from "@/components/radio/radio-section-card"
import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { getPublishedRadioPrograms, getSiteSections } from "@/lib/cms/public"
import { resolvePublicImage } from "@/lib/cms/media"

export const metadata: Metadata = {
  title: "Radio | Entreparéntesis",
  description:
    "Escucha nuestra radio online con programas culturales y artísticos producidos por Entreparéntesis.",
  alternates: {
    canonical: "/radio",
  },
}

export default async function RadioPage() {
  const [radioSections, sections] = await Promise.all([
    getPublishedRadioPrograms(),
    getSiteSections(["radio_page_intro"]),
  ])
  const radioIntro = sections.radio_page_intro

  return (
    <div className="bg-gray-50 min-h-screen">
      <Script
        id="schema-radio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RadioStation",
            name: "Radio Entreparéntesis",
            url: "https://www.entreparentesis.cl/radio",
            contentUrl: "https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044",
            broadcastDisplayName: "Radio Entreparéntesis",
            broadcastTimezone: "America/Santiago",
            broadcaster: {
              "@type": "Organization",
              name: "Entreparéntesis",
              url: "https://www.entreparentesis.cl",
            },
            inLanguage: "es-CL",
            genre: "Cultural, Teatro, Arte",
          }),
        }}
      />
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title={radioIntro?.title || "Radio Entreparéntesis"}
          subtitle={radioIntro?.subtitle || "Escucha nuestra programación musical y cultural en vivo"}
        />

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-600 mb-8 text-center">
            {radioIntro?.description ||
              "Radio Entreparéntesis Comunitaria, 'Actúa contigo', tiene como objetivo principal otorgar un servicio a la Provincia del Maipo, con programas de interés público para nuestro territorio en el ámbito artístico, cultural y social. Potenciar la música de Buin y Paine, y otorgar espacio a las bandas y creadores musicales emergente del lado sur del Río Maipo."}
          </p>

          <div className="flex justify-center mb-8">
            <Image
              src={resolvePublicImage(radioIntro?.image_path, "/images/logoradio.webp")}
              alt="Logo Radio Entreparéntesis"
              width={300}
              height={150}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-12">
              <iframe
                src={radioIntro?.content || "https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044"}
                className="w-full border-0 h-[110px]"
                title="Radio Entreparéntesis - Reproductor"
                allow="autoplay"
                loading="lazy"
              ></iframe>
          </div>
        </div>

        <SectionTitle title="Secciones de nuestra radio" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {radioSections.map((section) => (
            <RadioSectionCard
              key={section.id || section.slug}
              title={section.title}
              imageSrc={resolvePublicImage(section.image_path, "/placeholder.svg")}
              description={section.description || "Sin descripción"}
              schedule={section.schedule || "Horario por confirmar"}
              linkfanpage={section.external_link || section.stream_url || undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
