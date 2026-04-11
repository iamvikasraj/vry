'use client'

import ClientScripts from '@/components/ClientScripts'
import HomeTerminalLayout from '@/components/HomeTerminalLayout'
import '@/lib/analytics' // Initialize analytics global functions

export default function Home() {
  return (
    <div className="page-container page-container-terminal">
      <main className="home-terminal-main">
        <HomeTerminalLayout />
      </main>
      <ClientScripts />
    </div>
  )
}
