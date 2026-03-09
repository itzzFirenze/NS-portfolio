'use client'
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface CroissantProps {
   position?: [number, number, number]
   scale?: number
}

export default function Croissant({ position = [0, 0, 0], scale = 1 }: CroissantProps) {
   const groupRef = useRef<THREE.Group>(null)
   const segments = useRef<(THREE.Mesh | null)[]>([])
   const [hovered, setHovered] = useState(false)

   const NUM_SEGS = 7
   const BASE_ANGLE = Math.PI / 1.4 // arc range ~130 degrees
   const segmentData = useMemo(() => {
      return Array.from({ length: NUM_SEGS }, (_, i) => {
         const t = i / (NUM_SEGS - 1)
         const angle = -BASE_ANGLE / 2 + t * BASE_ANGLE
         const radius = 0.38
         const x = Math.cos(angle) * radius
         const y = Math.sin(angle) * radius * 0.5
         const segAngle = angle + Math.PI / 2
         const scaleX = 0.8 - Math.abs(t - 0.5) * 0.7
         return { x, y, rotZ: segAngle, scaleX, t }
      })
   }, [])

   useFrame(({ clock }) => {
      if (!groupRef.current) return
      const t = clock.getElapsedTime()
      groupRef.current.rotation.y += 0.006

      segments.current.forEach((seg, i) => {
         if (!seg) return
         const data = segmentData[i]
         const unfoldT = hovered ? data.t * 0.3 : 0
         seg.position.x = data.x + Math.cos(data.rotZ) * unfoldT
         seg.position.y = data.y + Math.sin(t * 2 + i) * 0.005
      })
   })

   return (
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.5}>
         <group
            position={position}
            scale={scale}
            onPointerEnter={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
         >
            <group ref={groupRef}>
               {segmentData.map((seg, i) => (
                  <mesh
                     key={i}
                     ref={el => { segments.current[i] = el }}
                     position={[seg.x, seg.y, 0]}
                     rotation={[0, 0, seg.rotZ]}
                     scale={[seg.scaleX, 1, 1]}
                     castShadow
                  >
                     <capsuleGeometry args={[0.06, 0.18, 6, 12]} />
                     <meshStandardMaterial
                        color={i % 2 === 0 ? '#C8860A' : '#D4960F'}
                        roughness={0.6}
                        metalness={0.1}
                        emissive="#8B5E00"
                        emissiveIntensity={hovered ? 0.25 : 0.05}
                     />
                  </mesh>
               ))}
            </group>
            <pointLight color="#FFD23F" intensity={hovered ? 2 : 0.3} distance={2.5} />
         </group>
      </Float>
   )
}
