"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2 } from "lucide-react"
import { SearchFilter } from "@/components/admin/search-filter"
import { FileUpload } from "@/components/admin/file-upload"

export function ProgramsManager() {
  const [programs, setPrograms] = useState([])
  const [filteredPrograms, setFilteredPrograms] = useState([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    day: "",
    time: "",
    location: "",
    category: "",
    image: ""
  })

  const fetchPrograms = async () => {
    const response = await fetch("/api/programs")
    const data = await response.json()
    setPrograms(data)
    setFilteredPrograms(data)
  }

  const handleSearch = (query: string) => {
    const filtered = programs.filter((program: any) =>
      program.name.toLowerCase().includes(query.toLowerCase()) ||
      program.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredPrograms(filtered)
  }

  const handleFilter = (category: string) => {
    if (category === 'all') {
      setFilteredPrograms(programs)
    } else {
      const filtered = programs.filter((program: any) => program.category === category)
      setFilteredPrograms(filtered)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingId ? "PUT" : "POST"
    const body = editingId ? { id: editingId, ...formData } : formData
    
    const response = await fetch("/api/programs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    
    if (response.ok) {
      setFormData({ name: "", description: "", day: "", time: "", location: "", category: "", image: "" })
      setEditingId(null)
      fetchPrograms()
    }
  }

  const handleEdit = (program: any) => {
    setFormData({
      name: program.name,
      description: program.description,
      day: program.day,
      time: program.time,
      location: program.location,
      category: program.category,
      image: program.image || ""
    })
    setEditingId(program.id)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      const response = await fetch(`/api/programs?id=${id}`, {
        method: "DELETE"
      })
      if (response.ok) {
        fetchPrograms()
      }
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", description: "", day: "", time: "", location: "", category: "", image: "" })
    setEditingId(null)
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Program' : 'Add New Program'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Program Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                placeholder="Day"
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: e.target.value})}
                required
              />
              <Input
                placeholder="Time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
            <Select onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worship">Worship</SelectItem>
                <SelectItem value="youth">Youth</SelectItem>
                <SelectItem value="children">Children</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
                <SelectItem value="special">Special</SelectItem>
              </SelectContent>
            </Select>
            <FileUpload
              onUpload={(url) => setFormData({...formData, image: url})}
              accept="image/*"
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update Program' : 'Add Program'}</Button>
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
          <CardTitle>Existing Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            filterOptions={[
              { value: 'worship', label: 'Worship' },
              { value: 'youth', label: 'Youth' },
              { value: 'children', label: 'Children' },
              { value: 'adult', label: 'Adult' },
              { value: 'special', label: 'Special' }
            ]}
            placeholder="Search programs..."
          />
          <div className="space-y-4">
            {filteredPrograms.map((program: any) => (
              <div key={program.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  {program.image && (
                    <img src={program.image} alt={program.name} className="w-16 h-16 object-cover rounded mr-4" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{program.name}</h3>
                    <p className="text-sm text-gray-600">{program.description}</p>
                    <p className="text-sm">{program.day} at {program.time} - {program.location}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mt-2">
                      {program.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(program)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(program.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}