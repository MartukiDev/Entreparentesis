import SectionTitle from "@/components/ui/section-title"
import RadioSectionCard from "@/components/radio/radio-section-card"
import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Radio | Entreparéntesis",
  description:
    "Escucha nuestra radio online con programas culturales y artísticos producidos por Arte Entreparéntesis.",
  alternates: {
    canonical: "/radio",
  },
}

// This would typically come from a database or CMS
const radioSections = [
  {
    id: "la-hora-del-cine",
    title: "La hora del cine",
    imageSrc: "/images/lahoradelcine.webp",
    description:
      "La hora del cine con Lía D'acosta. El primer programa que sale al aire por la Radio Entreparéntesis. Un programa ameno y cercano; recomendaciones de películas y series, entretenidos espacios, comentarios de película, crítica, noticias e información de todo el acontecer nacional y mundial del arte de la cinematografía. Si quieres saber qué ver de acuerdo a tus gustos e intereses y estás aburrido de ver lo mismo de siempre, o sólo ver lo primero que te aparece en plataformas y la tele, escucha este programa que te orientará hacia las pelis y series que te estaban esperando. Conducido por la amante del cine, novelista y dramaturga, Lía D'acosta.",
    schedule: "Martes 12:00 AM ",
    linkfanpage: "https://www.instagram.com/lahoradelcineconlia/"
  },
  {
    id: "apaga-esa-musica-metalica",
    title: "Apaga esa música metálica",
    imageSrc: "/images/logomusica.webp",
    description:
      "Apaga esa música metálica es un programa radial dedicado a los sonidos más pesados, oscuros y poderosos del metal en todas sus formas. Desde los clásicos del heavy y thrash hasta las propuestas más extremas del black, death y metal progresivo, cada emisión es un viaje cargado de distorsión, energía y actitud. Si te dicen que apagues esa música... ¡súbele el volumen! Conducido por Diego Valdés.",
    schedule: "Miércoles 20:00 - 22:00 PM",
    linkfanpage: "https://www.youtube.com/@apagaesamusicametalica"
  },
  {
    id: "cable-a-tierra",
    title: "Cable a tierra",
    imageSrc: "/images/logocable.webp",
    description:
      "Cable a Tierra, el tercer programa de Radio Entreparéntesis, es un programa de conversación y análisis crítico enfocado en la realidad local y nacional, con una mirada profunda hacia las problemáticas que nos afectan como sociedad. A través de entrevistas, reflexiones y diálogos con diferentes actores el programa aborda temáticas de interés, siempre con la idea de generar conciencia, empatía y acción desde una perspectiva informada y comprometida con los derechos humanos. Un programa que invita a bajar el ruido, mirar la realidad de frente y reconectar con lo esencial. Conducido por Nicolle Ramos y Gonzalo Silva.",
    schedule: "Jueves 15:00 PM",
    linkfanpage: "https://www.facebook.com/profile.php?id=61576338838446&rdid=fwzJZP31IDM9VB4B&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BRziiuQJF%2F"
  },
  
]

export default function RadioPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Script
        id="schema-radio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RadioStation",
            name: "Radio Arte Entreparéntesis",
            url: "https://www.entreparentesis.cl/radio",
            contentUrl: "https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044",
            broadcastDisplayName: "Radio Arte Entreparéntesis",
            broadcastTimezone: "America/Santiago",
            broadcaster: {
              "@type": "Organization",
              name: "Arte Entreparéntesis",
              url: "https://www.entreparentesis.cl",
            },
            inLanguage: "es-CL",
            genre: "Cultural, Teatro, Arte",
          }),
        }}
      />
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Radio Entreparéntesis"
          subtitle="Escucha nuestra programación musical y cultural en vivo"
        />

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-600 mb-8 text-center">
            Radio Entreparéntesis Comunitaria, 'Actúa contigo', tiene como objetivo principal otorgar un servicio a la Provincia del Maipo, con programas de interés público para nuestro territorio en el ámbito artístico, cultural y social. Potenciar la música de Buin y Paine, y otorgar espacio a las bandas y creadores musicales emergente del lado sur del Río Maipo. A su vez, ser una compañía para nuestro querido público, acercándoles a nuestras actividades, haciéndoles partícipes de nuestros procesos de creación y desarrollo social. Una radio amena, cercana, al servicio de nuestra gente.
          </p>

          <div className="flex justify-center mb-8">
            <Image
              src="/images/logoradio.webp"
              alt="Logo Radio Arte Entreparéntesis"
              width={300}
              height={150}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-12">
              <iframe
                src="https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044"
                className="w-full border-0 h-[110px]"
                title="Radio Arte Entreparéntesis - Reproductor"
                allow="autoplay"
                loading="lazy"
              ></iframe>
          </div>
        </div>

        <SectionTitle title="Secciones de nuestra radio" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {radioSections.map((section) => (
            <RadioSectionCard
              key={section.id}
              title={section.title}
              imageSrc={section.imageSrc}
              description={section.description}
              schedule={section.schedule}
              linkfanpage={section.linkfanpage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
