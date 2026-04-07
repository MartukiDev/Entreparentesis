"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { resolvePublicImage } from "@/lib/cms/media"
import { uploadOptimizedImage } from "@/lib/cms/admin"
import type { SiteSectionItem } from "@/lib/types"

const emptyForm: SiteSectionItem = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  content: "",
  image_path: "",
  cta_label: "",
  cta_href: "",
  is_published: true,
  sort_order: 0,
}

export default function SectionsManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [items, setItems] = useState<SiteSectionItem[]>([])
  const [form, setForm] = useState<SiteSectionItem>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadItems = async () => {
    setError(null)
    const { data, error: loadError } = await supabase
      .from("site_sections")
      .select("id,slug,title,subtitle,description,content,image_path,cta_label,cta_href,is_published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setItems((data as SiteSectionItem[]) || [])
  }

  useEffect(() => {
    loadItems()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const onUploadImage = async (file: File) => {
    if (!form.slug) {
      setError("Define un slug antes de subir la imagen")
      return
    }

    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/sections",
        slug: form.slug,
        file,
        maxWidth: 2000,
        maxHeight: 1400,
      })

      setForm((prev) => ({ ...prev, image_path: path }))
      setMessage("Imagen subida")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
      return
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      content: form.content || null,
      image_path: form.image_path || null,
      cta_label: form.cta_label || null,
      cta_href: form.cta_href || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    }

    if (!payload.slug || !payload.title) {
      setError("Slug y título son obligatorios")
      return
    }

    if (editingId) {
      const { error: updateError } = await supabase.from("site_sections").update(payload).eq("id", editingId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Sección actualizada")
    } else {
      const { error: insertError } = await supabase.from("site_sections").insert(payload)
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Sección creada")
    }

    await loadItems()
    resetForm()
  }

  const onEdit = (item: SiteSectionItem) => {
    setEditingId(item.id || null)
    setForm({
      ...item,
      subtitle: item.subtitle || "",
      description: item.description || "",
      content: item.content || "",
      image_path: item.image_path || "",
      cta_label: item.cta_label || "",
      cta_href: item.cta_href || "",
    })
  }

  const onDelete = async (item: SiteSectionItem) => {
    if (!item.id) return
    if (!confirm(`Eliminar sección ${item.slug}?`)) return

    const imagePath = item.image_path?.replace("site-assets/", "")
    if (imagePath) {
      await supabase.storage.from("site-assets").remove([imagePath])
    }

    const { error: deleteError } = await supabase.from("site_sections").delete().eq("id", item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Sección eliminada")
    await loadItems()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Secciones generales</h2>
        <p className="text-gray-600">Administra textos e imágenes reutilizables del sitio público.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border rounded-lg p-4">
        <input className="border rounded-md px-3 py-2" placeholder="Slug (ej: home_hero)" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Título" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Subtítulo" value={form.subtitle || ""} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Descripción corta" value={form.description || ""} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="CTA label" value={form.cta_label || ""} onChange={(e) => setForm((p) => ({ ...p, cta_label: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="CTA href" value={form.cta_href || ""} onChange={(e) => setForm((p) => ({ ...p, cta_href: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Orden" type="number" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} /> Publicado</label>
        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-24" placeholder="Contenido largo" value={form.content || ""} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} />

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUploadImage(file)
            }}
          />
          {form.image_path && (
            <img src={resolvePublicImage(form.image_path)} alt="Preview" className="h-12 w-12 rounded object-cover border" />
          )}
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button className="bg-red-600 text-white rounded-md px-4 py-2" type="submit">
            {editingId ? "Actualizar" : "Crear"}
          </button>
          <button className="bg-gray-200 rounded-md px-4 py-2" type="button" onClick={resetForm}>Limpiar</button>
        </div>
      </form>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.slug}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border" type="button" onClick={() => onEdit(item)}>Editar</button>
              <button className="px-3 py-1 rounded border border-red-300 text-red-700" type="button" onClick={() => onDelete(item)}>Eliminar</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
