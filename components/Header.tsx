'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
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
        <Link href="/" className="logo">
          Vikas Raj Yadav
        </Link>
        <nav className="main-nav">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
