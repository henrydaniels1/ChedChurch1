"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiUrl } from "@/lib/api"

export function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    priority: ""
  })

  const fetchAnnouncements = async () => {
    const response = await fetch(apiUrl("/api/announcements"))
    const data = await response.json()
    setAnnouncements(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(apiUrl("/api/announcements"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      setFormData({ title: "", content: "", date: "", priority: "" })
      fetchAnnouncements()
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Announcement Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <Select onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add Announcement</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement: any) => (
              <div key={announcement.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{announcement.content}</p>
                <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}