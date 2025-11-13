import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/ui/badge"
import { Cross, Heart, HandIcon as Hands, TreePine } from "lucide-react"
// import { aboutUsContent } from "@/lib/aboutUs"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"

async function getLeadership() {
  try {
    const response = await fetch('http://localhost:3000/api/leadership', { cache: 'no-store' })
    return response.ok ? await response.json() : []
  } catch (error) {
    return []
  }
}

export default async function AboutPage() {
  const leadership = await getLeadership()
  
  // Static content
  const mission = "To love God, love people, and serve our community with the transforming power of Jesus Christ."
  const vision = "To be a thriving, diverse community where everyone can find their place in God's family."
  const history = {
    title: "Our Journey of Faith",
    content: "Founded with a heart for community and a passion for God's word, our church has been a beacon of hope and love.",
    timeline: [
      { year: "1995", event: "Church founded with 25 founding members in a small community hall." },
      { year: "2000", event: "Built our first permanent sanctuary to accommodate our growing congregation." },
      { year: "2010", event: "Launched community outreach programs serving over 500 families annually." },
      { year: "2020", event: "Adapted to digital ministry during the pandemic, reaching people worldwide." }
    ]
  }
  const values = [
    { title: "Faith", description: "Trusting in God's love and promises", icon: "cross" },
    { title: "Love", description: "Showing Christ's love to all people", icon: "heart" },
    { title: "Service", description: "Serving our community with joy", icon: "hands" },
    { title: "Growth", description: "Growing together in faith and wisdom", icon: "tree" }
  ]

  const valueIcons = {
    cross: Cross,
    heart: Heart,
    hands: Hands,
    tree: TreePine,
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24  overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="https://i.pinimg.com/736x/6e/f3/c5/6ef3c5d5c0240fe3ff651a19b3e69578.jpg"
            alt="Church building"
            className="w-full h-full opacity-80"
            intensity={0.2}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.2}>
            <SectionHeader
              subtitle="About Us"
              title="Our Story of Faith"
              description="Learn about our mission, vision, and the people who make Grace Community Church a place of belonging."
              centered
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <StaggerItem
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Cross className="w-6 h-6 text-primary mr-3" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{mission}</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <Card className="border-l-4 border-l-accent hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl flex items-center">
                    <Heart className="w-6 h-6 text-accent mr-3" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{vision}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader title={history.title} description={history.content} centered />
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="space-y-8">
              {history.timeline.map((event, index) => (
                <StaggerItem
                  key={event.year}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: index * 0.1 },
                    },
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                      <span className="text-primary-foreground font-bold text-sm">{event.year.slice(-2)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-lg text-foreground mb-2">{event.year}</h3>
                          <p className="text-muted-foreground leading-relaxed">{event.event}</p>
                        </div>
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                          {event.images?.length ? (
                            <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-20 h-20">
                              {event.images.slice(0, 4).map((imgUrl, i) => (
                                <Image
                                  key={i}
                                  src={imgUrl}
                                  alt={`Church in ${event.year} image ${i}`}
                                  width={70}
                                  height={70}
                                  className="w-20 h-20 object-cover hover:scale-110 transition-transform duration-300"
                                />
                              ))}
                            </div>
                          ) : (
                            <Image
                              src={`/placeholder.svg?height=80&width=80&query=Nigerian church history ${event.year} vintage photo black and white`}
                              alt={`Church in ${event.year}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Our Foundation"
              title="Core Values"
              description="These values guide everything we do as a church community."
              centered
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = valueIcons[value.icon as keyof typeof valueIcons] || Cross
              return (
                <StaggerItem
                  key={value.title}
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
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader className="pb-3">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="font-serif text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Meet Our Team"
              title="Church Leadership"
              description="Our dedicated leaders are here to serve, guide, and support our church family."
              centered
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <StaggerItem
                key={leader.id}
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
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-3">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group">
                      <Image
                        src={
                          leader.image ||
                          `/placeholder.svg?height=128&width=128&query=Nigerian church leader ${leader.position} professional portrait`
                        }
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardTitle className="font-serif text-xl">{leader.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {leader.position}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
