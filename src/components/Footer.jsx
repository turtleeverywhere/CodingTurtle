import { useTranslation } from '../i18n/LanguageContext'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <p>{t('footer.copyright')}</p>
      <a href="/impressum" className="footer-link">{t('footer.impressum')}</a>
      <a href="https://www.flying-turtle.de" target="_blank" rel="noopener noreferrer" className="footer-link">Flying Turtle</a>
    </footer>
  )
}

export default Footer
