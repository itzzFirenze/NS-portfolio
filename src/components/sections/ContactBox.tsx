'use client'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import FlourParticles from '@/components/3d/FlourParticles'

function PastryBox({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
   const lidRef = useRef<THREE.Group>(null)
   const particlesRef = useRef<boolean>(false)

   useFrame(() => {
      if (!lidRef.current) return
      const targetX = isOpen ? -Math.PI * 0.75 : 0
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetX, 0.06)
   })

   const BOX_COLOR = '#3D1C02'
   const LID_COLOR = '#5a2d0c'
   const ACCENT = '#FF6B35'

   return (
      <group onClick={onToggle} position={[0, -0.3, 0]}>
         {/* Box base */}
         <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.8, 0.8, 1.4]} />
            <meshStandardMaterial color={BOX_COLOR} roughness={0.4} metalness={0.3} />
         </mesh>

         {/* Box inner bottom */}
         <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[1.7, 0.02, 1.3]} />
            <meshStandardMaterial color="#1a0800" roughness={0.8} />
         </mesh>

         {/* Orange ribbon stripe - horizontal */}
         <mesh position={[0, 0.41, 0]}>
            <boxGeometry args={[1.82, 0.06, 1.42]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} />
         </mesh>

         {/* Lid (pivots from back edge) */}
         <group position={[0, 0.4, -0.7]}>
            <group ref={lidRef}>
               <mesh position={[0, 0.04, 0.7]}>
                  <boxGeometry args={[1.82, 0.08, 1.42]} />
                  <meshStandardMaterial color={LID_COLOR} roughness={0.3} metalness={0.4} />
               </mesh>
               {/* Lid ribbon */}
               <mesh position={[0, 0.09, 0.7]}>
                  <boxGeometry args={[0.12, 0.1, 1.42]} />
                  <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.3} />
               </mesh>
            </group>
         </group>

         {/* Glow light inside */}
         {isOpen && <pointLight position={[0, 0.3, 0]} color="#FF6B35" intensity={3} distance={3} />}
      </group>
   )
}

function SprinkleBurst({ active }: { active: boolean }) {
   if (!active) return null
   return <FlourParticles count={200} spread={5} color="#FF6B35" size={0.04} speed={0.3} />
}

export default function ContactBox() {
   const [isOpen, setIsOpen] = useState(false)
   const [submitted, setSubmitted] = useState(false)
   const [burst, setBurst] = useState(false)
   const [form, setForm] = useState({ name: '', email: '', message: '' })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitted(true)
      setBurst(true)
      setTimeout(() => setBurst(false), 4000)
   }

   return (
      <section id="contact" style={{ padding: '80px clamp(20px, 5vw, 80px)', maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box', width: '100%' }}>
         <motion.div
            style={{ textAlign: 'center', marginBottom: 64 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
         >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', color: '#FF2D78', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>Contact</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF8F0', marginBottom: 14 }}>
               Open the <span className="gradient-text">Box</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Click the pastry box to reveal the contact form</p>
         </motion.div>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'stretch' }}>
            {/* 3D Box Canvas */}
            <div className="h-80 relative">
               <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }} dpr={[1, 1.5]}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[3, 5, 3]} intensity={2} color="#FF6B35" />
                  <pointLight position={[-3, 2, 3]} intensity={1} color="#FF2D78" />
                  <Suspense fallback={null}>
                     <PastryBox isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
                     <SprinkleBurst active={burst} />
                  </Suspense>
               </Canvas>

               {!isOpen && (
                  <motion.div
                     className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest uppercase"
                     animate={{ opacity: [0.3, 1, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity }}
                  >
                     Click to open →
                  </motion.div>
               )}
            </div>
            {/* Right panel — single AnimatePresence so form and placeholder never coexist */}
            <AnimatePresence mode="wait">
               {isOpen ? (
                  <motion.div
                     key="form"
                     style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                        borderRadius: 16,
                        padding: '32px',
                     }}
                     initial={{ opacity: 0, x: 30, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0, x: 30, scale: 0.95 }}
                     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                     <AnimatePresence mode="wait">
                        {!submitted ? (
                           <motion.form
                              key="form-inner"
                              onSubmit={handleSubmit}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                           >
                              {/* Name */}
                              <div>
                                 <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF6B35', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Name</div>
                                 <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, color: '#FFF8F0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
                                    placeholder="Your name"
                                 />
                              </div>
                              {/* Email */}
                              <div>
                                 <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF6B35', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Email</div>
                                 <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, color: '#FFF8F0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
                                    placeholder="your@email.com"
                                 />
                              </div>
                              {/* Message */}
                              <div>
                                 <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF6B35', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>Message</div>
                                 <textarea
                                    required
                                    rows={4}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, color: '#FFF8F0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none', boxSizing: 'border-box' }}
                                    placeholder="Let's talk bakery science..."
                                 />
                              </div>
                              <motion.button
                                 type="submit"
                                 style={{ width: '100%', padding: '14px', borderRadius: 12, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', background: 'linear-gradient(135deg, #FF6B35, #FF2D78)', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}
                                 whileHover={{ scale: 1.02 }}
                                 whileTap={{ scale: 0.97 }}
                              >
                                 Send Message 🍩
                              </motion.button>
                           </motion.form>
                        ) : (
                           <motion.div
                              key="success"
                              style={{ textAlign: 'center', padding: '32px 0' }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                           >
                              <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 24, marginBottom: 8, background: 'linear-gradient(135deg, #FF6B35, #FF2D78, #FFD23F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Message Sent!</div>
                              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Thanks for reaching out. I&apos;ll get back to you fresh out of the oven.</p>
                              <button
                                 style={{ marginTop: 24, fontSize: 11, color: '#FF6B35', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                                 onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                              >
                                 Send another →
                              </button>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               ) : (
                  <motion.div
                     key="placeholder"
                     style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                        borderRadius: 16,
                        padding: '32px',
                        textAlign: 'center',
                     }}
                     initial={{ opacity: 0, x: -20, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0, x: -20, scale: 0.95 }}
                     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                     <div style={{ fontSize: 40, marginBottom: 16 }}>🥐</div>
                     <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 18, color: '#FFF8F0', marginBottom: 8 }}>Ready to collaborate?</div>
                     <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>Open the box to start a conversation about your next bakery innovation project.</p>
                     <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>
                        <div>📍 Based in the UK</div>
                        <div>🕐 Available for consultancy &amp; full-time roles</div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </section>
   )
}
