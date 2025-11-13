export async function getLivestreamData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/livestream`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch livestream data')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching livestream data:', error)
    
    // Return fallback data
    return {
      settings: {
        title: "Join Us Online",
        description: "Can't make it to church in person? Join us online for live worship services and special events.",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isLive: false,
        heroImage: "/placeholder.svg?height=400&width=1200",
        ctaTitle: "Join Us In Person Too!",
        ctaDescription: "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
        next_service: {
          date: "2024-04-07",
          time: "10:00 AM",
          service: "Sunday Worship Service"
        }
      },
      schedule: [
        { day: "Sunday", time: "10:00 AM", service: "Main Worship Service" },
        { day: "Sunday", time: "6:00 PM", service: "Evening Service" },
        { day: "Wednesday", time: "7:00 PM", service: "Prayer Meeting" },
        { day: "Thursday", time: "7:00 PM", service: "Bible Study" }
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