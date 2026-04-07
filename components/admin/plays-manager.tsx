"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { slugify, uploadOptimizedImage } from "@/lib/cms/admin"
import { resolvePublicImage } from "@/lib/cms/media"
import type { PlayImageItem, PlayItem } from "@/lib/types"

type PlayForm = Omit<PlayItem, "id"> & { id?: string }

const emptyForm: PlayForm = {
  slug: "",
  title: "",
  year: "",
  director: "",
  description: "",
  full_description: "",
  cover_image_path: "",
  is_featured: false,
  is_current: false,
  cast: "",
  show_dates: "",
  location: "",
  is_published: true,
  sort_order: 0,
}

export default function PlaysManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [plays, setPlays] = useState<PlayForm[]>([])
  const [images, setImages] = useState<PlayImageItem[]>([])
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null)
  const [form, setForm] = useState<PlayForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadPlays = async () => {
    const { data, error: loadError } = await supabase
      .from("plays")
      .select("id,slug,title,year,director,description,full_description,cover_image_path,is_featured,is_current,cast,show_dates,location,is_published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    const list = (data as PlayForm[] | null) || []
    setPlays(list)
    if (!selectedPlayId && list[0]?.id) {
      setSelectedPlayId(list[0].id)
    }
  }

  const loadImages = async (playId: string) => {
    const { data, error: loadError } = await supabase
      .from("play_images")
      .select("id,play_id,image_path,alt_text,sort_order,is_cover")
      .eq("play_id", playId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setImages((data as PlayImageItem[] | null) || [])
  }

  useEffect(() => {
    loadPlays()
  }, [])

  useEffect(() => {
    if (selectedPlayId) loadImages(selectedPlayId)
  }, [selectedPlayId])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const onUploadCover = async (file: File) => {
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/obras",
        slug: form.slug || form.title,
        file,
        maxWidth: 1800,
        maxHeight: 1800,
      })
      setForm((prev) => ({ ...prev, cover_image_path: path }))
      setMessage("Portada subida")
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir portada")
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)
    setError(null)

    const normalizedSlug = slugify(form.slug || form.title)
    if (!normalizedSlug || !form.title || !form.year || !form.director) {
      setError("Título, año, dirección y slug son obligatorios")
      return
    }

    const payload = {
      slug: normalizedSlug,
      title: form.title,
      year: form.year,
      director: form.director,
      description: form.description || null,
      full_description: form.full_description || null,
      cover_image_path: form.cover_image_path || null,
      is_featured: form.is_featured,
      is_current: form.is_current,
      cast: form.cast || null,
      show_dates: form.show_dates || null,
      location: form.location || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    }

    if (editingId) {
      const { error: updateError } = await supabase.from("plays").update(payload).eq("id", editingId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Obra actualizada")
    } else {
      const { data, error: insertError } = await supabase.from("plays").insert(payload).select("id").single()
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Obra creada")
      setSelectedPlayId(data.id)
    }

    await loadPlays()
    resetForm()
  }

  const onEdit = (item: PlayForm) => {
    setEditingId(item.id || null)
    setForm({ ...item })
  }

  const onDelete = async (item: PlayForm) => {
    if (!item.id) return
    if (!confirm(`Eliminar obra ${item.title}?`)) return

    const { data: playImages } = await supabase.from("play_images").select("image_path").eq("play_id", item.id)
    const paths = ((playImages || []) as { image_path: string }[])
      .map((row) => row.image_path.replace("site-assets/", ""))
      .filter(Boolean)

    if (item.cover_image_path) {
      paths.push(item.cover_image_path.replace("site-assets/", ""))
    }

    if (paths.length > 0) {
      await supabase.storage.from("site-assets").remove(paths)
    }

    const { error: deleteError } = await supabase.from("plays").delete().eq("id", item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Obra eliminada")
    await loadPlays()
  }

  const uploadPlayImages = async (files: FileList) => {
    if (!selectedPlayId) {
      setError("Selecciona o crea una obra")
      return
    }

    const play = plays.find((item) => item.id === selectedPlayId)
    if (!play) return

    const startOrder = images.length

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      try {
        const path = await uploadOptimizedImage({
          supabase,
          bucket: "site-assets",
          folder: "site-assets/obras",
          slug: play.slug,
          file,
          maxWidth: 1800,
          maxHeight: 1800,
        })

        const { error: insertError } = await supabase.from("play_images").insert({
          play_id: selectedPlayId,
          image_path: path,
          alt_text: `${play.title} - Imagen ${startOrder + i + 1}`,
          sort_order: startOrder + i,
          is_cover: false,
        })
        if (insertError) throw new Error(insertError.message)
      } catch (unknownError) {
        setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
        return
      }
    }

    setMessage("Imágenes cargadas")
    await loadImages(selectedPlayId)
  }

  const updateImageField = async (imageId: string, fields: Partial<PlayImageItem>) => {
    const { error: updateError } = await supabase.from("play_images").update(fields).eq("id", imageId)
    if (updateError) {
      setError(updateError.message)
      return
    }

    if (selectedPlayId) {
      await loadImages(selectedPlayId)
    }
  }

  const setAsCover = async (image: PlayImageItem) => {
    if (!selectedPlayId) return

    await supabase.from("play_images").update({ is_cover: false }).eq("play_id", selectedPlayId)
    await supabase.from("play_images").update({ is_cover: true }).eq("id", image.id)
    await supabase.from("plays").update({ cover_image_path: image.image_path }).eq("id", selectedPlayId)

    setMessage("Portada de obra actualizada")
    await loadImages(selectedPlayId)
    await loadPlays()
  }

  const deleteImage = async (image: PlayImageItem) => {
    if (!confirm("Eliminar imagen?")) return

    await supabase.storage.from("site-assets").remove([image.image_path.replace("site-assets/", "")])
    const { error: deleteError } = await supabase.from("play_images").delete().eq("id", image.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    if (selectedPlayId) await loadImages(selectedPlayId)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Obras</h2>
        <p className="text-gray-600">Administra obras, slugs y galería interna por obra.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border rounded-lg p-4">
        <input className="border rounded-md px-3 py-2" placeholder="Nombre" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Año" value={form.year} onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Dirección" value={form.director} onChange={(e) => setForm((prev) => ({ ...prev, director: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Elenco" value={form.cast || ""} onChange={(e) => setForm((prev) => ({ ...prev, cast: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Funciones" value={form.show_dates || ""} onChange={(e) => setForm((prev) => ({ ...prev, show_dates: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Lugar" value={form.location || ""} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" type="number" placeholder="Orden" value={form.sort_order} onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))} />

        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((prev) => ({ ...prev, is_featured: e.target.checked }))} /> Destacada</label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={form.is_current} onChange={(e) => setForm((prev) => ({ ...prev, is_current: e.target.checked }))} /> Obra actual</label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))} /> Publicada</label>

        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-20" placeholder="Descripción corta" value={form.description || ""} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-28" placeholder="Descripción completa" value={form.full_description || ""} onChange={(e) => setForm((prev) => ({ ...prev, full_description: e.target.value }))} />

        <div className="md:col-span-2 flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUploadCover(e.target.files[0])} />
          {form.cover_image_path ? <img src={resolvePublicImage(form.cover_image_path)} alt="preview" className="h-12 w-12 rounded object-cover border" /> : null}
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button className="bg-red-600 text-white rounded-md px-4 py-2" type="submit">{editingId ? "Actualizar" : "Crear"}</button>
          <button className="bg-gray-200 rounded-md px-4 py-2" type="button" onClick={resetForm}>Limpiar</button>
        </div>
      </form>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <section className="space-y-3">
        {plays.map((play) => (
          <article key={play.id} className={`border rounded-lg p-4 ${selectedPlayId === play.id ? "border-red-400" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-semibold">{play.title}</p>
                <p className="text-sm text-gray-600">/{play.slug}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border" type="button" onClick={() => setSelectedPlayId(play.id || null)}>Seleccionar</button>
                <button className="px-3 py-1 rounded border" type="button" onClick={() => onEdit(play)}>Editar</button>
                <button className="px-3 py-1 rounded border border-red-300 text-red-700" type="button" onClick={() => onDelete(play)}>Eliminar</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedPlayId && (
        <section className="space-y-4 border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Imágenes de la obra seleccionada</h3>
          <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && uploadPlayImages(e.target.files)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg p-3 space-y-2">
                <img src={resolvePublicImage(image.image_path)} alt={image.alt_text || "Imagen"} className="w-full h-40 object-cover rounded" />
                <input
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  value={image.alt_text || ""}
                  placeholder="Texto alternativo"
                  onChange={(e) => updateImageField(image.id, { alt_text: e.target.value })}
                />
                <input
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  type="number"
                  value={image.sort_order}
                  onChange={(e) => updateImageField(image.id, { sort_order: Number(e.target.value) })}
                />
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm rounded border" type="button" onClick={() => setAsCover(image)}>
                    {image.is_cover ? "Portada actual" : "Definir portada"}
                  </button>
                  <button className="px-2 py-1 text-sm rounded border border-red-300 text-red-700" type="button" onClick={() => deleteImage(image)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
