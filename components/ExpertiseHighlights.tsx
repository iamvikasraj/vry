'use client'

export default function ExpertiseHighlights() {
  // Horizontal bar (breadth) - Core design skills
  const breadthSkills = [
    { name: 'Product Design', level: 'Expert' },
    { name: 'Interaction Design', level: 'Expert' },
    { name: 'Prototyping', level: 'Expert' },
    { name: 'Design Engineering', level: 'Expert' },
  ]

  // Vertical stem (depth) - Technical tools/platforms
  const depthSkills = [
    { name: 'SwiftUI', level: 'Intermediate' },
    { name: 'Play App', level: 'Expert' },
    { name: 'Rive App', level: 'Expert' },
    { name: 'Three.js', level: 'Beginner' },
  ]

  return (
    <section className="expertise-section">
      <div className="expertise-t-shape">
        {/* Horizontal bar - Breadth */}
        <div className="expertise-breadth">
          {breadthSkills.map((area, index) => {
            const levelClass = area.level.toLowerCase().replace(/\s+/g, '-')
            return (
              <div key={`breadth-${area.name}-${index}`} className="expertise-cell">
                <div className="expertise-name">{area.name}</div>
                <div className={`expertise-level expertise-level-${levelClass}`}>{area.level}</div>
              </div>
            )
          })}
        </div>

        {/* Vertical stem - Depth */}
        <div className="expertise-depth">
          {depthSkills.map((area, index) => {
            const levelClass = area.level.toLowerCase().replace(/\s+/g, '-')
            return (
              <div key={`depth-${area.name}-${index}`} className="expertise-cell">
                <div className="expertise-name">{area.name}</div>
                <div className={`expertise-level expertise-level-${levelClass}`}>{area.level}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
