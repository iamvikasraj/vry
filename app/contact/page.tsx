'use client'

import { useEffect } from 'react'

/** Legacy route — contact lives on the home page at #about. */
export default function ContactRedirectPage() {
  useEffect(() => {
    window.location.replace('/#about')
  }, [])

  return null
}
