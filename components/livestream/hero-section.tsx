import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { Wifi, WifiOff } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"

interface HeroSectionProps {
  title: string
  description: string
  isLive: boolean
  heroImage: string
}

export function HeroSection({ title, description, isLive, heroImage }: HeroSectionProps) {
  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={heroImage || "/placeholder.svg?height=400&width=1200"}
          alt="Church livestream setup"
          className="w-full h-full opacity-30"
          intensity={0.2}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="fade" delay={0.2}>
          <SectionHeader subtitle="Watch Online" title={title} description={description} centered />
          <div className="flex justify-center mt-6">
            <Badge variant={isLive ? "default" : "secondary"} className="text-sm px-4 py-2">
              {isLive ? (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  Live Now
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 mr-2" />
                  Offline
                </>
              )}
            </Badge>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}