'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

export interface TerminalUiSoundApi {
  playHover: () => void
  playOpen: () => void
  playClose: () => void
  playActivate: () => void
  primeAudio: () => Promise<void>
}

const HOVER_COOLDOWN_MS = 280

function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  try {
    return new AC()
  } catch {
    return null
  }
}

export function useTerminalUiSound(): TerminalUiSoundApi {
  const ctxRef = useRef<AudioContext | null>(null)
  const lastHoverRef = useRef(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mq.matches
    const onChange = () => {
      reducedMotionRef.current = mq.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    return () => {
      const ctx = ctxRef.current
      if (ctx && ctx.state !== 'closed') void ctx.close()
    }
  }, [])

  const ensureCtx = useCallback((): AudioContext | null => {
    if (reducedMotionRef.current) return null
    if (!ctxRef.current) ctxRef.current = createAudioContext()
    return ctxRef.current
  }, [])

  const resume = useCallback(async (ctx: AudioContext) => {
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch {
        /* autoplay policies */
      }
    }
  }, [])

  const primeAudio = useCallback(async () => {
    const ctx = ensureCtx()
    if (ctx) await resume(ctx)
  }, [ensureCtx, resume])

  const playTone = useCallback(
    (freq: number, duration: number, volume = 0.045, delayFromNow = 0) => {
      const ctx = ensureCtx()
      if (!ctx) return
      void resume(ctx)
      const start = ctx.currentTime + delayFromNow
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(freq, start)
      gain.gain.setValueAtTime(volume, start)
      gain.gain.exponentialRampToValueAtTime(0.0008, start + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + duration + 0.03)
    },
    [ensureCtx, resume]
  )

  const playHover = useCallback(() => {
    const now = performance.now()
    if (now - lastHoverRef.current < HOVER_COOLDOWN_MS) return
    lastHoverRef.current = now
    playTone(920, 0.028, 0.034, 0)
  }, [playTone])

  const playOpen = useCallback(() => {
    playTone(520, 0.052, 0.048, 0)
    playTone(784, 0.058, 0.04, 0.048)
  }, [playTone])

  const playClose = useCallback(() => {
    playTone(720, 0.038, 0.038, 0)
    playTone(360, 0.062, 0.032, 0.036)
  }, [playTone])

  const playActivate = useCallback(() => {
    playTone(640, 0.036, 0.04, 0)
  }, [playTone])

  return useMemo(
    () => ({ playHover, playOpen, playClose, playActivate, primeAudio }),
    [playHover, playOpen, playClose, playActivate, primeAudio]
  )
}
