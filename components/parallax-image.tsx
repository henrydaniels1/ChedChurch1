"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  intensity?: number
}

export function ParallaxImage({ src, alt, className = "", intensity = 0.5 }: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, intensity * 100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" priority />
      </motion.div>
    </div>
  )
}
