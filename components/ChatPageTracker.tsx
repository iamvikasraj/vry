'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

/** Fires portfolio_chat_open (global) when the standalone /chat page loads. */
export default function ChatPageTracker() {
  useEffect(() => {
    analytics.trackChatOpen('global')
  }, [])

  return null
}
