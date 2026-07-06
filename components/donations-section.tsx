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
    logo: "data:image/png;base64,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",
  },
  {
    bankName: "Zenith Bank",
    accountNumber: "2012345678",
    accountName: "Peace Chapel Church",
    logo: "data:image/png;base64,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",
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
