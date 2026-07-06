"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedSection } from "@/components/animated-section"
import { Copy, Check } from "lucide-react"

const accounts = [
  {
    bankName: "First Bank of Nigeria",
    accountNumber: "3012345678",
    accountName: "Peace Chapel Church",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/First_Bank_of_Nigeria_logo.svg/200px-First_Bank_of_Nigeria_logo.svg.png",
  },
  {
    bankName: "Zenith Bank",
    accountNumber: "2012345678",
    accountName: "Peace Chapel Church",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Zenith_Bank_logo.svg/200px-Zenith_Bank_logo.svg.png",
  },
]

function AccountCard({ bankName, accountNumber, accountName, logo }: typeof accounts[0]) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3 flex flex-row items-center gap-4">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white border p-1">
          <Image src={logo} alt={bankName} fill className="object-contain" />
        </div>
        <div>
          <CardTitle className="font-serif text-lg">{bankName}</CardTitle>
          <p className="text-sm text-muted-foreground">{accountName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between bg-secondary rounded-lg px-4 py-3">
          <span className="font-mono text-lg font-semibold tracking-widest">{accountNumber}</span>
          <Button size="icon" variant="ghost" onClick={handleCopy} className="h-8 w-8 ml-2">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        {copied && <p className="text-xs text-green-500 mt-1 text-right">Copied!</p>}
      </CardContent>
    </Card>
  )
}

export function DonationsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionHeader
            subtitle="Give"
            title="Support Our Ministry"
            description="Your generous giving helps us serve our community and advance God's kingdom. Every contribution makes a difference."
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <AccountCard key={account.accountNumber} {...account} />
          ))}
        </div>
      </div>
    </section>
  )
}
