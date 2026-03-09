'use client'
import { useRef, useState, useMemo } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const SPRINKLE_COLORS = ['#FF6B35', '#FF2D78', '#FFD23F', '#4ecdc4', '#a855f7', '#3b82f6']

function Sprinkle({ angle, radius, color }: { angle: number; radius: number; color: string }) {
   const ref = useRef<THREE.Mesh>(null)
   useFrame(({ clock }) => {
      if (!ref.current) return
      const t = clock.getElapsedTime()
      const a = angle + t * 0.4
      ref.current.position.x = Math.cos(a) * radius
      ref.current.position.y = Math.sin(a * 0.7) * 0.3
      ref.current.position.z = Math.sin(a) * radius
      ref.current.rotation.z = a * 2
   })
   return (
      <mesh ref={ref}>
         <capsuleGeometry args={[0.015, 0.06, 2, 4]} />
         <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
   )
}

interface DonutProps {
   position?: [number, number, number]
   scale?: number
   onClick?: () => void
}

export default function Donut({ position = [0, 0, 0], scale = 1, onClick }: DonutProps) {
   const meshRef = useRef<THREE.Mesh>(null)
   const groupRef = useRef<THREE.Group>(null)
   const [hovered, setHovered] = useState(false)
   const [isDragging, setIsDragging] = useState(false)
   const lastMouse = useRef({ x: 0, y: 0 })
   const velocity = useRef({ x: 0, y: 0 })

   const sprinkles = useMemo(() =>
      Array.from({ length: 12 }, (_, i) => ({
         angle: (i / 12) * Math.PI * 2,
         radius: 0.6 + Math.random() * 0.2,
         color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
      })), [])

   useFrame(({ clock }, delta) => {
      if (!meshRef.current || !groupRef.current) return
      const t = clock.getElapsedTime()
      if (!isDragging) {
         velocity.current.x *= 0.92
         velocity.current.y *= 0.92
         groupRef.current.rotation.y += velocity.current.x
         groupRef.current.rotation.x += velocity.current.y
         groupRef.current.rotation.y += 0.003
      }
      // Hover icing drip effect (scale squish)
      const targetScale = hovered ? 1.08 : 1
      meshRef.current.scale.setScalar(
         THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      )
      // Icing color pulse on hover
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 0.4 : 0.05, 0.1)
   })

   const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setIsDragging(true)
      lastMouse.current = { x: e.clientX, y: e.clientY }
   }

   const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
      if (!isDragging || !groupRef.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      velocity.current.x = dx * 0.01
      velocity.current.y = dy * 0.01
      groupRef.current.rotation.y += dx * 0.01
      groupRef.current.rotation.x += dy * 0.01
      lastMouse.current = { x: e.clientX, y: e.clientY }
   }

   const onPointerUp = () => setIsDragging(false)

   return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
         <group
            ref={groupRef}
            position={position}
            scale={scale}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerEnter={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
         >
            {/* Donut body */}
            <mesh ref={meshRef} castShadow>
               <torusGeometry args={[0.4, 0.18, 32, 64]} />
               <meshStandardMaterial
                  color="#E8A87C"
                  roughness={0.3}
                  metalness={0.1}
                  emissive="#FF6B35"
                  emissiveIntensity={0.05}
               />
            </mesh>
            {/* Icing layer */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
               <torusGeometry args={[0.4, 0.145, 32, 64, Math.PI * 1.5]} />
               <meshStandardMaterial
                  color="#FF2D78"
                  roughness={0.2}
                  metalness={0.3}
                  emissive="#FF2D78"
                  emissiveIntensity={0.2}
               />
            </mesh>
            {/* Sprinkles */}
            {sprinkles.map((s, i) => (
               <Sprinkle key={i} angle={s.angle} radius={s.radius} color={s.color} />
            ))}
            {/* Point light for glow */}
            <pointLight color="#FF2D78" intensity={hovered ? 3 : 0.5} distance={3} />
         </group>
      </Float>
   )
}
