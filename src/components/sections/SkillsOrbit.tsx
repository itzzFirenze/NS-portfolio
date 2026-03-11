'use client'
import { useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import * as THREE from 'three'

// Added a 'logo' property to each skill pointing to distinct PNGs
const SKILLS = [
   { name: 'Al Hatab Bakery', icon: '🌾', color: '#FFD23F', logo: '/logos/al-hatab-logo.png', desc: "High-hydration, enriched, and lean dough systems. Baker's percentage mastery for consistent batch scaling." },
   { name: 'Kerala Technical University', icon: '⚗️', color: '#a855f7', logo: '/logos/ktu-logo.png', desc: 'Emulsification science, starch gelatinisation, protein denaturation, and Maillard reaction control.' },
   { name: 'University of Reading', icon: '🏭', color: '#FF6B35', logo: '/logos/reading-logo.png', desc: 'Tunnel, deck, convection, and rotary oven management with multi-zone temperature profiling.' },
   { name: 'Signature Flatbreads', icon: '⚙️', color: '#3b82f6', logo: '/logos/signature-logo.png', desc: 'Lean manufacturing, FMEA, value stream mapping, and SPC applied to high-volume production lines.' },
]

/** Central wheat stalk */
function WheatModel() {
   const groupRef = useRef<THREE.Group>(null)
   useFrame((_, delta) => {
      if (groupRef.current) groupRef.current.rotation.y += delta * 0.3
   })
   return (
      <group ref={groupRef}>
         <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 1.2, 8]} />
            <meshStandardMaterial color="#C8860A" roughness={0.7} />
         </mesh>
         {Array.from({ length: 6 }, (_, i) => (
            <mesh key={i} position={[Math.cos((i / 6) * Math.PI * 2) * 0.2, 0.4, Math.sin((i / 6) * Math.PI * 2) * 0.2]}>
               <sphereGeometry args={[0.07, 8, 8]} />
               <meshStandardMaterial color="#FFD23F" roughness={0.4} emissive="#FF6B35" emissiveIntensity={0.2} />
            </mesh>
         ))}
         <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#FFD23F" roughness={0.3} emissive="#FF6B35" emissiveIntensity={0.3} />
         </mesh>
         {/* Subtle core glow */}
         <pointLight color="#FFD23F" intensity={3} distance={5} />
      </group>
   )
}

/** 4 distinct orbits displaying unique logos */
function OrbitNodes({ onSelect, selected }: {
   onSelect: (i: number) => void
   selected: number | null
}) {
   const groupRefs = useRef<(THREE.Group | null)[]>([])
   const scaleTargets = useRef<number[]>(SKILLS.map(() => 1))

   // Load an array of textures based on the SKILLS logo paths
   const texturePaths = SKILLS.map(skill => skill.logo)
   const textures = useLoader(THREE.TextureLoader, texturePaths)

   useMemo(() => {
      textures.forEach(texture => {
         texture.colorSpace = THREE.SRGBColorSpace
         texture.minFilter = THREE.LinearMipmapLinearFilter
      })
   }, [textures])

   // Define expanding radius and unique speeds for each of the 4 orbits
   const RADII = [2.2, 3.1, 4.0, 4.9]
   const SPEEDS = [0.22, 0.14, 0.18, 0.11] // Prime-ish variations so they don't align often

   useFrame(({ clock, camera }) => {
      const t = clock.getElapsedTime()

      groupRefs.current.forEach((group, i) => {
         if (!group) return

         const r = RADII[i]
         const speed = SPEEDS[i]
         const angle = (t * speed) + (i * (Math.PI / 2)) // Offset start positions

         // Move along the circular path
         group.position.x = Math.cos(angle) * r
         group.position.z = Math.sin(angle) * r
         // Gentle floating up and down
         group.position.y = Math.sin(t * 1.2 + i) * 0.15

         // Billboard effect: Always face the camera so the logo isn't skewed
         group.lookAt(camera.position)

         // Smooth scaling for hover effects
         const target = scaleTargets.current[i]
         group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, target, 0.15))
      })
   })

   return (
      <>
         {/* Visual Orbit Rings */}
         {RADII.map((r, i) => (
            <mesh key={`ring-${i}`} rotation={[-Math.PI / 2, 0, 0]}>
               <torusGeometry args={[r, 0.006, 32, 64]} />
               <meshBasicMaterial
                  color={SKILLS[i].color}
                  transparent
                  opacity={0.15}
                  depthWrite={false} // <-- Added
               />
            </mesh>
         ))}

         {/* Orbiting Logo Nodes */}
         {SKILLS.map((skill, i) => (
            <group
               key={`node-${i}`}
               ref={el => { groupRefs.current[i] = el }}
               onClick={(e) => {
                  e.stopPropagation()
                  onSelect(i)
               }}
               onPointerEnter={(e) => {
                  e.stopPropagation()
                  document.body.style.cursor = 'pointer'
                  scaleTargets.current[i] = 1.4 // Scale up on hover
               }}
               onPointerOut={(e) => {
                  e.stopPropagation()
                  document.body.style.cursor = 'auto'
                  scaleTargets.current[i] = 1 // Reset scale
               }}
            >
               {/* Solid backing to occlude the orbit rings */}
               <mesh position={[0, 0, -0.03]}> {/* Pushed slightly further back */}
                  <circleGeometry args={[0.75, 32]} />
                  <meshBasicMaterial
                     color="#080605"
                     depthWrite={true}
                     polygonOffset={true}
                     polygonOffsetFactor={-1} // Gentle pull forward
                     polygonOffsetUnits={-1}
                  />
               </mesh>

               {/* Background Glow Base */}
               <mesh position={[0, 0, 0]}>
                  <circleGeometry args={[0.75, 32]} />
                  <meshBasicMaterial
                     color={skill.color}
                     transparent
                     opacity={0.15}
                     depthWrite={false}
                     polygonOffset={true}
                     polygonOffsetFactor={-2} // Pulled slightly more forward than backing
                  />
               </mesh>

               {/* Clean border ring to frame the logo nicely */}
               <mesh position={[0, 0, 0.01]}>
                  <ringGeometry args={[0.72, 0.75, 32]} />
                  <meshBasicMaterial
                     color={skill.color}
                     transparent
                     opacity={0.6}
                     depthWrite={false}
                     polygonOffset={true}
                     polygonOffsetFactor={-2}
                  />
               </mesh>

               {/* The actual PNG Logo mapped to a flat plane */}
               <mesh position={[0, 0, 0.02]}> {/* Pulled slightly forward physically */}
                  <planeGeometry args={[1.0, 1.0]} />
                  <meshBasicMaterial
                     map={textures[i]}
                     transparent
                     alphaTest={0.05}
                     depthWrite={false}
                     polygonOffset={true}
                     polygonOffsetFactor={-3} // Pulled the most forward so it always sits on top
                  />
               </mesh>
            </group>
         ))}
      </>
   )
}

export default function SkillsOrbit() {
   const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
   const containerRef = useRef<HTMLElement>(null)
   const isInView = useInView(containerRef, { margin: "0px 0px 500px 0px" })

   return (
      <section
         ref={containerRef}
         id="skills"
         style={{ background: '#080605', padding: '96px 0 60px', position: 'relative', overflow: 'hidden' }}
      >
         {/* Background glow */}
         <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800, height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,210,63,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
         }} />

         {/* Section header */}
         <motion.div
            style={{ textAlign: 'center', marginBottom: 0, position: 'relative', zIndex: 2 }} // Changed marginBottom to 0
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
         >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', color: '#FFD23F', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
               Core Competencies
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF8F0', marginBottom: 8 }}>
               Skills <span className="gradient-text-alt">Orbit</span>
            </h2>
         </motion.div>

         {/* 3D Canvas Area */}
         <div style={{ position: 'relative', maxWidth: 900, margin: '-110px auto 0', height: 550 }}>
            {/* Changed margin to pull the canvas up */}
            <Canvas
               camera={{ position: [0, 6.5, 10.5], fov: 45 }}
               dpr={[1, 2]}
               frameloop={isInView ? 'always' : 'never'}
               gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
               style={{ width: '100%', height: '100%' }}
            >
               <ambientLight intensity={0.4} />
               <pointLight position={[0, 6, 6]} intensity={1.5} color="#FFD23F" />
               <pointLight position={[6, -3, 6]} intensity={0.8} color="#FF6B35" />

               <Suspense fallback={null}>
                  <WheatModel />
                  <OrbitNodes onSelect={i => setSelectedSkill(i === selectedSkill ? null : i)} selected={selectedSkill} />
               </Suspense>
            </Canvas>

            {/* Selected Skill Detail Card */}
            <AnimatePresence>
               {selectedSkill !== null && (
                  <motion.div
                     key={selectedSkill}
                     className="glass-card"
                     style={{
                        position: 'absolute',
                        bottom: 30,
                        left: '50%',
                        translateX: '-50%',
                        width: 320,
                        borderRadius: 16,
                        padding: '24px',
                        textAlign: 'center',
                        zIndex: 30,
                        background: 'rgba(20, 15, 12, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${SKILLS[selectedSkill].color}44`,
                        boxShadow: `0 10px 40px ${SKILLS[selectedSkill].color}22`
                     }}
                     initial={{ opacity: 0, y: 30, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  >
                     <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                        <img
                           src={SKILLS[selectedSkill].logo}
                           alt={SKILLS[selectedSkill].name}
                           style={{ height: 52, objectFit: 'contain' }}
                        />
                     </div>
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: SKILLS[selectedSkill].color, marginBottom: 10 }}>
                        {SKILLS[selectedSkill].name}
                     </div>
                     <p style={{ fontSize: 13, color: 'rgba(255,248,240,0.7)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                        {SKILLS[selectedSkill].desc}
                     </p>
                     <button
                        onClick={() => setSelectedSkill(null)}
                        style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '6px 12px' }}
                     >
                        Close ✕
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Static Legend Map */}
         <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px 20px',
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 10
         }}>
            {SKILLS.map((s, i) => (
               <button
                  key={i}
                  onClick={() => setSelectedSkill(i === selectedSkill ? null : i)}
                  style={{
                     background: selectedSkill === i ? `${s.color}22` : 'rgba(255,255,255,0.03)',
                     border: `1px solid ${selectedSkill === i ? s.color : 'rgba(255,255,255,0.08)'}`,
                     borderRadius: 16, // Reduced from 999 to look better with stacked content
                     padding: '12px 16px', // Adjusted padding for vertical height
                     fontSize: 12,
                     color: selectedSkill === i ? s.color : 'rgba(255,255,255,0.6)',
                     cursor: 'pointer',
                     fontFamily: 'Inter, sans-serif',
                     transition: 'all 0.3s ease',
                     // --- NEW STYLES TO CENTER CONTENT ---
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '8px', // Space between logo and text
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.color)}
                  onMouseLeave={(e) => {
                     if (selectedSkill !== i) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
               >
                  <img
                     src={s.logo}
                     alt={s.name}
                     style={{
                        width: 20, // Slightly larger usually looks better when centered
                        height: 20,
                        objectFit: 'contain'
                     }}
                  />
                  <span>{s.name}</span>
               </button>
            ))}
         </div>
      </section>
   )
}