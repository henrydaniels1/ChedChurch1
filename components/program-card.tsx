"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar } from "lucide-react"
import type { Program } from "@/lib/types"

interface ProgramCardProps {
  program: Program
}

const categoryColors = {
  worship: "bg-primary/10 text-primary border-primary/20",
  youth: "bg-accent/10 text-accent border-accent/20",
  children: "bg-green-100 text-green-700 border-green-200",
  adult: "bg-blue-100 text-blue-700 border-blue-200",
  special: "bg-purple-100 text-purple-700 border-purple-200",
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="font-serif text-xl">{program.name}</CardTitle>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Badge className={categoryColors[program.category]}>{program.category}</Badge>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{program.description}</p>

          <div className="space-y-2">
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{program.day}</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="w-4 h-4" />
              <span>{program.time}</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{program.location}</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
