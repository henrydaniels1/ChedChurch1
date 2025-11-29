import { Suspense } from "react"
import { ArchivesClient } from "@/components/archives-client"
import { SectionHeader } from "@/components/section-header"
import { ArchiveCard } from "@/components/archive-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, Video, ImageIcon, Heart, Search, Filter } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { getArchives } from "@/lib/data"

export default async function ArchivesPage() {
  let archives = []
  
  try {
    archives = await getArchives()
  } catch (error) {
    console.error('Failed to load archives:', error)
    // Continue with empty array
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading archives...</div>}>
        <ArchivesClient archives={archives} />
      </Suspense>
    </div>
  )
}
