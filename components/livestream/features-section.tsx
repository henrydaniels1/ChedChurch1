import { SectionHeader } from "@/components/section-header"
import { Calendar, Users, Wifi } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeaturesSectionProps {
  features: Feature[]
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionHeader
            subtitle="Online Experience"
            title="Why Watch Online?"
            description="Our livestream brings the full church experience to you, wherever you are."
            centered
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon === 'Users' ? Users : feature.icon === 'Calendar' ? Calendar : Wifi
            return (
              <StaggerItem
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}