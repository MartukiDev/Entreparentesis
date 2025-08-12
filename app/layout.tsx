import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Compañía de Teatro Entreparéntesis | Teatro en Buin",
  description:
    "Compañía de Teatro Entreparéntesis - Grupo teatral profesional de Buin. Obras de teatro, espectáculos culturales y formación artística en la Región Metropolitana.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        <title>Compañía de Teatro Entreparéntesis | Teatro Profesional en Buin</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="description" content="Compañía de Teatro Entreparéntesis - Grupo teatral profesional de Buin. Obras originales, espectáculos culturales, talleres de teatro y organización del Festival de Teatro de Buin." />
        <meta name="keywords" content="Compañía de Teatro Entreparéntesis, teatro Buin, obras de teatro, espectáculos culturales, talleres teatro, grupo teatral Buin, arte escénico, cultura Región Metropolitana" />
        <meta name="author" content="Compañía de Teatro Entreparéntesis" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compañía de Teatro Entreparéntesis | Teatro Profesional en Buin" />
        <meta property="og:description" content="Grupo teatral profesional de Buin. Obras originales, espectáculos culturales y talleres de teatro en la Región Metropolitana." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/hero-foto.webp" />
        <meta property="og:url" content="https://www.entreparentesis.cl" />
        <meta property="og:site_name" content="Compañía de Teatro Entreparéntesis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compañía de Teatro Entreparéntesis" />
        <meta name="twitter:description" content="Grupo teatral profesional de Buin. Obras originales y espectáculos culturales." />
        <meta name="twitter:image" content="/images/hero-foto.webp" />
        <link rel="canonical" href="https://www.entreparentesis.cl" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["TheaterGroup", "PerformingGroup", "Organization"],
            name: "Compañía de Teatro Entreparéntesis",
            alternateName: ["Teatro Entreparéntesis", "Entreparéntesis Teatro", "Compañía Entreparéntesis"],
            description: "Compañía de teatro profesional especializada en obras originales y espectáculos culturales en Buin, Región Metropolitana.",
            url: "https://www.entreparentesis.cl",
            logo: "https://www.entreparentesis.cl/images/hero-foto.webp",
            image: "https://www.entreparentesis.cl/images/hero-foto.webp",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Buin",
              addressRegion: "Región Metropolitana",
              addressCountry: "CL"
            },
            sameAs: [
              "https://www.facebook.com/FestivaldeTeatrodeBuin",
              "https://www.instagram.com/artentreparentesis"
            ],
            foundingDate: "2008",
            memberOf: {
              "@type": "Organization",
              name: "Comunidad Teatral de Chile"
            },
            performerIn: [
              {
                "@type": "TheaterEvent",
                name: "Festival de Teatro de Buin",
                description: "Festival anual de teatro organizado por la Compañía de Teatro Entreparéntesis",
                startDate: "2008",
                location: {
                  "@type": "Place",
                  name: "Buin, Región Metropolitana, Chile"
                }
              }
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Servicios Teatrales",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Obras de Teatro",
                    description: "Presentaciones teatrales profesionales"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service", 
                    name: "Talleres de Teatro",
                    description: "Formación y talleres de arte teatral"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Event",
                    name: "Festival de Teatro de Buin",
                    description: "Organización y producción del festival anual"
                  }
                }
              ]
            }
          })
        }} />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'