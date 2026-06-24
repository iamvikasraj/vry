'use client'

import { useEffect } from 'react'

/** Legacy route — about lives on the home page at #about. */
export default function AboutRedirectPage() {
  useEffect(() => {
    window.location.replace('/#about')
  }, [])

  return null
}
