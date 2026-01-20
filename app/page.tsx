import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { PromosSection } from '@/components/promos-section'
import { AvailabilitySection } from '@/components/availability-section'
import { GallerySection } from '@/components/gallery-section'
import { ReviewsSection } from '@/components/reviews-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { AdminPanel } from '@/components/admin-panel'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PromosSection />
      <AvailabilitySection />
      <HowItWorksSection />
      <GallerySection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      {/* Admin-only edit panel (appears only with ?admin=TOKEN)
          Wrapped in Suspense to satisfy Next.js App Router requirements when
          using client hooks like useSearchParams in nested components. */}
      <Suspense fallback={null}>
        <AdminPanel />
      </Suspense>
    </main>
  )
}
