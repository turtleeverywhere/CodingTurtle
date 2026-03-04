import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

const isBrowser = typeof window !== 'undefined'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isBrowser && isHydrated) {
      localStorage.setItem('language', language)
      document.documentElement.lang = language
    }
  }, [language, isHydrated])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en')
  }

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      language: 'en',
      toggleLanguage: () => {},
      t: (key) => translations.en?.[key] || key
    }
  }
  return context
}
