import { useTranslation } from '../../src/i18n/LanguageContext'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div className="service-page">
      <section className="section" style={{ paddingTop: '120px' }}>
        <a href="/" className="back-link">{t('impressum.backHome')}</a>

        <h1>{t('impressum.title')}</h1>

        <div className="impressum-content">
          <h2>{t('impressum.info')}</h2>
          <p>
            Coding Turtle<br />
            Lars Grof<br />
            51105 Köln
          </p>

          <h2>{t('impressum.contact')}</h2>
          <p>
            E-Mail: info@coding-turtle.org
          </p>

          <h2>{t('impressum.responsible')}</h2>
          <p>Lars Grof</p>
        </div>
      </section>
    </div>
  )
}
