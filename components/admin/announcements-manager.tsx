"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiUrl } from "@/lib/api"
import { Pencil, Trash2 } from "lucide-react"

const emptyForm = { title: "", content: "", date: "", priority: "" }

export function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const fetchAnnouncements = async () => {
    const response = await fetch(apiUrl("/api/announcements"))
    const data = await response.json()
    setAnnouncements(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingId ? apiUrl(`/api/announcements/${editingId}`) : apiUrl("/api/announcements")
    const method = editingId ? "PUT" : "POST"
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      setFormData(emptyForm)
      setEditingId(null)
      fetchAnnouncements()
    }
  }

  const handleEdit = (announcement: any) => {
    setEditingId(announcement.id)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date,
      priority: announcement.priority
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return
    const response = await fetch(apiUrl(`/api/announcements/${id}`), { method: "DELETE" })
    if (response.ok) fetchAnnouncements()
  }

  const handleCancel = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</CardTitle>
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
                className="[color-scheme:dark]"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
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
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Add Announcement"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
            </div>
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
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {announcement.priority}
                    </span>
                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => handleEdit(announcement)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => handleDelete(announcement.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
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