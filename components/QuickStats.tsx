export default function QuickStats() {
  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '5M+', label: 'Users Designed For' },
    { number: '4', label: 'Major Companies' },
    { number: '2', label: 'Ambassador Programs' },
  ]

  return (
    <section className="quick-stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
