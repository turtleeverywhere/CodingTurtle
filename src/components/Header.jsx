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
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'Deutsch' : 'English'}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Header
