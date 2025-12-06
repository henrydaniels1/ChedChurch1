"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Cross } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Announcements", href: "/announcements" },
    { name: "Livestream", href: "/livestream" },
    { name: "Archives", href: "/archives" },
  ]

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  
  const isActive = useCallback((href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href))
  }, [pathname])

  const getLinkClassName = useCallback((active: boolean) => {
    return `font-medium relative group transition-colors duration-200 ${
      active ? 'text-primary' : 'text-foreground hover:text-primary'
    }`
  }, [])

  return (
    <motion.header
      className="bg-card/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Cross className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg text-foreground">Peace Chapel</span>
                <span className="text-xs text-muted-foreground -mt-1 hidden xs:block">Church</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, staggerChildren: 0.1 }}
          >
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <motion.div key={item.name} variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    href={item.href}
                    className={getLinkClassName(active)}
                  >
                    {item.name}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-300">
                <Link href="/livestream">Join Us Online</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" onClick={toggleMenu} aria-label="Toggle menu">
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="px-4 py-4 space-y-2"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <motion.div
                      key={item.name}
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          active 
                            ? 'text-primary bg-secondary/50' 
                            : 'text-foreground hover:text-primary hover:bg-secondary'
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  className="pt-4 border-t border-border/50"
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Button asChild className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Link href="/livestream">Join Us Online</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
