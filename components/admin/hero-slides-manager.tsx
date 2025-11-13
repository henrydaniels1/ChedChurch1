"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/admin/file-upload"
import { Pencil, Trash2, Plus } from "lucide-react"

export function HeroSlidesManager() {
  const [slides, setSlides] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    cta_text: "",
    cta_link: "",
    order_index: 0
  })

  const fetchSlides = async () => {
    const response = await fetch("/api/hero-slides")
    const data = await response.json()
    setSlides(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingId ? "PUT" : "POST"
    const body = editingId ? { id: editingId, ...formData } : formData
    
    const response = await fetch("/api/hero-slides", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    
    if (response.ok) {
      setFormData({ title: "", subtitle: "", description: "", image: "", cta_text: "", cta_link: "", order_index: 0 })
      setEditingId(null)
      setShowForm(false)
      fetchSlides()
    }
  }

  const handleEdit = (slide: any) => {
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image || "",
      cta_text: slide.cta_text,
      cta_link: slide.cta_link,
      order_index: slide.order_index
    })
    setEditingId(slide.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      const response = await fetch(`/api/hero-slides?id=${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        fetchSlides()
      }
    }
  }

  const handleCancel = () => {
    setFormData({ title: "", subtitle: "", description: "", image: "", cta_text: "", cta_link: "", order_index: 0 })
    setEditingId(null)
    setShowForm(false)
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Slides</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Slide
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Slide' : 'Add New Slide'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Slide Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <Input
                placeholder="Subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <FileUpload
                onUpload={(url) => setFormData({...formData, image: url})}
                accept="image/*"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Button Text"
                  value={formData.cta_text}
                  onChange={(e) => setFormData({...formData, cta_text: e.target.value})}
                  required
                />
                <Input
                  placeholder="Button Link"
                  value={formData.cta_link}
                  onChange={(e) => setFormData({...formData, cta_link: e.target.value})}
                  required
                />
              </div>
              <Input
                type="number"
                placeholder="Order (1, 2, 3...)"
                value={formData.order_index}
                onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                required
              />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Slide' : 'Add Slide'}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide: any) => (
          <Card key={slide.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {slide.image && (
                  <img src={slide.image} alt={slide.title} className="w-20 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{slide.title}</h3>
                  <p className="text-sm text-gray-600">{slide.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-1">{slide.description.substring(0, 100)}...</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Order: {slide.order_index}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {slide.cta_text}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(slide)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(slide.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}