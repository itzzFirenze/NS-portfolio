'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PointMaterial, Points } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
   const ref = useRef<THREE.Points>(null)
   
   // Create a sphere of random points
   const count = 1500
   const positions = new Float32Array(count * 3)
   for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
   }

   useFrame((state) => {
      if (ref.current) {
         ref.current.rotation.y = state.clock.elapsedTime * 0.05
         ref.current.rotation.x = state.clock.elapsedTime * 0.02
      }
   })

   return (
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
         <PointMaterial
            transparent
            color="#FF6B35"
            size={0.05}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.6}
            blending={THREE.AdditiveBlending}
         />
      </Points>
   )
}

function GlowingOrbs() {
   return (
      <>
         <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[-5, 2, -10]}>
               <sphereGeometry args={[2, 32, 32]} />
               <meshBasicMaterial color="#FF2D78" transparent opacity={0.15} />
            </mesh>
         </Float>
         <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={[5, -3, -15]}>
               <sphereGeometry args={[3, 32, 32]} />
               <meshBasicMaterial color="#FF6B35" transparent opacity={0.15} />
            </mesh>
         </Float>
      </>
   )
}

export default function Background3D() {
   return (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
         <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Particles />
            <GlowingOrbs />
         </Canvas>
      </div>
   )
}
