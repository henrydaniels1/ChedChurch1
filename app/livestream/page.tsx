"use client"

import { useState, useEffect } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { LivestreamClient } from "@/components/livestream-client"
import { HeroSection } from "@/components/livestream/hero-section"
import { StatusCards } from "@/components/livestream/status-cards"
import { ScheduleSection } from "@/components/livestream/schedule-section"
import { FeaturesSection } from "@/components/livestream/features-section"
import { CtaSection } from "@/components/livestream/cta-section"

export default function LivestreamPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/livestream')
        if (response.ok) {
          const result = await response.json()
          setData({
            settings: {
              title: result.settings?.title || "Join Us Online",
              description: result.settings?.description || "Can't make it to church in person? Join us online for live worship services and special events.",
              streamUrl: result.settings?.stream_url || "https://www.youtube.com/embed/dQw4w9WgXcQ",
              isLive: result.settings?.is_live || false,
              heroImage: result.settings?.hero_image || "/placeholder.svg?height=400&width=1200",
              ctaTitle: result.settings?.cta_title || "Join Us In Person Too!",
              ctaDescription: result.settings?.cta_description || "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
              nextService: result.settings?.next_service || {
                date: "2024-04-07",
                time: "10:00",
                service: "Sunday Worship Service"
              }
            },
            schedule: result.schedule || [],
            features: result.features || []
          })
        }
      } catch (error) {
        console.error('Error fetching livestream data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>
  }

  const { settings, schedule, features } = data
  const { title, description, streamUrl, isLive, nextService, heroImage, ctaTitle, ctaDescription } = settings

  return (
    <div className="min-h-screen">
      <HeroSection 
        title={title} 
        description={description} 
        isLive={isLive} 
        heroImage={heroImage} 
      />

      {/* Video Player Section */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.3}>
            <LivestreamClient streamUrl={streamUrl} isLive={isLive} />
          </AnimatedSection>

          <StatusCards isLive={isLive} nextService={nextService} />
        </div>
      </section>

      <ScheduleSection schedule={schedule} />
      <FeaturesSection features={features} />
      <CtaSection ctaTitle={ctaTitle} ctaDescription={ctaDescription} />
    </div>
  )
}
