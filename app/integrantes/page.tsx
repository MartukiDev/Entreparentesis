import SectionTitle from "@/components/ui/section-title"
import TeamSection from "@/components/integrantes/team-section"

// This would typically come from a database or CMS
const Members = [
  {
    id: "rolando",
    name: "Rolando Collinao",
    role: "Dramaturgo y director de teatro ritual mapuche",
    imageSrc: "/images/integrantes/rolando1.webp",
    description:
      "Creador de El hombre y la lluvia, Angë Pangue, entre otras obras dramáticas. Profesor de los talleres de Teatro Entreparéntesis. Actor.Es parte del equipo directivo, y organizador del Festival de Teatro de Buin desde sus inicios en el año 2008. Gestor Cultural y Relacionador Público de la Compañía.",
  },
  {
    id: "jany",
    name: "Alejandra Pérez",
    role: "Directora General y Actriz",
    imageSrc: "/images/integrantes/janita1.webp",
    description:
      "Parte del equipo directivo, fundadora de la Compañía en el año 2002. Dramaturga, novelista y editora.  Ha estrenado más de 27 obras a su haber, y tiene 7 libros publicados. Dentro de la Compañía está a cargo de la administración, gestión cultural, dirección de obras, escritura de obras dramáticas, clases de teatro, entre otros.",
  },
  {
    id: "lernnie",
    name: "Lernnie Moreno",
    role: "Actriz y Pedagoga teatral",
    imageSrc: "/images/integrantes/lernie1.webp",
    description:
      "Parte de equipo directivo Dirige taller de teatro de la Compañía. Parte del staff de Festival de Teatro Agente preventivo de violencia de género Profesora de teatro en diversas escuelas , ha trabajado en programas para reducir violencia escolar, erradicación del trabajo infantil, prevención de violencia de género en talleres para mujeres.",
  },
  {
    id: "miriam",
    name: "Miriam Casanova",
    role: "Equipo Directico y Actriz",
    imageSrc: "/images/integrantes/miriam1.webp",
    description:
      "Participante activa del staff de organización y realización del Festival de teatro de Buin. Dentro de la compañía está a cargo de gestión cultural y tesorería.",
  },
  {
    id: "majose",
    name: "María José Torres",
    role: "Equipo Directivo y Actriz",
    imageSrc: "/images/integrantes/mariajose1.webp",
    description:
      "Actual estudiante de Derecho y parte del equipo de actrices y actores de la Compañía Entreparentesis desde el año 2019. Ha participado en diversos montajes y es participante activa de montajes actuales. Actualmente es integrante del equipo directivo de la compañía y parte del staff colaborador del Festival de Teatro de Buin.",
  },
  {
    id: "exequiel",
    name: "Exequiel Contreras",
    role: "Actor",
    imageSrc: "/images/integrantes/exequiel1.webp",
    description: "Estudiante y miembro de la compañia entreparentesis desde el año 2017. Forma parte del staff del festival de teatro y del elenco para actuales proyectos de entreparentesis.",
  },
  {
    id: "renato",
    name: "Renato Espinoza",
    role: "Actor",
    imageSrc: "/images/integrantes/rinto1.webp",
    description: "Integrante de la compañía desde el 2020, ah cursado talleres de creación de personaje, movimiento e improvisación, actual Estudiante de Teatro de la UAHC",
  },
  {
    id: "karla",
    name: "Karla Hassan",
    role: "Actriz",
    imageSrc: "/images/integrantes/karla1.webp",
    description: "Actriz, pedagoga teatral, licenciada en teatro. forma parte del elenco de la compañía entreparéntesis como también del staff del festival de teatro 2025. Actualmente facilita el taller Laboratorio de expresion corporal.",
  },
  {
    id: "aleks",
    name: "Aleks Ramírez",
    role: "Actor y Monitor Teatral",
    imageSrc: "/images/integrantes/aleks1.webp",
    description: "Parte del equipo de actores y actrices de la compañía entreparentesis desde el año 2022. Ha participado en mas de 20 proyectos teatrales y está a cargo de la dirección de 2 compañías profesionales emergentes. Dentro de la compañía entreparentesis se desempeña como actor en diversos montajes y es parte del staff del festival de teatro de Buin.",
  },
  {
    id: "franco",
    name: "Franco Correa",
    role: "Actor",
    imageSrc: "/images/integrantes/franco1.webp",
    description: "Estudiante y miembro de la compañia entreparentesis desde el año 2017. Forma parte del staff del festival de teatro y del elenco para actuales proyectos de entreparentesis.",
  },
  {
    id: "nicolle",
    name: "Nicolle Ramos",
    role: "Trabajadora Social",
    imageSrc: "/images/integrantes/nicole1.webp",
    description: "Actualmente Directora de la Radio Entreparéntesis. Participante del taller juvenil-adulto desde el año 2023, actuando en los montajes ´Otra vez y una vez´ y ´Wachinango´.      Con vasta trayectoria y especialización en temáticas asociadas a niñez, adolescencia y vulneracion de derechos, desempeñando labores en este momento en el poder judicial.",
  },
  {
    id: "fran-salas",
    name: "Francisca Salas",
    role: "Cineasta y Fotógrafa",
    imageSrc: "/images/integrantes/fran.webp",
    description:
      "Francisca Salas García, Cineasta con especialidad en Dirección de Fotografía y Producción Ejecutiva de la Universidad de Valparaíso. Co-fundadora de Axis Mundi Producciones. Trabaja en la compañía de teatro Entreparéntesis desde el año 2007 y es parte del equipo de producción del Festival de Teatro de Buin desde su primera versión.",
  },
  {
    id: "carol",
    name: "Carol Cordóba",
    role: "Periodita y Fotógrafa",
    imageSrc: "/images/integrantes/carol1.webp",
    description: "Fotógrafa Profesional periodista, publicitaria y forense. Artista de vocación. Tallerista  y socia de la compañía de teatro. Gestora cultural de Buin, en fotográfia. Parte del staff del Festival de teatro. Profesora de fotografía en el centro de reinserción Kumay. Community manager.",
  },
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

        <TeamSection title="Equipo Directivo" members={Members}
          description = "Estas son las personas que conforman el equipo de Compañia Entreparentesis."
        />
      </div>
    </div>
  )
}

