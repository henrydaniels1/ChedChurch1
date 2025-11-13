// Core types for the church website

export interface ContactInfo {
  phone: string
  email: string
  address: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string
}

export interface LeadershipMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
}

export interface Program {
  id: string
  name: string
  description: string
  day: string
  time: string
  location: string
  category: "worship" | "youth" | "children" | "adult" | "special"
}

export interface ArchiveItem {
  id: string
  title: string
  description: string
  date: string
  url?: string
  thumbnail?: string
}

export interface Book extends ArchiveItem {
  author: string
  pages?: number
  isbn?: string
}

export interface Journal extends ArchiveItem {
  issue: string
  volume?: string
}

export interface Video extends ArchiveItem {
  duration: string
  videoUrl: string
}

export interface Picture extends ArchiveItem {
  imageUrl: string
  photographer?: string
}

export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    description: string
    backgroundImage: string
  }
  welcome: {
    title: string
    content: string
    image: string
  }
  featuredPrograms: Program[]
  announcements: {
    id: string
    title: string
    content: string
    date: string
    priority: "high" | "medium" | "low"
  }[]
}

export interface AboutUsContent {
  mission: string
  vision: string
  history: {
    title: string
    content: string
    timeline: {
      year: string
      event: string
      images?: string[]
    }[]
  }
  leadership: LeadershipMember[]
  values: {
    title: string
    description: string
    icon: string
  }[]
}

export interface LivestreamContent {
  title: string
  description: string
  streamUrl: string
  schedule: {
    day: string
    time: string
    service: string
  }[]
  isLive: boolean
  nextService?: {
    date: string
    time: string
    service: string
  }
}

export interface ArchivesContent {
  books: Book[]
  journals: Journal[]
  churchVideos: Video[]
  churchPictures: Picture[]
  ngoVideos: Video[]
}
