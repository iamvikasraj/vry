import HomeDeLayout from '@/components/HomeDeLayout'
import EmployerThumbGridSection from '@/components/EmployerThumbGridSection'

export default function LiveProjectsPage() {
  return (
    <HomeDeLayout>
      <section id="work" className="home-de-work home-de-work--only">
        <EmployerThumbGridSection />
      </section>
    </HomeDeLayout>
  )
}
