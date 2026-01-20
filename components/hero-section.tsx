"use client"

import { Star, Sparkles, Clock, MessageCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'

export function HeroSection() {
  const { content } = useContent()

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hola Batuka! Quería consultar disponibilidad y precios para una fiesta infantil. ¿Me pasan info? 🎉"
    )
    window.open(`https://wa.me/5491136232642?text=${message}`, '_blank')
  }

  const scrollToPromos = () => {
    const element = document.querySelector('#promos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="confetti-bg relative flex min-h-screen items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-48 w-48 rounded-full bg-highlight/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Animaciones que brillan</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {content.hero.headline}
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0">
              {content.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="cta-pulse group relative w-full overflow-hidden bg-accent text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl sm:w-auto"
              >
                <span className="btn-shine absolute inset-0" />
                <MessageCircle className="mr-2 h-5 w-5" />
                Reservar por WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToPromos}
                className="w-full border-2 border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 sm:w-auto"
              >
                Ver Promos
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm lg:justify-start lg:gap-6">
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{content.stats.rating}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="font-medium">{content.stats.events}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-highlight" />
                <span className="font-medium">{content.stats.response}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-highlight/30 p-1">
              <div className="h-full w-full overflow-hidden rounded-[1.35rem] bg-card">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-highlight/10">
                  <div className="text-center">
                    <div className="mb-4 text-8xl">🎉</div>
                    <p className="text-lg font-medium text-muted-foreground">
                      Foto de evento
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 -top-4 animate-bounce rounded-2xl bg-primary px-4 py-2 shadow-lg">
              <span className="text-2xl">🎈</span>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bounce rounded-2xl bg-accent px-4 py-2 shadow-lg" style={{ animationDelay: '0.5s' }}>
              <span className="text-2xl">🎁</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-foreground/40" />
      </div>
    </section>
  )
}
