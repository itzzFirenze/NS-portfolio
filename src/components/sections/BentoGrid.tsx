'use client'
import { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Donut from '@/components/3d/Donut'
import Croissant from '@/components/3d/Croissant'

const ACHIEVEMENTS = [
   { value: '18%', label: 'Reduction in bake time through oven profiling' },
   { value: '12+', label: 'New product lines launched to market' },
   { value: '99.2%', label: 'Quality consistency achieved on high-volume lines' },
   { value: '3×', label: 'Shelf-life extension via Aw optimisation' },
]

const PROJECTS = [
   {
      title: 'Clean Label Reformulation',
      tag: 'Product Development',
      desc: 'Eliminated all E-number additives while maintaining 35-day shelf life through natural antimicrobial hurdle technology.',
      color: '#FF6B35',
   },
   {
      title: 'Sourdough Scale-Up',
      tag: 'Process Engineering',
      desc: 'Took an artisan 3-phase sourdough from a 50 kg pilot to 2.5-tonne industrial batches with no flavour compromise.',
      color: '#FF2D78',
   },
   {
      title: 'Line Efficiency Program',
      tag: 'Process Optimization',
      desc: 'Implemented SPC monitoring and preventive maintenance scheduling, cutting downtime losses by 22%.',
      color: '#FFD23F',
   },
]

const CERTIFICATIONS = [
   'HACCP Level 3',
   'BRC AA Certified Facility Experience',
   'Food Safety Management (ISO 22000)',
   'BFPRO Industrial Baking',
   'MSc Food Science',
]

function SpotlightCard({
   children,
   style = {},
}: { children: React.ReactNode; style?: React.CSSProperties }) {
   const cardRef = useRef<HTMLDivElement>(null)
   const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

   const onMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setSpotlight({ x, y, opacity: 1 })
   }

   return (
      <motion.div
         ref={cardRef}
         className="glass-card"
         style={{
            borderRadius: 20,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'none',
            ...style,
         }}
         onMouseMove={onMouseMove}
         onMouseLeave={() => setSpotlight(s => ({ ...s, opacity: 0 }))}
         whileHover={{ y: -4 }}
         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
         {/* Spotlight */}
         <div
            style={{
               position: 'absolute',
               inset: 0,
               pointerEvents: 'none',
               zIndex: 0,
               borderRadius: 20,
               opacity: spotlight.opacity,
               background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, rgba(255,107,53,0.13), transparent)`,
               transition: 'opacity 0.3s',
            }}
         />
         <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </motion.div>
   )
}

export default function BentoGrid() {
   return (
      <section
         id="about"
         style={{
            width: '100%',
            padding: '96px 0 80px',
            background: '#080605',
         }}
      >
         {/* Centred content column */}
         <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

            {/* Section header */}
            <motion.div
               style={{ textAlign: 'center', marginBottom: 56 }}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  color: '#FF6B35',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: 14,
               }}>
                  The Lab
               </div>
               <h2 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: '#FFF8F0',
                  lineHeight: 1.15,
                  margin: 0,
               }}>
                  Work &amp; <span className="gradient-text">Achievements</span>
               </h2>
            </motion.div>

            {/* ── Bento grid ── */}
            <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(4, 1fr)',
               gridAutoRows: 'auto',
               gap: 20,
            }}>

               {/* ── Row 1: Stats full width ── */}
               <SpotlightCard style={{ gridColumn: '1 / -1', padding: '32px 40px' }}>
                  <div style={{
                     display: 'grid',
                     gridTemplateColumns: 'repeat(4, 1fr)',
                     gap: 24,
                  }}>
                     {ACHIEVEMENTS.map((a, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, scale: 0.8 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           style={{ textAlign: 'center' }}
                        >
                           <div
                              className="gradient-text"
                              style={{
                                 fontFamily: 'Outfit, sans-serif',
                                 fontWeight: 900,
                                 fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                 lineHeight: 1.1,
                                 marginBottom: 10,
                              }}
                           >
                              {a.value}
                           </div>
                           <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{a.label}</div>
                        </motion.div>
                     ))}
                  </div>
               </SpotlightCard>

               {/* ── Row 2: Donut (1 col) | Project 1 (2 col) | Certifications (1 col) ── */}
               {/* Donut 3D */}
               <SpotlightCard style={{ gridColumn: 'span 1', minHeight: 240 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden' }}>
                     <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[2, 2, 2]} intensity={2} color="#FF2D78" />
                        <Suspense fallback={null}>
                           <Donut position={[0, 0, 0]} scale={0.9} />
                        </Suspense>
                     </Canvas>
                  </div>
                  <div style={{
                     position: 'absolute', bottom: 14, left: 14, zIndex: 10,
                     background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                     borderRadius: 8, padding: '4px 12px',
                  }}>
                     <span style={{ fontSize: 11, color: '#FF2D78', fontWeight: 600 }}>↻ Drag to rotate</span>
                  </div>
               </SpotlightCard>

               {/* Project 1 */}
               <SpotlightCard style={{ gridColumn: 'span 2', padding: '28px 30px' }}>
                  <span style={{
                     display: 'inline-block', fontSize: 11, padding: '4px 12px',
                     borderRadius: 999, fontWeight: 600, marginBottom: 14,
                     background: 'rgba(255,107,53,0.15)', color: '#FF6B35',
                     border: '1px solid rgba(255,107,53,0.3)',
                     fontFamily: 'Inter, sans-serif',
                  }}>
                     {PROJECTS[0].tag}
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                     {PROJECTS[0].title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                     {PROJECTS[0].desc}
                  </p>
                  <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #FF6B35, transparent)' }} />
               </SpotlightCard>

               {/* Certifications */}
               <SpotlightCard style={{ gridColumn: 'span 1', padding: '24px 22px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#FFD23F', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
                     Certifications
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                     {CERTIFICATIONS.map((c, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                           <span style={{ color: '#FF6B35', flexShrink: 0, marginTop: 2 }}>◆</span>
                           {c}
                        </li>
                     ))}
                  </ul>
               </SpotlightCard>

               {/* ── Row 3: Project 2 (2 col) | Croissant (1 col) + row 4 spacer handled in grid ── */}
               {/* Project 2 */}
               <SpotlightCard style={{ gridColumn: 'span 2', padding: '28px 30px' }}>
                  <span style={{
                     display: 'inline-block', fontSize: 11, padding: '4px 12px',
                     borderRadius: 999, fontWeight: 600, marginBottom: 14,
                     background: 'rgba(255,45,120,0.15)', color: '#FF2D78',
                     border: '1px solid rgba(255,45,120,0.3)',
                     fontFamily: 'Inter, sans-serif',
                  }}>
                     {PROJECTS[1].tag}
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                     {PROJECTS[1].title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                     {PROJECTS[1].desc}
                  </p>
                  <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, #FF2D78, transparent)' }} />
               </SpotlightCard>

               {/* Croissant 3D */}
               <SpotlightCard style={{ gridColumn: 'span 1', minHeight: 200 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden' }}>
                     <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[2, 2, 2]} intensity={2} color="#FFD23F" />
                        <Suspense fallback={null}>
                           <Croissant position={[0, 0, 0]} scale={1.2} />
                        </Suspense>
                     </Canvas>
                  </div>
                  <div style={{
                     position: 'absolute', bottom: 14, left: 14, zIndex: 10,
                     background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                     borderRadius: 8, padding: '4px 12px',
                  }}>
                     <span style={{ fontSize: 11, color: '#FFD23F', fontWeight: 600 }}>↔ Hover to unfold</span>
                  </div>
               </SpotlightCard>

               {/* Project 3 — placeholder for empty grid cell */}
               <SpotlightCard style={{ gridColumn: 'span 1', padding: '28px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🏭</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFF8F0', marginBottom: 6 }}>Industrial Scale</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>2.5-tonne batch capacity across sourdough lines</div>
               </SpotlightCard>

               {/* ── Row 4: Project 3 full width ── */}
               <SpotlightCard style={{ gridColumn: '1 / -1', padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
                     <div style={{ flex: 1, minWidth: 200 }}>
                        <span style={{
                           display: 'inline-block', fontSize: 11, padding: '4px 12px',
                           borderRadius: 999, fontWeight: 600, marginBottom: 14,
                           background: 'rgba(255,210,63,0.15)', color: '#FFD23F',
                           border: '1px solid rgba(255,210,63,0.3)',
                           fontFamily: 'Inter, sans-serif',
                        }}>
                           {PROJECTS[2].tag}
                        </span>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFF8F0', marginBottom: 12 }}>
                           {PROJECTS[2].title}
                        </h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', maxWidth: 520 }}>
                           {PROJECTS[2].desc}
                        </p>
                     </div>
                     <div style={{ display: 'flex', gap: 40, textAlign: 'center', flexShrink: 0 }}>
                        <div>
                           <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, color: '#FFD23F' }}>22%</div>
                           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Downtime Reduced</div>
                        </div>
                        <div>
                           <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, color: '#FF6B35' }}>SPC</div>
                           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Monitoring Deployed</div>
                        </div>
                     </div>
                  </div>
               </SpotlightCard>

            </div>
         </div>
      </section>
   )
}
