import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

interface CtaSectionProps {
  ctaTitle: string
  ctaDescription: string
}

export function CtaSection({ ctaTitle, ctaDescription }: CtaSectionProps) {
  return (
    <AnimatedSection>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{ctaTitle || "Join Us In Person Too!"}</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            {ctaDescription || "While we love having you online, we'd also love to meet you in person. Come visit us anytime!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="transform hover:scale-105 transition-all duration-300"
            >
              <a href="/about">Plan Your Visit</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              <a href="/programs">View Programs</a>
            </Button>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}