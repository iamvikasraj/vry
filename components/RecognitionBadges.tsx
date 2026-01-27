'use client'

export default function RecognitionBadges() {
  const recognitions = [
    {
      title: 'Rive Ambassador',
      description: 'Recognized expert in Rive animation',
      icon: '🎨',
    },
    {
      title: 'Play Ambassador',
      description: 'Community leader in Play prototyping',
      icon: '⚡',
    },
    {
      title: 'Staff Level',
      description: 'Senior design technologist at Loop Health',
      icon: '🚀',
    },
  ]

  return (
    <section className="recognition-section">
      <div className="recognition-grid">
        {recognitions.map((recognition, index) => (
          <div key={index} className="recognition-badge">
            <div className="recognition-icon">{recognition.icon}</div>
            <div className="recognition-content">
              <h3 className="recognition-title">{recognition.title}</h3>
              <p className="recognition-description">{recognition.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
