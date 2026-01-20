"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Settings, X, Download, Upload, Save, Plus, Trash2, 
  Package, Calendar, ImageIcon, Star, HelpCircle, Type,
  Check, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useContent } from '@/lib/content-context'
import { SiteContent, Promo, AvailabilityDay, GalleryImage, Review, FAQ, ADMIN_QUERY_TOKEN } from '@/lib/site-content'
import { cn } from '@/lib/utils'

export function AdminPanel() {
  const { content, updateContent, exportContent, importContent } = useContent()
  const searchParams = useSearchParams()
  const canEdit = searchParams.get('admin') === ADMIN_QUERY_TOKEN
  const [isOpen, setIsOpen] = useState(false)
  const [importText, setImportText] = useState('')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [localContent, setLocalContent] = useState<SiteContent>(content)

  // Hide admin UI from public visitors.
  if (!canEdit) return null

  // Hide admin UI from public visitors.
  if (!canEdit) return null

  const handleOpen = () => {
    setLocalContent(content)
    setIsOpen(true)
  }

  const handleSave = () => {
    updateContent(localContent)
    setSaveMessage('Cambios guardados')
    setTimeout(() => setSaveMessage(null), 2000)
  }

  const handleExport = () => {
    const json = exportContent()
    navigator.clipboard.writeText(json)
    setSaveMessage('JSON copiado al portapapeles')
    setTimeout(() => setSaveMessage(null), 2000)
  }

  const handleImport = () => {
    const success = importContent(importText)
    if (success) {
      setLocalContent(JSON.parse(importText))
      setSaveMessage('Contenido importado correctamente')
      setImportText('')
    } else {
      setSaveMessage('Error: JSON inválido')
    }
    setTimeout(() => setSaveMessage(null), 3000)
  }

  // Hero handlers
  const updateHero = (field: 'headline' | 'subheadline', value: string) => {
    setLocalContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  // Promo handlers
  const updatePromo = (index: number, field: keyof Promo, value: string | string[] | boolean) => {
    setLocalContent(prev => ({
      ...prev,
      promos: prev.promos.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }))
  }

  const addPromo = () => {
    const newPromo: Promo = {
      id: Date.now().toString(),
      name: 'Nuevo Pack',
      duration: '2 horas',
      includes: ['Item 1', 'Item 2'],
      price: 'Consultar',
      popular: false
    }
    setLocalContent(prev => ({
      ...prev,
      promos: [...prev.promos, newPromo]
    }))
  }

  const removePromo = (index: number) => {
    setLocalContent(prev => ({
      ...prev,
      promos: prev.promos.filter((_, i) => i !== index)
    }))
  }

  // Availability handlers
  const updateAvailability = (index: number, status: AvailabilityDay['status']) => {
    setLocalContent(prev => ({
      ...prev,
      availability: prev.availability.map((a, i) => i === index ? { ...a, status } : a)
    }))
  }

  // Gallery handlers
  const updateGalleryItem = (index: number, field: keyof GalleryImage, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      gallery: prev.gallery.map((g, i) => i === index ? { ...g, [field]: value } : g)
    }))
  }

  const addGalleryItem = () => {
    const newItem: GalleryImage = {
      id: Date.now().toString(),
      url: '/placeholder-new.jpg',
      category: 'cumpleanos',
      caption: 'Nueva imagen'
    }
    setLocalContent(prev => ({
      ...prev,
      gallery: [...prev.gallery, newItem]
    }))
  }

  const removeGalleryItem = (index: number) => {
    setLocalContent(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  // Review handlers
  const updateReview = (index: number, field: keyof Review, value: string | number) => {
    setLocalContent(prev => ({
      ...prev,
      reviews: prev.reviews.map((r, i) => i === index ? { ...r, [field]: value } : r)
    }))
  }

  const addReview = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      name: 'Nuevo Cliente',
      neighborhood: 'Barrio',
      rating: 5,
      text: 'Excelente servicio!'
    }
    setLocalContent(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }))
  }

  const removeReview = (index: number) => {
    setLocalContent(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }))
  }

  // FAQ handlers
  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      faq: prev.faq.map((f, i) => i === index ? { ...f, [field]: value } : f)
    }))
  }

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: 'Nueva pregunta?',
      answer: 'Respuesta aquí.'
    }
    setLocalContent(prev => ({
      ...prev,
      faq: [...prev.faq, newFAQ]
    }))
  }

  const removeFAQ = (index: number) => {
    setLocalContent(prev => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }))
  }

  // If the admin token is not present in the URL, hide the editor entirely.
  if (!canEdit) return null

  return (
    <>
      {/* Edit Button (admin-only) */}
      <button
        onClick={handleOpen}
        className="fixed right-4 top-20 z-40 flex items-center gap-2 rounded-lg bg-foreground/90 px-3 py-2 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground"
        aria-label="Abrir panel de edición"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Editar</span>
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-2xl transform overflow-y-auto bg-card shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="text-xl font-bold text-foreground">Panel de Edición</h2>
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1 text-sm',
                saveMessage.includes('Error') 
                  ? 'bg-destructive/20 text-destructive' 
                  : 'bg-accent/20 text-accent'
              )}>
                {saveMessage.includes('Error') ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                {saveMessage}
              </span>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="hero" className="gap-1">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="promos" className="gap-1">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Promos</span>
              </TabsTrigger>
              <TabsTrigger value="availability" className="gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Disp.</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-1">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Fotos</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-1">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Reseñas</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="gap-1">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
            </TabsList>

            {/* Hero Tab */}
            <TabsContent value="hero" className="space-y-4">
              <div className="space-y-2">
                <Label>Título principal</Label>
                <Textarea
                  value={localContent.hero.headline}
                  onChange={(e) => updateHero('headline', e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Textarea
                  value={localContent.hero.subheadline}
                  onChange={(e) => updateHero('subheadline', e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Promos Tab */}
            <TabsContent value="promos" className="space-y-4">
              {localContent.promos.map((promo, index) => (
                <div key={promo.id} className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pack #{index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removePromo(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label>Nombre</Label>
                      <Input
                        value={promo.name}
                        onChange={(e) => updatePromo(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Duración</Label>
                      <Input
                        value={promo.duration}
                        onChange={(e) => updatePromo(index, 'duration', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Incluye (uno por línea)</Label>
                    <Textarea
                      value={promo.includes.join('\n')}
                      onChange={(e) => updatePromo(index, 'includes', e.target.value.split('\n'))}
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label>Precio</Label>
                      <Input
                        value={promo.price}
                        onChange={(e) => updatePromo(index, 'price', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id={`popular-${promo.id}`}
                        checked={promo.popular || false}
                        onChange={(e) => updatePromo(index, 'popular', e.target.checked)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor={`popular-${promo.id}`}>Marcar como Popular</Label>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addPromo} variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Pack
              </Button>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cambiá el estado de cada día. Los cambios se guardan automáticamente.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {localContent.availability.map((day, index) => {
                  const date = new Date(day.date + 'T12:00:00')
                  const formatted = date.toLocaleDateString('es-AR', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  })
                  return (
                    <div key={day.date} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span className="font-medium">{formatted}</span>
                      <Select
                        value={day.status}
                        onValueChange={(value) => updateAvailability(index, value as AvailabilityDay['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Disponible</SelectItem>
                          <SelectItem value="limited">Limitado</SelectItem>
                          <SelectItem value="full">Completo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-4">
              {localContent.gallery.map((image, index) => (
                <div key={image.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Caption"
                      value={image.caption}
                      onChange={(e) => updateGalleryItem(index, 'caption', e.target.value)}
                    />
                    <Select
                      value={image.category}
                      onValueChange={(value) => updateGalleryItem(index, 'category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                        <SelectItem value="shows">Shows</SelectItem>
                        <SelectItem value="personajes">Personajes</SelectItem>
                        <SelectItem value="juegos">Juegos</SelectItem>
                        <SelectItem value="decoracion">Decoración</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeGalleryItem(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button onClick={addGalleryItem} variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Imagen
              </Button>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              {localContent.reviews.map((review, index) => (
                <div key={review.id} className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Reseña #{index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeReview(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label>Nombre</Label>
                      <Input
                        value={review.name}
                        onChange={(e) => updateReview(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Barrio</Label>
                      <Input
                        value={review.neighborhood || ''}
                        onChange={(e) => updateReview(index, 'neighborhood', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Texto</Label>
                    <Textarea
                      value={review.text}
                      onChange={(e) => updateReview(index, 'text', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addReview} variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Reseña
              </Button>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-4">
              {localContent.faq.map((item, index) => (
                <div key={item.id} className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pregunta #{index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFAQ(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label>Pregunta</Label>
                    <Input
                      value={item.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Respuesta</Label>
                    <Textarea
                      value={item.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addFAQ} variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Pregunta
              </Button>
            </TabsContent>
          </Tabs>

          {/* Import/Export */}
          <div className="mt-8 space-y-4 rounded-lg border border-border p-4">
            <h3 className="font-semibold">Importar / Exportar</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleExport} variant="outline" size="sm" className="bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Exportar JSON
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Importar JSON</Label>
              <Textarea
                placeholder="Pegá tu JSON aquí..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={4}
              />
              <Button 
                onClick={handleImport} 
                variant="outline" 
                size="sm" 
                disabled={!importText}
                className="bg-transparent"
              >
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-border bg-card px-6 py-4">
          <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground">
            <Save className="mr-2 h-5 w-5" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </>
  )
}
