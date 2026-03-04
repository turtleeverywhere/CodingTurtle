import { useTranslation } from '../i18n/LanguageContext'

const APP_ICONS = {
  cooked: '🍳',
  flyingbroom: '🧹',
  roadtrip: '🗺️',
  grabandgo: '🛒',
  healthclaw: '❤️',
}

const APP_KEYS = ['cooked', 'flyingbroom', 'roadtrip', 'grabandgo', 'healthclaw']

function Apps() {
  const { t } = useTranslation()

  return (
    <section className="apps-section" id="apps">
      <div className="section">
      <h2>{t('apps.title')}</h2>
      <p className="apps-subtitle">{t('apps.subtitle')}</p>
      <div className="apps-grid">
        {APP_KEYS.map((key) => (
          <div className="app-card" key={key}>
            <div className="app-icon">{APP_ICONS[key]}</div>
            <div className="app-card-content">
              <h3>{t(`apps.${key}.name`)}</h3>
              <span className="app-tagline">{t(`apps.${key}.tagline`)}</span>
              <p>{t(`apps.${key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Apps
