export interface OptimizedImageResult {
  file: File
  width: number
  height: number
  mimeType: string
}

const DEFAULT_MAX_WIDTH = 1920
const DEFAULT_MAX_HEIGHT = 1920
const DEFAULT_QUALITY = 0.82

function canUseBrowserImageApi() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function getOutputMimeType(inputType: string) {
  if (inputType === "image/png" || inputType === "image/webp") {
    return inputType
  }
  return "image/jpeg"
}

function buildSafeName(fileName: string, mimeType: string) {
  const extension = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg"
  const baseName = fileName.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9-_]+/g, "-")
  return `${baseName || "image"}.${extension}`
}

export async function optimizeImageFile(
  file: File,
  options?: {
    maxWidth?: number
    maxHeight?: number
    quality?: number
  },
): Promise<OptimizedImageResult> {
  if (!canUseBrowserImageApi()) {
    return {
      file,
      width: 0,
      height: 0,
      mimeType: file.type || "application/octet-stream",
    }
  }

  const quality = options?.quality ?? DEFAULT_QUALITY
  const maxWidth = options?.maxWidth ?? DEFAULT_MAX_WIDTH
  const maxHeight = options?.maxHeight ?? DEFAULT_MAX_HEIGHT

  const bitmap = await createImageBitmap(file)
  let targetWidth = bitmap.width
  let targetHeight = bitmap.height

  if (bitmap.width > maxWidth || bitmap.height > maxHeight) {
    const ratio = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height)
    targetWidth = Math.round(bitmap.width * ratio)
    targetHeight = Math.round(bitmap.height * ratio)
  }

  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return {
      file,
      width: bitmap.width,
      height: bitmap.height,
      mimeType: file.type || "application/octet-stream",
    }
  }

  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)

  const outputMimeType = getOutputMimeType(file.type)
  const blob = await new Promise<Blob | null>((resolve) => {
    ctx.canvas.toBlob(
      (generatedBlob) => {
        resolve(generatedBlob)
      },
      outputMimeType,
      quality,
    )
  })

  if (!blob) {
    return {
      file,
      width: bitmap.width,
      height: bitmap.height,
      mimeType: file.type || "application/octet-stream",
    }
  }

  const optimized = new File([blob], buildSafeName(file.name, outputMimeType), {
    type: outputMimeType,
    lastModified: Date.now(),
  })

  return {
    file: optimized,
    width: targetWidth,
    height: targetHeight,
    mimeType: outputMimeType,
  }
}
