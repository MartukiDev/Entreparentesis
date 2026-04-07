"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { resolvePublicImage } from "@/lib/cms/media"
import { uploadOptimizedImage } from "@/lib/cms/admin"
import type { PlayItem, SiteSectionItem } from "@/lib/types"

const HOME_SLUGS = ["home_hero", "home_mission", "home_vision", "home_current_play"]

type SectionMap = Record<string, SiteSectionItem>

export default function HomeManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [sections, setSections] = useState<SectionMap>({})
  const [plays, setPlays] = useState<PlayItem[]>([])
  const [featuredPlayIds, setFeaturedPlayIds] = useState<string[]>([])
  const [selectedPlayId, setSelectedPlayId] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setError(null)

    const [{ data: sectionRows, error: sectionError }, { data: playRows, error: playError }, { data: featuredRows }] =
      await Promise.all([
        supabase
          .from("site_sections")
          .select("id,slug,title,subtitle,description,content,image_path,cta_label,cta_href,is_published,sort_order")
          .in("slug", HOME_SLUGS),
        supabase
          .from("plays")
          .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
          .eq("is_published", true)
          .order("sort_order", { ascending: true }),
        supabase.from("home_featured_plays").select("play_id,sort_order").order("sort_order", { ascending: true }),
      ])

    if (sectionError) {
      setError(sectionError.message)
      return
    }

    if (playError) {
      setError(playError.message)
      return
    }

    const sectionMap: SectionMap = {}
    ;(sectionRows as SiteSectionItem[] | null)?.forEach((item) => {
      sectionMap[item.slug] = item
    })

    HOME_SLUGS.forEach((slug, index) => {
      if (!sectionMap[slug]) {
        sectionMap[slug] = {
          slug,
          title: "",
          subtitle: "",
          description: "",
          content: "",
          image_path: "",
          cta_label: "",
          cta_href: "",
          is_published: true,
          sort_order: index,
        }
      }
    })

    setSections(sectionMap)
    setPlays((playRows as PlayItem[] | null) || [])
    setFeaturedPlayIds(((featuredRows as { play_id: string }[] | null) || []).map((item) => item.play_id))
  }

  useEffect(() => {
    loadData()
  }, [])

  const setSectionField = (slug: string, field: keyof SiteSectionItem, value: string | boolean) => {
    setSections((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        [field]: value,
      },
    }))
  }

  const saveSections = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)

    try {
      for (const slug of HOME_SLUGS) {
        const item = sections[slug]
        const payload = {
          slug: item.slug,
          title: item.title || slug,
          subtitle: item.subtitle || null,
          description: item.description || null,
          content: item.content || null,
          image_path: item.image_path || null,
          cta_label: item.cta_label || null,
          cta_href: item.cta_href || null,
          is_published: item.is_published,
          sort_order: item.sort_order || 0,
        }

        if (item.id) {
          const { error: updateError } = await supabase.from("site_sections").update(payload).eq("id", item.id)
          if (updateError) throw new Error(updateError.message)
        } else {
          const { data, error: insertError } = await supabase.from("site_sections").insert(payload).select("id").single()
          if (insertError) throw new Error(insertError.message)
          setSections((prev) => ({
            ...prev,
            [slug]: {
              ...prev[slug],
              id: data.id,
            },
          }))
        }
      }

      await supabase.from("home_featured_plays").delete().gte("sort_order", -1)

      if (featuredPlayIds.length > 0) {
        const rows = featuredPlayIds.map((playId, index) => ({
          play_id: playId,
          sort_order: index,
        }))
        const { error: insertFeaturedError } = await supabase.from("home_featured_plays").insert(rows)
        if (insertFeaturedError) throw new Error(insertFeaturedError.message)
      }

      setMessage("Contenido de Inicio actualizado")
      await loadData()
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "No fue posible guardar")
    } finally {
      setSaving(false)
    }
  }

  const uploadHeroImage = async (file: File) => {
    setError(null)
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/home",
        slug: "home-hero",
        file,
        maxWidth: 2200,
        maxHeight: 1400,
      })
      setSectionField("home_hero", "image_path", path)
      setMessage("Imagen optimizada y cargada")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
    }
  }

  const addFeaturedPlay = () => {
    if (!selectedPlayId || featuredPlayIds.includes(selectedPlayId)) return
    setFeaturedPlayIds((prev) => [...prev, selectedPlayId])
    setSelectedPlayId("")
  }

  const removeFeaturedPlay = (playId: string) => {
    setFeaturedPlayIds((prev) => prev.filter((id) => id !== playId))
  }

  const featuredPlays = featuredPlayIds
    .map((id) => plays.find((play) => play.id === id))
    .filter(Boolean) as PlayItem[]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Inicio</h2>
        <p className="text-gray-600">Administra hero, misión/visión, obras destacadas y obra actual.</p>
      </div>

      <form onSubmit={saveSections} className="space-y-6">
        <section className="border rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold">Hero</h3>
          <input
            className="w-full border rounded-md px-3 py-2"
            placeholder="Título"
            value={sections.home_hero?.title || ""}
            onChange={(e) => setSectionField("home_hero", "title", e.target.value)}
          />
          <input
            className="w-full border rounded-md px-3 py-2"
            placeholder="Subtítulo"
            value={sections.home_hero?.subtitle || ""}
            onChange={(e) => setSectionField("home_hero", "subtitle", e.target.value)}
          />
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadHeroImage(e.target.files[0])} />
            {sections.home_hero?.image_path ? (
              <img src={resolvePublicImage(sections.home_hero.image_path)} alt="Hero" className="w-14 h-14 rounded object-cover border" />
            ) : null}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 border rounded-lg p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Misión</h3>
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="Título"
              value={sections.home_mission?.title || ""}
              onChange={(e) => setSectionField("home_mission", "title", e.target.value)}
            />
            <textarea
              className="w-full border rounded-md px-3 py-2 min-h-24"
              placeholder="Texto de misión"
              value={sections.home_mission?.description || ""}
              onChange={(e) => setSectionField("home_mission", "description", e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Visión</h3>
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="Título"
              value={sections.home_vision?.title || ""}
              onChange={(e) => setSectionField("home_vision", "title", e.target.value)}
            />
            <textarea
              className="w-full border rounded-md px-3 py-2 min-h-24"
              placeholder="Texto de visión"
              value={sections.home_vision?.description || ""}
              onChange={(e) => setSectionField("home_vision", "description", e.target.value)}
            />
          </div>
        </section>

        <section className="border rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold">Obra actual</h3>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={sections.home_current_play?.content || ""}
            onChange={(e) => setSectionField("home_current_play", "content", e.target.value)}
          >
            <option value="">Selecciona una obra</option>
            {plays.map((play) => (
              <option key={play.id} value={play.slug}>
                {play.title}
              </option>
            ))}
          </select>
        </section>

        <section className="border rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold">Obras destacadas</h3>
          <div className="flex gap-2">
            <select
              className="flex-1 border rounded-md px-3 py-2"
              value={selectedPlayId}
              onChange={(e) => setSelectedPlayId(e.target.value)}
            >
              <option value="">Selecciona obra</option>
              {plays.map((play) => (
                <option key={play.id} value={play.id}>
                  {play.title}
                </option>
              ))}
            </select>
            <button type="button" className="px-4 py-2 rounded-md bg-gray-900 text-white" onClick={addFeaturedPlay}>
              Agregar
            </button>
          </div>
          <div className="space-y-2">
            {featuredPlays.map((play, index) => (
              <div key={play.id} className="flex items-center justify-between border rounded-md p-2">
                <span>
                  {index + 1}. {play.title}
                </span>
                <button
                  type="button"
                  className="px-2 py-1 rounded border border-red-300 text-red-700"
                  onClick={() => removeFeaturedPlay(play.id)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </section>

        <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-white" disabled={saving}>
          {saving ? "Guardando..." : "Guardar Inicio"}
        </button>
      </form>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
