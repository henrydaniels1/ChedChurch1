import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { ProgramCard } from "@/components/program-card"
import { AnimatedSection } from "@/components/animated-section"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { ArrowRight } from "lucide-react"

interface FeaturedProgramsSectionProps {
  programs: any[]
}

export function FeaturedProgramsSection({ programs }: FeaturedProgramsSectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionHeader
            subtitle="Join Us"
            title="Featured Programs"
            description="Discover opportunities to grow in faith, connect with others, and serve our community."
            centered
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {programs.map((program) => (
            <StaggerItem
              key={program.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center" delay={0.4}>
          <Button
            asChild
            variant="outline"
            className="transform hover:scale-105 transition-all duration-300 bg-transparent"
          >
            <Link href="/programs">
              View All Programs <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}