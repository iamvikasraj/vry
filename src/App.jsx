import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './scenes/Scene'

function App() {
  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
