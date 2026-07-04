"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/admin/file-upload"
import { apiUrl } from "@/lib/api"
import { Pencil, Trash2 } from "lucide-react"

const emptyForm = {
  title: "",
  description: "",
  date: "",
  type: "",
  url: "",
  thumbnail: "",
  author: "",
  issue: "",
  embed: "",
}

export function ArchivesManager() {
  const [archives, setArchives] = useState<any[]>([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const set = (key: string, value: string) => setFormData((prev) => ({ ...prev, [key]: value }))

  const fetchArchives = async () => {
    const res = await fetch(apiUrl("/api/archives"))
    setArchives(await res.json())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingId ? "PUT" : "POST"
    const body = editingId ? { ...formData, id: editingId } : formData

    const res = await fetch(apiUrl("/api/archives"), {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setFormData(emptyForm)
      setEditingId(null)
      fetchArchives()
    }
  }

  const handleEdit = (item: any) => {
    setEditingId(item.id)
    setFormData({
      title: item.title ?? "",
      description: item.description ?? "",
      date: item.date ?? "",
      type: item.type ?? "",
      url: item.url ?? "",
      thumbnail: item.thumbnail ?? "",
      author: item.author ?? "",
      issue: item.issue ?? "",
      embed: item.embed ?? "",
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this archive item?")) return
    const res = await fetch(apiUrl("/api/archives"), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (res.ok) fetchArchives()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(emptyForm)
  }

  useEffect(() => { fetchArchives() }, [])

  const isVideo = formData.type === "video"
  const isImage = formData.type === "picture"
  const isBook = formData.type === "book"
  const isJournal = formData.type === "journal"

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Archive Item" : "Add Archive Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={formData.title} onChange={(e) => set("title", e.target.value)} required />
            <Textarea placeholder="Description" value={formData.description} onChange={(e) => set("description", e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={formData.date} onChange={(e) => set("date", e.target.value)} required />
              <Select value={formData.type} onValueChange={(v) => set("type", v)}>
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

            {isBook && (
              <Input placeholder="Author (optional)" value={formData.author} onChange={(e) => set("author", e.target.value)} />
            )}

            {isJournal && (
              <Input placeholder="Issue (optional)" value={formData.issue} onChange={(e) => set("issue", e.target.value)} />
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{isVideo ? "Video URL (optional)" : "URL / Link (optional)"}</p>
              <Input placeholder={isVideo ? "Paste video URL" : "Paste URL / link"} value={formData.url} onChange={(e) => set("url", e.target.value)} />
              {isVideo && (
                <>
                  <p className="text-xs text-muted-foreground">— or upload a file —</p>
                  <FileUpload accept="video/*" maxSize={200} onUpload={(url) => set("url", url)} />
                  {formData.url && <p className="text-xs text-green-600 truncate">Selected: {formData.url}</p>}
                </>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Thumbnail URL (optional)</p>
              <Input placeholder="Paste thumbnail URL" value={formData.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} />
              <p className="text-xs text-muted-foreground">— or upload an image —</p>
              <FileUpload accept="image/*" maxSize={5} onUpload={(url) => set("thumbnail", url)} />
              {formData.thumbnail && (
                <img src={formData.thumbnail} alt="Thumbnail preview" className="w-24 h-24 object-cover rounded border" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Embed Code (optional)</p>
              <Textarea
                placeholder={`Paste embed code e.g. <iframe src="..." />`}
                value={formData.embed}
                onChange={(e) => set("embed", e.target.value)}
                rows={3}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">Supports YouTube, Google Drive, or any iframe embed. Overrides thumbnail display when present.</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Add Archive Item"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
            </div>
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
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.author && <p className="text-xs text-gray-500">By {item.author}</p>}
                    {item.issue && <p className="text-xs text-gray-500">Issue: {item.issue}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{item.type}</span>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
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
