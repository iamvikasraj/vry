'use client'

import { useSyncExternalStore } from 'react'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(HOVER_QUERY)
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches
}

/** SSR / first paint — assume hover-capable so poster-first cards don't flash video. */
function getServerSnapshot() {
  return true
}

/** True on desktop with a fine pointer; false on phones/tablets (touch-first). */
export function useCanHover() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
