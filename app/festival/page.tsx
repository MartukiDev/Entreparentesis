import Head from "next/head"
import Image from "next/image"
import HeroSection from "@/components/ui/hero-section"
import SectionTitle from "@/components/ui/section-title"
import Carousel from "@/components/ui/carousel"
import CarouselVertical from "@/components/ui/carousel-vertical"

// This would typically come from a database or CMS
const festivalEditions = [
  {
    id: 1,
    title: "XIV Festival de Teatro de Buin (2022)",
    imageSrc: "/images/carrousel-festival/2022_1.webp",
    description: "14.ª edición del Festival de teatro de Buin."
  },
  {
    id: 2,
    title: "XV Festival de Teatro de Buin (2023)",
    imageSrc: "/images/carrousel-festival/2023_1.webp",
    description: "15.ª edición del Festival de teatro de Buin.",
  },
  {
    id: 3,
    title: "XVI Festival de Teatro de Buin (2024)",
    imageSrc: "/images/carrousel-festival/2024_1.webp",
    description: "16.ª edición del Festival de teatro de Buin.",
  },
]

// Images for the vertical carousel (without _h suffix)
const festivalImagesVertical = [
  {
    id: 1,
    title: "Festival 2025 - Imagen 1",
    imageSrc: "/images/festival/1.webp",
  },
  {
    id: 2,
    title: "Festival 2025 - Imagen 3",
    imageSrc: "/images/festival/3.webp",
  },
  {
    id: 3,
    title: "Festival 2025 - Imagen 6",
    imageSrc: "/images/festival/6.webp",
  },
]

// Images for the horizontal carousel (with _h suffix)
const festivalImagesHorizontal = [
  {
    id: 1,
    title: "Tappabuchi - Academia de tontos",
    imageSrc: "/images/festival/2_h.webp",
    description: "XVII Festival de Teatro de Buin 2025"
  },
  {
    id: 2,
    title: "Cabra de monte - Colectivo Desalambrado",
    imageSrc: "/images/festival/4_h.webp",
    description: "XVII Festival de Teatro de Buin 2025"
  },
  {
    id: 3,
    title: "El mejor pais de Chile - Entreparentesis",
    imageSrc: "/images/festival/5_h.webp",
    description: "XVII Festival de Teatro de Buin 2025"
  },
]

export default function FestivalPage() {
  return (
    <>
      <Head>
        <title>Festival de Teatro de Buin | Compañía de Teatro Entreparéntesis</title>
        <meta name="description" content="Festival de Teatro de Buin organizado por la Compañía de Teatro Entreparéntesis. Artes escénicas, cultura y espectáculos en la Región Metropolitana." />
        <meta name="keywords" content="Festival de Teatro de Buin, Compañía de Teatro Entreparéntesis, teatro, cultura, artes escénicas, Santiago, Región Metropolitana" />
        <meta property="og:title" content="Festival de Teatro de Buin" />
        <meta property="og:description" content="Festival de Teatro de Buin organizado por la Compañía de Teatro Entreparéntesis." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/festivaldeteatro.webp" />
        <meta property="og:url" content="https://www.entreparentesis.cl/festival" />
        <link rel="canonical" href="https://www.entreparentesis.cl/festival" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TheaterEvent",
            name: "Festival de Teatro de Buin",
            startDate: "2025-10-14",
            endDate: "2025-10-18",
            location: {
              "@type": "Place",
              name: "Centro Cultural de Buin, Región Metropolitana, Chile"
            },
            organizer: {
              "@type": "TheaterGroup",
              name: "Compañía de Teatro Entreparéntesis",
              url: "https://www.entreparentesis.cl"
            }
          })
        }} />
      </Head>
      <div className="bg-white">
        <HeroSection
          title="Festival de Teatro de Buin"
          subtitle="Un espacio para la creación y el encuentro teatral"
          imageSrc="/images/festivaldeteatro.webp"
          imageAlt="Festival de Teatro de Buin"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="🎭 XVII Festival de Teatro de Buin - 2025 🎭"
              subtitle="Desde el 14 al 18 de octubre."
            />

            <div className="grid md:grid-cols-2 gap-12 items-center justify-center mb-12 max-w-6xl mx-auto">
              <div className="text-center md:text-left">
                <p className="text-gray-600 mb-6 text-justify">
                  En octubre del 2025 celebramos la 17ª versión del Festival de Teatro de Buin, se realizó una itinerancia por 5 localidades de la comuna: Alto Jahuel, Maipo, Viluco, Valdivia de Paine y El Recurso, presentando la obra Ülkan Mapu (Montaje que enseña sobre los instrumentos musicales mapuche y su origen) a cientos de niños, que quedaron felices con la experiencia.
                </p>
                <p className="text-gray-600 mb-6 text-justify">
                  También se realizó el Pasacalle para dar el punta pie inicial a la Competencia y Presentaciones en el Teatro del Centro Cultural de Buin. En la alegría de la Plaza de Buin, el público disfrutó de la música, el malabarismo y el baile.
                </p>
                <p className="text-gray-600 mb-6 text-justify">
                  En un nivel de excelencia se presentaron las 7 obras en competencia, dejando al público maravillado con la belleza de los montajes y las emocionantes actuaciones. Además, la Compañía Entreparéntesis como anfitriones estrenaron su nueva obra: El mejor País de Chile, con la que comenzará pronto su recorrido por la Provincia, y la obra ganadora del año pasado dio un cierre perfecto a las 5 jornadas de Festival.
                </p>
                <p className="text-gray-600 mb-6 text-justify">
                  La fiesta cultural de Buin, una vez más dejó al público encantado y lleno de mensajes profundos, junto a la música de los artistas invitados que cada día amenizaban con sus creaciones musicales el espectáculo. Una fiesta única, sin igual, que es parte de la amplia gama cultural artística de nuestra comuna.
                </p>
              </div>

              <div className="flex justify-center">
                <CarouselVertical 
                  items={festivalImagesVertical} 
                  autoPlay={true}
                  interval={4000}
                  showControls={true}
                  showIndicators={true}
                />
              </div>
            </div>

            {/* Carrusel horizontal de imágenes del festival */}
            <div className="mb-12">
              <SectionTitle title="Galería del Festival 2025" />
              <Carousel items={festivalImagesHorizontal} />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle title="¿QUÉ ES EL FESTIVAL DE TEATRO DE BUIN?" />

            <div className="max-w-3xl mx-auto mb-32 text-justify">
              <p className="text-gray-600 mb-4">
                La gran fiesta cultural y artística de Buin. Itinerancia teatral con talleres y presentaciones en las localidades de Valdivia de Paine, Viluco, Linderos, Alto Jahuel y Maipo. Durante 5 días se reúnen más de 200 artistas y se realiza la competencia: 7 obras teatrales seleccionadas de 50 compañías postulantes compiten por el preciado 
                galardón de ‘Mejor Compañía del Certamen’ y ‘Mejor actriz o actor’, además se presentan 3 compañías teatrales invitadas y artistas musicales locales, entre otros. 
              </p>
              <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">¿Quién organiza el festival?</h1>
              <p className="text-gray-600 mb-4">
                La compañía de Teatro Entreparéntesis, una organización sin fines de lucro con 22 años de trayectoria y más de 30 montajes teatrales estrenados. La Compañía de Teatro Entreparéntesis es una entidad reconocida por su labor y gestión cultural,
                siendo referentes dentro del mundo del teatro con vocación social.
              </p>
              <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">¿Dónde se realiza?</h1>
              <p className="text-gray-600">
                En el teatro, hall y explanada del Centro Cultural de Buin. Y la Itinerancia teatral en escuelas y juntas de vecinos de Valdivia de Paine, Viluco, Linderos, Alto Jahuel y Maipo. El teatro del Centro Cultural de Buin 
                tiene un escenario de 20 metros cuadrados, y 645 butacas. Además de un equipo técnico de sonido e iluminación de alta calidad.
              </p>
            </div>

            <SectionTitle title="Ediciones Anteriores" />

            <div className="mb-12">
              <Carousel items={festivalEditions} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

