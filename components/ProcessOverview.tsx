'use client'

export default function ProcessOverview() {
  const processSteps = [
    {
      title: 'Research',
      tagline: 'Understand first.',
      description: 'Before designing, I ensure we\'re asking the right questions and solving the right problems. This includes user research, market analysis, competitive insights, and exploring possible solutions.',
    },
    {
      title: 'Design',
      tagline: 'Craft experiences.',
      description: 'At the end of this phase, you\'ll have pixel-perfect designs for your product. I create prototypes and interactions that simulate the final experience before development begins.',
    },
    {
      title: 'Build',
      tagline: 'Ship with code.',
      description: 'As a designer who codes, I work closely with developers throughout the process. For web and mobile projects, I handle front-end development to bring designs to life.',
    },
    {
      title: 'Refine',
      tagline: 'Iterate & improve.',
      description: 'Complete transparency through regular check-ins. After initial designs, I conduct user testing and gather feedback to ensure the best possible solutions for your users.',
    },
  ]

  return (
    <section className="process-section">
      <div className="process-content">
        <h2 className="process-title">How I work</h2>
        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-step-header">
                <div className="process-step-text">
                  <h4 className="process-step-title">{step.title}</h4>
                  <p className="process-step-tagline">{step.tagline}</p>
                </div>
              </div>
              <p className="process-step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
