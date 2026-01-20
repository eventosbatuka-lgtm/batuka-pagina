"use client"

import { Check, Star, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useContent } from '@/lib/content-context'
import { cn } from '@/lib/utils'

export function PromosSection() {
  const { content, selectedPackage, setSelectedPackage } = useContent()

  const handleSelectPackage = (promoId: string, promoName: string) => {
    setSelectedPackage(promoId)
    
    const message = encodeURIComponent(
      `Hola Batuka! Me interesa el pack: ${promoName}. ¿Me pasan info y precio? 🎉`
    )
    window.open(`https://wa.me/5491136232642?text=${message}`, '_blank')
  }

  return (
    <section id="promos" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-foreground">
            Nuestros Packs
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Promos para cada fiesta
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Elegí el pack que mejor se adapte a tu evento. Todos incluyen la magia de Batuka.
          </p>
        </div>

        {/* Promos Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.promos.map((promo) => (
            <Card
              key={promo.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                promo.popular && 'ring-2 ring-primary',
                selectedPackage === promo.id && 'ring-2 ring-accent'
              )}
            >
              {promo.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1">
                  <div className="flex items-center gap-1 text-xs font-bold text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Popular
                  </div>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{promo.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium">
                    {promo.duration}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {promo.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <div className="mb-3 text-lg font-bold text-foreground">
                    {promo.price}
                  </div>
                  <Button
                    className={cn(
                      'w-full transition-all',
                      promo.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    )}
                    onClick={() => handleSelectPackage(promo.id, promo.name)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Quiero este pack
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
