"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselVerticalItem {
  id: number
  title: string
  imageSrc: string
  description?: string
}

interface CarouselVerticalProps {
  items: CarouselVerticalItem[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
}

export default function CarouselVertical({
  items,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}: CarouselVerticalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }, [items.length])

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay) return

    const slideInterval = setInterval(next, interval)
    return () => clearInterval(slideInterval)
  }, [autoPlay, interval, next])

  if (!items.length) return null

  return (
    <div className="relative inline-block mx-auto rounded-lg">
      <div className="relative">
        <Image 
          src={items[currentIndex].imageSrc || "/placeholder.svg"} 
          alt={items[currentIndex].title} 
          width={400}
          height={500}
          className="object-contain h-80 sm:h-96 md:h-[500px] w-auto rounded-lg" 
        />
        {items[currentIndex].description && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-end p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg text-center">{items[currentIndex].title}</h3>
            <p className="text-white text-sm text-center drop-shadow-lg">{items[currentIndex].description}</p>
          </div>
        )}
        
        {showControls && items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition-all z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition-all z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {showIndicators && items.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
