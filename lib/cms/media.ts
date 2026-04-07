export function resolvePublicImage(path: string | null | undefined, fallback = "/placeholder.svg") {
  if (!path) return fallback
  if (path.startsWith("http") || path.startsWith("/")) return path

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base) return fallback

  const isGallery = path.startsWith("gallery-images/")
  const isRadio = path.startsWith("radio-assets/")

  if (isGallery) {
    return `${base}/storage/v1/object/public/gallery-images/${path.replace("gallery-images/", "")}`
  }

  if (isRadio) {
    return `${base}/storage/v1/object/public/radio-assets/${path.replace("radio-assets/", "")}`
  }

  return `${base}/storage/v1/object/public/site-assets/${path.replace("site-assets/", "")}`
}
