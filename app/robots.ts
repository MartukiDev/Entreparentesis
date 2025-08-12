import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.entreparentesis.cl/sitemap.xml',
    host: 'https://www.entreparentesis.cl',
  }
}
