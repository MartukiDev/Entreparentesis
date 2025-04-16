import HeroSection from "@/components/ui/hero-section"
import MissionVision from "@/components/home/mission-vision"
import FeaturedPlays from "@/components/home/featured-plays"
import CurrentPlay from "@/components/home/current-play"

export default function Home() {
  return (
    <>
      <HeroSection
        title="COMPAÑÍA DE TEATRO ENTREPARÉNTESIS"
        subtitle="Organizadores del Festival de Teatro de Buin"
        buttonText="Conócenos"
        buttonLink="/nosotros"
        imageSrc="/images/hero-foto.jpeg"
        imageAlt="Compañía de Teatro Entreparéntesis"
      />
      <MissionVision />
      <FeaturedPlays />
      <CurrentPlay />
    </>
  )
}

