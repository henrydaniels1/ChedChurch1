"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { FileUpload } from "@/components/admin/file-upload"
import { apiUrl } from "@/lib/api"

export function CategoryInfoManager() {
  const [categories, setCategories] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", description: "", icon: "", image: "" })

  const fetchCategories = async () => {
    const res = await fetch(apiUrl("/api/program-categories"))
    setCategories(await res.json())
  }

  const handleEdit = (cat: any) => {
    setEditingId(cat.id)
    setFormData({ title: cat.title, description: cat.description, icon: cat.icon, image: cat.image })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(apiUrl("/api/program-categories"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...formData }),
    })
    if (res.ok) {
      setEditingId(null)
      setFormData({ title: "", description: "", icon: "", image: "" })
      fetchCategories()
    }
  }

  useEffect(() => { fetchCategories() }, [])

  return (
    <div className="space-y-6 mt-4">
      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Category Info</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <Input placeholder="Icon (emoji)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} required />
              <FileUpload onUpload={(url) => setFormData({ ...formData, image: url })} accept="image/*" />
              {formData.image && <img src={formData.image} alt="preview" className="h-24 rounded object-cover" />}
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Program Categories</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img src={cat.image} alt={cat.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{cat.icon} {cat.title}</p>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{cat.key}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleEdit(cat)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
