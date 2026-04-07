import type { SupabaseClient } from "@supabase/supabase-js"
import { optimizeImageFile } from "@/lib/cms/image"

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function buildStoragePath(folder: string, slug: string, fileName: string) {
  const safeSlug = slugify(slug || "item") || "item"
  const safeName = fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-")
  return `${folder}/${safeSlug}/${Date.now()}-${safeName}`
}

export async function uploadOptimizedImage(params: {
  supabase: SupabaseClient
  bucket: string
  folder: string
  slug: string
  file: File
  maxWidth?: number
  maxHeight?: number
  quality?: number
}) {
  const optimized = await optimizeImageFile(params.file, {
    maxWidth: params.maxWidth,
    maxHeight: params.maxHeight,
    quality: params.quality,
  })

  const storagePath = buildStoragePath(params.folder, params.slug, optimized.file.name)
  const relativePath = storagePath.replace(`${params.bucket}/`, "")

  const { error } = await params.supabase.storage.from(params.bucket).upload(relativePath, optimized.file, {
    upsert: true,
    contentType: optimized.mimeType,
  })

  if (error) {
    throw new Error(error.message)
  }

  return storagePath
}
