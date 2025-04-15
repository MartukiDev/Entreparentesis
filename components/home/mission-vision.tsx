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
          <div className="bg-white p-8 rounded-lg shadow-md">
            <SectionTitle title="Radio Entreparéntesis" centered={false} />
            <p className="text-gray-600">
            Radio Entreparéntesis Comunitaria, 'Actúa contigo', tiene como objetivo principal otorgar un servicio a la Provincia del Maipo, con programas de interés público para nuestro territorio en el ámbito artístico, cultural y social. Potenciar la música de Buin y Paine, y otorgar espacio a las bandas y creadores musicales emergente del lado sur del Río Maipo. A su vez, ser una compañía para nuestro querido público, acercándoles a nuestras actividades, haciéndoles partícipes de nuestros procesos de creación y desarrollo social. Una radio amena, cercana, al servicio de nuestra gente.
            </p>
            <iframe src="https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044" className="h-[110px] w-full border-0 mt-5" scrolling="no"></iframe>

          </div>
        </div>
      </div>
    </section>
  )
}

