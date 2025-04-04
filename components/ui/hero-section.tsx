import Link from "next/link"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  imageSrc: string
  imageAlt: string
  overlay?: boolean
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  overlay = true,
}: HeroSectionProps) {
  return (
    <div className="relative">
      <div className="h-[70vh] relative">
        <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
        {overlay && <div className="absolute inset-0 bg-black bg-opacity-50" />}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-3 text-xl text-white sm:text-2xl">{subtitle}</p>}
          {buttonText && buttonLink && (
            <div className="mt-8">
              <Link
                href={buttonLink}
                className="inline-block rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors duration-300"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

