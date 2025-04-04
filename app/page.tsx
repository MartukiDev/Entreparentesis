import HeroSection from "@/components/ui/hero-section"
import MissionVision from "@/components/home/mission-vision"
import FeaturedPlays from "@/components/home/featured-plays"
import CurrentPlay from "@/components/home/current-play"

export default function Home() {
  return (
    <>
      <HeroSection
        title="Somos Entreparéntesis"
        subtitle="Compañía de teatro de Buin"
        buttonText="Conócenos"
        buttonLink="/nosotros"
        imageSrc="/images/hero-section.jpg"
        imageAlt="Compañía de Teatro Entreparéntesis"
      />
      <MissionVision />
      <FeaturedPlays />
      <CurrentPlay />
    </>
  )
}

