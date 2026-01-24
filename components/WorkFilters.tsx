'use client'

interface WorkFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function WorkFilters({ activeFilter, onFilterChange }: WorkFiltersProps) {
  const filters = [
    'All',
    'Live Projects',
    'Rive',
  ]

  return (
    <nav className="work-filters">
      <div className="filters-container">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`filter-link ${activeFilter === filter ? 'active' : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </nav>
  )
}
