"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { resolvePublicImage } from "@/lib/cms/media"
import { slugify, uploadOptimizedImage } from "@/lib/cms/admin"
import type { MemberItem } from "@/lib/types"

type MemberForm = Omit<MemberItem, "id"> & { id?: string }

const emptyForm: MemberForm = {
  slug: "",
  name: "",
  role: "",
  description: "",
  image_path: "",
  is_published: true,
  sort_order: 0,
}

export default function MembersManager() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [items, setItems] = useState<MemberForm[]>([])
  const [form, setForm] = useState<MemberForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const loadItems = async () => {
    const { data, error: loadError } = await supabase
      .from("members")
      .select("id,slug,name,role,description,image_path,is_published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setItems((data as MemberForm[] | null) || [])
  }

  useEffect(() => {
    loadItems()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const onUploadImage = async (file: File) => {
    try {
      const path = await uploadOptimizedImage({
        supabase,
        bucket: "site-assets",
        folder: "site-assets/integrantes",
        slug: form.slug || form.name,
        file,
        maxWidth: 1400,
        maxHeight: 1400,
      })
      setForm((prev) => ({ ...prev, image_path: path }))
      setMessage("Imagen subida y optimizada")
      setError(null)
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Error al subir la imagen")
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const slug = slugify(form.slug || form.name)
    if (!slug || !form.name || !form.role) {
      setError("Nombre, cargo y slug son obligatorios")
      return
    }

    const payload = {
      slug,
      name: form.name,
      role: form.role,
      description: form.description || null,
      image_path: form.image_path || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    }

    if (editingId) {
      const { error: updateError } = await supabase.from("members").update(payload).eq("id", editingId)
      if (updateError) {
        setError(updateError.message)
        return
      }
      setMessage("Integrante actualizado")
    } else {
      const { error: insertError } = await supabase.from("members").insert(payload)
      if (insertError) {
        setError(insertError.message)
        return
      }
      setMessage("Integrante creado")
    }

    await loadItems()
    resetForm()
  }

  const onEdit = (item: MemberForm) => {
    setEditingId(item.id || null)
    setForm({ ...item })
  }

  const onDelete = async (item: MemberForm) => {
    if (!item.id) return
    if (!confirm(`Eliminar integrante ${item.name}?`)) return

    if (item.image_path) {
      await supabase.storage.from("site-assets").remove([item.image_path.replace("site-assets/", "")])
    }

    const { error: deleteError } = await supabase.from("members").delete().eq("id", item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage("Integrante eliminado")
    await loadItems()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Integrantes</h2>
        <p className="text-gray-600">CRUD completo de integrantes de la compañía.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border rounded-lg p-4">
        <input className="border rounded-md px-3 py-2" placeholder="Nombre" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
        <input
          className="border rounded-md px-3 py-2"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
        />
        <input className="border rounded-md px-3 py-2" placeholder="Cargo" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} />
        <input
          className="border rounded-md px-3 py-2"
          type="number"
          placeholder="Orden"
          value={form.sort_order}
          onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
        />
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))} />
          Publicado
        </label>
        <textarea
          className="md:col-span-2 border rounded-md px-3 py-2 min-h-24"
          placeholder="Descripción"
          value={form.description || ""}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />

        <div className="md:col-span-2 flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUploadImage(e.target.files[0])} />
          {form.image_path ? <img src={resolvePublicImage(form.image_path)} alt="preview" className="w-12 h-12 rounded-full object-cover border" /> : null}
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button className="bg-red-600 text-white rounded-md px-4 py-2" type="submit">
            {editingId ? "Actualizar" : "Crear"}
          </button>
          <button className="bg-gray-200 rounded-md px-4 py-2" type="button" onClick={resetForm}>
            Limpiar
          </button>
        </div>
      </form>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              {item.image_path ? <img src={resolvePublicImage(item.image_path)} alt={item.name} className="w-12 h-12 rounded-full object-cover" /> : null}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border" type="button" onClick={() => onEdit(item)}>
                Editar
              </button>
              <button className="px-3 py-1 rounded border border-red-300 text-red-700" type="button" onClick={() => onDelete(item)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
