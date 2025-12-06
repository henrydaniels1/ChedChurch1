import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { Calendar } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { WelcomeSection } from "@/components/sections/welcome-section"
import { FeaturedProgramsSection } from "@/components/sections/featured-programs-section"
import { getPrograms, getAnnouncements, getHomepageContent } from "@/lib/data"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getHomeData() {
  try {
    const [programs, announcements, homepageData] = await Promise.all([
      getPrograms(),
      getAnnouncements(),
      getHomepageContent()
    ])
    
    const content = homepageData.reduce((acc: any, item: any) => {
      acc[item.section] = item
      return acc
    }, {})
    
    return {
      featuredPrograms: programs.slice(0, 3),
      announcements: announcements.slice(0, 3),
      hero: content.hero || {
        title: "Welcome to Peace Chapel Church",
        subtitle: "A Place of Faith, Hope, and Love",
        description: "Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.",
        image: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg"
      },
      welcome: content.welcome || {
        title: "Our Community Welcomes You",
        description: "At Peace Chapel Church, we believe that everyone has a place in God's family.",
        image: "https://i.pinimg.com/736x/03/51/8b/03518bb1836774755dbacba3ba218e0a.jpg"
      }
    }
  } catch (error) {
    return { 
      featuredPrograms: [], 
      announcements: [],
      hero: {
        title: "Welcome to Peace Chapel Church",
        subtitle: "A Place of Faith, Hope, and Love",
        description: "Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.",
        image: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg"
      },
      welcome: {
        title: "Our Community Welcomes You",
        description: "At Peace Chapel Church, we believe that everyone has a place in God's family.",
        image: "https://i.pinimg.com/736x/03/51/8b/03518bb1836774755dbacba3ba218e0a.jpg"
      }
    }
  }
}

export default async function HomePage() {
  const { featuredPrograms, announcements, hero, welcome } = await getHomeData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlideshow />

      {/* Welcome Section */}
      <WelcomeSection 
        title={welcome.title}
        content={welcome.description}
        image={welcome.image}
      />

      {/* Featured Programs */}
      <FeaturedProgramsSection programs={featuredPrograms} />

      {/* Announcements */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Stay Updated"
              title="Latest Announcements"
              description="Keep up with what's happening in our church community."
              centered
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement: any) => (
              <StaggerItem
                key={announcement.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-serif text-lg">{announcement.title}</CardTitle>
                      <Badge
                        variant={announcement.priority === "high" ? "default" : "secondary"}
                        className={announcement.priority === "high" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              We'd love to welcome you into our church family. Come as you are, and discover the love of Christ with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/programs">Find a Program</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/livestream">Join Us Online</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
