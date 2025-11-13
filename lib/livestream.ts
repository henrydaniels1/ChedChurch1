import type { LivestreamContent } from "./types"

export const livestreamContent: LivestreamContent = {
  title: "Join Us Online",
  description:
    "Can't make it to church in person? Join us online for live worship services and special events. Our livestream allows you to participate in worship from anywhere in the world.",
  streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder URL
  schedule: [
    {
      day: "Sunday",
      time: "10:00 AM",
      service: "Main Worship Service",
    },
    {
      day: "Sunday",
      time: "6:00 PM",
      service: "Evening Service",
    },
    {
      day: "Wednesday",
      time: "7:00 PM",
      service: "Prayer Meeting",
    },
    {
      day: "Thursday",
      time: "7:00 PM",
      service: "Bible Study",
    },
  ],
  isLive: false, // This would be dynamically updated
  nextService: {
    date: "2024-04-07",
    time: "10:00 AM",
    service: "Sunday Worship Service",
  },
}
