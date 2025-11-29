import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"

interface NextService {
  date: string
  time: string
  service: string
}

interface StatusCardsProps {
  isLive: boolean
  nextService?: NextService
}

export function StatusCards({ isLive, nextService }: StatusCardsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
  )
}