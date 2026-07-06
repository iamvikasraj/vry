'use client'

import { useEffect } from 'react'

/** Legacy route — work lives on the home page at #timeline (Experiences). */
export default function WorkRedirectPage() {
  useEffect(() => {
    window.location.replace('/#timeline')
  }, [])

  return null
}
