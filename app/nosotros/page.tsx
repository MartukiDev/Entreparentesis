import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[40vh]">
        <Image
          src="/images/nosotros.jpg"
          alt="Equipo de Arte Entreparéntesis"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Quiénes Somos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p>
            La Compañía de Teatro Entreparéntesis fue fundada en el año 2002 y ha estado por más de 20 años en la actividad teatral de la comuna de Buin. Es la organizadora del Festival de Teatro de Buin desde el año 2008 hasta la actualidad. Ha estrenado más de 30 obras teatrales, entre las cuales se encuentran la adaptación «El último de los Mohicanos», «Kalfu pewma mew», «Chile basura», «Wuachinango», «El Soundtrack de Hamlet», «Él trastorno de Dalton», entre otras
            </p>
            <br />
            <p>
              Dicta múltiples talleres de teatro en la comuna de Buin, durante 20 años ha permanecido como una de las principales escuelas informales de la zona.
            </p>
            <br />
            <p>  
              La compañía de teatro Entreparéntesis también está asociada a otras entidades artísticas, en el intercambio de apoyo y otras actividades en conjunto, y pertenece a la
              Red de Compañías Nacional.
            </p>
            <br />
            <p>
              La compañía se desarrolla principalmente en el Centro Cultural de Buin, donde realiza sus talleres, estrenos de obras, el Festival de Teatro de Buin, entre otros.
            </p>
            <br />
            <p>
            La compañía ha sido acreedora de varios fondos culturales artísticos estatales, para la realización de itinerancias en los establecimientos públicos de Buin, radio teatro, talleres escolares, como también para la realización del Festival de teatro de Buin.
            </p>
            <br />
            <p>
            También apoya a otras entidades artístico-culturales de Buin con apoyo técnico y de difusión, creando redes en la misma comuna con otras disciplinas e instituciones culturales. Así mismo apoya a otros talleres escolares de la zona, visitando colegios y realizando clases y charlas.
            La compañía tiene como visión y misión descentralizar, y potenciar el arte y la cultura local, como agentes de la periferia de la región metropolitana. 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

