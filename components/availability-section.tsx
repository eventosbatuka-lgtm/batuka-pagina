"use client"

import { Calendar, MessageCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'
import { cn } from '@/lib/utils'

const statusConfig = {
  available: {
    label: 'Disponible',
    className: 'bg-available/20 text-available border-available/30',
    dotClass: 'bg-available'
  },
  limited: {
    label: 'Limitado',
    className: 'bg-limited/20 text-limited border-limited/30',
    dotClass: 'bg-limited'
  },
  full: {
    label: 'Completo',
    className: 'bg-full/20 text-full border-full/30',
    dotClass: 'bg-full'
  }
}

function formatDate(dateStr: string): { day: string; weekday: string; month: string } {
  const date = new Date(dateStr + 'T12:00:00')
  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  return {
    day: date.getDate().toString(),
    weekday: weekdays[date.getDay()],
    month: months[date.getMonth()]
  }
}

export function AvailabilitySection() {
  const { content } = useContent()

  const handleCheckAvailability = () => {
    const message = encodeURIComponent(
      "Hola Batuka! Quería consultar disponibilidad para una fecha. ¿Me pueden confirmar? 🎉"
    )
    window.open(`https://wa.me/5491136232642?text=${message}`, '_blank')
  }

  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-foreground">
            <Calendar className="h-4 w-4" />
            Disponibilidad
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Fechas disponibles
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Mirá nuestra disponibilidad para los próximos días
          </p>
        </div>

        {/* Availability Strip */}
        <div className="mb-6 overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max px-2">
            {content.availability.map((day) => {
              const { day: dayNum, weekday, month } = formatDate(day.date)
              const config = statusConfig[day.status]
              
              return (
                <div
                  key={day.date}
                  className={cn(
                    'flex flex-col items-center rounded-xl border-2 p-3 transition-all hover:scale-105',
                    config.className
                  )}
                >
                  <span className="text-xs font-medium uppercase opacity-70">{weekday}</span>
                  <span className="text-2xl font-bold">{dayNum}</span>
                  <span className="text-xs opacity-70">{month}</span>
                  <div className={cn('mt-2 h-2 w-2 rounded-full', config.dotClass)} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={cn('h-3 w-3 rounded-full', config.dotClass)} />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer & CTA */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <AlertCircle className="h-4 w-4" />
            Disponibilidad aproximada. Confirmá por WhatsApp.
          </div>
          <div>
            <Button
              size="lg"
              onClick={handleCheckAvailability}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar disponibilidad
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
