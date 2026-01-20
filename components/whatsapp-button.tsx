"use client"

import { MessageCircle } from 'lucide-react'
import { useContent } from '@/lib/content-context'

export function WhatsAppButton() {
  const { selectedPackage, content } = useContent()

  const handleClick = () => {
    let message = "Hola Batuka! Quería consultar disponibilidad y precios"
    
    if (selectedPackage) {
      const promo = content.promos.find(p => p.id === selectedPackage)
      if (promo) {
        message = `Hola Batuka! Me interesa el pack: ${promo.name}. ¿Me pasan info y precio? 🎉`
      }
    } else {
      message += " para una fiesta infantil. ¿Me pasan info? 🎉"
    }

    window.open(`https://wa.me/5491136232642?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="cta-pulse fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </button>
  )
}
