'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'
const TW = 640
const TH = 480

function drawTerminal(ctx: CanvasRenderingContext2D, cursor: boolean) {
  // ── Background ───────────────────────────────────────────────────
  ctx.fillStyle = '#090600'
  ctx.fillRect(0, 0, TW, TH)

  // ── Scanlines ────────────────────────────────────────────────────
  for (let y = 0; y < TH; y += 3) {
    ctx.fillStyle = 'rgba(0,0,0,0.42)'
    ctx.fillRect(0, y + 2, TW, 1)
  }

  const pad = 22
  let cy = pad + 6

  // ── Prompt line ──────────────────────────────────────────────────
  ctx.font = `700 14px ${MONO}`
  ctx.fillStyle = '#ffd060'
  ctx.fillText('vry', pad, cy)
  const vw = ctx.measureText('vry').width

  ctx.font = `400 14px ${MONO}`
  ctx.fillStyle = '#7a5200'
  const atStr = '@vt100'
  ctx.fillText(atStr, pad + vw, cy)
  const aw = ctx.measureText(atStr).width

  ctx.fillStyle = '#c07800'
  const pathStr = ':~$'
  ctx.fillText(pathStr, pad + vw + aw, cy)
  const pw = ctx.measureText(pathStr).width

  ctx.fillStyle = '#ffb000'
  ctx.fillText(' cat welcome.txt', pad + vw + aw + pw, cy)

  cy += 32

  // ── Greeting ─────────────────────────────────────────────────────
  ctx.font = `700 24px ${MONO}`
  ctx.shadowColor = 'rgba(255,176,0,0.75)'
  ctx.shadowBlur = 20
  ctx.fillStyle = '#ffb000'
  ctx.fillText('hello internet!', pad, cy)
  ctx.shadowBlur = 0

  cy += 32

  // ── Bio ──────────────────────────────────────────────────────────
  ctx.font = `400 13px ${MONO}`

  ctx.fillStyle = '#ffb000'
  const name = 'Vikas Raj Yadav'
  ctx.fillText(name, pad, cy)
  const nw = ctx.measureText(name).width
  ctx.fillStyle = '#7a5200'
  ctx.fillText(' — staff product designer', pad + nw, cy)

  cy += 19
  ctx.fillStyle = '#7a5200'
  ctx.fillText('Loop Health (YC 20) · Bengaluru, India', pad, cy)

  cy += 19
  ctx.fillText('10+ yrs · fintech · motion · design systems', pad, cy)

  cy += 30

  // ── Folder nav ───────────────────────────────────────────────────
  const folders = [
    { label: 'projects',  meta: '17 projects'  },
    { label: 'companies', meta: '8 companies'  },
    { label: 'workshops', meta: '4 workshops'  },
  ]

  for (const f of folders) {
    // Folder icon (simple ASCII box)
    ctx.fillStyle = '#7a5200'
    ctx.fillText('[+]', pad, cy)
    const iconW = ctx.measureText('[+]').width

    ctx.fillStyle = '#ffb000'
    ctx.fillText(` ${f.label}`, pad + iconW, cy)
    const labelW = ctx.measureText(` ${f.label}`).width

    ctx.font = `400 11px ${MONO}`
    ctx.fillStyle = '#4a3200'
    ctx.fillText(`  ${f.meta}`, pad + iconW + labelW, cy)
    ctx.font = `400 13px ${MONO}`

    cy += 21
  }

  cy += 12

  // ── Idle prompt + cursor ─────────────────────────────────────────
  ctx.font = `700 14px ${MONO}`
  ctx.fillStyle = '#ffd060'
  ctx.fillText('vry', pad, cy)
  const vw2 = ctx.measureText('vry').width

  ctx.font = `400 14px ${MONO}`
  ctx.fillStyle = '#7a5200'
  const rest = '@vt100:~$ '
  ctx.fillText(rest, pad + vw2, cy)
  const rw = ctx.measureText(rest).width

  if (cursor) {
    ctx.shadowColor = 'rgba(255,176,0,0.9)'
    ctx.shadowBlur = 10
    ctx.fillStyle = '#ffb000'
    ctx.fillText('█', pad + vw2 + rw, cy)
    ctx.shadowBlur = 0
  }

  // ── Phosphor bloom centre ─────────────────────────────────────────
  const bloom = ctx.createRadialGradient(TW / 2, TH * 0.45, 0, TW / 2, TH * 0.45, TH * 0.55)
  bloom.addColorStop(0, 'rgba(255,176,0,0.05)')
  bloom.addColorStop(1, 'transparent')
  ctx.fillStyle = bloom
  ctx.fillRect(0, 0, TW, TH)

  // ── CRT barrel vignette ───────────────────────────────────────────
  const vignette = ctx.createRadialGradient(TW / 2, TH / 2, TH * 0.25, TW / 2, TH / 2, TH * 0.78)
  vignette.addColorStop(0, 'transparent')
  vignette.addColorStop(1, 'rgba(0,0,0,0.82)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, TW, TH)

  // ── Status bar (reverse-video amber) ─────────────────────────────
  ctx.fillStyle = '#ffb000'
  ctx.fillRect(0, TH - 22, TW, 22)

  ctx.font = `700 11px ${MONO}`
  ctx.fillStyle = '#090600'
  ctx.fillText('VT100', pad, TH - 7)

  const centre = 'VRY PORTFOLIO'
  const cw = ctx.measureText(centre).width
  ctx.fillText(centre, (TW - cw) / 2, TH - 7)

  const right = 'TI — VISITOR GUIDE'
  const rw2 = ctx.measureText(right).width
  ctx.fillText(right, TW - rw2 - pad, TH - 7)
}

/** Hook: renders the terminal to a CanvasTexture, blinks the cursor via useFrame */
export function useTerminalTexture() {
  const offscreen = useRef<HTMLCanvasElement | null>(null)
  const texture   = useRef<THREE.CanvasTexture | null>(null)
  const cursorOn  = useRef(true)

  // Create canvas + texture once on the client
  useMemo(() => {
    if (typeof window === 'undefined') return
    const c = document.createElement('canvas')
    c.width  = TW
    c.height = TH
    offscreen.current = c
    const tex = new THREE.CanvasTexture(c)
    tex.minFilter = THREE.LinearFilter
    texture.current = tex
    const ctx = c.getContext('2d')!
    drawTerminal(ctx, true)
    tex.needsUpdate = true
  }, [])

  useFrame(({ clock }) => {
    const on = Math.floor(clock.getElapsedTime() * 1.1) % 2 === 0
    if (on !== cursorOn.current) {
      cursorOn.current = on
      const c = offscreen.current
      const tex = texture.current
      if (!c || !tex) return
      const ctx = c.getContext('2d')!
      drawTerminal(ctx, on)
      tex.needsUpdate = true
    }
  })

  return texture
}
