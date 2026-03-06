import { useTranslation } from '../i18n/LanguageContext'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <p>{t('footer.copyright')}</p>
      <a href="/impressum" className="footer-link">{t('footer.impressum')}</a>
      <a href="https://www.flying-turtle.de" target="_blank" rel="noopener noreferrer" className="footer-link">Flying Turtle</a>
      <a href="https://discord.gg/UtFxQbAEP3" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a>
    </footer>
  )
}

export default Footer
