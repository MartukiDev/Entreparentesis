"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import ImageWithLoader from "@/components/ui/image-with-loader"


interface GalleryImage {
  id: string | number
  src: string
  alt: string
  width?: number
  height?: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  gap?: "small" | "medium" | "large"
}

export default function ImageGallery({ images, columns = 3, gap = "medium" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev! - 1))
  }

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev! + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return

    if (e.key === "ArrowLeft") {
      goToPrevious()
    } else if (e.key === "ArrowRight") {
      goToNext()
    } else if (e.key === "Escape") {
      closeLightbox()
    }
  }

  // Define grid columns based on prop
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }

  // Define gap size based on prop
  const gapSize = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={`grid ${gridCols[columns]} ${gapSize[gap]}`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(index)}
          >
            <ImageWithLoader src={image.src || "/placeholder.svg"} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors z-[60]"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors z-[60]"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors z-[60]"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[80vh] z-[55]">
            <Image
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 80vw"
              priority
            />
          </div>

          <div className="absolute bottom-4 text-white text-center w-full">
            <p className="text-sm">{images[selectedImage].alt}</p>
            <p className="text-xs mt-1">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

