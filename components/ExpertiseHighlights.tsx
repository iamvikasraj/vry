'use client'

export default function ExpertiseHighlights() {
  const expertiseAreas = [
    { name: 'Product Design', level: 'Expert' },
    { name: 'Interaction Design', level: 'Expert' },
    { name: 'Prototyping', level: 'Expert' },
    { name: 'Design Engineering', level: 'Expert' },
    { name: 'SwiftUI', level: 'Intermediate' },
    { name: 'Play App', level: 'Expert' },
    { name: 'Rive App', level: 'Expert' },
    { name: 'Three.js', level: 'Beginner' },
  ]

  return (
    <section className="expertise-section">
      <div className="expertise-grid">
        {expertiseAreas.map((area, index) => {
          const levelClass = area.level.toLowerCase().replace(/\s+/g, '-')
          return (
            <div key={`${area.name}-${area.level}-${index}`} className="expertise-cell">
              <div className="expertise-name">{area.name}</div>
              <div className={`expertise-level expertise-level-${levelClass}`}>{area.level}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
