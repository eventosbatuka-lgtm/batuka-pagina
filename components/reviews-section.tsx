"use client"

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'
import { cn } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating
              ? 'fill-primary text-primary'
              : 'fill-muted text-muted'
          )}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const { content } = useContent()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, content.reviews.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % content.reviews.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + content.reviews.length) % content.reviews.length)
  }

  return (
    <section id="resenas" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            Reseñas
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Lo que dicen las familias
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Más de 200 familias confiaron en nosotros para sus fiestas
          </p>
        </div>

        {/* Carousel for mobile */}
        <div className="relative mb-12 md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {content.reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <Card className="h-full border-none bg-card shadow-lg">
                    <CardContent className="p-6">
                      <Quote className="mb-4 h-8 w-8 text-primary/30" />
                      <StarRating rating={review.rating} />
                      <p className="mb-4 mt-3 text-foreground">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        {review.neighborhood && (
                          <p className="text-muted-foreground">{review.neighborhood}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-10 w-10 rounded-full bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {content.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentSlide(index)
                  }}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    index === currentSlide
                      ? 'w-6 bg-primary'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-10 w-10 rounded-full bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Grid for desktop */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {content.reviews.slice(0, 6).map((review) => (
            <Card key={review.id} className="border-none bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <StarRating rating={review.rating} />
                <p className="mb-4 mt-3 text-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  {review.neighborhood && (
                    <p className="text-muted-foreground">{review.neighborhood}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show more reviews indicator */}
        {content.reviews.length > 6 && (
          <div className="mt-8 hidden text-center text-sm text-muted-foreground md:block">
            Y {content.reviews.length - 6} reseñas más...
          </div>
        )}
      </div>
    </section>
  )
}
