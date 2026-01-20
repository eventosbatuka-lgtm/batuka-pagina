"use client"

import { CalendarSearch, Package, PartyPopper } from 'lucide-react'

const steps = [
  {
    icon: CalendarSearch,
    title: "Consultás fecha y zona",
    description: "Escribinos por WhatsApp con la fecha de tu evento y la zona. Te respondemos rápido.",
    color: "bg-primary text-primary-foreground"
  },
  {
    icon: Package,
    title: "Elegís tu promo",
    description: "Te pasamos las opciones disponibles y elegís el pack que mejor se adapte a tu fiesta.",
    color: "bg-accent text-accent-foreground"
  },
  {
    icon: PartyPopper,
    title: "Batuka llega y se arma la fiesta 🎈",
    description: "El día del evento llegamos con toda la energía para hacer que los chicos la pasen increíble.",
    color: "bg-highlight text-highlight-foreground"
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-foreground">
            Súper fácil
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            En 3 simples pasos tenés tu fiesta organizada
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-card text-sm font-bold shadow-md md:relative md:top-0 md:mb-4">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`mb-4 mt-8 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} shadow-lg transition-transform hover:scale-110 md:mt-0`}>
                  <step.icon className="h-10 w-10" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
