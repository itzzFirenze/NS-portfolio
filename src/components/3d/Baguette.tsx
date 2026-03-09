'use client'
import { useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

interface BaguetteProps {
   position?: [number, number, number]
   scale?: number
}

export default function Baguette({ position = [0, 0, 0], scale = 1 }: BaguetteProps) {
   const groupRef = useRef<THREE.Group>(null)
   const [hovered, setHovered] = useState(false)
   const [showPanel, setShowPanel] = useState(false)

   useFrame(({ clock }) => {
      if (!groupRef.current) return
      const t = clock.getElapsedTime()
      // Hover spring bounce
      const targetY = hovered ? Math.sin(t * 6) * 0.04 : 0
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.15)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
         groupRef.current.rotation.z,
         hovered ? Math.sin(t * 3) * 0.05 : 0,
         0.1
      )
   })

   return (
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
         <group
            ref={groupRef}
            position={position}
            scale={scale}
            onPointerEnter={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setShowPanel(!showPanel)}
         >
            {/* Main baguette body */}
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
               <capsuleGeometry args={[0.1, 0.9, 8, 16]} />
               <meshStandardMaterial
                  color="#C8860A"
                  roughness={0.7}
                  metalness={0.05}
                  emissive="#8B5E00"
                  emissiveIntensity={hovered ? 0.3 : 0.05}
               />
            </mesh>
            {/* Score marks (slashes) */}
            {[-0.25, 0, 0.25].map((x, i) => (
               <mesh key={i} position={[x, 0.1, 0]} rotation={[0, 0, Math.PI / 3]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.15, 4]} />
                  <meshStandardMaterial color="#7A3C00" roughness={0.9} />
               </mesh>
            ))}
            {/* Glow on hover */}
            <pointLight color="#FFD23F" intensity={hovered ? 2 : 0} distance={2} />

            {/* Info Panel */}
            <Html
               position={[0, 0.7, 0]}
               center
               distanceFactor={5}
               style={{ pointerEvents: showPanel ? 'auto' : 'none' }}
            >
               <AnimatePresence>
                  {showPanel && (
                     <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        style={{
                           background: 'rgba(10,6,3,0.92)',
                           border: '1px solid rgba(255,107,53,0.4)',
                           borderRadius: 16,
                           padding: '16px 20px',
                           width: 220,
                           backdropFilter: 'blur(20px)',
                           color: '#FFF8F0',
                           fontFamily: 'Inter, sans-serif',
                           boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                        }}
                     >
                        <div style={{ fontSize: 10, color: '#FF6B35', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Case Study</div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Process Optimization</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,248,240,0.7)', lineHeight: 1.6 }}>
                           Reduced bake cycle time by 18% through precision proofing temperature profiling and humidity-controlled retarder management.
                        </div>
                        <button
                           onClick={() => setShowPanel(false)}
                           style={{ marginTop: 10, fontSize: 10, color: '#FF2D78', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                           Close ✕
                        </button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </Html>
         </group>
      </Float>
   )
}
