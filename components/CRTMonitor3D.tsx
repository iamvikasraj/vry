'use client'

import * as THREE from 'three'
import { useTerminalTexture } from './TerminalOnScreen'

// ── Monitor dimensions (Three.js units ≈ metres) ──────────────────────────────
const W  = 0.46    // body width
const H  = 0.40    // body height
const D  = 0.44    // body depth (how far it sticks back)
const SW = 0.315   // screen width
const SH = 0.235   // screen height
const BZ = 0.022   // bezel border thickness
const STAND_H = 0.075
const BASE_W  = 0.26
const BASE_D  = 0.20
const BASE_H  = 0.022

// Derived Y positions
const BODY_Y   = BASE_H + STAND_H + H / 2
const SCREEN_Z = D / 2  // front face Z

// Shared plastic material props — warm beige/cream like a real 90s CRT
const plastic = {
  roughness: 0.82,
  metalness: 0.06,
}

interface CRTMonitor3DProps {
  position?:      [number, number, number]
  onHoverChange?: (hovered: boolean) => void
}

export function CRTMonitor3D({
  position = [0, 0, 0],
  onHoverChange,
}: CRTMonitor3DProps) {
  const screenTexture = useTerminalTexture()

  function handleOver(e: { stopPropagation: () => void }) {
    e.stopPropagation()
    onHoverChange?.(true)
    document.body.style.cursor = 'zoom-in'
  }

  function handleOut() {
    onHoverChange?.(false)
    document.body.style.cursor = 'default'
  }

  return (
    <group
      position={position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >

      {/* ── Base ─────────────────────────────────────────────────── */}
      <mesh position={[0, BASE_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        <meshStandardMaterial color="#c8bfa8" {...plastic} />
      </mesh>

      {/* ── Neck ─────────────────────────────────────────────────── */}
      <mesh position={[0, BASE_H + STAND_H / 2, 0]} castShadow>
        <boxGeometry args={[0.065, STAND_H, 0.085]} />
        <meshStandardMaterial color="#b8b0a0" {...plastic} />
      </mesh>

      {/* ── Main body ─────────────────────────────────────────────── */}
      <mesh position={[0, BODY_Y, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#c0b8a8" {...plastic} />
      </mesh>

      {/* ── Front face plate (slightly proud of body) ─────────────── */}
      <mesh position={[0, BODY_Y, SCREEN_Z + 0.004]} castShadow>
        <boxGeometry args={[W - 0.01, H - 0.01, 0.01]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* ── Outer bezel ring ──────────────────────────────────────── */}
      <mesh position={[0, BODY_Y, SCREEN_Z + 0.009]}>
        <boxGeometry args={[SW + BZ * 2 + 0.012, SH + BZ * 2 + 0.018, 0.008]} />
        <meshStandardMaterial color="#a8a090" roughness={0.82} metalness={0.06} />
      </mesh>

      {/* ── Inner bezel (dark recess around screen) ───────────────── */}
      <mesh position={[0, BODY_Y, SCREEN_Z + 0.013]}>
        <boxGeometry args={[SW + BZ * 2, SH + BZ * 2, 0.006]} />
        <meshStandardMaterial color="#302820" roughness={0.95} metalness={0} />
      </mesh>

      {/* ── Screen canvas texture ─────────────────────────────────── */}
      <mesh position={[0, BODY_Y, SCREEN_Z + 0.016]}>
        <planeGeometry args={[SW, SH]} />
        <meshBasicMaterial
          map={screenTexture.current ?? undefined}
          toneMapped={false}
        />
      </mesh>

      {/* ── Power LED — tiny dim dot, below bloom threshold ──────── */}
      <mesh position={[SW / 2 + BZ + 0.012, BODY_Y - SH / 2 - BZ - 0.020, SCREEN_Z + 0.019]}>
        <sphereGeometry args={[0.0018, 6, 6]} />
        <meshBasicMaterial color="#7a4000" />
      </mesh>

      {/* ── Control buttons (brightness / contrast / power) ──────── */}
      {[
        { x: -0.07, label: 'brightness' },
        { x: -0.035, label: 'contrast' },
        { x:  0.02,  label: 'degauss' },
        { x:  0.055, label: 'power' },
      ].map(({ x, label }) => (
        <mesh key={label} position={[x, BODY_Y - SH / 2 - BZ - 0.018, SCREEN_Z + 0.008]} castShadow>
          <boxGeometry args={[0.016, 0.010, 0.008]} />
          <meshStandardMaterial color="#908880" roughness={0.9} metalness={0} />
        </mesh>
      ))}

      {/* ── Rear vent slits (visual detail on body sides) ─────────── */}
      {[-0.06, -0.02, 0.02, 0.06].map((y, i) => (
        <mesh key={i} position={[W / 2 + 0.001, BODY_Y + y, 0.04]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.06, 0.004, 0.003]} />
          <meshStandardMaterial color="#908880" roughness={1} metalness={0} />
        </mesh>
      ))}

    </group>
  )
}
