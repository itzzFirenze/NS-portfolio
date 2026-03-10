'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import Donut from '@/components/3d/Donut'
import Baguette from '@/components/3d/Baguette'
import Cake from '@/components/3d/Cake'
import Croissant from '@/components/3d/Croissant'
import FlourParticles from '@/components/3d/FlourParticles'
import Loader from '@/components/ui/Loader'

function CameraRig() {
   const { camera } = useThree()
   const mouse = useRef({ x: 0, y: 0 })

   useFrame(() => {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.8, 0.04)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.4 + 0.5, 0.04)
      camera.lookAt(0, 0, 0)
   })

   return (
      <mesh
         onPointerMove={(e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
         }}
         visible={false}
      >
         <planeGeometry args={[100, 100]} />
         <meshBasicMaterial />
      </mesh>
   )
}

function SceneContent() {
   const { camera } = useThree()
   camera.position.set(0, 0.5, 5)

   return (
      <>
         <ambientLight intensity={0.3} />
         <pointLight position={[5, 5, 5]} intensity={1} color="#FF6B35" />
         <pointLight position={[-5, -3, 3]} intensity={0.8} color="#FF2D78" />
         <pointLight position={[0, 8, -2]} intensity={0.5} color="#FFD23F" />
         <Environment preset="night" />
         <Stars radius={30} depth={10} count={500} factor={2} saturation={0} fade speed={0.5} />
         <FlourParticles count={180} spread={10} />

         {/* Floating bakery items at orbit positions */}
         <Donut position={[-1.4, 0.5, 0]} scale={1.1} />
         <Baguette position={[1.5, 0.3, -0.5]} scale={1.0} />
         <Cake position={[0, -0.4, -1]} scale={0.9} scrollProgress={1} />
         <Croissant position={[-0.2, 1.2, 0.5]} scale={0.95} />

         <CameraRig />
      </>
   )
}

export default function HeroEnvironment() {
   const containerRef = useRef<HTMLElement>(null)
   const isInView = useInView(containerRef, { margin: "0px 0px 500px 0px" })

   return (
      <section ref={containerRef} className="relative w-full h-screen overflow-hidden" id="hero">
         {/* Background gradient */}
         <div className="absolute inset-0 z-0" style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(255,107,53,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,45,120,0.12) 0%, transparent 50%), #080605'
         }} />

         {/* 3D Canvas */}
         <Canvas
            className="absolute inset-0 z-10"
            camera={{ position: [0, 0.5, 5], fov: 50 }}
            dpr={[1, 1.5]}
            frameloop={isInView ? 'always' : 'never'}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
               gl.setClearColor('#080605', 0)
            }}
         >
            <Suspense fallback={null}>
               <SceneContent />
            </Suspense>
         </Canvas>

         <Loader />

         {/* Hero Overlay Text */}
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
               className="mb-4"
            >
               <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 18px',
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,107,53,0.12)',
                  border: '1px solid rgba(255,107,53,0.3)',
                  color: '#FF6B35',
                  fontFamily: 'Inter, sans-serif',
               }}>Senior Process Technologist</div>
            </motion.div>

            <motion.h1
               className="font-display font-black text-5xl md:text-7xl xl:text-8xl leading-tight mb-6"
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            >
               <span className="gradient-text">Crafting</span>
               <br />
               <span className="text-[#FFF8F0]">the Perfect</span>
               <br />
               <span className="gradient-text">Recipe</span>
            </motion.h1>

            <motion.p
               className="text-[rgba(255,248,240,0.65)] text-lg md:text-xl max-w-lg leading-relaxed mb-8"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            >
               Where food science meets industrial precision — innovating bakery production, one formulation at a time.
            </motion.p>

            <motion.div
               className="flex gap-4 flex-wrap justify-center items-center"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 2.3 }}
            >
               <a
                  href="#process"
                  className="pointer-events-auto group"
                  style={{
                     display: 'inline-flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: '14px 32px',
                     borderRadius: 9999,
                     fontFamily: 'Outfit, sans-serif',
                     fontWeight: 700,
                     fontSize: 15,
                     color: '#fff',
                     textDecoration: 'none',
                     position: 'relative',
                     overflow: 'hidden',
                     background: 'linear-gradient(135deg, #FF6B35, #FF2D78)',
                     border: 'none',
                     cursor: 'pointer',
                  }}
               >
                  <span style={{ position: 'relative', zIndex: 1 }}>Explore My Work</span>
                  <div
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: 'linear-gradient(135deg, #FF2D78, #FFD23F)' }}
                  />
               </a>
               <a
                  href="#contact"
                  className="pointer-events-auto"
                  style={{
                     display: 'inline-flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: '14px 32px',
                     borderRadius: 9999,
                     fontFamily: 'Outfit, sans-serif',
                     fontWeight: 700,
                     fontSize: 15,
                     color: '#FFF8F0',
                     textDecoration: 'none',
                     background: 'rgba(255,255,255,0.05)',
                     backdropFilter: 'blur(20px)',
                     WebkitBackdropFilter: 'blur(20px)',
                     border: '1px solid rgba(255,255,255,0.1)',
                     cursor: 'pointer',
                     transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF6B35')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
               >
                  Get In Touch
               </a>
            </motion.div>
         </div>

         {/* Scroll hint — full inline styles to survive global CSS reset */}
         <motion.div
            style={{
               position: 'absolute',
               bottom: -10,
               left: '50%',
               transform: 'translateX(-50%)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 8,
               zIndex: 20,
               pointerEvents: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
         >
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Scroll to explore</span>
            <motion.div
               style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #FF6B35, transparent)' }}
               animate={{ scaleY: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
            />
         </motion.div>

         {/* Corner decoration */}
         <div className="absolute top-24 right-6 text-xs text-white/20 font-body tracking-widest uppercase pointer-events-none z-20">
            {['Drag objects', '↙ Drag objects ↙'].map((t, i) => (
               <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 + i * 0.2 }}>
                  {i === 0 && <div className="mb-1">{t}</div>}
               </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
               Drag objects to rotate
            </motion.div>
         </div>
      </section>
   )
}