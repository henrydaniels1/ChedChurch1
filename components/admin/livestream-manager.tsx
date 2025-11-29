"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Save, Wifi, WifiOff } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { DatabaseStatus } from "@/components/admin/database-status"
import { apiUrl } from "@/lib/api"

interface LivestreamSettings {
  title: string
  description: string
  streamUrl: string
  isLive: boolean
  heroImage: string
  ctaTitle: string
  ctaDescription: string
}

interface ServiceSchedule {
  id?: string
  day: string
  time: string
  service: string
}

interface NextService {
  date: string
  time: string
  service: string
}

interface StreamFeature {
  id?: string
  title: string
  description: string
  icon: string
}

export function LivestreamManager() {
  const [settings, setSettings] = useState<LivestreamSettings>({
    title: "Join Us Online",
    description: "Can't make it to church in person? Join us online for live worship services and special events.",
    streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isLive: false,
    heroImage: "/placeholder.svg?height=400&width=1200",
    ctaTitle: "Join Us In Person Too!",
    ctaDescription: "While we love having you online, we'd also love to meet you in person. Come visit us anytime!"
  })
  
  const [schedule, setSchedule] = useState<ServiceSchedule[]>([])
  const [nextService, setNextService] = useState<NextService>({
    date: "2024-04-07",
    time: "10:00",
    service: "Sunday Worship Service"
  })
  
  const [features, setFeatures] = useState<StreamFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadLivestreamData()
  }, [])

  const loadLivestreamData = async () => {
    try {
      const response = await fetch(apiUrl('/api/livestream'))
      if (!response.ok) throw new Error('Failed to fetch data')
      
      const data = await response.json()
      
      if (data.settings) {
        setSettings({
          title: data.settings.title || 'Join Us Online',
          description: data.settings.description || '',
          streamUrl: data.settings.stream_url || '',
          isLive: data.settings.is_live || false,
          heroImage: data.settings.hero_image || '',
          ctaTitle: data.settings.cta_title || '',
          ctaDescription: data.settings.cta_description || ''
        })
        if (data.settings.next_service) {
          setNextService(data.settings.next_service)
        }
      }
      
      if (data.schedule) {
        setSchedule(data.schedule)
      }
      
      if (data.features) {
        setFeatures(data.features)
      }
    } catch (error) {
      console.error('Error loading livestream data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch(apiUrl('/api/livestream'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: settings.title,
          description: settings.description,
          stream_url: settings.streamUrl,
          is_live: settings.isLive,
          hero_image: settings.heroImage,
          cta_title: settings.ctaTitle,
          cta_description: settings.ctaDescription,
          next_service: nextService
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save settings')
      }
      
      alert('Settings saved successfully!')
    } catch (error: any) {
      console.error('Error saving settings:', error)
      alert(`Error saving settings: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }



  const addScheduleItem = () => {
    setSchedule([...schedule, { day: "", time: "", service: "" }])
  }

  const removeScheduleItem = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index))
  }

  const updateScheduleItem = (index: number, field: keyof ServiceSchedule, value: string) => {
    const updated = [...schedule]
    updated[index] = { ...updated[index], [field]: value }
    setSchedule(updated)
  }

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "", icon: "Wifi" }])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, field: keyof StreamFeature, value: string) => {
    const updated = [...features]
    updated[index] = { ...updated[index], [field]: value }
    setFeatures(updated)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <DatabaseStatus />
      {/* Stream Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {settings.isLive ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-gray-400" />}
            Stream Settings
            <Badge variant={settings.isLive ? "default" : "secondary"}>
              {settings.isLive ? "Live" : "Offline"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={settings.title}
                onChange={(e) => setSettings({...settings, title: e.target.value})}
                placeholder="Join Us Online"
              />
            </div>
            <div>
              <Label htmlFor="streamUrl">Stream URL</Label>
              <Input
                id="streamUrl"
                value={settings.streamUrl}
                onChange={(e) => {
                  let url = e.target.value
                  // Auto-convert YouTube URLs to embed format
                  if (url.includes('youtube.com/live/') || url.includes('youtube.com/watch?v=')) {
                    const videoId = url.match(/(?:live\/|watch\?v=)([a-zA-Z0-9_-]+)/)?.[1]
                    if (videoId) {
                      url = `https://www.youtube.com/embed/${videoId}`
                    }
                  }
                  setSettings({...settings, streamUrl: url})
                }}
                placeholder="https://www.youtube.com/embed/VIDEO_ID or paste any YouTube URL"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Paste any YouTube URL (live or regular) and it will be auto-converted to embed format
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({...settings, description: e.target.value})}
              placeholder="Can't make it to church in person? Join us online..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heroImage">Hero Background Image URL</Label>
              <Input
                id="heroImage"
                value={settings.heroImage}
                onChange={(e) => setSettings({...settings, heroImage: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isLive"
                checked={settings.isLive}
                onCheckedChange={(checked) => setSettings({...settings, isLive: checked})}
              />
              <Label htmlFor="isLive">Stream is currently live</Label>
            </div>
          </div>

          <Button onClick={saveSettings} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>

      {/* Next Service */}
      <Card>
        <CardHeader>
          <CardTitle>Next Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nextDate">Date</Label>
              <Input
                id="nextDate"
                type="date"
                value={nextService.date}
                onChange={(e) => setNextService({...nextService, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="nextTime">Time</Label>
              <Input
                id="nextTime"
                type="time"
                value={nextService.time}
                onChange={(e) => setNextService({...nextService, time: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="nextServiceName">Service Name</Label>
              <Input
                id="nextServiceName"
                value={nextService.service}
                onChange={(e) => setNextService({...nextService, service: e.target.value})}
                placeholder="Sunday Worship Service"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Service Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label>Day</Label>
                <Input
                  value={item.day}
                  onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                  placeholder="Sunday"
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                />
              </div>
              <div>
                <Label>Service</Label>
                <Input
                  value={item.service}
                  onChange={(e) => updateScheduleItem(index, 'service', e.target.value)}
                  placeholder="Main Worship Service"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeScheduleItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button onClick={addScheduleItem} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
            <Button disabled>
              <Save className="w-4 h-4 mr-2" />
              Save Schedule (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label>Title</Label>
                <Input
                  value={feature.title}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  placeholder="High Quality Stream"
                />
              </div>
              <div>
                <Label>Icon</Label>
                <Input
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                  placeholder="Wifi"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Crystal clear video and audio quality..."
                  rows={2}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button onClick={addFeature} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
            <Button disabled>
              <Save className="w-4 h-4 mr-2" />
              Save Features (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardHeader>
          <CardTitle>Call to Action Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <Input
              id="ctaTitle"
              value={settings.ctaTitle}
              onChange={(e) => setSettings({...settings, ctaTitle: e.target.value})}
              placeholder="Join Us In Person Too!"
            />
          </div>
          <div>
            <Label htmlFor="ctaDescription">CTA Description</Label>
            <Textarea
              id="ctaDescription"
              value={settings.ctaDescription}
              onChange={(e) => setSettings({...settings, ctaDescription: e.target.value})}
              placeholder="While we love having you online, we'd also love to meet you in person..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}