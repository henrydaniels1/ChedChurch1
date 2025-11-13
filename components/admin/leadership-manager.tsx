"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LeadershipManager() {
  const [leadership, setLeadership] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: ""
  })

  const fetchLeadership = async () => {
    const response = await fetch("/api/leadership")
    const data = await response.json()
    setLeadership(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/leadership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      setFormData({ name: "", position: "", bio: "", image: "" })
      fetchLeadership()
    }
  }

  useEffect(() => {
    fetchLeadership()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Leadership Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input
              placeholder="Position/Title"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              required
            />
            <Textarea
              placeholder="Biography"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              required
            />
            <Input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <Button type="submit">Add Member</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadership.map((member: any) => (
              <div key={member.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-blue-600">{member.position}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}