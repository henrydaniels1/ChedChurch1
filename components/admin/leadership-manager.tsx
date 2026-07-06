"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import type { LeadershipMember } from "@/lib/types"

const emptyForm = { name: "", position: "", bio: "", image: "" }

export function LeadershipManager() {
  const [leadership, setLeadership] = useState<LeadershipMember[]>([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const fetchLeadership = async () => {
    const response = await fetch("/api/leadership")
    const data = await response.json()
    setLeadership(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isEditing = editingId !== null
    const response = await fetch("/api/leadership", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isEditing ? { id: editingId, ...formData } : formData),
    })

    if (response.ok) {
      setFormData(emptyForm)
      setEditingId(null)
      fetchLeadership()
    }
  }

  const handleEdit = (member: LeadershipMember) => {
    setEditingId(member.id)
    setFormData({ name: member.name, position: member.position, bio: member.bio, image: member.image })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return
    const response = await fetch("/api/leadership", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (response.ok) fetchLeadership()
  }

  const handleCancel = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  useEffect(() => {
    fetchLeadership()
  }, [])

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Leadership Member" : "Add Leadership Member"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Position/Title"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
            <Textarea
              placeholder="Biography"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
            <Input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Save Changes" : "Add Member"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadership.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-blue-600">{member.position}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{member.bio}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(member)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
