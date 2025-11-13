import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { ParallaxImage } from "@/components/parallax-image"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
}

export function HeroSection({ title, subtitle, description, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full opacity-50"
          intensity={0.2}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="fade" delay={0.2}>
          <SectionHeader
            subtitle={subtitle}
            title={title}
            description={description}
            centered
          />
        </AnimatedSection>
      </div>
    </section>
  )
}