"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { resolvePublicImage } from "@/lib/cms/media"
import { slugify, uploadOptimizedImage } from "@/lib/cms/admin"
import type { NewsItem } from "@/lib/types"

type NewsForm = Omit<NewsItem, "id"> & { id?: string }

const emptyForm: NewsForm = {
  slug: "",
  title: "",
  summary: "",
  content: "",
  author: "",
  published_at: new Date().toISOString().slice(0, 10),
  image_path: "",
  is_published: true,
  sort_order: 0,
}

export default function NewsManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [items, setItems] = useState<NewsForm[]>([])
  const [form, setForm] = useState<NewsForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadItems = async () => {
    const { data, error: loadError } = await supabase
      .from("news")
      .select("id,slug,title,summary,content,author,published_at,image_path,is_published,sort_order")
      .order("published_at", { ascending: false })
      .order("sort_order", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setItems((data as NewsForm[] | null) || [])
  }

  useEffect(() => {
    loadItems()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const onUploadImage = async (file: File) => {
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/noticias",
        slug: form.slug || form.title,
        file,
        maxWidth: 1800,
        maxHeight: 1200,
      })

      setForm((prev) => ({ ...prev, image_path: path }))
      setMessage("Imagen subida")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir la imagen")
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const normalizedSlug = slugify(form.slug || form.title)
    if (!normalizedSlug || !form.title || !form.summary || !form.content || !form.author || !form.published_at) {
      setError("Completa título, slug, resumen, contenido, autor y fecha")
      return
    }

    const payload = {
      slug: normalizedSlug,
      title: form.title,
      summary: form.summary,
      content: form.content,
      author: form.author,
      published_at: form.published_at,
      image_path: form.image_path || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    }

    if (editingId) {
      const { error: updateError } = await supabase.from("news").update(payload).eq("id", editingId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Noticia actualizada")
    } else {
      const { error: insertError } = await supabase.from("news").insert(payload)
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Noticia creada")
    }

    await loadItems()
    resetForm()
  }

  const onEdit = (item: NewsForm) => {
    setEditingId(item.id || null)
    setForm({ ...item, published_at: item.published_at.slice(0, 10) })
  }

  const onDelete = async (item: NewsForm) => {
    if (!item.id) return
    if (!confirm(`Eliminar noticia ${item.title}?`)) return

    if (item.image_path) {
      await supabase.storage.from("site-assets").remove([item.image_path.replace("site-assets/", "")])
    }

    const { error: deleteError } = await supabase.from("news").delete().eq("id", item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Noticia eliminada")
    await loadItems()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Noticias</h2>
        <p className="text-gray-600">Alta, edición y eliminación de noticias con detalle por slug.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border rounded-lg p-4">
        <input className="border rounded-md px-3 py-2" placeholder="Título" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))} />
        <input className="border rounded-md px-3 py-2" type="date" value={form.published_at} onChange={(e) => setForm((prev) => ({ ...prev, published_at: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Autor" value={form.author} onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" type="number" placeholder="Orden" value={form.sort_order} onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))} />
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))} /> Publicada</label>

        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-20" placeholder="Resumen" value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} />
        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-36" placeholder="Contenido" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} />

        <div className="md:col-span-2 flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUploadImage(e.target.files[0])} />
          {form.image_path ? <img src={resolvePublicImage(form.image_path)} alt="preview" className="h-12 w-12 rounded object-cover border" /> : null}
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button className="bg-red-600 text-white rounded-md px-4 py-2" type="submit">{editingId ? "Actualizar" : "Crear"}</button>
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
              <p className="text-sm text-gray-600">{item.published_at.slice(0, 10)} · /{item.slug}</p>
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
