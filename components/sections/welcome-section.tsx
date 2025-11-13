import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { Heart, Users, HandIcon as Hands, ArrowRight } from "lucide-react"

interface WelcomeSectionProps {
  title: string
  content: string
  image: string
}

export function WelcomeSection({ title, content, image }: WelcomeSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="space-y-6" direction="left">
            <SectionHeader subtitle="Welcome" title={title} description={content} />
            <StaggerContainer className="flex space-x-8">
              <StaggerItem
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto transform hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Love</p>
              </StaggerItem>
              <StaggerItem
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto transform hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Community</p>
              </StaggerItem>
              <StaggerItem
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto transform hover:scale-110 transition-transform duration-300">
                  <Hands className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Service</p>
              </StaggerItem>
            </StaggerContainer>
            <Button asChild className="transform hover:scale-105 transition-all duration-300">
              <Link href="/about">
                Our Story <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <ParallaxImage
                src={image}
                alt="Church community"
                className="w-full h-full"
                intensity={0.2}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}