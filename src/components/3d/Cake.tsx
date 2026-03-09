'use client'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface CakeProps {
   position?: [number, number, number]
   scale?: number
   scrollProgress?: number
}

const LAYER_COLORS = ['#7B4A1E', '#FF6B35', '#FFF8F0', '#FF2D78']
const FROSTING_COLOR = '#FFF8F0'

export default function Cake({ position = [0, 0, 0], scale = 1, scrollProgress = 1 }: CakeProps) {
   const groupRef = useRef<THREE.Group>(null)
   const candleLightRef = useRef<THREE.PointLight>(null)
   const [hovered, setHovered] = useState(false)

   useFrame(({ clock }) => {
      if (!groupRef.current) return
      groupRef.current.rotation.y += 0.005
      // Candle flicker
      if (candleLightRef.current) {
         const t = clock.getElapsedTime()
         candleLightRef.current.intensity = 1.5 + Math.sin(t * 12) * 0.5 + Math.sin(t * 37) * 0.2
      }
   })

   const layers = [
      { y: -0.3, radius: 0.5, height: 0.22, color: LAYER_COLORS[0] },
      { y: -0.05, radius: 0.4, height: 0.2, color: LAYER_COLORS[1] },
      { y: 0.18, radius: 0.3, height: 0.18, color: LAYER_COLORS[0] },
   ]

   return (
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.4}>
         <group
            ref={groupRef}
            position={position}
            scale={scale}
            onPointerEnter={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
         >
            {layers.map((layer, i) => {
               const visible = scrollProgress > i * 0.3
               return (
                  <group key={i}>
                     {/* Layer */}
                     <mesh
                        position={[0, layer.y, 0]}
                        castShadow
                        scale={[1, visible ? 1 : 0.001, 1]}
                     >
                        <cylinderGeometry args={[layer.radius, layer.radius + 0.03, layer.height, 32]} />
                        <meshStandardMaterial
                           color={layer.color}
                           roughness={0.5}
                           metalness={0.05}
                           emissive={layer.color}
                           emissiveIntensity={hovered ? 0.2 : 0.02}
                        />
                     </mesh>
                     {/* Frosting ring */}
                     <mesh position={[0, layer.y + layer.height / 2 + 0.01, 0]}>
                        <cylinderGeometry args={[layer.radius + 0.02, layer.radius + 0.02, 0.04, 32]} />
                        <meshStandardMaterial color={FROSTING_COLOR} roughness={0.2} metalness={0.1} />
                     </mesh>
                  </group>
               )
            })}

            {/* Candle */}
            <mesh position={[0, 0.32, 0]}>
               <cylinderGeometry args={[0.025, 0.025, 0.15, 8]} />
               <meshStandardMaterial color="#FFD23F" />
            </mesh>
            {/* Flame */}
            <mesh position={[0, 0.42, 0]}>
               <sphereGeometry args={[0.03, 8, 8]} />
               <meshStandardMaterial
                  color="#FF6B35"
                  emissive="#FFD23F"
                  emissiveIntensity={3}
                  transparent
                  opacity={0.9}
               />
            </mesh>
            <pointLight ref={candleLightRef} position={[0, 0.45, 0]} color="#FF6B35" intensity={1.5} distance={2} />

            {hovered && <pointLight color="#FF2D78" intensity={2} distance={3} />}
         </group>
      </Float>
   )
}
