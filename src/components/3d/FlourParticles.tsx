'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FlourParticlesProps {
   count?: number
   spread?: number
   color?: string
   size?: number
   speed?: number
}

export default function FlourParticles({
   count = 300,
   spread = 8,
   color = '#FFF8F0',
   size = 0.025,
   speed = 0.15,
}: FlourParticlesProps) {
   const ref = useRef<THREE.Points>(null)

   const { geometry, velocities } = useMemo(() => {
      const positions = new Float32Array(count * 3)
      const vel = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
         positions[i * 3 + 0] = (Math.random() - 0.5) * spread
         positions[i * 3 + 1] = (Math.random() - 0.5) * spread
         positions[i * 3 + 2] = (Math.random() - 0.5) * spread
         vel[i * 3 + 0] = (Math.random() - 0.5) * 0.002
         vel[i * 3 + 1] = Math.random() * 0.003 + 0.001
         vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      return { geometry: geo, velocities: vel }
   }, [count, spread])

   useFrame(() => {
      if (!ref.current) return
      const pos = ref.current.geometry.attributes.position.array as Float32Array
      const half = spread / 2
      for (let i = 0; i < count; i++) {
         pos[i * 3 + 0] += velocities[i * 3 + 0]
         pos[i * 3 + 1] += velocities[i * 3 + 1]
         pos[i * 3 + 2] += velocities[i * 3 + 2]
         if (pos[i * 3 + 1] > half) pos[i * 3 + 1] = -half
         if (pos[i * 3 + 0] > half) pos[i * 3 + 0] = -half
         if (pos[i * 3 + 0] < -half) pos[i * 3 + 0] = half
      }
      ref.current.geometry.attributes.position.needsUpdate = true
      ref.current.rotation.y += 0.0003
   })

   return (
      <points ref={ref} geometry={geometry}>
         <pointsMaterial
            size={size}
            color={color}
            transparent
            opacity={0.6}
            sizeAttenuation
            depthWrite={false}
         />
      </points>
   )
}
