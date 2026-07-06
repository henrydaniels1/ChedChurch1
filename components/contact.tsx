'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { sendContactEmail } from '@/app/actions/contact'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear status when user starts typing
    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setStatus('success')
        setMessage(result.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', company: '', message: '' })
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setMessage(result.error || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'henrydanielchibuzor@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 9031377519',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">      
      {/* Globe background */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src="/globe3.html"
          className="absolute left-1/2 -translate-x-1/2 w-[200%] md:w-full h-full"
          style={{ opacity: 0.4, border: 'none' }}
          scrolling="no"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg bg-[#C9A84C] text-white font-semibold hover:shadow-lg hover:shadow-[#C9A84C]/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{message}</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{message}</p>
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#C9A84C]/20 to-[#1B3A8C]/20 h-fit">
                    <Icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/70 mb-1">{info.label}</p>
                    <p className="text-lg text-foreground">{info.value}</p>
                  </div>
                </div>
              )
            })}

            {/* Additional Info */}
            <div className="pt-8 border-t border-white/10">
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose CHEDWEB?</h3>
                <ul className="space-y-3 text-foreground/70 text-sm">
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>Award-winning team with proven track record</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>Transparent communication throughout the project</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>Results-driven approach with measurable outcomes</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
