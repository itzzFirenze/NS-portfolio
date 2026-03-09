'use client'
import { useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const SKILLS = [
   { name: 'Dough Formulation', icon: '🌾', color: '#FFD23F', desc: "High-hydration, enriched, and lean dough systems. Baker's percentage mastery for consistent batch scaling." },
   { name: 'Food Chemistry', icon: '⚗️', color: '#a855f7', desc: 'Emulsification science, starch gelatinisation, protein denaturation, and Maillard reaction control.' },
   { name: 'Industrial Baking', icon: '🏭', color: '#FF6B35', desc: 'Tunnel, deck, convection, and rotary oven management with multi-zone temperature profiling.' },
   { name: 'Process Engineering', icon: '⚙️', color: '#3b82f6', desc: 'Lean manufacturing, FMEA, value stream mapping, and SPC applied to high-volume production lines.' },
   { name: 'Shelf-Life Science', icon: '📐', color: '#10b981', desc: 'Water activity measurement, packaging gas flushing, antimicrobial hurdle design, accelerated shelf-life testing.' },
   { name: 'Quality Control', icon: '✅', color: '#FF2D78', desc: 'Sensory evaluation, crumb structure analysis, crust colour spectrophotometry, and weight audit systems.' },
   { name: 'Product Development', icon: '💡', color: '#f59e0b', desc: 'Concept-to-launch NPD including consumer insight translation, prototype baking, and manufacturing scale-up.' },
   { name: 'Fermentation Science', icon: '🧫', color: '#4ecdc4', desc: 'Sourdough maintenance, pre-ferment design (poolish, biga, sponge) and retarder-prover profiling.' },
]

/** Central wheat stalk — single useFrame, simple geometry */
function WheatModel() {
   const groupRef = useRef<THREE.Group>(null)
   useFrame((_, delta) => {
      if (groupRef.current) groupRef.current.rotation.y += delta * 0.5
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
         <pointLight color="#FFD23F" intensity={2} distance={4} />
      </group>
   )
}

/** All orbit nodes in ONE component → ONE useFrame call instead of 8 */
function OrbitNodes({ onSelect, selected }: {
   onSelect: (i: number) => void
   selected: number | null
}) {
   const meshRefs = useRef<(THREE.Mesh | null)[]>([])
   const scaleTargets = useRef<number[]>(SKILLS.map(() => 1))

   // Dummy geometries shared
   const geo = useMemo(() => new THREE.SphereGeometry(0.13, 14, 14), [])
   const materials = useMemo(
      () => SKILLS.map(s => new THREE.MeshStandardMaterial({
         color: s.color,
         emissiveIntensity: 0.5,
         roughness: 0.15,
         metalness: 0.6,
      })),
      []
   )

   useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
      const total = SKILLS.length
      meshRefs.current.forEach((mesh, i) => {
         if (!mesh) return
         const angle = (i / total) * Math.PI * 2 + t * 0.22
         const r = 2.6
         mesh.position.x = Math.cos(angle) * r
         mesh.position.z = Math.sin(angle) * r
         mesh.position.y = Math.sin(t * 0.5 + i * 0.8) * 0.2
         const target = scaleTargets.current[i]
         mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, target, 0.1))
      })
   })

   return (
      <>
         {SKILLS.map((skill, i) => (
            <mesh
               key={i}
               ref={el => { meshRefs.current[i] = el }}
               geometry={geo}
               material={materials[i]}
               onClick={() => onSelect(i)}
               onPointerEnter={() => {
                  scaleTargets.current[i] = 1.6
                  materials[i].emissiveIntensity = 1.5
                  materials[i].emissive = new THREE.Color(skill.color)
               }}
               onPointerOut={() => {
                  scaleTargets.current[i] = 1
                  materials[i].emissiveIntensity = 0.5
               }}
            />
         ))}
      </>
   )
}

export default function SkillsOrbit() {
   const [selectedSkill, setSelectedSkill] = useState<number | null>(null)

   return (
      <section
         id="skills"
         style={{ background: '#080605', padding: '96px 0 60px', position: 'relative' }}
      >
         {/* Background glow — no interaction, static */}
         <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,210,63,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
         }} />

         {/* Section header */}
         <motion.div
            style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
         >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', color: '#FFD23F', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
               Expertise
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF8F0', marginBottom: 8 }}>
               Skills <span className="gradient-text-alt">Orbit</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
               Click a skill node to learn more
            </p>
         </motion.div>

         {/* Skill labels ring — HTML overlay (no R3F Html needed) */}
         <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', height: 520 }}>
            <Canvas
               camera={{ position: [0, 4.5, 7.5], fov: 48 }}
               dpr={1}
               frameloop="always"
               gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
               style={{ width: '100%', height: '100%' }}
               onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
            >
               <ambientLight intensity={0.3} />
               <pointLight position={[0, 6, 6]} intensity={1.5} color="#FFD23F" />
               <pointLight position={[6, -3, 6]} intensity={0.8} color="#FF6B35" />
               <Suspense fallback={null}>
                  <WheatModel />
                  <OrbitNodes onSelect={i => setSelectedSkill(i === selectedSkill ? null : i)} selected={selectedSkill} />
               </Suspense>
            </Canvas>

            {/* Skill detail card */}
            <AnimatePresence>
               {selectedSkill !== null && (
                  <motion.div
                     key={selectedSkill}
                     className="glass-card"
                     style={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        translateX: '-50%',
                        width: 300,
                        borderRadius: 16,
                        padding: '20px 24px',
                        textAlign: 'center',
                        zIndex: 30,
                     }}
                     initial={{ opacity: 0, y: 20, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  >
                     <div style={{ fontSize: 30, marginBottom: 8 }}>{SKILLS[selectedSkill].icon}</div>
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: SKILLS[selectedSkill].color, marginBottom: 8 }}>
                        {SKILLS[selectedSkill].name}
                     </div>
                     <p style={{ fontSize: 12, color: 'rgba(255,248,240,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                        {SKILLS[selectedSkill].desc}
                     </p>
                     <button
                        onClick={() => setSelectedSkill(null)}
                        style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                     >
                        Close ✕
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Static skill name legend below canvas */}
         <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px 16px',
            maxWidth: 700,
            margin: '16px auto 0',
            padding: '0 24px',
         }}>
            {SKILLS.map((s, i) => (
               <button
                  key={i}
                  onClick={() => setSelectedSkill(i === selectedSkill ? null : i)}
                  style={{
                     background: selectedSkill === i ? `${s.color}22` : 'transparent',
                     border: `1px solid ${selectedSkill === i ? s.color : 'rgba(255,255,255,0.1)'}`,
                     borderRadius: 999,
                     padding: '4px 12px',
                     fontSize: 11,
                     color: selectedSkill === i ? s.color : 'rgba(255,255,255,0.5)',
                     cursor: 'pointer',
                     fontFamily: 'Inter, sans-serif',
                     transition: 'all 0.2s',
                  }}
               >
                  {s.icon} {s.name}
               </button>
            ))}
         </div>
      </section>
   )
}
