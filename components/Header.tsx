'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [lastModified, setLastModified] = useState('')

  useEffect(() => {
    const lastModifiedDate = document.lastModified
    const date = new Date(lastModifiedDate)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setLastModified(formattedDate)
  }, [])

  return (
    <header className="page-header">
      <div className="header-content">
        <Link href="/" className={`logo ${pathname === '/' ? 'active' : ''}`}>
          vry
        </Link>
        <nav className="main-nav">
          <Link href="/work" className={pathname === '/work' || pathname?.startsWith('/projects/') ? 'active' : ''}>
            <span className="nav-full">Work</span>
            <span className="nav-short">wo</span>
          </Link>
          <Link href="/workshops" className={pathname === '/workshops' ? 'active' : ''}>
            <span className="nav-full">Workshops</span>
            <span className="nav-short">ws</span>
          </Link>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
            <span className="nav-full">About</span>
            <span className="nav-short">ab</span>
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
            <span className="nav-full">Contact</span>
            <span className="nav-short">co</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
