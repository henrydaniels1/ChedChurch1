"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filter: string) => void
  filterOptions: { value: string; label: string }[]
  placeholder?: string
}

export function SearchFilter({ onSearch, onFilter, filterOptions, placeholder = "Search..." }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select onValueChange={onFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Items</SelectItem>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}