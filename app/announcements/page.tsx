import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { Calendar } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { getAnnouncements } from "@/lib/data"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionHeader
            subtitle="Stay Connected"
            title="All Announcements"
            description="Stay informed about everything happening in our church community."
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
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full">
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

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No announcements at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
