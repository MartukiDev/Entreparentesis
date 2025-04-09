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
              src="/galery/angue-pangue/41.webp"
              alt="Obra Actual: Angë Pangue"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Angë Pangue</h3>
            <p className="text-gray-600 mb-6 text-justify">
            Esta obra, dirigida por Rolando Collinao, forma parte de su saga de creaciones teatrales inspiradas en la cultura mapuche. Tras un profundo estudio de sus formas narrativas, mitología, cosmovisión y representaciones orales como el epew y el piam, Collinao ha desarrollado una serie de montajes que no solo abordan temáticas mapuche, sino que también incorporan en su estructura la visión artística de este pueblo originario. Así, este montaje se presenta como una experiencia distinta,
            donde el espectador se integra a un rito que permite conocer, desde una perspectiva íntima,
            la riqueza cultural de los territorios que habitamos.
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>Dirección:</strong> Lía D´acosta.
              </p>
              <p className="text-gray-800">
                <strong>Elenco:</strong>  María José, Exequiel, Franco, Karla, Fran.
              </p>
              <p className="text-gray-800">
                <strong>Funciones:</strong> Por definir.
              </p>
              <p className="text-gray-800">
                <strong>Lugar:</strong> Por definir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

