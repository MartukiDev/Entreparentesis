export interface SiteSectionItem {
	id?: string
	slug: string
	title: string
	subtitle: string | null
	description: string | null
	content: string | null
	image_path: string | null
	cta_label: string | null
	cta_href: string | null
	is_published: boolean
	sort_order: number
}

export interface MemberItem {
	id: string
	slug: string
	name: string
	role: string
	description: string | null
	image_path: string | null
	is_published: boolean
	sort_order: number
}

export interface PlayItem {
	id: string
	slug: string
	title: string
	year: string
	director: string
	description: string | null
	full_description: string | null
	cover_image_path: string | null
	is_featured: boolean
	is_current: boolean
	cast: string | null
	show_dates: string | null
	location: string | null
	is_published: boolean
	sort_order: number
}

export interface PlayImageItem {
	id: string
	play_id: string
	image_path: string
	alt_text: string | null
	sort_order: number
	is_cover: boolean
}

export interface NewsItem {
	id: string
	slug: string
	title: string
	summary: string
	content: string
	author: string
	published_at: string
	image_path: string | null
	is_published: boolean
	sort_order: number
}

export interface FestivalSettingsItem {
	id: string
	hero_title: string
	hero_subtitle: string | null
	hero_image_path: string | null
	current_title: string
	current_subtitle: string | null
	current_description: string | null
	current_date: string | null
	current_location: string | null
	about_title: string
	about_content: string | null
	organizer_title: string | null
	organizer_content: string | null
	where_title: string | null
	where_content: string | null
	is_published: boolean
}

export type FestivalItemSection = "current_vertical" | "current_horizontal" | "previous_editions"

export interface FestivalItem {
	id: string
	section: FestivalItemSection
	title: string
	description: string | null
	year_label: string | null
	image_path: string
	is_published: boolean
	sort_order: number
}

export interface HomeFeaturedPlayItem {
	id: string
	play_id: string
	sort_order: number
}

export interface GalleryItem {
	id: string
	slug: string
	title: string
	description: string | null
	cover_image_path: string | null
	is_published: boolean
	sort_order: number
	image_count?: number
}

export interface GalleryImageItem {
	id: string
	gallery_id: string
	image_path: string
	alt_text: string | null
	sort_order: number
	is_cover: boolean
}

export interface RadioProgramItem {
	id: string
	slug: string
	title: string
	description: string | null
	schedule: string | null
	hosts: string | null
	stream_url: string | null
	external_link: string | null
	image_path: string | null
	is_published: boolean
	sort_order: number
}
