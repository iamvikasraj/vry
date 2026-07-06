'use client'

import { useEffect } from 'react'

/** Legacy route — redirects to the current portfolio home. */
export default function HobbiesRedirectPage() {
  useEffect(() => {
    window.location.replace('/')
  }, [])

  return null
}
