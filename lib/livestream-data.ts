export async function getLivestreamData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/livestream`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch livestream data')
    }
    
    const data = await response.json()
    
    // Transform data to match expected format
    return {
      settings: {
        title: data.settings?.title || "Join Us Online",
        description: data.settings?.description || "Can't make it to church in person? Join us online for live worship services and special events.",
        streamUrl: data.settings?.stream_url || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isLive: data.settings?.is_live || false,
        heroImage: data.settings?.hero_image || "/placeholder.svg?height=400&width=1200",
        ctaTitle: data.settings?.cta_title || "Join Us In Person Too!",
        ctaDescription: data.settings?.cta_description || "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
        nextService: data.settings?.next_service || {
          date: "2024-04-07",
          time: "10:00",
          service: "Sunday Worship Service"
        }
      },
      schedule: data.schedule || [
        { day: "Sunday", time: "10:00", service: "Main Worship Service" },
        { day: "Sunday", time: "18:00", service: "Evening Service" },
        { day: "Wednesday", time: "19:00", service: "Prayer Meeting" },
        { day: "Thursday", time: "19:00", service: "Bible Study" }
      ],
      features: data.features || [
        {
          title: "High Quality Stream",
          description: "Crystal clear video and audio quality ensures you don't miss a moment of worship.",
          icon: "Wifi"
        },
        {
          title: "Interactive Community", 
          description: "Connect with other viewers and participate in our online community during services.",
          icon: "Users"
        },
        {
          title: "Never Miss a Service",
          description: "Can't make it in person? Join us online and be part of our worship community from anywhere.",
          icon: "Calendar"
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching livestream data:', error)
    
    // Return fallback data with proper field names
    return {
      settings: {
        title: "Join Us Online",
        description: "Can't make it to church in person? Join us online for live worship services and special events.",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isLive: false,
        heroImage: "/placeholder.svg?height=400&width=1200",
        ctaTitle: "Join Us In Person Too!",
        ctaDescription: "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
        nextService: {
          date: "2024-04-07",
          time: "10:00",
          service: "Sunday Worship Service"
        }
      },
      schedule: [
        { day: "Sunday", time: "10:00", service: "Main Worship Service" },
        { day: "Sunday", time: "18:00", service: "Evening Service" },
        { day: "Wednesday", time: "19:00", service: "Prayer Meeting" },
        { day: "Thursday", time: "19:00", service: "Bible Study" }
      ],
      features: [
        {
          title: "High Quality Stream",
          description: "Crystal clear video and audio quality ensures you don't miss a moment of worship.",
          icon: "Wifi"
        },
        {
          title: "Interactive Community", 
          description: "Connect with other viewers and participate in our online community during services.",
          icon: "Users"
        },
        {
          title: "Never Miss a Service",
          description: "Can't make it in person? Join us online and be part of our worship community from anywhere.",
          icon: "Calendar"
        }
      ]
    }
  }
}