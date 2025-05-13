import ImageGallery from "@/components/ui/image-gallery"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"



const plays = {
  "el-orden-de-los-factores-no-altera-el-producto": {
    title: "El orden de los factores no altera el producto",
    year: "2002",
    director: " Lía D’acosta",
    coverImage: "/images/obras/elorden.webp",
    description:
      "Primer montaje creado por la Compañía,estrenada en el 2002. Reflejaban la vida acelerada y liberal que llevan algunas jóvenes en la búsqueda de su identidad",
    fullDescription: [
      "Primer montaje creado por la Compañía, estrenada en el 2002. Reflejaban la vida acelerada y liberal que llevan algunas jóvenes en la búsqueda de su identidad",
      "Estilo posmodernista, escenografía icónica. La obra contó con la colaboración de empresas locales,como Viña Santa Rita, que al ver la factibilidad de este proyecto donó equipo de iluminación. Lo quesignificó un primer impulso en la producción de la Compañía.",
    ],
    images: Array.from({ length: 1 }, (_, i) => ({
      id: `el-orden-de-los-factores-no-altera-el-producto-${i}`,
      src: `/obras/ordenfactores/${i + 1}.webp`,
      alt: `El orden de los factores no altera el producto - Imagen ${i + 1}`,
    })),
  },
  "suicidas": {
    title: "Suicidas",
    year: "2004",
    director: " Lía D’acosta",
    coverImage: "/images/obras/suicidas.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Obra presentada en el año 2004. Tuvo éxito la historia de seis jóvenes contada a modo surrealista. Jóvenes de distintas edades y estilos se encontraban con fantasmas que les incitaban a cometer suicidio.",
      "Cuadros magníficos de baile tuvieron lugar en esta obra bajo la tutela de la coreógrafa y bailarina de ballet Catalina Barrera. En una escena final simultánea los personajes encontraron su destino, siendo ‘Carla’ la más afectada por las visiones y estados de sus amigos y amantes.",
      "Esta obra significó para la compañía un crecimiento enorme en términos de iluminación, sincronización y danza."
    ],
    images: Array.from({ length: 8 }, (_, i) => ({
      id: `suicidas-${i}`,
      src: `/obras/suicidas/${i + 1}.webp`,
      alt: `Suicidas - Imagen ${i + 1}`,
    })),
  },
  "elena": {
    title: "Elena",
    year: "2005",
    director: "Lía D’acosta",
    coverImage: "/images/obras/elena.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Obra estrenada en el año 2005",
      "Trata la temática del aborto",
      "Elena, una muchacha huérfana que no tiene claro su destino, se enfrenta a su pasado y descubre ser una hija no deseada abandonada al nacer",
      "Las únicas amistades que tiene son sus dos amigos imaginarios, que la acompañan en la travesía de su vida",
      "Surrealista, dinámica, llena de música y canto",
      "Comedia y drama se unen en una obra que sirvió mucho a los espectadores en cuanto la reflexión de un tema tan contingente",
      "Esta obra significó mucho para la Compañía en términos de creación colectiva, puesta en escena y por sobre todas las cosas, la labor moral y educativa que posee el teatro."
    ],
    images: Array.from({ length: 1 }, (_, i) => ({
      id: `elena-${i}`,
      src: `/obras/elena/${i + 1}.webp`,
      alt: `Elena - Imagen ${i + 1}`,
    })),
  },
  "otra-vez-y-una-vez": {
    title: "Otra vez y una vez",
    year: "2007",
    director: "Lía D’acosta",
    coverImage: "/images/obras/otravez.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Obra presentada en el año 2007",
      "Con una innovación maravillosa presenta música original y en vivo, además de tener paralelamente a las escenas imágenes proyectadas",
      "Música, imagen, danza, dan vida a las viejos clásicos del teatro: ‘Romeo y Julieta’, ‘Otelo’, ‘Bodas de sangre’, entre otros",
      "Juntos los extractos de obras clásicas crean una nueva historia moderna y variada acerca de un joven, Leonardo, que regresa a su país después de un largo viaje, quien no tan sólo se reencuentra con sus viejos amigos, sino también con recuerdos ya abandonados y viejos amores."
    ],
    images: Array.from({ length: 11 }, (_, i) => ({
      id: `otra-vez-y-una-vez-${i}`,
      src: `/obras/otravez/${i + 1}.webp`,
      alt: `Otra vez y una vez - Imagen ${i + 1}`,
    })),
  },
  "lazare-veni-foras": {
    title: "Lázare veni foras",
    year: "2009",
    director: "Lía D’acosta",
    coverImage: "/images/obras/lazare.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en 2009",
      "Cuenta la atormentada vida de un joven compositor, genio por definición, sin embargo, angustiado y deprimido por la prematura muerte de su madre",
      "En su estado sensible posee el don de percibir la otra dimensión, aquella donde habitan los fantasmas, el diablo, los amigos imaginarios, monstruos, entre otros",
      "Lázaro se encuentra con todos ellos y logra una conexión importante que cambiará su vida para siempre",
      "Destaca especialmente la escenografía, de naturaleza simbólica, la música que es interpretada en un piano en vivo y guitarra intervenida, y el maquiavélico tono de terror de la obra, que llevó al público a sentirse atemorizado en la oscuridad y soledad, desde su lugar como espectador."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `lazare-veni-foras-${i}`,
      src: `/obras/lazare/${i + 1}.webp`,
      alt: `Lázare veni foras - Imagen ${i + 1}`,
    })),
  },
  "el-ultimo-de-los-mohicanos": {
    title: "El ultimo de los mohicanos",
    year: "2012",
    director: "Lía D’acosta",
    coverImage: "/images/obras/mohicanos.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Año 2012",
      "Adaptación escrita por Lía D’acosta, de la obra literaria excelsa de J. Fenimore Cooper, que cuenta la vida de los últimos mohicanos de sangre pura que habitan el llano fronterizo entre los colonos, invasores ingleses y franceses, y las tribus que han sobrevivido en el lejano 1750",
      "Historia de antaño que al revivirla nos hace reflexionar sobre los conflictos de nuestro país con los pueblos originarios, y meditar sobre una solución positiva en la cual se respete la tierra y la naturaleza, patrimonio de todo el mundo",
      "Se destaca la escenografía, la música incidental que acompaña sin pausa a lo largo de la obra completa, y por supuesto, las caracterizaciones inolvidables de los personajes.",
    ],
    images: Array.from({ length: 7 }, (_, i) => ({
      id: `el-ultimo-de-los-mohicanos-${i}`,
      src: `/obras/mohicanos/${i + 1}.webp`,
      alt: `El ultimo de los mohicanos - Imagen ${i + 1}`,
    })),
  },
  "el-trastorno-de-dalton": {
    title: "El trastorno de Dalton",
    year: "2016",
    director: "Lía D’acosta",
    coverImage: "/images/obras/trastorno de dalton.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2016",
      "De la dramaturgia de Lía D’acosta",
      "A partir de una investigación sobre el daltonismo, se retrata a través de versos, coreografía y música, la forma en que las personas daltónicas ven el mundo, al mismo tiempo que se desarrolla una crítica social a nuestro país, en el cual las personas confunden elementos de nuestra sociedad y no pueden percibir claramente los colores que se despliegan en nuestra convivencia, evidenciando el dolor y frustración que nos estrecha como país."
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `el-trastorno-de-dalton-${i}`,
      src: `/obras/trastorno/${i + 1}.webp`,
      alt: `El trastorno de dalton - Imagen ${i + 1}`,
    })),
  },
  "el-soundtrack-de-hamlet": {
    title: "El Soundtrack de Hamlet",
    year: "2018",
    director: "Lía D’acosta",
    coverImage: "/images/obras/hamlet.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2018",
      "De la dramaturgia de Lía D’acosta, cuenta la historia de un ‘Hamlet’ chileno, quien se ve enfrentado a un cuestionamiento inverso al Hamlet de Shakespeare",
      "Lo que significaría vivir para siempre, sin poder morir",
      "A través de un compilado de canciones que escucha Hamlet va recordando su historia y los episodios que marcaron su vida",
      "Su mejor amigo, cómo se convierte en mercenario, como ha sido maldecido y el reencuentro con el amor de su vida y sus padres",
      "Una estética surrealista, musical, dinámica y filosófica."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `el-soundtrack-de-hamlet-${i}`,
      src: `/obras/soundtrack/${i + 1}.webp`,
      alt: `El soundtrack de hamlet - Imagen ${i + 1}`,
    })),
  },
  "cuando-la-musica-se-acaba": {
    title: "Cuando la musica se acaba",
    year: "2018",
    director: "Lía D’acosta",
    coverImage: "/images/obras/cuandolamusica.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Presentada durante el 2018 y el 2019",
      "De la dramaturgia de Lía D’acosta",
      "Muestra la vida de los jóvenes de los años 90 y el cuestionamiento frente a un vacío de referentes, y la oscuridad de un pasado del que no se habla, pero sin embargo, se le teme",
      "Y de cómo la música que llega a nuestro país de los años 70, 80 y 90 viene a sustituir los discursos ideológicos de la sociedad para convertirse en la visión de mundo que los jóvenes se ven obligados a dibujar desde sus propias ansias y deseos",
      "Un retrato de la generación X, con música en vivo, y la interpretación sobre el escenario junto a la performance."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `cuando-la-musica-se-acaba-${i}`,
      src: `/obras/cuandomusica/${i + 1}.webp`,
      alt: `Cuando la musica se acaba - Imagen ${i + 1}`,
    })),
  },
  "el-dia-que-cierre": {
    title: "El Dia que cierre",
    year: "2008",
    director: "Lía D’acosta",
    coverImage: "/images/obras/eldiaque.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2008, y reestrenada en el ‘El día que cierre’ año 2021",
      "Muestra los sueños de locos y extravagantes personajes que son extraídos de distintas épocas y culturas",
      "Todos estos se encuentran en un bar llamado Ítaca en donde ponen en cuestionamiento el amor verdadero, los problemas que traería ser inmortal, las clases sociales, los roles dentro de una organización, etc",
      "En esta ocasión la Compañía se la juega por mostrar teatro tragicómico, que lleva al público de un extremo a otro",
      "También se evidencia la evolución de los músicos que nos acompañan ya por tres años, en cuanto a la creación de música incidental",
      "Obra dramática publicada en la selección: ‘Cinco Obras’ de Lía D’acosta, en el 2024."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `el-dia-que-cierre-${i}`,
      src: `/obras/diacierre/${i + 1}.webp`,
      alt: `El dia que cierre - Imagen ${i + 1}`,
    })),
  },
  "wachinango": {
    title: "Wachinango",
    year: "2011",
    director: "Lía D’acosta",
    coverImage: "/images/obras/wachinango.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2011 y reestrenada en el 2024",
      "Sátira que representa las vicisitudes de una sociedad globalizada en un país de Latinoamérica, Chile",
      "Tremenda crítica social contada con un tono de humor negro que retrata las banalidades de nuestra cultura y como se ha perdido con el tiempo las enseñanzas de aquellos grandes que gestaron de alguna forma el patio cultural, artístico y social de nuestro país",
      "Musicalizada, posee canciones de tono burlesco que critican la televisión chilena, la política, el desgano y la indiferencia de la gente, la discriminación racial, entre otros",
      "Se destaca por la reacción del público que muchas veces fue más visceral que racional."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `wachinango-${i}`,
      src: `/obras/wachinango/${i + 1}.webp`,
      alt: `Wachinango - Imagen ${i + 1}`,
    })),
  },
  "chile-basura": {
    title: "Chilebasura",
    year: "2013",
    director: "Lía D´acosta",
    coverImage: "/images/obras/chilebasura.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2013",
      "Comedia que critica abiertamente las mañas del chileno promedio, estereotipándolos en seis personajes, que representan distintas clases sociales y tipos de personas de nuestro país",
      "Es el intento de reflejar como un espejo la sociedad de nuestro país, que carece de identidad y salud mental, debido a distintos factores económicos y de educación, que nos tienen atrapados en la más grande incertidumbre valórica",
      "Destaca el dinamismo del montaje, en relación a su interacción con los músicos, quienes nuevamente nos encantan con sus melodías y canciones en vivo, además de intervenciones que amenizan el desarrollo del montaje."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `chilebasura-${i}`,
      src: `/obras/chilebasura/${i + 1}.webp`,
      alt: `Chilebasura - Imagen ${i + 1}`,
    })),
  },
  "maribel-el-misterio-de-los-tulipanes": {
    title: "Maribel el misterio de los tulipanes",
    year: "2010",
    director: "Lía D´acosta",
    coverImage: "/images/obras/maribel.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2010, reestrenada en el año 2019",
      "Obra infantil contada por niños, los personajes protagónicos fueron interpretados por niños del taller de entre 11 y 13 años de edad",
      "Cuenta la vida de Maribel, quien tiene la imaginación suficiente para llevar a todos sus amigos a distintas aventuras",
      "Sin embargo, se encuentra en una edad crítica, aquella en la que se comienza a cuestionar la realidad concebida y comienzan los cuestionamientos existenciales, para convertirse de niña en adolescente",
      "Musicalizada completamente la obra, posee varias canciones inolvidables que son interpretadas por los mismos actores en vivo."
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `maribel-el-misterio-de-los-tulipanes-${i}`,
      src: `/obras/misteriotulipanes/${i + 1}.webp`,
      alt: `Maribel y el misterio de los tulipanes - Imagen ${i + 1}`,
    })),
  },
  "candado-de-estrellas": {
    title: "Candado de estrellas",
    year: "2016",
    director: "Lía D´acosta",
    coverImage: "/images/obras/candado.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2016 para la itinerancia circense de la productora Circo Manke",
      "En colaboración se desarrolló este montaje que combinaba ciencia, valores, acrobacias, malabarismo, comedia y una historia de amistad y respeto",
      "Se realizó una itinerancia por establecimientos educacionales y teatros, enseñando sobre el magnetismo, el sistema solar, la teoría de la atracción, rotación y traslación"
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `candado-de-estrellas-${i}`,
      src: `/obras/candado/${i + 1}.webp`,
      alt: `Candado de estrellas - Imagen ${i + 1}`,
    })),
  },
  "un-cuento-olvidado": {
    title: "Un cuento olvidado",
    year: "2019",
    director: "Lía D´acosta",
    coverImage: "/images/obras/uncuentoolvidado.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Presentada durante el año 2019, 2022, 2024 y 2025",
      "Obra teatral infantil que fomenta la lectura y el valor de los libros",
      "Los personajes de cuentos antiguos se escapan de noche de sus libros y se dan cuenta por un panfleto que los libros de la biblioteca serán renovados y sus libros serán reciclados",
      "Entonces, Caperucita Roja, El lobo feroz, la bruja del oeste, Hansel y Campanita, hacen un plan para salvar sus libros",
      "Dinámica, divertida con un mensaje sobre el grooming, la adicción a los celulares, entre otros problemas que atañen a los niños y niñas de hoy"
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `un-cuento-olvidado-${i}`,
      src: `/obras/cuentoolvidado/${i + 1}.webp`,
      alt: `Un cuento olvidado - Imagen ${i + 1}`,
    })),
  },
  "hay-selva-en-chile": {
    title: "Hay selva en Chile",
    year: "2017",
    director: "Lia D´acosta",
    coverImage: "/images/obras/selva.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2017",
      "Montaje ecológico que realizó una itinerancia por establecimientos educacionales y teatros, con el fin de promover la conciencia ecológica y el conocimiento sobre nuestra flora y fauna",
      "Con cuadros de malabarismo y trapecio, cuenta la historia de un avión que se cae en el sur de Chile y los sobrevivientes, estudiantes de gira de estudio, junto al piloto deben encontrar la forma de salvar sus vidas y volver a la ciudad",
      "Comedia, didáctica, rápida y dinámica"
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `hay-selva-en-chile-${i}`,
      src: `/obras/hayselvaenchile/${i + 1}.webp`,
      alt: `Hay selva en chile - Imagen ${i + 1}`,
    })),
  },
  "sin-tiempo": {
    title: "Sin tiempo",
    year: "2019",
    director: "Lía D´acosta",
    coverImage: "/images/obras/sintiempo.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Presentada durante el año 2019",
      "Obra teatral infantil que muestra la problemática de la Laguna Aculeo, y todas las consecuencias que vivió la población colindante cuando esta se secó",
      "Crea conciencia ecológica y también social",
      "Es la historia de un científico que viaja en el tiempo para advertir de lo que puede pasar en la laguna, pero al viajar arrastra consigo personas de todos los tiempos, y se encuentran todos frente a esta laguna seca, sin entender dónde están",
      "Divertida, con malabarismo, un texto rápido y de mucha significancia"
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `sin-tiempo-${i}`,
      src: `/obras/sintiempo/${i + 1}.webp`,
      alt: `Sin tiempo - Imagen ${i + 1}`,
    })),
  },
  "travulewen": {
    title: "Travulewén",
    year: "2014",
    director: "Lía D´acosta",
    coverImage: "/images/obras/travuwelen.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2014",
      "Teatro físico que pretende representar con simbología corporal la historia de seis personajes de la historia mapuche, que fueron asesinados en circunstancias trágicas e injustas",
      "Se quiere mostrar relatos que no son contados a diario y la situación que vive el mapuche en cuanto su sangre ha sido amedrentada y socavada",
      "Esta obra cuenta nuevamente con la música incidental de Maximiliano Pérez, que esta vez mezcla instrumentos y música mapuche con estilos musicales contemporáneos como el Hip-Hop y la música electrónica",
      "Es un desafío para nuestra compañía que siempre se ha destacado por el buen uso de la voz, presentar una obra en la cual casi no existe el diálogo"
    ],
    images: Array.from({ length: 6  }, (_, i) => ({
      id: `travulewen-${i}`,
      src: `/obras/travuwelen/${i + 1}.webp`,
      alt: `Travulewén - Imagen ${i + 1}`,
    })),
  },
  "kutraltun": {
    title: "Kütraltun",
    year: "2015",
    director: "Lía D´acosta",
    coverImage: "/images/obras/kutraltun.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2015",
      "Montaje ambientado en el universo creado por la escritora Lía D’ acosta para la saga de sus libros: ‘Crónicas de Afmapu’, y el proyecto cinematográfico ‘Mapuwé’",
      "Se trata de un mundo futurista postapocalíptico, en lo que alguna vez fue Chile, donde los sobrevivientes se enfrentan a una guerra de castas, algunos mirando hacia la cosmovisión mapuche y ‘los otros’ tratando de revivir el mundo que ya ha desaparecido",
      "Esta es la historia de Kalfulikán, líder de los weichafe que debe enfrentarse a la decisión de seguir el legado de su padre o continuar luchando por el sueño de su madre",
      "Música incidental minimalista, performance realista, estética distópica"
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `kutraltun-${i}`,
      src: `/obras/kutraltun/${i + 1}.webp`,
      alt: `Kütraltun - Imagen ${i + 1}`,
    })),
  },
  "el-hombre-y-la-lluvia": {
    title: "El hombre y la lluvia",
    year: "2017",
    director: "Rolando Collinao Miranda",
    coverImage: "/images/obras/elhombre.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2017",
      "De la dramaturgia mapuche de Rolando Collinao Miranda, cuenta la historia de una joven mapuche que se enamora del agua",
      "Una historia mitológica bellísima con poesía en mapudungun que enaltece la cultura mapuche, desplegando la cosmovisión desde la danza y la música",
      "Inspiradora y con la visión de expandir la cultura hacia los chilenos, para poder comprender el lenguaje de la tierra y la forma de ver el mundo del mapuche",
      "Se reestrenará durante el año 2025"
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      id: `el-hombre-y-la-lluvia-${i}`,
      src: `/obras/hombrelluvia/${i + 1}.webp`,
      alt: `El hombre y la lluvia - Imagen ${i + 1}`,
    })),
  },
  "ange-pangue": {
    title: "Angë Pangue",
    year: "2022",
    director: "Rolando Collinao Miranda",
    coverImage: "/images/obras/angue.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el año 2022",
      "De la dramaturgia de Rolando Collinao Miranda",
      "Obra teatral mapuche que explora ya en un estilo teatral, desde el rito y la cosmovisión mapuche",
      "No tan sólo en la exhibición de la misma, sino desde la conformación, la creación y la interpretación de los personajes",
      "Realización de un rito teatral mapuche en el teatro, en la que el espectador forma parte de la experiencia",
      "Desde la música, los olores, liderados por ‘carita de león’ quien debe enfrentar sus miedos y pasiones"
    ],
    images: Array.from({ length: 12 }, (_, i) => ({
      id: `angue-pangue-${i}`,
      src: `/obras/anguepangue/${i + 1}.webp`,
      alt: `Angë Pangue - Imagen ${i + 1}`,
    })),
  },
  "noctivaga": {
    title: "Noctivaga",
    year: "2024",
    director: "Lía D’acosta",
    coverImage: "/images/obras/noctivaga.webp",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "Estrenada en el 2024",
      "De la dramaturgia de Lía D’Acosta",
      "Explora en las ideas filosóficas relacionadas con la muerte",
      "Muestra en un espacio onírico y surrealista las ideas, deseos y recuerdos de Cleo",
      "En el limbo de su inconciencia deberá buscar la respuesta a todas sus relaciones de amistad, de amor y familiares",
      "Busca encontrar lo que desea: la inspiración para vivir y enfrentar la vida",
      "Estética minimalista, al igual que la música que crea la atmósfera caótica, dinámica y a momentos siniestra"
    ],
    images: Array.from({ length: 15 }, (_, i) => ({
      id: `noctivaga-${i}`,
      src: `/obras/noctivaga/${i + 1}.webp`,
      alt: `Noctívaga - Imagen ${i + 1}`,
    })),
  },
}

export async function generateStaticParams() {
  return Object.keys(plays).map((id) => ({
    id,
  }))
}
// Add more plays as needed with the same structure

export default function PlayDetailPage({ params }: { params: { id: string } }) {
  const playId = params.id
  const play = plays[playId as keyof typeof plays]

  if (!play) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Obra no encontrada</h1>
        <p className="text-gray-600 mb-8">La obra que estás buscando no existe o ha sido eliminada.</p>
        <Link href="/obras" className="inline-flex items-center text-red-600 hover:text-red-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a obras
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-[50vh]">
        <Image src={play.coverImage || "/placeholder.svg"} alt={play.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-2">{play.title}</h1>
          <p className="text-xl text-white">{play.year}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/obras" className="inline-flex items-center text-red-600 hover:text-red-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a obras
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre la obra</h2>

          <div className="prose prose-lg max-w-none mb-12">
            {play.fullDescription.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Galería</h2>
          <ImageGallery images={play.images} columns={3} gap="medium" />
        </div>
      </div>
    </div>
  )
}