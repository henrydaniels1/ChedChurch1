"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/section-header"
import { AnimatedSection } from "@/components/animated-section"
import { contactInfo } from "@/lib/contact"
import { sendContactEmail } from "@/app/actions/contact"

const emptyForm = { name: "", email: "", company: "", message: "" }

export function ContactSection() {
  const [formData, setFormData] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status !== "idle") setStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")
    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setStatus("success")
        setStatusMessage(result.message || "Message sent successfully!")
        setFormData(emptyForm)
        setTimeout(() => { setStatus("idle"); setStatusMessage("") }, 5000)
      } else {
        setStatus("error")
        setStatusMessage(result.error || "Failed to send message")
      }
    } catch {
      setStatus("error")
      setStatusMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionHeader
            subtitle="Get In Touch"
            title="Contact Us"
            description="We'd love to hear from you. Reach out to us or send us a message below."
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { icon: MapPin, label: "Address", value: contactInfo.address, href: undefined },
                { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
              ].map(({ icon: Icon, label, value, href }) => (
                <Card key={label} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-center gap-4 pt-5 pb-5">
                    <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{label}</p>
                      {href ? (
                        <Link href={href} className="text-sm font-semibold hover:text-primary transition-colors">{value}</Link>
                      ) : (
                        <p className="text-sm font-semibold">{value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                    <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">Email <span className="text-destructive">*</span></label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="company" className="text-sm font-medium">Subject</label>
                  <Input id="company" name="company" placeholder="What is this about?" value={formData.company} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium">Message <span className="text-destructive">*</span></label>
                  <Textarea id="message" name="message" placeholder="How can we help you?" rows={5} value={formData.message} onChange={handleChange} required />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>

                {status === "success" && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <p className="text-green-600 text-sm">{statusMessage}</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-destructive text-sm">{statusMessage}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
