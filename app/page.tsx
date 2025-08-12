import HeroSection from "@/components/ui/hero-section"
import FeaturedPlays from "@/components/home/featured-plays"
import CurrentPlay from "@/components/home/current-play"
import RadioPlayer from "@/components/home/radio-player"
import FeaturedNews from "@/components/home/featured-news"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Compañía de Teatro Entreparéntesis | Inicio",
  description:
    "Compañía de Teatro Entreparéntesis - Grupo teatral profesional de Buin. Obras originales, espectáculos culturales, talleres de teatro y organización del Festival de Teatro de Buin.",
  keywords: "Compañía de Teatro Entreparéntesis, teatro Buin, obras de teatro, espectáculos culturales, talleres teatro, grupo teatral profesional",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["TheaterGroup", "PerformingGroup", "Organization"],
            name: "Compañía de Teatro Entreparéntesis",
            alternateName: ["Teatro Entreparéntesis", "Entreparéntesis Teatro", "Compañía Entreparéntesis", "Arte Entreparéntesis"],
            url: "https://www.entreparentesis.cl",
            logo: "https://www.entreparentesis.cl/images/hero-foto.webp",
            description:
              "Compañía de Teatro Entreparéntesis es un grupo teatral profesional de Buin dedicado a crear obras originales, ofrecer espectáculos culturales y formar nuevos talentos a través de talleres de teatro.",
            foundingDate: "2008",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Buin",
              addressRegion: "Región Metropolitana",
              addressCountry: "CL",
            },
            areaServed: {
              "@type": "Place",
              name: "Región Metropolitana, Chile"
            },
            audience: {
              "@type": "Audience",
              name: "Público general, estudiantes de teatro, comunidad cultural"
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+56-9-1234-5678",
              contactType: "customer service",
              availableLanguage: "Spanish"
            },
            sameAs: [
              "https://www.facebook.com/FestivaldeTeatrodeBuin",
              "https://www.instagram.com/artentreparentesis",
              "https://twitter.com/entreparentesis",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Servicios de la Compañía de Teatro Entreparéntesis",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Obras de Teatro Originales",
                    description: "Presentaciones teatrales profesionales creadas por la compañía"
                  }
                },
                {
                  "@type": "Offer", 
                  itemOffered: {
                    "@type": "EducationEvent",
                    name: "Talleres de Teatro",
                    description: "Formación teatral para todas las edades"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Festival",
                    name: "Festival de Teatro de Buin",
                    description: "Festival anual organizado por la compañía"
                  }
                }
              ]
            },
            event: {
              "@type": "TheaterEvent",
              name: "Festival de Teatro de Buin",
              organizer: {
                "@type": "TheaterGroup",
                name: "Compañía de Teatro Entreparéntesis"
              },
              location: {
                "@type": "Place",
                name: "Buin, Región Metropolitana, Chile"
              }
            }
          }),
        }}
      />
      <HeroSection
        title="COMPAÑÍA DE TEATRO ENTREPARÉNTESIS"
        subtitle="Organizadores del Festival de Teatro de Buin"
        buttonText="Conócenos"
        buttonLink="/nosotros"
        imageSrc="/images/hero-foto.webp"
        imageAlt="Compañía de Teatro Entreparéntesis - Actores en escena"
      />
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Misión</h2>
              <p className="text-gray-600">
                Descentralizar el teatro y hacerlo accesible para todos, llevando el arte teatral a comunidades que
                tradicionalmente han tenido acceso limitado a expresiones culturales. Buscamos fomentar el desarrollo
                artístico local y crear espacios de encuentro a través del teatro.
              </p>
            </div>

            <RadioPlayer />

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visión</h2>
              <p className="text-gray-600">
                Visibilizar nuestro trabajo y a nuestros integrantes, posicionándonos como un referente cultural en la
                zona sur de la Región Metropolitana. Aspiramos a ser reconocidos por la calidad de nuestras producciones
                y por nuestro compromiso con la comunidad local.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FeaturedNews />
      <FeaturedPlays />
      <CurrentPlay />
    </>
  )
}
