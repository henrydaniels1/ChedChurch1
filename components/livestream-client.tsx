"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface LivestreamClientProps {
  streamUrl: string
  isLive: boolean
}

export function LivestreamClient({ streamUrl, isLive }: LivestreamClientProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black">
          {isPlaying ? (
            <iframe
              src={streamUrl}
              title="Church Livestream"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(/placeholder.svg?height=600&width=1200&query=Nigerian church sanctuary worship service live streaming)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
              <div className="relative text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isLive ? "Live Service Available" : "Service Not Currently Live"}
                </h3>
                <p className="text-white/80 mb-6">
                  {isLive
                    ? "Click to join our live worship service"
                    : "Check our schedule below for upcoming services"}
                </p>
                {isLive && (
                  <Button
                    onClick={() => setIsPlaying(true)}
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 transform hover:scale-105 transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Live
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}