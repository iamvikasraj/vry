'use client'

import { useState } from 'react'
import HomeDeSidebar from '@/components/HomeDeSidebar'
import PortfolioChat from '@/components/PortfolioChat'

export default function HomeDeLayout({ children }: { children: React.ReactNode }) {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="home-page home-page--de">
      <main className="home-de-main">
        <HomeDeSidebar />

        <div className="home-de-main-content">
          {children}
        </div>

        <div className={`home-de-chat-panel${showChat ? ' home-de-chat-panel--open' : ''}`}>
          <div className="home-de-chat-panel-inner">
            <div className="home-de-chat-panel-header">
              <span className="home-de-chat-panel-title">
                <svg width="11" height="10" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0.75 0.75H11.75V8.75H9L6.25 10.75L3.5 8.75H0.75V0.75Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="3.75" cy="4.75" r="1" fill="currentColor"/>
                  <circle cx="8.75" cy="4.75" r="1" fill="currentColor"/>
                </svg>
                ASK TI
              </span>
              <button
                type="button"
                className="home-de-chat-panel-close"
                onClick={() => setShowChat(false)}
              >
                Close
              </button>
            </div>
            <div className="home-de-chat-panel-body">
              <PortfolioChat />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
