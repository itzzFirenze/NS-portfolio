'use client'
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import FlourParticles from '@/components/3d/FlourParticles'

const STAGES = [
   {
      title: 'Development',
      subtitle: 'The Foundation of Flavour',
      desc: 'Precision sourcing of high-grade bread flours, malted barley, and functional additives. Every parameter measured — protein content, water absorption, ash content.',
      color: '#FFD23F',
      blobColor: '#c8a820',
      blobScale: 0.6,
   },
   {
      title: 'Mixing',
      subtitle: 'Gluten Network Development',
      desc: 'Optimized spiral mixer cycles ensure full gluten hydration. Dough temperature controlled to ±0.5°C through friction coefficient management.',
      color: '#FF6B35',
      blobColor: '#c8642a',
      blobScale: 0.75,
   },
   {
      title: 'Fermentation',
      subtitle: 'Controlled Proofing Science',
      desc: 'Retarder-prover protocols create complex flavours through extended cold fermentation. Yeast activity mapped against humidity and temperature curves.',
      color: '#a855f7',
      blobColor: '#7c3aad',
      blobScale: 0.92,
   },
   {
      title: 'Baking',
      subtitle: 'Thermal Transformation',
      desc: 'Multi-zone deck ovens with independent steam injection. Heat at 230°C drives Maillard browning and crust formation in controlled stages.',
      color: '#FF2D78',
      blobColor: '#d92278',
      blobScale: 1.0,
   },
   {
      title: 'Finished',
      subtitle: 'Quality. Every Batch.',
      desc: 'Shelf-life testing, crumb texture analysis, crust colour measurement, and moisture retention profiling ensure consistent premium output at scale.',
      color: '#FF6B35',
      blobColor: '#FF6B35',
      blobScale: 0.85,
   },
]

// A single gear-like ring with teeth
function AbstractGear({
   radius,
   tube,
   teethCount,
   color,
   speed,
   direction,
}: {
   radius: number
   tube: number
   teethCount: number
   color: string
   speed: number
   direction: 1 | -1
}) {
   const groupRef = useRef<THREE.Group>(null)
   const matRef = useRef<THREE.MeshStandardMaterial>(null)

   // Pre-calculate teeth positions
   const teeth = Array.from({ length: teethCount }).map((_, i) => {
      const angle = (i / teethCount) * Math.PI * 2
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number]
   })

   useFrame(({ clock }) => {
      if (groupRef.current) {
         // Substantially slowed down horizontal rotation
         groupRef.current.rotation.y += speed * direction * 0.002
         // Added a slight tilt and very slow vertical bob
         groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15 + 0.2
      }
      if (matRef.current) {
         // Smoothly transition colors
         const target = new THREE.Color(color)
         matRef.current.color.lerp(target, 0.05)
         matRef.current.emissive.lerp(target, 0.05)
      }
   })

   return (
      <group ref={groupRef}>
         {/* Main Ring */}
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, tube, 32, 64]} />
            <meshStandardMaterial
               ref={matRef}
               color={color}
               roughness={0.2}
               metalness={0.8}
               emissive={color}
               emissiveIntensity={0.1}
            />
         </mesh>
         
         {/* Gear Teeth */}
         {teeth.map((pos, i) => (
            <mesh key={i} position={pos} rotation={[0, -((i / teethCount) * Math.PI * 2), 0]}>
               <boxGeometry args={[tube * 3, tube * 1.5, tube * 4]} />
               <meshStandardMaterial
                  color={color}
                  roughness={0.3}
                  metalness={0.7}
                  emissive={color}
                  emissiveIntensity={0.2}
               />
            </mesh>
         ))}
      </group>
   )
}

function MechanicalCore({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
   const coreRef = useRef<THREE.Mesh>(null)
   const groupRef = useRef<THREE.Group>(null)
   const [stageIdx, setStageIdx] = useState(0)

   useFrame(({ clock }) => {
      if (!groupRef.current || !coreRef.current) return
      
      const p = progressRef.current
      const currentStage = Math.min(Math.floor(p * 5), 4)
      setStageIdx(currentStage)
      const stage = STAGES[currentStage]
      const t = clock.getElapsedTime()

      // Target scale for the whole system - reduced overall size greatly
      groupRef.current.scale.setScalar(
         THREE.MathUtils.lerp(groupRef.current.scale.x, stage.blobScale * 0.8, 0.05)
      )

      // Animate core much slower
      coreRef.current.rotation.x += 0.001
      coreRef.current.rotation.y += 0.002
      
      // Makes the core pulse based on the stage - much gentler pulse
      const pulse = Math.sin(t * 2) * 0.05 + 1
      coreRef.current.scale.setScalar(
         THREE.MathUtils.lerp(coreRef.current.scale.x, pulse, 0.1)
      )
   })

   return (
      <group ref={groupRef}>
         {/* Inner glowing core */}
         <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial
               color={STAGES[stageIdx].blobColor}
               roughness={0.1}
               metalness={0.9}
               emissive={STAGES[stageIdx].blobColor}
               emissiveIntensity={0.8}
               wireframe={true}
            />
         </mesh>

         {/* Inner Fast Gear */}
         <AbstractGear
            radius={1.2}
            tube={0.08}
            teethCount={8}
            color={STAGES[stageIdx].blobColor}
            speed={2 + stageIdx * 1.5}
            direction={1}
         />

         {/* Middle Counter-Rotating Gear */}
         <AbstractGear
            radius={1.8}
            tube={0.1}
            teethCount={12}
            color={STAGES[stageIdx].color}
            speed={1 + stageIdx}
            direction={-1}
         />
         
         {/* Outer Slow Frame Ring (No Teeth) - Tilted for 3D effect */}
         <mesh rotation={[Math.PI / 2.5, 0.1, 0]}>
             <torusGeometry args={[2.5, 0.01, 16, 100]} />
             <meshStandardMaterial
                color="#ffffff"
                roughness={0.5}
                metalness={0.5}
                transparent={true}
                opacity={0.15}
             />
         </mesh>
      </group>
   )
}

export default function Scrollytelling() {
   const sectionRef = useRef<HTMLDivElement>(null)
   const stickyRef = useRef<HTMLDivElement>(null)
   const progressRef = useRef(0)
   const currentStageRef = useRef(0)
   const stageRefs = useRef<(HTMLDivElement | null)[]>([])
   const dotRefs = useRef<(HTMLDivElement | null)[]>([])
   const isInView = useInView(sectionRef, { margin: "0px 0px 500px 0px" })

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)

      // Initial visibility state
      stageRefs.current.forEach((el, i) => {
         if (!el) return
         el.style.opacity = i === 0 ? '1' : '0'
         el.style.transform = `translateY(${i === 0 ? 0 : 30}px)`
      })

      const dot0 = dotRefs.current[0]
      if (dot0) { dot0.style.width = '32px'; dot0.style.background = STAGES[0].color }

      const ctx = gsap.context(() => {
         ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            onUpdate: (self) => {
               progressRef.current = self.progress
               const newStage = Math.min(Math.floor(self.progress * 5), 4)
               if (newStage !== currentStageRef.current) {
                  const old = stageRefs.current[currentStageRef.current]
                  const next = stageRefs.current[newStage]
                  if (old) gsap.to(old, { opacity: 0, y: -20, duration: 0.35 })
                  if (next) gsap.fromTo(next, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45 })

                  // Update dots
                  dotRefs.current.forEach((dot, i) => {
                     if (!dot) return
                     dot.style.width = i === newStage ? '32px' : '8px'
                     dot.style.background = i <= newStage ? STAGES[i].color : 'rgba(255,255,255,0.15)'
                     dot.style.transition = 'all 0.4s ease'
                  })

                  currentStageRef.current = newStage
               }
            },
         })
      }, sectionRef)

      return () => ctx.revert()
   }, [])

   return (
      <div
         ref={sectionRef}
         id="process"
         style={{ height: '500vh', position: 'relative', zIndex: 10, isolation: 'isolate', backgroundColor: '#080605' }}
      >
         {/* Sticky viewport */}
         <div
            ref={stickyRef}
            style={{
               position: 'sticky',
               top: 0,
               height: '100vh',
               width: '100%',
               overflow: 'hidden',
               background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.05) 0%, #080605 70%)',
            }}
         >
            {/* 3D Canvas — full background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
               <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]} frameloop={isInView ? 'always' : 'never'} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => gl.setClearColor('#000000', 0)}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[3, 3, 3]} intensity={2} color="#FF6B35" />
                  <pointLight position={[-3, -3, 2]} intensity={1} color="#FF2D78" />
                  <FlourParticles count={120} spread={8} size={0.02} />
                  <MechanicalCore progressRef={progressRef} />
               </Canvas>
            </div>

            {/* Text overlay — solid inline styles guarantee correct layout */}
            <div
               style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: 80,
                  paddingBottom: 40,
                  paddingLeft: 80,
                  paddingRight: 80,
                  pointerEvents: 'none',
               }}
            >
               <div style={{ maxWidth: 480 }}>
                  {/* Progress dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
                     {STAGES.map((s, i) => (
                        <div
                           key={i}
                           ref={el => { dotRefs.current[i] = el }}
                           style={{
                              height: 4,
                              width: i === 0 ? 32 : 8,
                              borderRadius: 4,
                              background: i === 0 ? s.color : 'rgba(255,255,255,0.15)',
                              transition: 'all 0.4s ease',
                              flexShrink: 0,
                           }}
                        />
                     ))}
                  </div>

                  {/* Stacked stage panels */}
                  <div style={{ position: 'relative', minHeight: 280 }}>
                     {STAGES.map((stage, i) => (
                        <div
                           key={i}
                           ref={el => { stageRefs.current[i] = el }}
                           style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              opacity: i === 0 ? 1 : 0,
                              transform: `translateY(${i === 0 ? 0 : 30}px)`,
                              transition: 'none', // GSAP handles transitions
                           }}
                        >
                           <div style={{
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: '0.3em',
                              textTransform: 'uppercase',
                              color: stage.color,
                              fontFamily: 'Inter, sans-serif',
                              marginBottom: 16,
                           }}>
                              Stage {String(i + 1).padStart(2, '0')}
                           </div>
                           <h2 style={{
                              fontFamily: 'Outfit, sans-serif',
                              fontWeight: 900,
                              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                              color: '#FFF8F0',
                              lineHeight: 1.1,
                              marginBottom: 16,
                           }}>
                              {stage.title}
                           </h2>
                           <div style={{
                              fontFamily: 'Outfit, sans-serif',
                              fontSize: 18,
                              fontWeight: 500,
                              color: 'rgba(255,248,240,0.45)',
                              marginBottom: 20,
                           }}>
                              {stage.subtitle}
                           </div>
                           <p style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 14,
                              lineHeight: 1.75,
                              color: 'rgba(255,248,240,0.6)',
                              maxWidth: 400,
                           }}>
                              {stage.desc}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Faint stage number watermark */}
            <div style={{
               position: 'absolute',
               bottom: 32,
               right: 48,
               fontFamily: 'Outfit, sans-serif',
               fontWeight: 900,
               fontSize: 140,
               color: 'rgba(255,255,255,0.025)',
               lineHeight: 1,
               pointerEvents: 'none',
               zIndex: 1,
               userSelect: 'none',
            }}>
               01
            </div>
         </div>
      </div>
   )
}
