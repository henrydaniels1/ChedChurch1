import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { Calendar, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"

interface ScheduleItem {
  day: string
  time: string
  service: string
}

interface ScheduleSectionProps {
  schedule: ScheduleItem[]
}

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const formatTime = (timeString: string) => {
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString
    }
    
    const [hours, minutes] = timeString.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
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
  )
}