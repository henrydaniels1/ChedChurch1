interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
}

export function SectionHeader({ title, subtitle, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
      {subtitle && <p className="text-accent/90 font-semibold text-sm uppercase tracking-wider">{subtitle}</p>}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {description && <p className="text-foreground/70 text-lg leading-relaxed max-w-3xl">{description}</p>}
    </div>
  )
}
