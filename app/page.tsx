'use client'

import { useEffect, useState } from 'react'
import ClientScripts from '@/components/ClientScripts'

// Dark holding screen shown before Three.js hydrates
function Preloader() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#060400',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'ui-monospace, monospace',
      fontSize: '12px',
      color: '#4a3000',
      letterSpacing: '0.08em',
    }}>
      <span>initialising display…</span>
    </div>
  )
}

// Lazy-load CRTScene only after client mount — avoids SSR/hydration BailoutToCSR
let CRTSceneModule: typeof import('@/components/CRTScene').default | null = null

export default function Home() {
  const [Scene, setScene] = useState<typeof CRTSceneModule>(null)

  useEffect(() => {
    import('@/components/CRTScene').then(mod => {
      CRTSceneModule = mod.default
      setScene(() => mod.default)
    })
  }, [])

  return (
    <>
      {Scene ? <Scene /> : <Preloader />}
      <ClientScripts />
    </>
  )
}
