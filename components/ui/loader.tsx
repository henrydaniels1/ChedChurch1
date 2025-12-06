"use client"

import { motion } from "framer-motion"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loader({ size = "md", text = "Loading..." }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const dotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizeClasses[size]}`}>
        <motion.div
          className={`absolute ${dotSize[size]} bg-primary rounded-full`}
          animate={{
            rotate: 360,
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute ${dotSize[size]} bg-accent rounded-full`}
          animate={{
            rotate: 360,
            x: [0, -20, 0, 20, 0],
            y: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className={`absolute ${dotSize[size]} bg-primary/60 rounded-full`}
          animate={{
            rotate: 360,
            x: [0, 0, 20, 0, -20],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      {text && (
        <motion.p
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}