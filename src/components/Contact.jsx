import { useState } from 'react'
import { useTranslation } from '../i18n/LanguageContext'

const N8N_WEBHOOK_URL = 'https://n8n.coding-turtle.org/webhook/3b9e772d-7b9c-4175-87e0-71bb93e3edf7'

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    projectDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formBody = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        projectDetails: formData.projectDetails,
        submittedAt: new Date().toISOString(),
      })

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', serviceType: '', projectDetails: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact-container">
        <div className="contact-form fade-in-up visible">
          <h3>{t('contact.formTitle')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder={t('contact.name')}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.email')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder={t('contact.phone')}
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="">{t('contact.serviceType')}</option>
                <option value="web">{t('contact.serviceType.web')}</option>
                <option value="app">{t('contact.serviceType.app')}</option>
                <option value="consulting">{t('contact.serviceType.consulting')}</option>
                <option value="other">{t('contact.serviceType.other')}</option>
              </select>
            </div>

            <textarea
              name="projectDetails"
              rows="8"
              placeholder={t('contact.projectDetails')}
              value={formData.projectDetails}
              onChange={handleChange}
            ></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '...' : t('contact.submit')}
            </button>

            {submitStatus === 'success' && (
              <p className="form-status success">{t('contact.successMessage')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="form-status error">{t('contact.errorMessage')}</p>
            )}
          </form>
        </div>

        <div className="contact-info-simple fade-in-up visible">
          <p>✉️ info@coding-turtle.org</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
