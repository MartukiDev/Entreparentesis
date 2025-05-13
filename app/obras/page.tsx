import SectionTitle from "@/components/ui/section-title"
import PlayCard from "@/components/obras/play-card"

// This would typically come from a database or CMS
const plays = [
  {
    id: "el-orden-de-los-factores-no-altera-el-producto",
    title: "El orden de los factores no altera el producto",
    imageSrc: "/images/obras/elorden.webp",
    description:
      "La primera obra de la Compañía Entreparéntesis, trataba de la vida de una joven y todos los análisis y recuerdos de su mente en torno a las relaciones amorosas que había tenido hasta ese momento, y como le atormentan las situaciones inconclusas que la llevaron a perderse cada vez que iniciara una relación.",
    year: "2002",
    director: "Lía D’acosta",
  },
  {
    id: "suicidas",
    title: "Suicidas",
    imageSrc: "/images/obras/suicidas.webp",
    description:
      "Obra que trata las temáticas referentes al suicidio, con personajes que se aproximan a la muerte desde distinto ángulo y análisis. Muestra las acciones y situaciones a los que se tiene que enfrentar un alma en desesperación y cómo puede salir de esto desde el reconocimiento de los problemas y enfrentando la realidad. Es una obra surrealista en que los diálogos se dan también con espíritus atrapados de personas que eligieron la muerte en otras épocas",
    year: "2004",
    director: "Lía D’acosta",
  },
  {
    id: "elena",
    title: "Elena",
    imageSrc: "/images/obras/elena.webp",
    description:
      "Para darle una mirada distinta a la pregunta existencialista, se analiza el aborto desde una visión surrealista en la que Elena debe reconciliar en su mente a los fantasmas de su pasado, los tropiezos y peligros del presente y las posibilidades de su futuro. Amigos imaginarios y su alter ego, la acompañan en este cuestionamiento y búsqueda de la verdad",
    year: "2005",
    director: "Lía D’acosta",
  },
  {
    id: "otra-vez-y-una-vez",
    title: "Otra vez y una vez",
    imageSrc: "/images/obras/otravez.webp",
    description:
      "El retorno de Leonardo a Chile desenterró un sinfín de historias inconclusas que dejó antes de su partida. Al encontrarse con todas las heridas abiertas, Leonardo debe resolver cada uno de sus problemas, enfrentando a las mujeres de su vida. Un cuestionamiento existencial en un mundo revolucionado por ideas feministas que se contrastan con una sociedad dura y perversa",
    year: "2007",
    director: "Lía D’acosta",
  },
  {
    id: "lazare-veni-foras",
    title: "Lázare veni foras",
    imageSrc: "/images/obras/lazare.webp",
    description:
      "Obra de horror que cuenta la historia de un músico atormentado por una condena impuesta por su madre. Por estas circunstancias se encuentra entre la vida y la muerte, en tanto, se encuentra con todos los seres que vagabundean entre el otro mundo y el otro. Teniendo que tomar decisiones fundamentales acerca de las personas que ama, pero sobre todo acerca de su obra artística que todavía no está terminada",
    year: "2009",
    director: "Lía D’acosta",
  },
  {
    id: "el-ultimo-de-los-mohicanos",
    title: "Adaptación El último de los mohicanos",
    imageSrc: "/images/obras/mohicanos.webp",
    description:
      "Adaptación de Lía D’acosta de la obra de Fenimore Cooper, con el afán de dar a conocer las directrices y la fundamentación del conflicto con los pueblos originarios en Chile. En analogía y comparación con la época de la Guerra Franco-Indio Americana. En la representación de la historia se invita al análisis filosófico de las consecuencias del colonialismo.",
    year: "2012",
    director: "Lía D’acosta",
  },
  {
    id: "el-trastorno-de-dalton",
    title: "El trastorno de Dalton",
    imageSrc: "/images/obras/trastorno de dalton.webp",
    description:
      "Con la intención de contar las vicisitudes de la vida de una persona daltónica se presenta de forma alegórica las problemáticas sociales, colectivas e individuales, de nuestro país. Entiendo lo difícil que es convocar y comprender la realidad en la que vivimos, dependiendo del prisma del que se mire. Poesía, danza, colores y música, crean una obra que desde la metáfora transporta al público a interesantes cuestionamientos",
    year: "2016",
    director: "Lía D’acosta",
  },
  {
    id: "el-soundtrack-de-hamlet",
    title: "El soundtrack de Hamlet",
    imageSrc: "/images/obras/hamlet.webp",
    description:
      "Versión chilena de la historia de Hamlet, de la mano de Lía D’acosta. En la que Hamlet es un joven que está condenado a no morir ni a envejecer. En el opuesto de Hamlet, aquí el cuestionamiento no es ‘morir o no morir’, si no la pregunta acerca del sentido de la vida se expande en un relato de varios años que es contado desde la música que Hamlet escucha",
    year: "2018",
    director: "Lía D’acosta",
  },
  {
    id: "cuando-la-musica-se-acaba",
    title: "Cuando la música se acaba",
    imageSrc: "/images/obras/cuandolamusica.webp",
    description:
      "Obra que habla de la importancia de las influencias musicales de los años 90, en la forma de ver el mundo de los jóvenes, y también en la forma de pensar y apreciar la realidad. Es la historia de una joven que se ve enfrentada a la vida adulta desde el electrificante impulso otorgado por la música que acompañó su crecimiento y desarrollo.",
    year: "2018",
    director: "Lía D’acosta",
  },
  {
    id: "el-dia-que-cierre",
    title: "El día que cierre",
    imageSrc: "/images/obras/eldiaque.webp",
    description:
      "Una comedia de equivocaciones, profundamente filosófica, con personajes variopintas homenajes y préstamos literarios de la cultura pop del siglo XX. Es la última noche de un bar que estará más allá del tiempo y del espacio. Muestra distintas temáticas y cuestionamientos.",
    year: "2008",
    director: "Lía D’acosta",
  },
  {
    id: "wachinango",
    title: "Wachinango",
    imageSrc: "/images/obras/wachinango.webp",
    description:
      "Parodia de nuestro Chile desde una crítica a la televisión chilena y a la ignorancia del chileno respecto de la cultura chilena. Es una sátira también en cuanto muestra las situaciones y problemáticas más importantes de nuestro país, pero desde la burla sarcástica y la ironía.",
    year: "2011",
    director: "Lía D’acosta",
  },
  {
    id: "chile-basura",
    title: "Chile Basura",
    imageSrc: "/images/obras/chilebasura.webp",
    description:
      "En una venta de garage, 6 personajes se encuentran para mostrar la diferentes realidades de nuestro país y los problemas que atañen a nuestra división por clases sociales, necesidades, puntos de vista, modos de ver el mundo. Una comedia entretenida que pone en cuestionamiento todas las injusticias y abusos de nuestro país, frente a una mirada indiferente de los mismos ciudadanos de Chile, ‘Chile Chile lindo",
    year: "2013",
    director: "Lía D’acosta",
  },
  {
    id: "maribel-el-misterio-de-los-tulipanes",
    title: "Maribel, el misterio de los tulipanes",
    imageSrc: "/images/obras/maribel.webp",
    description:
      "Esta es la historia de cómo Maribel pasa de ser una niña a una adolescente, cuando junto a sus amigos se propone descubrir la verdad acerca de los Tulipanes teñidos de sangre. Muestra ese traspaso de la inocencia hasta que Maribel comienza a comprender cómo realmente funciona el mundo. Esa nostalgia inherente que no perdemos nunca en el resto de la vida, nostalgia por nuestra niñez.",
    year: "2010",
    director: "Carlos Pérez",
  },
  {
    id: "candado-de-estrellas",
    title: "Candado de estrellas",
    imageSrc: "/images/obras/candado.webp",
    description:
      "Obra de teatro educativa que nos enseña ciencias, magnetismo, el sistema solar, entre otros. Desde personajes circenses, versátiles y entretenidos. Desde la magia del malabarismo y el payaso Manke",
    year: "2016",
    director: "Lia D’acosta",
  },
  {
    id: "un-cuento-olvidado",
    title: "Un cuento olvidado",
    imageSrc: "/images/obras/uncuentoolvidado.webp",
    description:
      "En una biblioteca los personajes clásicos de los cuentos cobran vida por las noches. Descubren así que sus libros serán dados de baja y buscan una solución para no desaparecer.",
    year: "2019",
    director: "Lía D’acosta",
  },
  {
    id: "hay-selva-en-chile",
    title: "Hay selva en Chile",
    imageSrc: "/images/obras/selva.webp",
    description:
      "Un avión cae en el sur de Chile y dos estudiantes junto a su profesor y piloto deben buscar la forma de sobrevivir. En el proceso se preguntan por la biodiversidad de su país, y la protección de esta. Tratando de entender en este estado de sobrevivencia como convivir con la naturaleza.",
    year: "2017",
    director: "Lía D’acosta",
  },
  {
    id: "sin-tiempo",
    title: "Sin tiempo",
    imageSrc: "/images/obras/sintiempo.webp",
    description:
      "En la Laguna Aculeo Seca llega un viajero del tiempo que ha arrastrado consigo personajes de distintas épocas en su viaje. Todos ellos se conocerán, contarán su vida al lado de la laguna y juntos intentarán revertir la desaparición de la Laguna. Comedia que deja una importante lección ecológica.",
    year: "2019",
    director: "Lía D’acosta",
  },
  {
    id: "travulewen",
    title: "Travulewén",
    imageSrc: "/images/obras/travuwelen.webp",
    description:
      "Obra de teatro físico que cuenta la historia de distintas víctimas del conflicto mapuche en Chile, personas que han sido asesinadas y desaparecidas en distintas épocas de nuestro país, narran su historia a partir de la música y la representación e interpretación corporal.",
    year: "2014",
    director: "Lía D’acosta",
  },
  {
    id: "kutraltun",
    title: "Kütraltun",
    imageSrc: "/images/obras/kutraltun.webp",
    description:
      "Obra de teatro postapocalíptica, futurista que cuenta cómo los sobrevivientes de nuestro territorio luchan por sobrevivir, en donde la cultura mapuche se ha convertido en sinónimo de sobrevivencia. Las castas que se han formado desde la resistencia están en guerra",
    year: "2015",
    director: "Lía D’acosta",
  },
  {
    id: "el-hombre-y-la-lluvia",
    title: "El hombre y la lluvia",
    imageSrc: "/images/obras/elhombre.webp",
    description:
      "Obra de teatro mapuche que narra la historia mitológica de un hombre que se enamora del Ngen del agua",
    year: "2017",
    director: "Rolando Collinao Miranda",
  },
  {
    id: "ange-pangue",
    title: "Angë Pangue",
    imageSrc: "/images/obras/angue.webp",
    description:
      "Obra de teatro mapuche que habla de la figura mitológica de Angë Pangue, desde la corporalidad, la música mapuche y fantasía",
    year: "2022",
    director: "Rolando Collinao",
  },
  {
    id: "noctivaga",
    title: "Noctívaga",
    imageSrc: "/images/obras/noctivaga.webp",
    description:
      "Obra de teatro que habla sobre los sueños y el subconsiente como influye esto en como vivimos nuestras vidas",
    year: "2024",
    director: "Lía D’acosta",
  },
  
]

export default function PlaysPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Nuestras Obras de Teatro"
          subtitle="Descubre las producciones que hemos realizado a lo largo de nuestra trayectoria"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plays.map((play) => (
            <PlayCard
              key={play.id}
              id={play.id}
              title={play.title}
              imageSrc={play.imageSrc}
              description={play.description}
              year={play.year}
              director={play.director}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

