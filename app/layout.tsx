import React from "react"
import type { Metadata, Viewport } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContentProvider } from '@/lib/content-context'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito'
});
const nunitoSans = Nunito_Sans({ 
  subsets: ["latin"],
  variable: '--font-nunito-sans'
});

export const metadata: Metadata = {
  title: 'Batuka Animaciones | Animaciones Infantiles en Argentina',
  description: 'Animaciones infantiles profesionales para cumpleaños y eventos. Shows de magia, personajes, juegos y mucha diversión. CABA y GBA.',
  keywords: ['animaciones infantiles', 'cumpleaños infantiles', 'fiestas para niños', 'animadores', 'Argentina', 'Buenos Aires'],
  openGraph: {
    title: 'Batuka Animaciones | Animaciones Infantiles',
    description: 'Hacemos explotar la fiesta con animaciones infantiles profesionales',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#E5FF00',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body className="font-sans antialiased">
        <ContentProvider>
          {children}
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  )
}
