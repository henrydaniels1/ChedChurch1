"use client"

import { useState } from "react"
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

type ArchiveSection = "all" | "book" | "journal" | "video" | "picture"

interface ArchivesClientProps {
  archives: any[]
}

export function ArchivesClient({ archives }: ArchivesClientProps) {
  const [activeSection, setActiveSection] = useState<ArchiveSection>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const sections = [
    {
      id: "all" as const,
      title: "All Archives",
      icon: Filter,
      count: archives.length,
    },
    {
      id: "book" as const,
      title: "Books",
      icon: BookOpen,
      count: archives.filter(item => item.type === 'book').length,
    },
    {
      id: "journal" as const,
      title: "Journals",
      icon: FileText,
      count: archives.filter(item => item.type === 'journal').length,
    },
    {
      id: "video" as const,
      title: "Videos",
      icon: Video,
      count: archives.filter(item => item.type === 'video').length,
    },
    {
      id: "picture" as const,
      title: "Pictures",
      icon: ImageIcon,
      count: archives.filter(item => item.type === 'picture').length,
    },
  ]

  const getFilteredContent = () => {
    let filtered = archives

    if (activeSection !== "all") {
      filtered = filtered.filter(item => item.type === activeSection)
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const filteredContent = getFilteredContent()

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="https://i.pinimg.com/736x/41/1d/8e/411d8ef3098351d70da1e708021f0769.jpg"
            alt="Church archives and historical documents"
            className="w-full h-full opacity-40"
            intensity={0.2}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.2}>
            <SectionHeader
              subtitle="Explore Our History"
              title="Church Archives"
              description="Discover our rich collection of books, journals, videos, and pictures that tell the story of our faith community."
              centered
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.3}>
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search archives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {sections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center space-x-2"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{section.title}</span>
                      <Badge variant="secondary" className="ml-1">
                        {section.count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {activeSection === "all" ? "All Archives" : sections.find((s) => s.id === activeSection)?.title}
                </h2>
                <p className="text-muted-foreground">
                  {filteredContent.length} {filteredContent.length === 1 ? "item" : "items"}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {filteredContent.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.map((item, index) => (
                <StaggerItem
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, delay: index * 0.05 },
                    },
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <ArchiveCard item={item} type={item.type} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <AnimatedSection delay={0.4}>
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">No Results Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? `No archives match your search for "${searchQuery}"`
                      : "No archives found in this category"}
                  </p>
                  {searchQuery && (
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}