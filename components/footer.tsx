import Link from "next/link"
import { Cross, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { contactInfo, socialLinks } from "@/lib/contact"

export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Livestream", href: "/livestream" },
    { name: "Archives", href: "/archives" },
  ]

  const ministries = [
    { name: "Youth Ministry", href: "/programs#youth" },
    { name: "Children's Ministry", href: "/programs#children" },
    { name: "Adult Ministry", href: "/programs#adult" },
    { name: "Community Outreach", href: "/programs#outreach" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Cross className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-foreground">Grace Community</span>
                <span className="text-xs text-muted-foreground -mt-1">Church</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A place of faith, hope, and love where everyone belongs. Join our community as we grow together in Christ.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.youtube && (
                <Link href={socialLinks.youtube} className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.twitter && (
                <Link href={socialLinks.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">Ministries</h3>
            <ul className="space-y-2">
              {ministries.map((ministry) => (
                <li key={ministry.name}>
                  <Link
                    href={ministry.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {ministry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {contactInfo.phone}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {contactInfo.email}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">© 2024 Grace Community Church. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
