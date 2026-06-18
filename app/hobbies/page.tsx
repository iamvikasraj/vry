import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import PortfolioFolderIcon from '@/components/PortfolioFolderIcon'

export default function Hobbies() {
  return (
    <div className="page-container">
      <Header />

      <section className="section">
        <div className="page-folder-heading">
          <PortfolioFolderIcon />
          <h1 className="h1">Hobbies</h1>
        </div>
        <p className="body1">Content coming soon.</p>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
