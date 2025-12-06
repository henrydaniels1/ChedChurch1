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
  worship: "bg-primary/15 text-primary border-primary/30",
  youth: "bg-accent/15 text-accent border-accent/30",
  children: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  adult: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  special: "bg-violet-500/15 text-violet-300 border-violet-500/30",
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
      <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
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
