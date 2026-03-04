import { useTranslation } from '../i18n/LanguageContext'

function Services() {
  const { t } = useTranslation()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="services-section" id="services">
      <div className="section">
        <h2>{t('services.title')}</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-card-icon">🌐</div>
            <div className="service-card-body">
              <h3>
                {t('services.web.title')}
                <span className="service-subtitle">{t('services.web.subtitle')}</span>
              </h3>
              <p>{t('services.web.desc')}</p>
              <a
                href="#contact"
                className="service-cta"
                onClick={(e) => { e.preventDefault(); scrollToContact() }}
              >
                {t('services.web.cta')} <span>→</span>
              </a>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card-icon">📱</div>
            <div className="service-card-body">
              <h3>
                {t('services.app.title')}
                <span className="service-subtitle">{t('services.app.subtitle')}</span>
              </h3>
              <p>{t('services.app.desc')}</p>
              <a
                href="#contact"
                className="service-cta"
                onClick={(e) => { e.preventDefault(); scrollToContact() }}
              >
                {t('services.app.cta')} <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
