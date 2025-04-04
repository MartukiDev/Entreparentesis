import Image from "next/image"
import SectionTitle from "@/components/ui/section-title"

export default function CurrentPlay() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Obra Actual" subtitle="No te pierdas nuestra producción en cartelera" />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96">
            <Image
              src="/images/noctivaga.jpg"
              alt="Obra Actual: Noctivaga"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Noctivaga</h3>
            <p className="text-gray-600 mb-6 text-justify">
            Montaje teatral surrealista que explora en el mundo de los sueños desde el estado de vigilia 
            y en el estado de inconsciencia, representando ese diálogo interno que vagamente recordamos, 
            pero que tanto puede significar en las decisiones y el que hacer de nuestras vidas.
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>Dirección:</strong> Lia D´acosta
              </p>
              <p className="text-gray-800">
                <strong>Elenco:</strong> Franco, Maria José, Fran.
              </p>
              <p className="text-gray-800">
                <strong>Funciones:</strong> Viernes y sábados, 19:30 hrs
              </p>
              <p className="text-gray-800">
                <strong>Lugar:</strong> Centro Cultural de Buin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

