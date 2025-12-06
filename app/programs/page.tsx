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
import { getPrograms } from "@/lib/data"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProgramsPage() {
  let programsContent = []
  
  try {
    programsContent = await getPrograms()
  } catch (error) {
    console.error('Failed to load programs:', error)
    // Continue with empty array
  }
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

  const categoryInfo = {
    worship: {
      title: "Worship Services",
      description: "Join us for inspiring worship and fellowship",
      icon: "🙏",
      image: "https://i.pinimg.com/736x/84/d2/eb/84d2eb7edd25922769ef5cb7095ffd92.jpg",
    },
    children: {
      title: "Children's Ministry",
      description: "Fun and engaging programs for our youngest members",
      icon: "👶",
      image: "https://i.pinimg.com/736x/a6/e9/6f/a6e96f2f887d21e0e6fa2e1bdfc3c745.jpg",
    },
    youth: {
      title: "Youth Ministry",
      description: "Building faith and friendships for teenagers",
      icon: "🌟",
      image: "https://i.pinimg.com/736x/17/6f/bb/176fbbaad2aa60f2140b0b11b0c1de05.jpg",
    },
    adult: {
      title: "Adult Ministry",
      description: "Growing together in faith and community",
      icon: "📖",
      image: "https://i.pinimg.com/736x/a6/e9/6f/a6e96f2f887d21e0e6fa2e1bdfc3c745.jpg",
    },
    special: {
      title: "Special Programs",
      description: "Unique opportunities for service and fellowship",
      icon: "✨",
      image: "https://i.pinimg.com/736x/76/7d/58/767d5879cc2a5abb470f74496b429248.jpg",
    },
  }

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
              const info = categoryInfo[category as keyof typeof categoryInfo]
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

      {/* Weekly Schedule */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Schedule"
              title="Weekly Calendar"
              description="See what's happening throughout the week at Grace Community Church."
              centered
            />
          </AnimatedSection>

          <StaggerContainer className="space-y-6">
            {dayOrder.map((day, dayIndex) => {
              const dayPrograms = programsByDay[day]
              if (!dayPrograms || dayPrograms.length === 0) return null

              return (
                <StaggerItem
                  key={day}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: dayIndex * 0.1 },
                    },
                  }}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader className="bg-primary/5 border-b border-border">
                      <CardTitle className="font-serif text-xl flex items-center">
                        <Calendar className="w-5 h-5 text-primary mr-3" />
                        {day}
                        <Badge variant="secondary" className="ml-auto">
                          {dayPrograms.length} programs
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {(dayPrograms as typeof programsContent)
                          .sort((a, b) => {
                            // Sort by time
                            const timeA = new Date(`1970/01/01 ${a.time}`).getTime()
                            const timeB = new Date(`1970/01/01 ${b.time}`).getTime()
                            return timeA - timeB
                          })
                          .map((program) => (
                            <div key={program.id} className="p-6 hover:bg-muted/50 transition-colors">
                              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="font-serif font-semibold text-lg text-foreground">{program.name}</h3>
                                    <Badge
                                      variant="outline"
                                      className={
                                        program.category === "worship"
                                          ? "border-primary/20 text-primary"
                                          : program.category === "youth"
                                            ? "border-accent/20 text-accent"
                                            : ""
                                      }
                                    >
                                      {program.category}
                                    </Badge>
                                  </div>
                                  <p className="text-muted-foreground mb-3">{program.description}</p>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{program.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{program.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
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
