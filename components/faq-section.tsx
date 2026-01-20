"use client"

import { HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useContent } from '@/lib/content-context'

export function FAQSection() {
  const { content } = useContent()

  return (
    <section id="faq" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-info/20 px-4 py-1.5 text-sm font-medium text-foreground">
            <HelpCircle className="h-4 w-4" />
            Preguntas Frecuentes
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Dudas comunes
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Respondemos las preguntas más frecuentes
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {content.faq.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="overflow-hidden rounded-xl border-none bg-card shadow-md"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline [&[data-state=open]]:bg-primary/10">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
