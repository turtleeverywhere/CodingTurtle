import { LanguageProvider } from '../src/i18n/LanguageContext'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Loading from '../src/components/Loading'
import '../src/index.css'

export default function Layout({ children }) {
  return (
    <LanguageProvider>
      <Loading />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  )
}
