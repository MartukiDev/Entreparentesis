"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { resolvePublicImage } from "@/lib/cms/media"
import { uploadOptimizedImage } from "@/lib/cms/admin"
import type { GalleryImageItem, GalleryItem } from "@/lib/types"

type GalleryForm = Omit<GalleryItem, "id"> & { id?: string }

const emptyForm: GalleryForm = {
  slug: "",
  title: "",
  description: "",
  cover_image_path: "",
  is_published: true,
  sort_order: 0,
}

export default function GalleriesManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [galleries, setGalleries] = useState<GalleryForm[]>([])
  const [images, setImages] = useState<GalleryImageItem[]>([])
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null)
  const [form, setForm] = useState<GalleryForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadGalleries = async () => {
    const { data, error: loadError } = await supabase
      .from("galleries")
      .select("id,slug,title,description,cover_image_path,is_published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    const list = (data as GalleryForm[]) || []
    setGalleries(list)

    if (!selectedGalleryId && list[0]?.id) {
      setSelectedGalleryId(list[0].id)
    }
  }

  const loadImages = async (galleryId: string) => {
    const { data, error: loadError } = await supabase
      .from("gallery_images")
      .select("id,gallery_id,image_path,alt_text,sort_order,is_cover")
      .eq("gallery_id", galleryId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setImages((data as GalleryImageItem[]) || [])
  }

  useEffect(() => {
    loadGalleries()
  }, [])

  useEffect(() => {
    if (selectedGalleryId) {
      loadImages(selectedGalleryId)
    } else {
      setImages([])
    }
  }, [selectedGalleryId])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmitGallery = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const payload = {
      slug: form.slug,
      title: form.title,
      description: form.description || null,
      cover_image_path: form.cover_image_path || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    }

    if (!payload.slug || !payload.title) {
      setError("Slug y título son obligatorios")
      return
    }

    if (editingId) {
      const { error: updateError } = await supabase.from("galleries").update(payload).eq("id", editingId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Galería actualizada")
    } else {
      const { data, error: insertError } = await supabase.from("galleries").insert(payload).select("id").single()
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Galería creada")
      setSelectedGalleryId(data.id)
    }

    await loadGalleries()
    resetForm()
  }

  const onEditGallery = (gallery: GalleryForm) => {
    setEditingId(gallery.id || null)
    setForm({ ...gallery })
  }

  const onDeleteGallery = async (gallery: GalleryForm) => {
    if (!gallery.id) return
    if (!confirm(`Eliminar galería ${gallery.title}?`)) return

    const { data: galleryImages } = await supabase
      .from("gallery_images")
      .select("image_path")
      .eq("gallery_id", gallery.id)

    const paths = (galleryImages || [])
      .map((img: { image_path: string }) => img.image_path?.replace("gallery-images/", ""))
      .filter(Boolean) as string[]

    if (paths.length > 0) {
      await supabase.storage.from("gallery-images").remove(paths)
    }

    if (gallery.cover_image_path) {
      await supabase.storage.from("gallery-images").remove([gallery.cover_image_path.replace("gallery-images/", "")])
    }

    const { error: deleteError } = await supabase.from("galleries").delete().eq("id", gallery.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Galería eliminada")
    if (selectedGalleryId === gallery.id) {
      setSelectedGalleryId(null)
    }
    await loadGalleries()
  }

  const uploadGalleryImages = async (files: FileList) => {
    if (!selectedGalleryId) {
      setError("Selecciona o crea una galería")
      return
    }

    const gallery = galleries.find((g) => g.id === selectedGalleryId)
    if (!gallery) return

    const startOrder = images.length

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      let path = ""
      try {
        path = await uploadOptimizedImage({
          supabase,
          bucket: "gallery-images",
          folder: "gallery-images/galerias",
          slug: gallery.slug,
          file,
          maxWidth: 1800,
          maxHeight: 1800,
        })
      } catch (unknownError) {
        setError(unknownError instanceof Error ? unknownError.message : "Error al subir imagen")
        return
      }

      await supabase.from("gallery_images").insert({
        gallery_id: selectedGalleryId,
        image_path: path,
        alt_text: `${gallery.title} - Imagen ${startOrder + i + 1}`,
        sort_order: startOrder + i,
        is_cover: false,
      })
    }

    setMessage("Imágenes cargadas")
    await loadImages(selectedGalleryId)
  }

  const setAsCover = async (image: GalleryImageItem) => {
    if (!selectedGalleryId) return

    await supabase.from("gallery_images").update({ is_cover: false }).eq("gallery_id", selectedGalleryId)
    await supabase.from("gallery_images").update({ is_cover: true }).eq("id", image.id)
    await supabase.from("galleries").update({ cover_image_path: image.image_path }).eq("id", selectedGalleryId)

    setMessage("Portada actualizada")
    await loadImages(selectedGalleryId)
    await loadGalleries()
  }

  const updateImageField = async (imageId: string, fields: Partial<GalleryImageItem>) => {
    const { error: updateError } = await supabase.from("gallery_images").update(fields).eq("id", imageId)
    if (updateError) {
      setError(updateError.message)
      return
    }

    if (selectedGalleryId) {
      await loadImages(selectedGalleryId)
    }
  }

  const deleteImage = async (image: GalleryImageItem) => {
    if (!confirm("Eliminar imagen?")) return

    await supabase.storage.from("gallery-images").remove([image.image_path.replace("gallery-images/", "")])
    const { error: deleteError } = await supabase.from("gallery_images").delete().eq("id", image.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    if (selectedGalleryId) {
      await loadImages(selectedGalleryId)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Galerías</h2>
        <p className="text-gray-600">Crea galerías, sube imágenes, ajusta orden y portada.</p>
      </div>

      <form onSubmit={handleSubmitGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border rounded-lg p-4">
        <input className="border rounded-md px-3 py-2" placeholder="Slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" placeholder="Título" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
        <input className="border rounded-md px-3 py-2" type="number" placeholder="Orden" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} /> Publicado</label>
        <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-24" placeholder="Descripción" value={form.description || ""} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        <div className="md:col-span-2 flex gap-2">
          <button className="bg-red-600 text-white rounded-md px-4 py-2" type="submit">{editingId ? "Actualizar" : "Crear"}</button>
          <button className="bg-gray-200 rounded-md px-4 py-2" type="button" onClick={resetForm}>Limpiar</button>
        </div>
      </form>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <section className="space-y-3">
        {galleries.map((gallery) => (
          <article key={gallery.id} className={`border rounded-lg p-4 ${selectedGalleryId === gallery.id ? "border-red-400" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-semibold">{gallery.title}</p>
                <p className="text-sm text-gray-600">{gallery.slug}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border" type="button" onClick={() => setSelectedGalleryId(gallery.id || null)}>Seleccionar</button>
                <button className="px-3 py-1 rounded border" type="button" onClick={() => onEditGallery(gallery)}>Editar</button>
                <button className="px-3 py-1 rounded border border-red-300 text-red-700" type="button" onClick={() => onDeleteGallery(gallery)}>Eliminar</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedGalleryId && (
        <section className="space-y-4 border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Imágenes de la galería seleccionada</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files
              if (files && files.length > 0) {
                uploadGalleryImages(files)
              }
            }}
          />

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
