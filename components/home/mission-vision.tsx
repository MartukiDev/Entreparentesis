import SectionTitle from "@/components/ui/section-title"

export default function MissionVision() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <SectionTitle title="Misión" centered={false} />
            <p className="text-gray-600">
            Descentralizar el teatro y hacerlo accesible para la periferia sur de Santiago, por medio de múltiples actividades teatrales, que den la oportunidad a la comunidad de disfrutar del teatro, apreciarlo y valorarlo. Crear montajes teatrales y audiencia, y lograr que el teatro llegue al público real, romper con la élite de las artes, que el artista sea un servidor social y su arte nazca de su esencia para llegar al público que lo necesita.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <SectionTitle title="Visión" centered={false} />
            <p className="text-gray-600">
            Visibilizar nuestro trabajo y a nuestros integrantes como personas hábiles y capaces, donde cada una de ellas tiene un valor artístico en sí misma dentro de su medio, y es también un pilar en la labor de la compañía. Expandir el teatro, la cultura y el arte por nuestra comuna, provincia, región y país. Como compañía periférica establecer nuevos paradigmas teatrales para la Provincia del Maipo y así augurar un cambio sustantivo que sea considerado en la Historia del Teatro.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

