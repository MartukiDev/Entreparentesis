"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { uploadOptimizedImage } from "@/lib/cms/admin"
import { resolvePublicImage } from "@/lib/cms/media"
import type { FestivalItem, FestivalItemSection, FestivalSettingsItem } from "@/lib/types"

type FestivalSettingsForm = Omit<FestivalSettingsItem, "id"> & { id?: string }
type FestivalItemForm = Omit<FestivalItem, "id"> & { id?: string }

const emptySettings: FestivalSettingsForm = {
  hero_title: "Festival de Teatro de Buin",
  hero_subtitle: "",
  hero_image_path: "",
  current_title: "",
  current_subtitle: "",
  current_description: "",
  current_date: "",
  current_location: "",
  about_title: "",
  about_content: "",
  organizer_title: "",
  organizer_content: "",
  where_title: "",
  where_content: "",
  is_published: true,
}

const emptyItem: FestivalItemForm = {
  section: "current_vertical",
  title: "",
  description: "",
  year_label: "",
  image_path: "",
  is_published: true,
  sort_order: 0,
}

const sectionLabels: Record<FestivalItemSection, string> = {
  current_vertical: "Carrusel vertical edición actual",
  current_horizontal: "Carrusel horizontal edición actual",
  previous_editions: "Ediciones anteriores",
}

export default function FestivalManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [settings, setSettings] = useState<FestivalSettingsForm>(emptySettings)
  const [items, setItems] = useState<FestivalItemForm[]>([])
  const [itemForm, setItemForm] = useState<FestivalItemForm>(emptyItem)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    const [{ data: settingsRow, error: settingsError }, { data: itemsRows, error: itemsError }] = await Promise.all([
      supabase
        .from("festival_settings")
        .select("id,hero_title,hero_subtitle,hero_image_path,current_title,current_subtitle,current_description,current_date,current_location,about_title,about_content,organizer_title,organizer_content,where_title,where_content,is_published")
        .limit(1)
        .maybeSingle(),
      supabase
        .from("festival_items")
        .select("id,section,title,description,year_label,image_path,is_published,sort_order")
        .order("section", { ascending: true })
        .order("sort_order", { ascending: true }),
    ])

    if (settingsError) {
      setError(settingsError.message)
      return
    }

    if (itemsError) {
      setError(itemsError.message)
      return
    }

    setSettings((settingsRow as FestivalSettingsForm | null) || emptySettings)
    setItems((itemsRows as FestivalItemForm[] | null) || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  const saveSettings = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const payload = {
      hero_title: settings.hero_title,
      hero_subtitle: settings.hero_subtitle || null,
      hero_image_path: settings.hero_image_path || null,
      current_title: settings.current_title,
      current_subtitle: settings.current_subtitle || null,
      current_description: settings.current_description || null,
      current_date: settings.current_date || null,
      current_location: settings.current_location || null,
      about_title: settings.about_title,
      about_content: settings.about_content || null,
      organizer_title: settings.organizer_title || null,
      organizer_content: settings.organizer_content || null,
      where_title: settings.where_title || null,
      where_content: settings.where_content || null,
      is_published: settings.is_published,
    }

    if (settings.id) {
      const { error: updateError } = await supabase.from("festival_settings").update(payload).eq("id", settings.id)
      if (updateError) {
        setError(updateError.message)
        return
      }
    } else {
      const { data, error: insertError } = await supabase.from("festival_settings").insert(payload).select("id").single()
      if (insertError) {
        setError(insertError.message)
        return
      }
      setSettings((prev) => ({ ...prev, id: data.id }))
    }

    setMessage("Sección Festival actualizada")
  }

  const uploadSettingsImage = async (file: File) => {
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/festival",
        slug: "festival-hero",
        file,
        maxWidth: 2200,
        maxHeight: 1400,
      })
      setSettings((prev) => ({ ...prev, hero_image_path: path }))
      setMessage("Imagen hero actualizada")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
    }
  }

  const uploadItemImage = async (file: File) => {
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/festival",
        slug: itemForm.title || itemForm.section,
        file,
        maxWidth: 1800,
        maxHeight: 1400,
      })
      setItemForm((prev) => ({ ...prev, image_path: path }))
      setMessage("Imagen cargada")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
    }
  }

  const saveItem = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!itemForm.title || !itemForm.image_path) {
      setError("Título e imagen son obligatorios")
      return
    }

    const payload = {
      section: itemForm.section,
      title: itemForm.title,
      description: itemForm.description || null,
      year_label: itemForm.year_label || null,
      image_path: itemForm.image_path,
      is_published: itemForm.is_published,
      sort_order: Number(itemForm.sort_order) || 0,
    }

    if (editingItemId) {
      const { error: updateError } = await supabase.from("festival_items").update(payload).eq("id", editingItemId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Ítem actualizado")
    } else {
      const { error: insertError } = await supabase.from("festival_items").insert(payload)
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Ítem creado")
    }

    setItemForm(emptyItem)
    setEditingItemId(null)
    await loadData()
  }

  const onEditItem = (item: FestivalItemForm) => {
    setEditingItemId(item.id || null)
    setItemForm({ ...item })
  }

  const onDeleteItem = async (item: FestivalItemForm) => {
    if (!item.id) return
    if (!confirm(`Eliminar ítem ${item.title}?`)) return

    await supabase.storage.from("site-assets").remove([item.image_path.replace("site-assets/", "")])
    const { error: deleteError } = await supabase.from("festival_items").delete().eq("id", item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Ítem eliminado")
    await loadData()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Festival de Teatro</h2>
        <p className="text-gray-600">Edita bloque informativo anual y carruseles del festival.</p>
      </div>

      <form onSubmit={saveSettings} className="space-y-4 border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold">Información principal</h3>
        <input className="w-full border rounded-md px-3 py-2" placeholder="Título hero" value={settings.hero_title} onChange={(e) => setSettings((prev) => ({ ...prev, hero_title: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Subtítulo hero" value={settings.hero_subtitle || ""} onChange={(e) => setSettings((prev) => ({ ...prev, hero_subtitle: e.target.value }))} />
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadSettingsImage(e.target.files[0])} />
          {settings.hero_image_path ? <img src={resolvePublicImage(settings.hero_image_path)} alt="hero" className="w-12 h-12 rounded object-cover border" /> : null}
        </div>

        <input className="w-full border rounded-md px-3 py-2" placeholder="Título sección actual" value={settings.current_title} onChange={(e) => setSettings((prev) => ({ ...prev, current_title: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Subtítulo sección actual" value={settings.current_subtitle || ""} onChange={(e) => setSettings((prev) => ({ ...prev, current_subtitle: e.target.value }))} />
        <textarea className="w-full border rounded-md px-3 py-2 min-h-20" placeholder="Descripción edición actual" value={settings.current_description || ""} onChange={(e) => setSettings((prev) => ({ ...prev, current_description: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Fecha (texto)" value={settings.current_date || ""} onChange={(e) => setSettings((prev) => ({ ...prev, current_date: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Lugar" value={settings.current_location || ""} onChange={(e) => setSettings((prev) => ({ ...prev, current_location: e.target.value }))} />

        <input className="w-full border rounded-md px-3 py-2" placeholder="Título bloque ¿Qué es?" value={settings.about_title} onChange={(e) => setSettings((prev) => ({ ...prev, about_title: e.target.value }))} />
        <textarea className="w-full border rounded-md px-3 py-2 min-h-20" placeholder="Contenido ¿Qué es?" value={settings.about_content || ""} onChange={(e) => setSettings((prev) => ({ ...prev, about_content: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Título organizador" value={settings.organizer_title || ""} onChange={(e) => setSettings((prev) => ({ ...prev, organizer_title: e.target.value }))} />
        <textarea className="w-full border rounded-md px-3 py-2 min-h-20" placeholder="Contenido organizador" value={settings.organizer_content || ""} onChange={(e) => setSettings((prev) => ({ ...prev, organizer_content: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Título dónde se realiza" value={settings.where_title || ""} onChange={(e) => setSettings((prev) => ({ ...prev, where_title: e.target.value }))} />
        <textarea className="w-full border rounded-md px-3 py-2 min-h-20" placeholder="Contenido dónde se realiza" value={settings.where_content || ""} onChange={(e) => setSettings((prev) => ({ ...prev, where_content: e.target.value }))} />

        <button className="rounded-md bg-red-600 text-white px-4 py-2" type="submit">Guardar Festival</button>
      </form>

      <form onSubmit={saveItem} className="space-y-3 border rounded-lg p-4">
        <h3 className="text-lg font-semibold">Carruseles del festival</h3>
        <select className="w-full border rounded-md px-3 py-2" value={itemForm.section} onChange={(e) => setItemForm((prev) => ({ ...prev, section: e.target.value as FestivalItemSection }))}>
          {Object.entries(sectionLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input className="w-full border rounded-md px-3 py-2" placeholder="Título" value={itemForm.title} onChange={(e) => setItemForm((prev) => ({ ...prev, title: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Año / etiqueta" value={itemForm.year_label || ""} onChange={(e) => setItemForm((prev) => ({ ...prev, year_label: e.target.value }))} />
        <textarea className="w-full border rounded-md px-3 py-2 min-h-20" placeholder="Descripción" value={itemForm.description || ""} onChange={(e) => setItemForm((prev) => ({ ...prev, description: e.target.value }))} />
        <input className="w-full border rounded-md px-3 py-2" type="number" placeholder="Orden" value={itemForm.sort_order} onChange={(e) => setItemForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))} />
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadItemImage(e.target.files[0])} />
          {itemForm.image_path ? <img src={resolvePublicImage(itemForm.image_path)} alt="item" className="w-12 h-12 object-cover rounded border" /> : null}
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-red-600 text-white px-4 py-2" type="submit">{editingItemId ? "Actualizar" : "Crear"}</button>
          <button className="rounded-md bg-gray-200 px-4 py-2" type="button" onClick={() => { setItemForm(emptyItem); setEditingItemId(null) }}>Limpiar</button>
        </div>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{sectionLabels[item.section]} · orden {item.sort_order}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border" onClick={() => onEditItem(item)} type="button">Editar</button>
              <button className="px-3 py-1 rounded border border-red-300 text-red-700" onClick={() => onDeleteItem(item)} type="button">Eliminar</button>
            </div>
          </article>
        ))}
      </div>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}
