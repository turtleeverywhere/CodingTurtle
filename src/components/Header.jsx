import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n/LanguageContext'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useTranslation()
  const headerRef = useRef(null)

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header id="header" className={isScrolled ? 'scrolled' : ''} ref={headerRef}>
        <div className="header-container">
          <a href="/" className="logo">CODING TURTLE</a>
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <nav>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>{t('nav.home')}</a></li>
              <li><a href="#apps" onClick={(e) => { e.preventDefault(); scrollToSection('apps') }}>{t('nav.apps')}</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>{t('nav.services')}</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{t('nav.contact')}</a></li>
              <li>
                <a href="https://discord.gg/UtFxQbAEP3" target="_blank" rel="noopener noreferrer" className="discord-btn">
                  <svg width="20" height="15" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1 58.4 58.4 0 00-14.7 4.6.2.2 0 00-.1.1C1.5 18.7-.9 32 .3 45.2v.1a58.9 58.9 0 0018 9.1.2.2 0 00.3-.1 42.2 42.2 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.7.2.2 0 01 0-.4c.4-.3.7-.6 1.1-.9a.2.2 0 01.2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 01.2 0c.4.3.7.6 1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.6.2.2 0 00-.1.3 47.4 47.4 0 003.6 5.9.2.2 0 00.3.1 58.7 58.7 0 0018-9.1v-.1c1.4-15-2.3-28-9.8-39.6a.2.2 0 00-.1-.1zM23.7 37.1c-3.4 0-6.2-3.1-6.2-7s2.7-7 6.2-7 6.3 3.2 6.2 7-2.8 7-6.2 7zm23 0c-3.4 0-6.2-3.1-6.2-7s2.7-7 6.2-7 6.3 3.2 6.2 7-2.8 7-6.2 7z" fill="currentColor"/>
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <button className="language-toggle" onClick={toggleLanguage}>
                  {language === 'en' ? 'DE' : 'EN'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <nav className={`mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button className="mobile-drawer-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">✕</button>
        </div>
        <ul className="mobile-drawer-nav">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>{t('nav.home')}</a></li>
          <li><a href="#apps" onClick={(e) => { e.preventDefault(); scrollToSection('apps') }}>{t('nav.apps')}</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>{t('nav.services')}</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{t('nav.contact')}</a></li>
        </ul>
        <div className="mobile-drawer-footer">
          <a href="https://discord.gg/UtFxQbAEP3" target="_blank" rel="noopener noreferrer" className="discord-btn mobile-discord-btn">
            <svg width="20" height="15" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1 58.4 58.4 0 00-14.7 4.6.2.2 0 00-.1.1C1.5 18.7-.9 32 .3 45.2v.1a58.9 58.9 0 0018 9.1.2.2 0 00.3-.1 42.2 42.2 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.7.2.2 0 01 0-.4c.4-.3.7-.6 1.1-.9a.2.2 0 01.2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 01.2 0c.4.3.7.6 1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.6.2.2 0 00-.1.3 47.4 47.4 0 003.6 5.9.2.2 0 00.3.1 58.7 58.7 0 0018-9.1v-.1c1.4-15-2.3-28-9.8-39.6a.2.2 0 00-.1-.1zM23.7 37.1c-3.4 0-6.2-3.1-6.2-7s2.7-7 6.2-7 6.3 3.2 6.2 7-2.8 7-6.2 7zm23 0c-3.4 0-6.2-3.1-6.2-7s2.7-7 6.2-7 6.3 3.2 6.2 7-2.8 7-6.2 7z" fill="currentColor"/>
            </svg>
            Discord
          </a>
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'Deutsch' : 'English'}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Header
