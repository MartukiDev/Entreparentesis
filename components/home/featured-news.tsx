import Link from "next/link"
import NewsCard from "@/components/noticias/news-card"
import SectionTitle from "@/components/ui/section-title"
import { getPublishedNews } from "@/lib/cms/public"

export default async function FeaturedNews() {
  const noticiasDestacadas = await getPublishedNews(1)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Últimas Noticias" 
          subtitle="Mantente informado sobre las novedades de nuestra compañía"
        />
        
        <div className="flex justify-center mb-8">
          <div className="max-w-md">
            {noticiasDestacadas.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/noticias"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Ver todas las noticias
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
