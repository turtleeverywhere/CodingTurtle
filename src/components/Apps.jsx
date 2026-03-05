import { useTranslation } from '../i18n/LanguageContext'

const APP_DATA = [
  { key: 'roadtrip', image: '/images/roadtrip.jpg', appStore: null },
  { key: 'cooked', image: '/images/cooked.jpg', appStore: null },
  { key: 'flyingbroom', image: '/images/flyingbroom.jpg', appStore: null },
  { key: 'grabandgo', image: '/images/grabandgo.jpg', appStore: 'https://apps.apple.com/app/grab-go/id6738431717' },
  { key: 'healthclaw', image: '/images/healthclaw.jpg', appStore: null },
  { key: 'localgpt', image: null, appStore: 'https://apps.apple.com/app/localgpt-offline-chatbot/id6749968509' },
]

function Apps() {
  const { t } = useTranslation()

  return (
    <section className="apps-section" id="apps">
      <div className="section">
        <h2>{t('apps.title')}</h2>
        <p className="apps-subtitle">{t('apps.subtitle')}</p>
        <div className="apps-showcase">
          {APP_DATA.map((app, index) => {
            const imageLeft = index % 2 === 0

            return (
              <div
                className={`app-showcase-item ${imageLeft ? 'image-left' : 'image-right'}`}
                key={app.key}
              >
                <div className="app-showcase-phone">
                  {app.image ? (
                    <img src={app.image} alt={t(`apps.${app.key}.name`)} />
                  ) : (
                    <div className="app-showcase-placeholder">📱</div>
                  )}
                </div>
                <div className="app-showcase-info">
                  <h3>{t(`apps.${app.key}.name`)}</h3>
                  <span className="app-tagline">{t(`apps.${app.key}.tagline`)}</span>
                  <p>{t(`apps.${app.key}.desc`)}</p>
                  {app.appStore && (
                    <a href={app.appStore} target="_blank" rel="noopener noreferrer" className="app-store-badge">
                      <img src="/images/app-store-badge.svg" alt="Download on the App Store" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Apps
