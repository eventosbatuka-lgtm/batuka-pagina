"use client"

import React from "react"

import { useState } from 'react'
import { MessageCircle, Instagram, Send, Check, Loader2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useContent } from '@/lib/content-context'

const zones = [
  'CABA - Palermo',
  'CABA - Belgrano',
  'CABA - Recoleta',
  'CABA - Caballito',
  'CABA - Villa Urquiza',
  'CABA - Otros',
  'Zona Norte',
  'Zona Sur',
  'Zona Oeste',
  'Otra zona',
]

interface FormData {
  name: string
  phone: string
  eventDate: string
  zone: string
  kidsCount: string
  selectedPackage: string
  message: string
}

export function ContactSection() {
  const { content, selectedPackage } = useContent()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    eventDate: '',
    zone: '',
    kidsCount: '',
    selectedPackage: selectedPackage || '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleWhatsAppSubmit = () => {
    const selectedPromo = content.promos.find(p => p.id === formData.selectedPackage)
    
    let message = `Hola Batuka! Soy ${formData.name || '[nombre]'}.`
    
    if (formData.eventDate) {
      message += ` Quería consultar disponibilidad para el ${formData.eventDate}`
    }
    if (formData.zone) {
      message += ` en ${formData.zone}`
    }
    message += '.'
    
    if (selectedPromo) {
      message += ` Me interesa el pack: ${selectedPromo.name}.`
    }
    
    if (formData.kidsCount) {
      message += ` Serían aproximadamente ${formData.kidsCount} niños.`
    }
    
    if (formData.message) {
      message += ` ${formData.message}`
    }
    
    message += ' ¿Me pasan info y precio? 🎉'
    
    window.open(`https://wa.me/5491136232642?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="contacto" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-foreground">
            Contacto
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Hacé tu consulta
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Completá el formulario o escribinos directo por WhatsApp
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - CTAs */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              La forma más rápida: WhatsApp
            </h3>
            <p className="mb-6 text-muted-foreground">
              Te respondemos en minutos. Escribinos y te pasamos toda la info que necesités.
            </p>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribir por WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://instagram.com/animaciones.batuka', '_blank')}
                className="w-full bg-transparent sm:w-auto"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Seguinos en Instagram
              </Button>
            </div>

            <div className="mt-8 rounded-xl bg-secondary/50 p-6">
              <h4 className="mb-2 font-semibold text-foreground">
                Horarios de atención
              </h4>
              <p className="text-sm text-muted-foreground">
                Lunes a Viernes: 9:00 - 20:00<br />
                Sábados: 9:00 - 14:00
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-2xl bg-card p-6 shadow-xl md:p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  Datos guardados
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Ahora enviá tu consulta por WhatsApp para que te respondamos
                </p>
                <Button
                  size="lg"
                  onClick={handleWhatsAppSubmit}
                  className="bg-[#25D366] text-white hover:bg-[#25D366]/90"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Enviar a WhatsApp
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="11 1234 5678"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Fecha del evento</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleChange('eventDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zone">Zona</Label>
                    <Select
                      value={formData.zone}
                      onValueChange={(value) => handleChange('zone', value)}
                    >
                      <SelectTrigger id="zone">
                        <SelectValue placeholder="Seleccioná zona" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="kidsCount">Cantidad de niños (aprox)</Label>
                    <Input
                      id="kidsCount"
                      type="number"
                      placeholder="10"
                      value={formData.kidsCount}
                      onChange={(e) => handleChange('kidsCount', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Pack de interés</Label>
                    <Select
                      value={formData.selectedPackage}
                      onValueChange={(value) => handleChange('selectedPackage', value)}
                    >
                      <SelectTrigger id="package">
                        <SelectValue placeholder="Seleccioná un pack" />
                      </SelectTrigger>
                      <SelectContent>
                        {content.promos.map((promo) => (
                          <SelectItem key={promo.id} value={promo.id}>
                            {promo.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje (opcional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Contanos más sobre tu evento..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Guardar y continuar a WhatsApp
                    </>
                  )}
                </Button>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  Tus datos están seguros. No compartimos tu información.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
