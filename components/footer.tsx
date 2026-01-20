"use client"

import { PartyPopper, Instagram, MessageCircle, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <PartyPopper className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Batuka Animaciones
            </span>
          </div>

          {/* Social Links */}
          <div className="mb-6 flex gap-4">
            <a
              href="https://wa.me/5491136232642"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/animaciones.batuka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white transition-transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Tagline */}
          <p className="mb-4 text-muted-foreground">
            Animaciones infantiles en CABA y Gran Buenos Aires
          </p>

          {/* Disclaimer */}
          <p className="mb-6 max-w-md text-xs text-muted-foreground/70">
            Batuka Animaciones - Servicio de entretenimiento infantil. 
            Precios y disponibilidad sujetos a confirmación.
          </p>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 fill-highlight text-highlight" />
            <span>para que tu fiesta sea inolvidable</span>
          </div>

          <p className="mt-2 text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Batuka Animaciones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
