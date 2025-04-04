import SectionTitle from "@/components/ui/section-title"
import TeamSection from "@/components/integrantes/team-section"

// This would typically come from a database or CMS
const directiveMembers = [
  {
    id: "rolando",
    name: "Rolando Collinao",
    role: "Director General y Actor",
    imageSrc: "/images/integrantes/rolando.jpg",
    description:
      "Fundadora de la compañía y directora de teatro con más de 20 años de experiencia. Ha dirigido más de 30 obras y es reconocida por su innovador enfoque en la adaptación de clásicos.",
  },
  {
    id: "jany",
    name: "Alejandra Pérez",
    role: "Directora General y Actriz",
    imageSrc: "/images/integrantes/jany.jpeg",
    description:
      "Actor y director con formación en la Escuela de Teatro de la Universidad de Chile. Especialista en teatro físico y técnicas de improvisación.",
  },
  {
    id: "camilo",
    name: "Camilo Araya",
    role: "Equipo Directivo y Actor",
    imageSrc: "/images/integrantes/camilo.jpeg",
    description:
      "Gestora cultural con experiencia en producción de eventos artísticos. Responsable de la logística y financiamiento de los proyectos de la compañía.",
  },
  {
    id: "miriam",
    name: "Miriam Casanova",
    role: "Equipo Directico y Actriz",
    imageSrc: "/images/integrantes/miri.jpeg",
    description:
      "Pedagogo teatral especializado en educación artística. Dirige los talleres y programas formativos de la compañía.",
  },
]

const actorsMembers = [
  {
    id: "jose",
    name: "María José Torres",
    role: "Actriz",
    imageSrc: "/images/integrantes/jose.jpg",
    description:
      "Actriz con formación en teatro clásico y contemporáneo. Ha participado en más de 15 montajes de la compañía.",
  },
  {
    id: "exequiel",
    name: "Exequiel Contrerase",
    role: "Actor",
    imageSrc: "/images/integrantes/exe.jpeg",
    description: "Actor especializado en comedia y drama. Miembro de la compañía desde 2017.",
  },
  {
    id: "fran",
    name: "Francisca Pinto",
    role: "Actriz",
    imageSrc: "/images/integrantes/fran.jpeg",
    description: "Actriz y bailarina con formación en teatro físico. Se destaca por su versatilidad interpretativa.",
  },
  {
    id: "lernie",
    name: "Lernnie Moreno",
    role: "Actriz",
    imageSrc: "/images/integrantes/lernie.jpg",
    description: "Actor con experiencia en teatro musical. Se unió a la compañía en 2019.",
  },
  {
    id: "renato",
    name: "Renato Espinoza",
    role: "Actor",
    imageSrc: "/images/integrantes/rinto.jpeg",
    description: "Actor con experiencia en teatro musical. Se unió a la compañía en 2019.",
  },
  {
    id: "karla",
    name: "Karla Hassan",
    role: "Actriz",
    imageSrc: "/images/integrantes/karlula.jpg",
    description: "Actor con experiencia en teatro musical. Se unió a la compañía en 2019.",
  },
  {
    id: "aleks",
    name: "Aleks Ramírez",
    role: "Actor",
    imageSrc: "/images/integrantes/aleks.jpeg",
    description: "Actor con experiencia en teatro musical. Se unió a la compañía en 2019.",
  },
]

const technicalMembers = [
  {
    id: "fran-salas",
    name: "Francisca Salas",
    role: "Cineasta y Fotógrafa",
    imageSrc: "/images/integrantes/fransalas.jpeg",
    description:
      "Arquitecta y diseñadora con especialización en escenografía teatral. Responsable del diseño visual de las producciones.",
  },
  {
    id: "fabian",
    name: "Fabian Arancibia",
    role: "Diseñador de Iluminación",
    imageSrc: "/images/integrantes/fabi.jpeg",
    description: "Técnico especializado en iluminación escénica. Ha trabajado en más de 50 montajes teatrales.",
  }
]

export default function TeamPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Equipos de trabajo en la compañía"
          subtitle="Conoce a las personas que hacen posible nuestro trabajo artístico"
        />

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-600 mb-4">
            En Arte Entreparéntesis creemos en el trabajo colaborativo y multidisciplinario. Nuestro equipo está formado
            por profesionales y entusiastas del teatro con diversas formaciones y especialidades.
          </p>
          <p className="text-gray-600">
            Cada integrante aporta su experiencia y visión única, creando un ambiente de constante aprendizaje y
            crecimiento artístico. Juntos, formamos una comunidad comprometida con la excelencia teatral y el desarrollo
            cultural de nuestra región.
          </p>
        </div>

        <TeamSection title="Directiva" members={directiveMembers} />

        <TeamSection
          title="Elenco Estable"
          description="Actores y actrices que forman parte del núcleo permanente de la compañía."
          members={actorsMembers}
        />

        <TeamSection
          title="Equipo Técnico"
          description="Profesionales responsables de los aspectos técnicos y de diseño de nuestras producciones."
          members={technicalMembers}
        />
      </div>
    </div>
  )
}

