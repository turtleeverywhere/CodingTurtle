import { useTranslation } from '../i18n/LanguageContext'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <p>{t('footer.copyright')}</p>
      <a href="/impressum" className="footer-link">{t('footer.impressum')}</a>
    </footer>
  )
}

export default Footer
