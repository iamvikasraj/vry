'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'

export default function Work() {
  const workExperiences = [
    { company: 'Loop Health', period: '2025-Present' },
    { company: 'ET Money', period: '2024-2024' },
    { company: 'Time Bridge', period: '2022-2024' },
    { company: 'HDFC', period: '2021-2022' },
    { company: 'Paytm', period: '2018-2021' },
    { company: 'Grappus', period: '2017-2018' },
    { company: 'ProProfs', period: '2016-2017' },
    { company: 'Startup', period: '2015-2016' },
  ]

  return (
    <div className="page-container">
      <Header />

      <section className="work-page">
        <div className="work-content">
          <div className="work-description">
            <p>
              Right now, I'm building at <strong>Loop Health</strong> (YC 20) as a Staff Product Designer and Technologist, working at the intersection of design, engineering and business.
            </p>
            <p>
              Before that, I led design teams at <strong>ETMoney, HDFC Bank, and Paytm</strong>, shaping products used by millions. My work spans FinTech interfaces, scalable design systems, and cross-platform experiences, with particular focus on motion and interaction detail.
            </p>
            <p>
              As a product designer, I get energy from the technical parts of my process like prototyping, motion design, and design systems. At the same time, I believe that designers should be well-rounded and comfortable wearing many hats. I get excited about diving into new industries and think that doing so has helped me bring fresh ideas to my work. I'm currently interested in exploring artificial intelligence, human knowledge, and interaction design. I like working on small, convicted teams that move fast and believe in the importance of craft.
            </p>
          </div>

          <div className="work-timeline">
            {workExperiences.map((work, index) => (
              <div key={index} className="work-item-timeline">
                <div className="work-company">{work.company}</div>
                <div className="work-period">{work.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
