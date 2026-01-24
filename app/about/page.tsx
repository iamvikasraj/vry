'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'

export default function About() {
  return (
    <div className="page-container">
      <Header />

      <section className="about-intro">
        <div className="about-text">
          <p className="about-intro-short">
            Hi, I'm <strong>Vikas Raj Yadav</strong>—a <strong>design</strong>er and engineer with <strong>10+ years</strong> of experience based in <strong>Bengaluru</strong>, India. Currently at <strong>Loop Health</strong> (YC 20) as a <strong>Staff Product Designer and Technologist</strong>.
          </p>
          
          <div className="about-intro-expanded">
            <p>
              Right now, I'm building at <strong>Loop Health</strong> (YC 20) as a Staff Product Designer and Technologist, working at the intersection of design, engineering and business. Finding workflows to build digital products efficiently.
            </p>
            <p>
              Before that, I led design teams at <strong>ETMoney, HDFC Bank, and Paytm</strong>, shaping products used by millions. My work spans FinTech interfaces, scalable design systems, and cross-platform experiences, with particular focus on motion and interaction detail.
            </p>
            <p>
              As one of the <strong>Rive and Play ambassadors from India</strong>, I champion the future of interactive design. I'm currently exploring designing and prototyping through code—especially with <strong>SwiftUI for mobile</strong>—pushing my craft beyond traditional design tools.
            </p>
            <p>
              As a product designer, I get energy from the technical parts of my process like prototyping, motion design, and design systems. At the same time, I believe that designers should be well-rounded and comfortable wearing many hats. I get excited about diving into new industries and think that doing so has helped me bring fresh ideas to my work. I'm currently interested in exploring artificial intelligence, human knowledge, and interaction design. I like working on small, convicted teams that move fast and believe in the importance of craft.
            </p>
            <p>
              My love for craft is visible as I share my interaction experiments on my socials.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
