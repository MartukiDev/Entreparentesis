import {
  fallbackGalleries,
  fallbackMembers,
  fallbackNews,
  fallbackPlays,
  fallbackRadioPrograms,
  fallbackSiteSections,
} from "@/lib/cms/fallback-data"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type {
  FestivalItem,
  FestivalSettingsItem,
  GalleryImageItem,
  GalleryItem,
  MemberItem,
  NewsItem,
  PlayImageItem,
  PlayItem,
  RadioProgramItem,
  SiteSectionItem,
} from "@/lib/types"

export async function getSiteSections(slugs: string[]) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("site_sections")
      .select("slug,title,subtitle,description,content,image_path,cta_label,cta_href,is_published,sort_order")
      .in("slug", slugs)
      .eq("is_published", true)

    if (error || !data) {
      return slugs.reduce<Record<string, SiteSectionItem>>((acc, slug) => {
        const fallback = fallbackSiteSections[slug]
        if (fallback) acc[slug] = fallback
        return acc
      }, {})
    }

    const typedData = data as SiteSectionItem[]
    const map = typedData.reduce<Record<string, SiteSectionItem>>((acc: Record<string, SiteSectionItem>, item: SiteSectionItem) => {
      acc[item.slug] = item
      return acc
    }, {})

    slugs.forEach((slug) => {
      if (!map[slug] && fallbackSiteSections[slug]) {
        map[slug] = fallbackSiteSections[slug]
      }
    })

    return map
  } catch {
    return slugs.reduce<Record<string, SiteSectionItem>>((acc, slug) => {
      const fallback = fallbackSiteSections[slug]
      if (fallback) acc[slug] = fallback
      return acc
    }, {})
  }
}

export async function getPublishedGalleries() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("galleries")
      .select("id,slug,title,description,cover_image_path,is_published,sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackGalleries
    }

    const galleries = data as GalleryItem[]
    const withCounts = await Promise.all(
      galleries.map(async (gallery) => {
        const { count } = await supabase
          .from("gallery_images")
          .select("id", { count: "exact", head: true })
          .eq("gallery_id", gallery.id)

        return {
          ...gallery,
          image_count: count || 0,
        }
      }),
    )

    return withCounts
  } catch {
    return fallbackGalleries
  }
}

export async function getGalleryBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: gallery, error: galleryError } = await supabase
      .from("galleries")
      .select("id,slug,title,description,cover_image_path,is_published,sort_order")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (galleryError || !gallery) {
      return null
    }

    const { data: images } = await supabase
      .from("gallery_images")
      .select("id,gallery_id,image_path,alt_text,sort_order,is_cover")
      .eq("gallery_id", gallery.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    return {
      gallery: gallery as GalleryItem,
      images: (images || []) as GalleryImageItem[],
    }
  } catch {
    return null
  }
}

export async function getPublishedRadioPrograms() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("radio_programs")
      .select("id,slug,title,description,schedule,hosts,stream_url,external_link,image_path,is_published,sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackRadioPrograms
    }

    return data as RadioProgramItem[]
  } catch {
    return fallbackRadioPrograms
  }
}

export async function getPublishedMembers() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("members")
      .select("id,slug,name,role,description,image_path,is_published,sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackMembers
    }

    return data as MemberItem[]
  } catch {
    return fallbackMembers
  }
}

export async function getPublishedPlays() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("plays")
      .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false })

    if (error || !data || data.length === 0) {
      return fallbackPlays
    }

    return data as PlayItem[]
  } catch {
    return fallbackPlays
  }
}

export async function getFeaturedPlays() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: homeRows, error: homeError } = await supabase
      .from("home_featured_plays")
      .select("play_id,sort_order")
      .order("sort_order", { ascending: true })

    if (!homeError && homeRows && homeRows.length > 0) {
      const playIds = homeRows.map((row: { play_id: string }) => row.play_id)
      const { data: plays } = await supabase
        .from("plays")
        .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
        .in("id", playIds)
        .eq("is_published", true)

      if (plays && plays.length > 0) {
        const playMap = new Map((plays as PlayItem[]).map((play) => [play.id, play]))
        return homeRows
          .map((row: { play_id: string }) => playMap.get(row.play_id))
          .filter(Boolean) as PlayItem[]
      }
    }

    const { data, error } = await supabase
      .from("plays")
      .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackPlays.filter((play) => play.is_featured)
    }

    return data as PlayItem[]
  } catch {
    return fallbackPlays.filter((play) => play.is_featured)
  }
}

export async function getCurrentPlay() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: section } = await supabase
      .from("site_sections")
      .select("content")
      .eq("slug", "home_current_play")
      .maybeSingle()

    if (section?.content) {
      const { data: linkedPlay } = await supabase
        .from("plays")
        .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
        .eq("slug", section.content)
        .eq("is_published", true)
        .maybeSingle()

      if (linkedPlay) {
        return linkedPlay as PlayItem
      }
    }

    const { data } = await supabase
      .from("plays")
      .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
      .eq("is_published", true)
      .eq("is_current", true)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle()

    if (data) {
      return data as PlayItem
    }

    return fallbackPlays.find((play) => play.is_current) || fallbackPlays[0] || null
  } catch {
    return fallbackPlays.find((play) => play.is_current) || fallbackPlays[0] || null
  }
}

export async function getPlayBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: play, error: playError } = await supabase
      .from("plays")
      .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (playError || !play) {
      return null
    }

    const { data: images } = await supabase
      .from("play_images")
      .select("id,play_id,image_path,alt_text,sort_order,is_cover")
      .eq("play_id", play.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    return {
      play: play as PlayItem,
      images: (images || []) as PlayImageItem[],
    }
  } catch {
    return null
  }
}

export async function getPublishedNews(limit?: number) {
  try {
    const supabase = await createSupabaseServerClient()
    let query = supabase
      .from("news")
      .select("id,slug,title,summary,content,author,published_at,image_path,is_published,sort_order")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .order("sort_order", { ascending: true })

    if (limit && limit > 0) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      return fallbackNews.slice(0, limit || fallbackNews.length)
    }

    return data as NewsItem[]
  } catch {
    return fallbackNews.slice(0, limit || fallbackNews.length)
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("news")
      .select("id,slug,title,summary,content,author,published_at,image_path,is_published,sort_order")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (error || !data) {
      return fallbackNews.find((item) => item.slug === slug) || null
    }

    return data as NewsItem
  } catch {
    return fallbackNews.find((item) => item.slug === slug) || null
  }
}

export async function getFestivalSettings() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase
      .from("festival_settings")
      .select("id,hero_title,hero_subtitle,hero_image_path,current_title,current_subtitle,current_description,current_date,current_location,about_title,about_content,organizer_title,organizer_content,where_title,where_content,is_published")
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()

    return (data as FestivalSettingsItem | null) || null
  } catch {
    return null
  }
}

export async function getPublishedFestivalItems(section: FestivalItem["section"]) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from("festival_items")
      .select("id,section,title,description,year_label,image_path,is_published,sort_order")
      .eq("is_published", true)
      .eq("section", section)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error || !data) {
      return []
    }

    return data as FestivalItem[]
  } catch {
    return []
  }
}
