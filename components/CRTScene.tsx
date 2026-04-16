'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CRTMonitor3D } from './CRTMonitor3D'
import { AmbientSound } from './AmbientSound'
import * as THREE from 'three'

const DESK_Y = 0.054

const DEFAULT_CAM_POS  = new THREE.Vector3(-0.04, 0.37, 1.30)
const DEFAULT_CAM_LOOK = new THREE.Vector3(0.18, 0.42, -0.22)
const HOVER_CAM_POS    = new THREE.Vector3(0.22, 0.40, 0.62)
const HOVER_CAM_LOOK   = new THREE.Vector3(0.22, 0.348, -0.02)

function CameraController({ hovered }: { hovered: boolean }) {
  const { camera } = useThree()
  const lookTarget    = useRef(new THREE.Vector3().copy(DEFAULT_CAM_LOOK))
  const breathScratch = useRef(new THREE.Vector3().copy(DEFAULT_CAM_POS))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!hovered) {
      breathScratch.current.set(
        DEFAULT_CAM_POS.x + Math.sin(t * 0.07) * 0.003,
        DEFAULT_CAM_POS.y + Math.sin(t * 0.11) * 0.002,
        DEFAULT_CAM_POS.z,
      )
    }
    const targetPos  = hovered ? HOVER_CAM_POS : breathScratch.current
    const targetLook = hovered ? HOVER_CAM_LOOK : DEFAULT_CAM_LOOK
    camera.position.lerp(targetPos, hovered ? 0.07 : 0.018)
    lookTarget.current.lerp(targetLook, hovered ? 0.07 : 0.05)
    camera.lookAt(lookTarget.current)
  })

  return null
}

function CubicleShell() {
  return (
    <group>
      {/* Floor — slightly reflective to catch screen glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, -0.10]} receiveShadow>
        <planeGeometry args={[1.50, 1.26]} />
        <meshStandardMaterial color="#0c1210" roughness={0.78} metalness={0.08} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.61, -0.72]} receiveShadow castShadow>
        <boxGeometry args={[1.50, 1.22, 0.028]} />
        <meshStandardMaterial color="#0e1614" roughness={0.98} metalness={0} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-0.74, 0.61, -0.10]} receiveShadow>
        <boxGeometry args={[0.028, 1.22, 1.26]} />
        <meshStandardMaterial color="#0c1412" roughness={0.98} metalness={0} />
      </mesh>

      {/* Right wall */}
      <mesh position={[0.74, 0.61, -0.26]} receiveShadow>
        <boxGeometry args={[0.028, 1.22, 0.94]} />
        <meshStandardMaterial color="#0c1412" roughness={0.98} metalness={0} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 1.215, -0.10]}>
        <boxGeometry args={[1.50, 0.022, 1.26]} />
        <meshStandardMaterial color="#0c1210" roughness={0.95} metalness={0} />
      </mesh>

      {/* Ceiling fluorescent panels — off/dim in moody mode */}
      {[-0.24, 0.24].map((x, i) => (
        <mesh key={i} position={[x, 1.204, -0.20]}>
          <boxGeometry args={[0.42, 0.006, 0.24]} />
          <meshBasicMaterial color="#0a1610" toneMapped={false} />
        </mesh>
      ))}

      {/* Overhead cabinet */}
      <mesh position={[0.18, 0.97, -0.706]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.25, 0.28]} />
        <meshStandardMaterial color="#141e1c" roughness={0.88} metalness={0.06} />
      </mesh>
      <mesh position={[0.18, 0.97, -0.59]}>
        <boxGeometry args={[0.86, 0.23, 0.002]} />
        <meshStandardMaterial color="#10181a" roughness={0.95} metalness={0} />
      </mesh>
      {[-0.21, 0.21].map((x, i) => (
        <mesh key={i} position={[0.18 + x, 0.97, -0.588]}>
          <boxGeometry args={[0.10, 0.010, 0.006]} />
          <meshStandardMaterial color="#243028" roughness={0.4} metalness={0.55} />
        </mesh>
      ))}

      {/* Under-cabinet strip — off */}
      <mesh position={[0.18, 0.844, -0.593]}>
        <boxGeometry args={[0.86, 0.006, 0.016]} />
        <meshBasicMaterial color="#060c08" toneMapped={false} />
      </mesh>

      {/* Pinned sheet on back wall — barely visible in shadow */}
      <mesh position={[-0.12, 0.76, -0.705]}>
        <boxGeometry args={[0.20, 0.26, 0.003]} />
        <meshStandardMaterial color="#1c2820" roughness={0.95} metalness={0} />
      </mesh>

      {/* Binders standing on desk */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[-0.22 + i * 0.038, DESK_Y + 0.065, -0.64]} castShadow>
          <boxGeometry args={[0.030, 0.13, 0.22]} />
          <meshStandardMaterial color={['#1a2420', '#161e1a', '#202c24'][i]} roughness={0.90} metalness={0} />
        </mesh>
      ))}

      {/* Desk lamp on right wall — unlit */}
      <group position={[0.73, 0.82, -0.52]}>
        <mesh position={[-0.01, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.004, 0.004, 0.10, 8]} />
          <meshStandardMaterial color="#303c38" roughness={0.5} metalness={0.65} />
        </mesh>
        <mesh position={[-0.065, -0.038, 0]} rotation={[0.6, 0, -0.2]}>
          <coneGeometry args={[0.030, 0.055, 12, 1, true]} />
          <meshStandardMaterial color="#303c38" roughness={0.5} metalness={0.55} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

function LDesk() {
  const dh = 0.030
  return (
    <group>
      {/* Back counter — warm dark wood tones that catch screen glow */}
      <mesh position={[0.18, DESK_Y - dh / 2, -0.54]} castShadow receiveShadow>
        <boxGeometry args={[1.04, dh, 0.38]} />
        <meshStandardMaterial color="#2c2418" roughness={0.68} metalness={0.04} />
      </mesh>
      <mesh position={[0.18, DESK_Y - dh / 2, -0.352]}>
        <boxGeometry args={[1.04, dh, 0.006]} />
        <meshStandardMaterial color="#3a2a0e" roughness={0.65} metalness={0} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.56, DESK_Y - dh / 2, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[0.38, dh, 0.74]} />
        <meshStandardMaterial color="#2c2418" roughness={0.68} metalness={0.04} />
      </mesh>
      <mesh position={[0.56, DESK_Y - dh / 2, 0.253]}>
        <boxGeometry args={[0.38, dh, 0.006]} />
        <meshStandardMaterial color="#3a2a0e" roughness={0.65} metalness={0} />
      </mesh>

      {/* Front privacy panel */}
      <mesh position={[0.18, 0.22, -0.345]} castShadow>
        <boxGeometry args={[1.04, 0.44, 0.028]} />
        <meshStandardMaterial color="#0e1412" roughness={0.95} metalness={0.04} />
      </mesh>

      {/* Right side panel */}
      <mesh position={[0.74, 0.22, -0.12]} castShadow>
        <boxGeometry args={[0.028, 0.44, 0.74]} />
        <meshStandardMaterial color="#0e1412" roughness={0.95} metalness={0.04} />
      </mesh>
    </group>
  )
}

function FilingCabinet() {
  return (
    <group position={[-0.52, 0, -0.48]}>
      <mesh position={[0, 0.30, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.60, 0.28]} />
        <meshStandardMaterial color="#141c1a" roughness={0.82} metalness={0.14} />
      </mesh>
      {[0.38, 0.22, 0.06].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0.141]}>
            <boxGeometry args={[0.20, 0.001, 0.002]} />
            <meshStandardMaterial color="#0c1412" roughness={0.55} metalness={0.28} />
          </mesh>
          <mesh position={[0, y, 0.146]}>
            <boxGeometry args={[0.07, 0.010, 0.007]} />
            <meshStandardMaterial color="#1e2820" roughness={0.4} metalness={0.55} />
          </mesh>
        </group>
      ))}
      {[0, 1].map(i => (
        <mesh key={i} position={[-0.02, 0.618 + i * 0.034, -0.02]} castShadow>
          <boxGeometry args={[0.13, 0.032, 0.20]} />
          <meshStandardMaterial color={i === 0 ? '#151e18' : '#1a2416'} roughness={0.85} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}

function OfficeChair() {
  return (
    <group position={[0.20, 0, 0.20]}>
      <mesh position={[0, 0.40, 0]} castShadow>
        <boxGeometry args={[0.28, 0.055, 0.28]} />
        <meshStandardMaterial color="#0e1612" roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[0, 0.62, -0.13]} castShadow>
        <boxGeometry args={[0.28, 0.40, 0.055]} />
        <meshStandardMaterial color="#0e1612" roughness={0.95} metalness={0} />
      </mesh>
      {[-0.16, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.50, -0.04]}>
          <boxGeometry args={[0.04, 0.04, 0.22]} />
          <meshStandardMaterial color="#161e1a" roughness={0.9} metalness={0} />
        </mesh>
      ))}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.018, 0.022, 0.38, 10]} />
        <meshStandardMaterial color="#3a4e48" roughness={0.45} metalness={0.6} />
      </mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[0, 0.024, 0]} rotation={[0, (i * Math.PI * 2) / 5, 0]} castShadow>
          <boxGeometry args={[0.34, 0.016, 0.038]} />
          <meshStandardMaterial color="#1e2c28" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4].map(i => {
        const a = (i * Math.PI * 2) / 5
        return (
          <mesh key={i} position={[Math.cos(a) * 0.16, 0.010, Math.sin(a) * 0.16]}>
            <sphereGeometry args={[0.014, 8, 8]} />
            <meshStandardMaterial color="#162018" roughness={0.6} metalness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

function Keyboard() {
  return (
    <group position={[0.46, DESK_Y + 0.002, 0.02]}>
      <mesh position={[0, 0.010, 0]} castShadow>
        <boxGeometry args={[0.34, 0.016, 0.13]} />
        <meshStandardMaterial color="#2a2218" roughness={0.84} metalness={0.06} />
      </mesh>
      {[-0.032, 0, 0.032].map((z, i) => (
        <mesh key={i} position={[0, 0.019, z]}>
          <boxGeometry args={[0.30, 0.004, 0.024]} />
          <meshStandardMaterial color="#1e1a12" roughness={0.90} metalness={0} />
        </mesh>
      ))}
      <mesh position={[0.22, 0.012, 0.01]}>
        <boxGeometry args={[0.050, 0.020, 0.075]} />
        <meshStandardMaterial color="#2a2218" roughness={0.80} metalness={0.06} />
      </mesh>
    </group>
  )
}

function DeskPhone() {
  return (
    <group position={[-0.10, DESK_Y + 0.002, -0.60]}>
      <mesh position={[0, 0.018, 0]} castShadow>
        <boxGeometry args={[0.14, 0.030, 0.20]} />
        <meshStandardMaterial color="#1a1612" roughness={0.84} metalness={0.10} />
      </mesh>
      <mesh position={[0.04, 0.038, -0.02]} rotation={[0.1, -0.25, 0.2]}>
        <boxGeometry args={[0.045, 0.012, 0.14]} />
        <meshStandardMaterial color="#14120e" roughness={0.88} metalness={0.08} />
      </mesh>
    </group>
  )
}

function Papers() {
  return (
    <>
      {/* Papers catch warm amber from screen — off-white with slight warmth */}
      <mesh position={[0.06, DESK_Y + 0.003, -0.60]} rotation={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[0.18, 0.003, 0.23]} />
        <meshStandardMaterial color="#3a2e1c" roughness={0.92} metalness={0} />
      </mesh>
      <mesh position={[0.10, DESK_Y + 0.005, -0.56]} rotation={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[0.18, 0.003, 0.23]} />
        <meshStandardMaterial color="#322818" roughness={0.92} metalness={0} />
      </mesh>
    </>
  )
}

export default function CRTScene() {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000', position: 'fixed', inset: 0, zIndex: 0 }}>
      <AmbientSound />

      {/* ── Vignette — heavy, elliptical ──────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 72% 62% at 52% 48%, transparent 10%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)',
      }} />

      {/* ── Film grain — SVG fractalNoise overlay ─────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 6, pointerEvents: 'none',
        opacity: 0.09,
        mixBlendMode: 'screen' as const,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }} />

      <Canvas
        camera={{ position: [-0.04, 0.37, 1.30], fov: 52 }}
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.52,
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Almost zero ambient — monitor IS the room's light */}
          <ambientLight color="#080e0c" intensity={0.18} />

          {/* Monitor screen — warm amber throw on desk surface */}
          <pointLight position={[0.22, 0.52, -0.04]} color="#b07018" intensity={4.0} distance={1.05} decay={2} castShadow shadow-mapSize={[512, 512]} />
          {/* Softer fill spill toward viewer */}
          <pointLight position={[0.22, 0.40, 0.18]} color="#8a5210" intensity={1.8} distance={0.95} decay={2} />
          {/* Subtle cool rim — barely visible edge catch on monitor body */}
          <pointLight position={[-0.40, 0.70, 0.60]} color="#0a2820" intensity={0.6} distance={1.8} decay={2} />

          <CubicleShell />
          <LDesk />
          <CRTMonitor3D position={[0.22, DESK_Y, -0.24]} onHoverChange={setHovered} />
          <Keyboard />
          <DeskPhone />
          <Papers />
          <FilingCabinet />
          <CameraController hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  )
}
