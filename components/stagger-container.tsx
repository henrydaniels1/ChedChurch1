"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" }) // 👈 changed once to false

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // 👈 toggles on scroll in/out
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = motion.div
