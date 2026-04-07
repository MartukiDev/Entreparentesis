import type { GalleryItem, MemberItem, NewsItem, PlayItem, RadioProgramItem, SiteSectionItem } from "@/lib/types"

export const fallbackSiteSections: Record<string, SiteSectionItem> = {
  home_hero: {
    slug: "home_hero",
    title: "COMPAÑÍA DE TEATRO ENTREPARÉNTESIS",
    subtitle: "Organizadores del Festival de Teatro de Buin",
    description: null,
    content: null,
    image_path: "/images/hero-foto.webp",
    cta_label: "Conócenos",
    cta_href: "/nosotros",
    is_published: true,
    sort_order: 0,
  },
  home_mission: {
    slug: "home_mission",
    title: "Misión",
    subtitle: null,
    description:
      "Descentralizar el teatro y hacerlo accesible para todos, llevando el arte teatral a comunidades que tradicionalmente han tenido acceso limitado a expresiones culturales. Buscamos fomentar el desarrollo artístico local y crear espacios de encuentro a través del teatro.",
    content: null,
    image_path: null,
    cta_label: null,
    cta_href: null,
    is_published: true,
    sort_order: 1,
  },
  home_vision: {
    slug: "home_vision",
    title: "Visión",
    subtitle: null,
    description:
      "Visibilizar nuestro trabajo y a nuestros integrantes, posicionándonos como un referente cultural en la zona sur de la Región Metropolitana. Aspiramos a ser reconocidos por la calidad de nuestras producciones y por nuestro compromiso con la comunidad local.",
    content: null,
    image_path: null,
    cta_label: null,
    cta_href: null,
    is_published: true,
    sort_order: 2,
  },
  radio_page_intro: {
    slug: "radio_page_intro",
    title: "Radio Entreparéntesis",
    subtitle: "Escucha nuestra programación musical y cultural en vivo",
    description:
      "Radio Entreparéntesis Comunitaria, 'Actúa contigo', tiene como objetivo principal otorgar un servicio a la Provincia del Maipo, con programas de interés público para nuestro territorio en el ámbito artístico, cultural y social.",
    content: "https://sp.totalstreaming.net/cp/widgets/player/single/?p=8044",
    image_path: "/images/logoradio.webp",
    cta_label: null,
    cta_href: null,
    is_published: true,
    sort_order: 0,
  },
}

export const fallbackGalleries: GalleryItem[] = [
  {
    id: "fallback-festival-2023",
    slug: "festival-2023",
    title: "XV Festival de Teatro de Buin (2023)",
    description: "Imágenes de las presentaciones, talleres y actividades del XV Festival de Teatro de Buin realizado en 2023.",
    cover_image_path: "/galery/festival2023/1.webp",
    is_published: true,
    sort_order: 1,
  },
  {
    id: "fallback-festival-2022",
    slug: "festival-2022",
    title: "XIV Festival de Teatro de Buin (2022)",
    description: "Imágenes de las presentaciones, talleres y actividades del XIV Festival de Teatro de Buin realizado en 2022.",
    cover_image_path: "/galery/festival2022/1.webp",
    is_published: true,
    sort_order: 2,
  },
]

export const fallbackRadioPrograms: RadioProgramItem[] = [
  {
    id: "fallback-la-hora-del-cine",
    slug: "la-hora-del-cine",
    title: "La hora del cine",
    description: "Programa cultural con recomendaciones, crítica y conversación sobre cine.",
    schedule: "Martes 12:00 AM",
    hosts: "Lía D'acosta",
    stream_url: null,
    external_link: "https://www.instagram.com/lahoradelcineconlia/",
    image_path: "/images/lahoradelcine.webp",
    is_published: true,
    sort_order: 1,
  },
]

export const fallbackMembers: MemberItem[] = [
  {
    id: "fallback-rolando",
    slug: "rolando-collinao",
    name: "Rolando Collinao",
    role: "Equipo directivo y dramaturgo",
    description:
      "Gestor cultural, dramaturgo y miembro del equipo directivo de la compañía. Organizador del Festival de Teatro de Buin.",
    image_path: "/images/integrantes/rolando1.webp",
    is_published: true,
    sort_order: 0,
  },
]

export const fallbackPlays: PlayItem[] = [
  {
    id: "fallback-ange-pangue",
    slug: "ange-pangue",
    title: "Angë Pangue",
    year: "2022",
    director: "Rolando Collinao",
    description: "Montaje inspirado en la cultura mapuche, música en vivo y teatralidad ritual.",
    full_description:
      "Obra de teatro mapuche que explora la cosmovisión, la música y la corporalidad de una experiencia escénica inmersiva.",
    cover_image_path: "/images/obras/angue.webp",
    is_featured: true,
    is_current: true,
    cast: "María José, Exequiel, Franco, Karla, Fran",
    show_dates: "Por definir",
    location: "Por definir",
    is_published: true,
    sort_order: 0,
  },
]

export const fallbackNews: NewsItem[] = [
  {
    id: "fallback-itinerancia",
    slug: "itinerancia-festival-de-teatro-de-buin",
    title: "Itinerancia del Festival de Teatro de Buin",
    summary:
      "La itinerancia vuelve a las localidades de Buin con talleres y presentaciones teatrales gratuitas para la comunidad.",
    content:
      "La penúltima semana antes del Festival se realizará una itinerancia por distintas localidades de la comuna de Buin, con talleres y funciones abiertas.",
    author: "Lía D'acosta",
    published_at: "2025-08-09",
    image_path: "/images_noticias/1.webp",
    is_published: true,
    sort_order: 0,
  },
]
