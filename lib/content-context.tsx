"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteContent, defaultSiteContent } from './site-content'

interface ContentContextType {
  content: SiteContent
  updateContent: (newContent: SiteContent) => void
  selectedPackage: string | null
  setSelectedPackage: (pkg: string | null) => void
  exportContent: () => string
  importContent: (json: string) => boolean
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const STORAGE_KEY = 'batuka-site-content'

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setContent(parsed)
      } catch {
        console.error('Failed to parse stored content')
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever content changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    }
  }, [content, isHydrated])

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent)
  }

  const exportContent = () => {
    return JSON.stringify(content, null, 2)
  }

  const importContent = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json)
      // Basic validation
      if (parsed.hero && parsed.promos && parsed.gallery && parsed.reviews && parsed.faq) {
        setContent(parsed)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      selectedPackage, 
      setSelectedPackage,
      exportContent,
      importContent
    }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
