import HeroSection from "@/components/ui/hero-section"
import FeaturedPlays from "@/components/home/featured-plays"
import CurrentPlay from "@/components/home/current-play"
import RadioPlayer from "@/components/home/radio-player"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Inicio | Compañía de Teatro de Buin",
  description:
    "Arte Entreparéntesis es una compañía de teatro dedicada a descentralizar el arte teatral y hacerlo accesible para todos en Buin y sus alrededores.",
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
            "@type": "Organization",
            name: "Arte Entreparéntesis",
            url: "https://www.entreparentesis.cl",
            logo: "https://www.entreparentesis.cl/logo.png",
            description:
              "Compañía de teatro dedicada a descentralizar el arte teatral y hacerlo accesible para todos en Buin y sus alrededores.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Buin",
              addressRegion: "Región Metropolitana",
              addressCountry: "CL",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+56-9-1234-5678",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/entreparentesis",
              "https://www.instagram.com/entreparentesis",
              "https://twitter.com/entreparentesis",
            ],
          }),
        }}
      />
      <HeroSection
        title="COMPAÑÍA DE TEATRO ENTREPARÉNTESIS"
        subtitle="Organizadores del Festival de Teatro de Buin"
        buttonText="Conócenos"
        buttonLink="/nosotros"
        imageSrc="/images/hero-foto.jpeg"
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
      <FeaturedPlays />
      <CurrentPlay />
    </>
  )
}
