'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MILESTONES = [
   { year: '2015', role: 'Food Science Graduate', company: 'University of Reading', type: 'Education', desc: 'BSc Food Science & Technology — First Class Honours. Dissertation on crust formation in artisan bread.', icon: '🎓', color: '#a855f7', product: '🌾' },
   { year: '2016', role: 'R&D Intern', company: 'Premier Foods', type: 'Internship', desc: 'Supported NPD team with bench trials, texture profiling, and competitor benchmarking across 3 product categories.', icon: '🔬', color: '#3b82f6', product: '🥐' },
   { year: '2017', role: 'Process Technologist', company: 'Warburtons', type: 'Role', desc: 'Joined the process improvement team. Led the transition of 2 bread lines to fully automated dough monitoring.', icon: '⚙️', color: '#FF6B35', product: '🍞' },
   { year: '2019', role: 'Senior Process Technologist', company: 'Warburtons', type: 'Promotion', desc: 'Promoted following a successful 18% cycle time reduction project. Took ownership of all sourdough product lines.', icon: '🚀', color: '#FF2D78', product: '🥖' },
   { year: '2021', role: 'MSc Food Science', company: 'University of Leeds', type: 'Education', desc: 'Part-time postgraduate study focusing on enzyme technology in bakery systems and clean label formulation strategies.', icon: '📜', color: '#FFD23F', product: '📚' },
   { year: '2023', role: 'Innovation Lead', company: 'Roberts Bakery', type: 'Role', desc: 'Leading NPD and process innovation across a 12-product portfolio. Delivered 3 new product launches in 9 months.', icon: '💡', color: '#10b981', product: '🎂' },
]

const CARD_WIDTH = 280
const CARD_GAP = 40

export default function Timeline() {
   const trackRef = useRef<HTMLDivElement>(null)
   const pinRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      if (!trackRef.current || !pinRef.current) return

      // Wait for layout to settle
      const ctx = gsap.context(() => {
         const track = trackRef.current!
         const pin = pinRef.current!
         const totalScroll = track.scrollWidth - pin.offsetWidth

         if (totalScroll <= 0) return

         gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
               trigger: pin,
               start: 'top top',
               end: () => `+=${totalScroll}`,
               pin: true,
               pinType: 'transform',
               scrub: 1,
               anticipatePin: 1,
               invalidateOnRefresh: true,
            },
         })
      })

      return () => ctx.revert()
   }, [])

   return (
      <div id="timeline" style={{ background: '#080605' }}>

         {/* ── GSAP pin wrapper (contains both header + track) ── */}
         <div
            ref={pinRef}
            style={{ height: '100vh', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}
         >
            {/* Header inside the pin so it stays adjacent to the cards */}
            <div style={{ padding: '48px 48px 24px', flexShrink: 0 }}>
               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', color: '#FF6B35', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>
                  Journey
               </div>
               <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF8F0', marginBottom: 6, lineHeight: 1.15 }}>
                  Career <span className="gradient-text">Timeline</span>
               </h2>
               <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
                  Scroll to travel through the journey →
               </p>
            </div>

            {/* Dashed conveyor rail */}
            <div style={{
               position: 'absolute',
               left: 0, right: 0,
               bottom: 100,
               height: 2,
               background: 'repeating-linear-gradient(90deg, rgba(255,107,53,0.35) 0, rgba(255,107,53,0.35) 24px, transparent 24px, transparent 48px)',
               pointerEvents: 'none',
               zIndex: 0,
            }} />

            {/* Scrollable track */}
            <div
               ref={trackRef}
               style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: CARD_GAP,
                  paddingLeft: 80,
                  paddingRight: 120,
                  paddingBottom: 56,
                  paddingTop: 20,
                  width: 'max-content',
                  flex: 1,
                  boxSizing: 'border-box',
                  willChange: 'transform',
               }}
            >
               {MILESTONES.map((m, i) => (
                  <div
                     key={i}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: CARD_WIDTH,
                        flexShrink: 0,
                     }}
                  >
                     {/* Card */}
                     <motion.div
                        className="glass-card"
                        style={{
                           borderRadius: 20,
                           padding: '20px 22px',
                           width: '100%',
                           position: 'relative',
                           overflow: 'hidden',
                           cursor: 'default',
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                     >
                        {/* Color accent top bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '20px 20px 0 0', background: `linear-gradient(90deg, ${m.color}, transparent)` }} />

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                           <span style={{ fontSize: 22, flexShrink: 0 }}>{m.icon}</span>
                           <div>
                              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: m.color, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>
                                 {m.type} · {m.year}
                              </div>
                              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFF8F0', lineHeight: 1.3 }}>
                                 {m.role}
                              </div>
                              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>
                                 {m.company}
                              </div>
                           </div>
                        </div>

                        <p style={{ fontSize: 11, color: 'rgba(255,248,240,0.55)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                           {m.desc}
                        </p>

                        {/* Product watermark */}
                        <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 28, opacity: 0.12 }}>
                           {m.product}
                        </div>
                     </motion.div>

                     {/* Connector line + glowing dot */}
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 14 }}>
                        <div style={{ width: 2, height: 28, background: `linear-gradient(to bottom, ${m.color}, transparent)` }} />
                        <div style={{
                           width: 14, height: 14,
                           borderRadius: '50%',
                           border: `2px solid ${m.color}`,
                           background: '#080605',
                           boxShadow: `0 0 10px ${m.color}, 0 0 22px ${m.color}44`,
                           flexShrink: 0,
                        }} />
                     </div>

                     {/* Year label */}
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 13, color: m.color, marginTop: 10 }}>
                        {m.year}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
