"use client"

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'shows', label: 'Shows' },
  { id: 'personajes', label: 'Personajes' },
  { id: 'juegos', label: 'Juegos' },
  { id: 'decoracion', label: 'Decoración' },
]

export function GallerySection() {
  const { content } = useContent()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = activeCategory === 'all'
    ? content.gallery
    : content.gallery.filter(img => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }
  
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  return (
    <section id="fotos" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-highlight/20 px-4 py-1.5 text-sm font-medium text-foreground">
            <Camera className="h-4 w-4" />
            Galería
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Momentos que brillan
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Mirá algunas fotos de nuestros eventos
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'rounded-full transition-all',
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent hover:bg-primary/20'
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Placeholder image */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-accent/20 to-highlight/20">
                <div className="text-center">
                  <div className="text-4xl">📸</div>
                  <p className="mt-2 px-2 text-xs text-muted-foreground">{image.caption}</p>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <p className="p-4 text-sm font-medium text-card">{image.caption}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-card/20 p-2 text-card transition-colors hover:bg-card/40"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 rounded-full bg-card/20 p-2 text-card transition-colors hover:bg-card/40"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 rounded-full bg-card/20 p-2 text-card transition-colors hover:bg-card/40"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <div className="max-h-[80vh] max-w-4xl overflow-hidden rounded-xl bg-card">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 via-accent/20 to-highlight/20 p-8">
                <div className="text-center">
                  <div className="text-8xl">📸</div>
                  <p className="mt-4 text-lg font-medium text-foreground">
                    {filteredImages[lightboxIndex]?.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/20 px-4 py-2 text-sm text-card">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
