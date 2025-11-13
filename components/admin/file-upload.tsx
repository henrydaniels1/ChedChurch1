"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  maxSize?: number
}

export function FileUpload({ onUpload, accept = "image/*", maxSize = 5 }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (response.ok) {
        onUpload(result.url)
        setPreview(result.url)
      } else {
        alert(result.error || 'Upload failed')
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    onUpload('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="flex-1"
        />
        <Button disabled={uploading} size="sm">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
          <Button
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 w-6 h-6 p-0"
            onClick={clearPreview}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  )
}