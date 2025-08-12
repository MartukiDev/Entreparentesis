import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quiénes Somos | Compañía de Teatro Entreparéntesis",
  description: "Conoce la historia de la Compañía de Teatro Entreparéntesis, fundada en 2002 en Buin. Más de 20 años creando obras teatrales, organizando el Festival de Teatro de Buin y formando nuevos talentos.",
  keywords: "Compañía de Teatro Entreparéntesis, historia teatro Buin, grupo teatral fundado 2002, Festival de Teatro de Buin, talleres teatro",
  alternates: {
    canonical: "/nosotros",
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[40vh]">
        <Image
          src="/images/nosotros_hero.webp"
          alt="Equipo de Entreparéntesis"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Compañía de Teatro Entreparéntesis</h1>
            <p className="text-xl text-white">Más de 20 años creando teatro en Buin</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Historia de la Compañía</h2>
            <p className="text-justify">
            La <strong>Compañía de Teatro Entreparéntesis</strong> fue fundada en el año 2002 y ha estado por más de 20 años en la actividad teatral de la comuna de Buin. Es la organizadora del <strong>Festival de Teatro de Buin</strong> desde el año 2008 hasta la actualidad. Ha estrenado más de 30 obras teatrales, entre las cuales se encuentran la adaptación «El último de los Mohicanos», «Kalfu pewma mew», «Chile basura», «Wuachinango», «El Soundtrack de Hamlet», «Él trastorno de Dalton», entre otras.
            </p>
            <br />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Formación y Talleres</h3>
            <p className="text-justify">
              La <strong>Compañía de Teatro Entreparéntesis</strong> dicta múltiples talleres de teatro en la comuna de Buin, durante 20 años ha permanecido como una de las principales escuelas informales de la zona.
            </p>
            <br />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Redes y Colaboraciones</h3>
            <p className="text-justify">  
              La <strong>compañía de teatro Entreparéntesis</strong> también está asociada a otras entidades artísticas, en el intercambio de apoyo y otras actividades en conjunto, y pertenece a la Red de Compañías Nacional.
            </p>
            <br />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Sede y Actividades</h3>
            <p className="text-justify">
              La <strong>Compañía de Teatro Entreparéntesis</strong> se desarrolla principalmente en el Centro Cultural de Buin, donde realiza sus talleres, estrenos de obras, el Festival de Teatro de Buin, entre otros.
            </p>
            <br />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Reconocimientos y Fondos</h3>
            <p className="text-justify">
            La <strong>Compañía de Teatro Entreparéntesis</strong> ha sido acreedora de varios fondos culturales artísticos estatales, para la realización de itinerancias en los establecimientos públicos de Buin, radio teatro, talleres escolares, como también para la realización del Festival de teatro de Buin.
            </p>
            <br />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Misión y Visión</h3>
            <p className="text-justify">
            También apoya a otras entidades artístico-culturales de Buin con apoyo técnico y de difusión, creando redes en la misma comuna con otras disciplinas e instituciones culturales. Así mismo apoya a otros talleres escolares de la zona, visitando colegios y realizando clases y charlas.
            </p>
            <p className="text-justify">
            La <strong>Compañía de Teatro Entreparéntesis</strong> tiene como visión y misión descentralizar, y potenciar el arte y la cultura local, como agentes de la periferia de la región metropolitana. 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

