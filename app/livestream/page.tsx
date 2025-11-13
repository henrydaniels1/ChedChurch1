import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { Calendar, Clock, Users, Wifi, WifiOff } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { getLivestreamData } from "@/lib/livestream-data"
import { LivestreamClient } from "@/components/livestream-client"

export default async function LivestreamPage() {
  const { settings, schedule, features } = await getLivestreamData()
  const { title, description, streamUrl, isLive, nextService, heroImage, ctaTitle, ctaDescription } = settings


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`1970/01/01 ${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Video Player Section */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.3}>
            <LivestreamClient streamUrl={streamUrl} isLive={isLive} />
          </AnimatedSection>

          {/* Live Status and Next Service */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <StaggerItem
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLive ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium text-green-700">Live Now</span>
                      </div>
                      <p className="text-muted-foreground">Join us for worship and fellowship online!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        <span className="font-medium text-muted-foreground">Currently Offline</span>
                      </div>
                      <p className="text-muted-foreground">We'll be back for our next scheduled service.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </StaggerItem>

            {nextService && (
              <StaggerItem
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 text-primary mr-2" />
                      Next Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{nextService.service}</div>
                      <div className="text-muted-foreground">{formatDate(nextService.date)}</div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(nextService.time)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              subtitle="Schedule"
              title="Livestream Schedule"
              description="Join us online for these regularly scheduled services and events."
              centered
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedule.map((service, index) => (
              <StaggerItem
                key={index}
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
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-lg">{service.service}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{service.day}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(service.time)}</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
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
            {features.map((feature: any, index: number) => {
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

      {/* Call to Action */}
      <AnimatedSection>
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{ctaTitle || "Join Us In Person Too!"}</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              {ctaDescription || "While we love having you online, we'd also love to meet you in person. Come visit us anytime!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <a href="/about">Plan Your Visit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transform hover:scale-105 transition-all duration-300"
              >
                <a href="/programs">View Programs</a>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
