import type { HomeContent } from "./types"

export const homeContent: HomeContent = {
  hero: {
    title: "Welcome to Grace Community Church",
    subtitle: "A Place of Faith, Hope, and Love",
    description:
      "Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.",
    backgroundImage: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg",
  },
  welcome: {
    title: "Our Community Welcomes You",
    content:
      "At Grace Community Church, we believe that everyone has a place in God's family. Whether you're seeking spiritual growth, community connection, or simply a place to belong, we invite you to join us on this journey of faith. Our doors are always open, and our hearts are ready to welcome you home.",
    image: "https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2024/09/WhatsApp-Image-2024-09-26-at-23.07.28.jpeg?ssl=1",
  },
  featuredPrograms: [
    {
      id: "sunday-worship",
      name: "Sunday Worship Service",
      description: "Join us for inspiring worship, meaningful messages, and community fellowship.",
      day: "Sunday",
      time: "10:00 AM",
      location: "Main Sanctuary",
      category: "worship",
    },
    {
      id: "youth-group",
      name: "Youth Group",
      description: "Fun activities, Bible study, and friendship for teens ages 13-18.",
      day: "Wednesday",
      time: "6:30 PM",
      location: "Youth Center",
      category: "youth",
    },
    {
      id: "bible-study",
      name: "Adult Bible Study",
      description: "Deep dive into Scripture with discussion and prayer.",
      day: "Thursday",
      time: "7:00 PM",
      location: "Fellowship Hall",
      category: "adult",
    },
  ],
  announcements: [
    {
      id: "easter-service",
      title: "Easter Sunday Service",
      content: "Join us for a special Easter celebration with music, message, and fellowship breakfast.",
      date: "2024-03-31",
      priority: "high",
    },
    {
      id: "community-outreach",
      title: "Community Food Drive",
      content: "Help us serve our neighbors by donating non-perishable food items.",
      date: "2024-04-15",
      priority: "medium",
    },
    {
      id: "new-member-class",
      title: "New Member Orientation",
      content: "Interested in joining our church family? Attend our orientation class.",
      date: "2024-04-20",
      priority: "medium",
    },
  ],
}
