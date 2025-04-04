import ImageGallery from "@/components/ui/image-gallery"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

// Mock data - in a real app, this would come from a database or CMS
const plays = {
  "el-orden-de-los-factores-no-altera-el-producto": {
    title: "El orden de los factores no altera el producto",
    year: "2022",
    director: "María González",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Una adaptación contemporánea de la obra clásica de Antón Chéjov que explora temas de cambio social, pérdida y la incapacidad de adaptarse a nuevas realidades. Ambientada en un contexto chileno actual, esta versión mantiene la esencia del original mientras establece paralelismos con nuestra sociedad.",
    fullDescription: [
      "El Jardín de los Cerezos es la última obra de Antón Chéjov, escrita en 1903, y considerada una de las grandes obras maestras del teatro moderno. Nuestra adaptación traslada la historia a un contexto chileno contemporáneo, donde una familia terrateniente enfrenta la pérdida de su propiedad debido a deudas acumuladas y cambios sociales.",
      "La obra explora temas universales como el cambio inevitable, la resistencia a adaptarse a nuevas realidades, la pérdida de identidad y el choque entre tradición y modernidad. A través de personajes complejos y situaciones que combinan lo trágico y lo cómico, la obra invita a reflexionar sobre nuestra propia relación con el pasado y nuestra capacidad de enfrentar el futuro.",
      "Esta producción contó con un elenco de 12 actores y actrices, y se presentó en diversas salas de la Región Metropolitana durante 2022, incluyendo una temporada especial en el Teatro Municipal de Buin y participaciones en festivales nacionales.",
    ],
    cast: [
      { name: "Laura Martínez", role: "Liubov Andréievna Ranévskaia" },
      { name: "Pedro Silva", role: "Ermolái Alexéievich Lopajin" },
      { name: "Carmen Lagos", role: "Ania" },
      { name: "Diego Morales", role: "Leonid Andréievich Gáiev" },
    ],
    credits: [
      { role: "Dirección", name: "María González" },
      { role: "Adaptación", name: "Carlos Pérez" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
    ],
    images: Array.from({ length: 8 }, (_, i) => ({
      id: `el-jardin-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `El Jardín de los Cerezos - Imagen ${i + 1}`,
    })),
  },
  "suicidas": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "elena": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "otra-vez-y-una-vez": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "lazare-veni-foras": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "el-ultimo-de-los-mohicanos": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "el-trastorno-de-dalton": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "el-soundtrack-de-hamlet": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "cuando-la-musica-se-acaba": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "el-dia-que-cierre": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "wachinango": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
  "chilebasura": {
    title: "La Tempestad",
    year: "2023",
    director: "Carlos Pérez",
    coverImage: "/placeholder.svg?height=600&width=1200",
    description:
      "Nuestra adaptación contemporánea de la última obra completa de William Shakespeare. Una historia de perdón, redención y magia que transporta al espectador a una isla misteriosa donde nada es lo que parece. Incorporamos elementos multimedia y efectos especiales para crear una experiencia inmersiva.",
    fullDescription: [
      "La Tempestad es considerada la última obra completa escrita por William Shakespeare y una de sus creaciones más enigmáticas y poéticas. Nuestra adaptación mantiene la esencia mágica del original mientras incorpora elementos contemporáneos y tecnológicos para crear una experiencia inmersiva.",
      "La historia sigue a Próspero, un duque exiliado que vive en una isla remota con su hija Miranda. Utilizando sus poderes mágicos, Próspero desata una tempestad que hace naufragar un barco en el que viajan sus antiguos enemigos, iniciando así un plan de venganza que eventualmente se transformará en un camino hacia el perdón y la reconciliación.",
      "Esta producción se destaca por su innovador uso de proyecciones multimedia, efectos especiales y música original en vivo, creando un ambiente mágico que envuelve al espectador. El montaje explora temas como el poder, la libertad, el colonialismo y la redención, estableciendo paralelismos con situaciones contemporáneas.",
    ],
    cast: [
      { name: "Pedro Silva", role: "Próspero" },
      { name: "Carmen Lagos", role: "Miranda" },
      { name: "Diego Morales", role: "Ariel" },
      { name: "Laura Martínez", role: "Calibán" },
    ],
    credits: [
      { role: "Dirección", name: "Carlos Pérez" },
      { role: "Adaptación", name: "María González" },
      { role: "Diseño Escenográfico", name: "Lucía Vargas" },
      { role: "Diseño de Iluminación", name: "Roberto Núñez" },
      { role: "Vestuario", name: "Valeria Castro" },
      { role: "Música Original", name: "Andrés Fuentes" },
      { role: "Diseño Multimedia", name: "Javier Méndez" },
    ],
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `la-tempestad-${i}`,
      src: `/placeholder.svg?height=${600 + i * 10}&width=${800 + i * 10}`,
      alt: `La Tempestad - Imagen ${i + 1}`,
    })),
  },
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

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre la obra</h2>

            <div className="prose prose-lg max-w-none">
              {play.fullDescription.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Galería</h2>
            <ImageGallery images={play.images} columns={3} gap="medium" />
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ficha Técnica</h3>

              <div className="space-y-2">
                <p>
                  <strong>Año:</strong> {play.year}
                </p>
                <p>
                  <strong>Dirección:</strong> {play.director}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Elenco</h3>

              <div className="space-y-2">
                {play.cast.map((member, index) => (
                  <p key={index}>
                    <strong>{member.role}:</strong> {member.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Créditos</h3>

              <div className="space-y-2">
                {play.credits.map((credit, index) => (
                  <p key={index}>
                    <strong>{credit.role}:</strong> {credit.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

