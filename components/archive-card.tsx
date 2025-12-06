"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Play, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ArchiveItem, Book, Journal, Video, Picture } from "@/lib/types"

interface ArchiveCardProps {
  item: ArchiveItem
  type: "book" | "journal" | "video" | "picture"
}

export function ArchiveCard({ item, type }: ArchiveCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getIcon = () => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "picture":
        return <Eye className="w-4 h-4" />
      default:
        return <Download className="w-4 h-4" />
    }
  }

  const getActionText = () => {
    switch (type) {
      case "video":
        return "Watch"
      case "picture":
        return "View"
      default:
        return "Download"
    }
  }

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
        {item.thumbnail && (
          <motion.div
            className="relative h-48 w-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="font-serif text-lg leading-tight">{item.title}</CardTitle>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Badge variant="secondary" className="ml-2 flex-shrink-0">
                {type}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

          <div className="space-y-2">
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.date)}</span>
            </motion.div>

            {/* Type-specific information */}
            {type === "book" && (
              <>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Author:</span> {(item as Book).author}
                </p>
                {(item as Book).pages && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Pages:</span> {(item as Book).pages}
                  </p>
                )}
              </>
            )}

            {type === "journal" && (
              <>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Issue:</span> {(item as Journal).issue}
                </p>
                {(item as Journal).volume && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Volume:</span> {(item as Journal).volume}
                  </p>
                )}
              </>
            )}

            {type === "video" && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Duration:</span> {(item as Video).duration}
              </p>
            )}

            {type === "picture" && (item as Picture).photographer && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Photographer:</span> {(item as Picture).photographer}
              </p>
            )}
          </div>

          {(item.url ||
            (type === "video" && (item as Video).videoUrl) ||
            (type === "picture" && (item as Picture).imageUrl)) && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="w-full transform transition-all duration-300 hover:shadow-md">
                <Link
                  href={
                    type === "video"
                      ? (item as Video).videoUrl
                      : type === "picture"
                        ? (item as Picture).imageUrl
                        : item.url || "#"
                  }
                  target={type === "video" ? "_blank" : undefined}
                  rel={type === "video" ? "noopener noreferrer" : undefined}
                >
                  {getIcon()}
                  {getActionText()}
                </Link>
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
