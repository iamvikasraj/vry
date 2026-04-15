'use client'

import { useEffect, useRef } from 'react'

/**
 * Synthesises quiet office chatter using the Web Audio API —
 * no audio files needed. Multiple bandpass-filtered noise layers
 * are amplitude-modulated at speech rhythm rates to produce the
 * impression of distant indistinct voices. Fades in over 4 s.
 * Starts on first user interaction to satisfy browser autoplay policy.
 */
export function AmbientSound() {
  const started = useRef(false)

  useEffect(() => {
    function start() {
      if (started.current) return
      started.current = true

      const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      // ── Master bus — fade in over 4 s ──────────────────────────────
      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4)
      master.connect(ctx.destination)

      // ── Utility: looping pink-ish noise buffer ──────────────────────
      function makeNoise(duration = 3) {
        const len    = Math.floor(ctx.sampleRate * duration)
        const buf    = ctx.createBuffer(1, len, ctx.sampleRate)
        const data   = buf.getChannelData(0)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0
        for (let i = 0; i < len; i++) {
          // Paul Kellet pink noise approximation
          const w = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + w * 0.0555179
          b1 = 0.99332 * b1 + w * 0.0750759
          b2 = 0.96900 * b2 + w * 0.1538520
          b3 = 0.86650 * b3 + w * 0.3104856
          b4 = 0.55000 * b4 + w * 0.5329522
          b5 = -0.7616 * b5 - w * 0.0168980
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.5362) * 0.11
        }
        const src = ctx.createBufferSource()
        src.buffer = buf
        src.loop   = true
        // randomise loop start so layers don't phase-lock
        src.loopStart = Math.random() * duration * 0.5
        return src
      }

      // ── Voice layers — each is noise → bandpass → tremolo → master ──
      // Two "speakers" with different formant stacks
      const voices = [
        // speaker A
        { f: 340,  q: 14, rate: 4.3, depth: 0.58, vol: 0.10 },
        { f: 780,  q:  9, rate: 4.3, depth: 0.55, vol: 0.08 },
        { f: 1350, q: 11, rate: 4.3, depth: 0.50, vol: 0.06 },
        { f: 2400, q: 13, rate: 4.3, depth: 0.42, vol: 0.04 },
        // speaker B (offset rates so they talk at different times)
        { f: 410,  q: 12, rate: 3.6, depth: 0.62, vol: 0.09 },
        { f: 900,  q:  8, rate: 3.6, depth: 0.52, vol: 0.07 },
        { f: 1600, q: 10, rate: 3.6, depth: 0.46, vol: 0.05 },
        // distant murmur
        { f: 500,  q:  4, rate: 2.1, depth: 0.30, vol: 0.05 },
      ]

      const srcs: AudioNode[] = []

      voices.forEach(({ f, q, rate, depth, vol }) => {
        const noise  = makeNoise(2.5 + Math.random())
        const bp     = ctx.createBiquadFilter()
        bp.type            = 'bandpass'
        bp.frequency.value = f
        bp.Q.value         = q

        // Tremolo: LFO → gain
        const lfo     = ctx.createOscillator()
        lfo.type           = 'sine'
        lfo.frequency.value = rate + (Math.random() - 0.5) * 0.4

        const lfoAmt  = ctx.createGain()
        lfoAmt.gain.value = vol * depth

        const trem    = ctx.createGain()
        trem.gain.value = vol * (1 - depth * 0.5)

        noise.connect(bp)
        bp.connect(trem)
        lfo.connect(lfoAmt)
        lfoAmt.connect(trem.gain)
        trem.connect(master)

        const offset = Math.random() * 2
        noise.start(ctx.currentTime + offset)
        lfo.start(ctx.currentTime + offset)

        srcs.push(noise, lfo)
      })

      // ── Subtle 50/60 Hz electrical hum ─────────────────────────────
      const hum     = ctx.createOscillator()
      hum.type           = 'sine'
      hum.frequency.value = 58
      const humGain = ctx.createGain()
      humGain.gain.value = 0.006
      hum.connect(humGain)
      humGain.connect(master)
      hum.start()
      srcs.push(hum)

      // ── HVAC low rumble ─────────────────────────────────────────────
      const hvac     = makeNoise(4)
      const hvacLP   = ctx.createBiquadFilter()
      hvacLP.type            = 'lowpass'
      hvacLP.frequency.value = 120
      const hvacGain = ctx.createGain()
      hvacGain.gain.value = 0.08
      hvac.connect(hvacLP)
      hvacLP.connect(hvacGain)
      hvacGain.connect(master)
      hvac.start()
      srcs.push(hvac)

      // Cleanup
      ;(window as any).__ambientCtx = ctx
    }

    // Start on first interaction (browser autoplay policy)
    window.addEventListener('click',     start, { once: true })
    window.addEventListener('keydown',   start, { once: true })
    window.addEventListener('touchstart', start, { once: true })
    // Also try immediately (works in some browsers / dev mode)
    start()

    return () => {
      window.removeEventListener('click',     start)
      window.removeEventListener('keydown',   start)
      window.removeEventListener('touchstart', start)
      const ctx = (window as any).__ambientCtx as AudioContext | undefined
      if (ctx) {
        ctx.close()
        delete (window as any).__ambientCtx
      }
    }
  }, [])

  return null
}
