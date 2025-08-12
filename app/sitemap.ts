import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.entreparentesis.cl'
  
  // URLs principales - priorizando la compañía
  const mainRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/nosotros', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/obras', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/integrantes', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  // URLs secundarias
  const secondaryRoutes = [
    { url: '/festival', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/noticias', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/galerias', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/radio', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/contacto', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  // URLs de noticias
  const noticiasIds = [1, 2, 3, 4, 5, 6]
  const noticiasRoutes = noticiasIds.map(id => ({
    url: `/noticias/${id}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const
  }))

  // Todas las rutas
  const allRoutes = [...mainRoutes, ...secondaryRoutes, ...noticiasRoutes]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
