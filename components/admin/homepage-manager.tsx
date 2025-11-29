"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/admin/file-upload"
import { HeroSlidesManager } from "@/components/admin/hero-slides-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiUrl } from "@/lib/api"

export function HomepageManager() {
  const [content, setContent] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const fetchContent = async () => {
    try {
      const response = await fetch(apiUrl("/api/homepage"))
      if (!response.ok) {
        throw new Error('Failed to fetch homepage content')
      }
      const data = await response.json()
      
      // Handle case where data might not be an array
      if (Array.isArray(data)) {
        const contentObj = data.reduce((acc: any, item: any) => {
          acc[item.section] = item
          return acc
        }, {})
        setContent(contentObj)
      } else {
        console.error('Homepage API did not return an array:', data)
        setContent({})
      }
    } catch (error) {
      console.error('Error fetching homepage content:', error)
      setContent({})
    }
  }

  const handleUpdate = async (section: string, field: string, value: string) => {
    setLoading(true)
    const updatedSection = { ...content[section], [field]: value }
    
    const response = await fetch(apiUrl("/api/homepage"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSection)
    })
    
    if (response.ok) {
      setContent({ ...content, [section]: updatedSection })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="slides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slides">Hero Slides</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="welcome">Welcome Section</TabsTrigger>
        </TabsList>

        <TabsContent value="slides">
          <HeroSlidesManager />
        </TabsContent>

        <TabsContent value="hero">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Hero Title"
            value={content.hero?.title || ""}
            onChange={(e) => handleUpdate("hero", "title", e.target.value)}
          />
          <Input
            placeholder="Hero Subtitle"
            value={content.hero?.subtitle || ""}
            onChange={(e) => handleUpdate("hero", "subtitle", e.target.value)}
          />
          <Textarea
            placeholder="Hero Description"
            value={content.hero?.description || ""}
            onChange={(e) => handleUpdate("hero", "description", e.target.value)}
          />
          <FileUpload
            onUpload={(url) => handleUpdate("hero", "image", url)}
            accept="image/*"
          />
          {content.hero?.image && (
            <img src={content.hero.image} alt="Hero" className="w-32 h-20 object-cover rounded" />
          )}
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="welcome">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Welcome Title"
            value={content.welcome?.title || ""}
            onChange={(e) => handleUpdate("welcome", "title", e.target.value)}
          />
          <Textarea
            placeholder="Welcome Content"
            value={content.welcome?.description || ""}
            onChange={(e) => handleUpdate("welcome", "description", e.target.value)}
          />
          <FileUpload
            onUpload={(url) => handleUpdate("welcome", "image", url)}
            accept="image/*"
          />
          {content.welcome?.image && (
            <img src={content.welcome.image} alt="Welcome" className="w-32 h-20 object-cover rounded" />
          )}
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}