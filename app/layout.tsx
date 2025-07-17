import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Arte Entreparéntesis - Compañía de Teatro de Buin",
  description:
    "Compañía de teatro dedicada a descentralizar el arte teatral y hacerlo accesible para todos en Buin y sus alrededores.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        <title>Compañía de Teatro Entreparéntesis | Festival de Teatro de Buin</title>
        <meta name="description" content="Compañía de Teatro Entreparéntesis. Organizadores del Festival de Teatro de Buin. Artes escénicas, cultura y espectáculos en la Región Metropolitana." />
        <meta name="keywords" content="Compañía de Teatro Entreparéntesis, Festival de Teatro de Buin, teatro, cultura, artes escénicas, Santiago, Región Metropolitana" />
        <meta property="og:title" content="Compañía de Teatro Entreparéntesis" />
        <meta property="og:description" content="Organizadores del Festival de Teatro de Buin. Artes escénicas y cultura en la Región Metropolitana." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/festivaldeteatro.webp" />
        <meta property="og:url" content="https://www.entreparentesis.cl" />
        <link rel="canonical" href="https://www.entreparentesis.cl" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TheaterGroup",
            name: "Compañía de Teatro Entreparéntesis",
            url: "https://www.entreparentesis.cl",
            sameAs: [
              "https://www.facebook.com/FestivaldeTeatrodeBuin",
              "https://www.instagram.com/artentreparentesis"
            ],
            event: {
              "@type": "TheaterEvent",
              name: "Festival de Teatro de Buin",
              startDate: "2008-10-14",
              endDate: "2025-10-18",
              location: {
                "@type": "Place",
                name: "Buin, Región Metropolitana, Chile"
              }
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