import { SectionHeader } from "@/components/section-header"
import { ProgramCard } from "@/components/program-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import Link from "next/link"
import { getPrograms, getCategoryInfo } from "@/lib/data"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProgramsPage() {
  const [programsContent, categoryInfo] = await Promise.all([
    getPrograms().catch(() => []),
    getCategoryInfo().catch(() => ({})),
  ])
  // Group programs by category
  const programsByCategory = programsContent.reduce(
    (acc, program) => {
      if (!acc[program.category]) {
        acc[program.category] = []
      }
      acc[program.category].push(program)
      return acc
    },
    {} as Record<string, typeof programsContent>,
  )

  // Group programs by day for schedule view
  const programsByDay = programsContent.reduce(
    (acc, program) => {
      if (!acc[program.day]) {
        acc[program.day] = []
      }
      acc[program.day].push(program)
      return acc
    },
    {} as Record<string, typeof programsContent>,
  )

  const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-24  overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="https://i.pinimg.com/736x/5f/94/a0/5f94a073b677100a1eff2a73c432e85b.jpg"
            alt="Church programs and activities"
            className="w-full h-full opacity-50"
            intensity={0.2}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.2}>
            <SectionHeader
              subtitle="Get Involved"
              title="Church Programs"
              description="Discover opportunities to grow in faith, connect with others, and serve our community through our various programs and ministries."
              centered
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">{programsContent.length}</div>
              <div className="text-sm text-muted-foreground">Total Programs</div>
            </StaggerItem>
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-muted-foreground">Days a Week</div>
            </StaggerItem>
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">{Object.keys(programsByCategory).length}</div>
              <div className="text-sm text-muted-foreground">Ministry Areas</div>
            </StaggerItem>
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">All Ages</div>
              <div className="text-sm text-muted-foreground">Welcome</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Programs by Category */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Ministries"
              title="Programs by Category"
              description="Find the right program for you and your family."
              centered
            />
          </AnimatedSection>

          <div className="space-y-16">
            {Object.entries(programsByCategory).map(([category, programs], categoryIndex) => {
              const typedPrograms = programs as typeof programsContent
              const info = categoryInfo[category as keyof typeof categoryInfo] ?? { title: category, description: "", icon: "", image: "" }
              return (
                <AnimatedSection key={category} id={category} delay={categoryIndex * 0.1}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-3 mb-4">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{info.title}</h2>
                        <Badge variant="secondary" className="text-sm">
                          {typedPrograms.length} programs
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-lg">{info.description}</p>
                    </div>
                    <div className="relative h-48 lg:h-56 rounded-lg overflow-hidden">
                      <ParallaxImage src={info.image} alt={info.title} className="w-full h-full" intensity={0.1} />
                    </div>
                  </div>

                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {typedPrograms.map((program, index) => (
                      <StaggerItem
                        key={program.id}
                        variants={{
                          hidden: { opacity: 0, y: 30, scale: 0.9 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.6, delay: index * 0.1 },
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
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Involved?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              We'd love to help you find the perfect program to grow in faith and connect with our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/about">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/livestream">Join Online</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
