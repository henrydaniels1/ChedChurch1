"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiUrl } from "@/lib/api"

export function ArchivesManager() {
  const [archives, setArchives] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    url: "",
    thumbnail: ""
  })

  const fetchArchives = async () => {
    const response = await fetch(apiUrl("/api/archives"))
    const data = await response.json()
    setArchives(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(apiUrl("/api/archives"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      setFormData({ title: "", description: "", date: "", type: "", url: "", thumbnail: "" })
      fetchArchives()
    }
  }

  useEffect(() => {
    fetchArchives()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Archive Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="picture">Picture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="URL/Link"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
            <Input
              placeholder="Thumbnail URL"
              value={formData.thumbnail}
              onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
            />
            <Button type="submit">Add Archive Item</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Archive Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {archives.map((item: any) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <p className="text-xs text-gray-500 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}