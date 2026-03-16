'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import FlourParticles from '@/components/3d/FlourParticles'
import SignatureText from '@/components/ui/SignatureText'
import ScrollVelocity from '@/components/ui/ScrollVelocity'

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
         <CameraRig />
      </>
   )
}

export default function HeroEnvironment() {
   const containerRef = useRef<HTMLElement>(null)
   const isInView = useInView(containerRef, { margin: "0px 0px 500px 0px" })
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   })

   // Grayscale + blur on scroll
   const imgGrayscale = useTransform(scrollYProgress, [0, 0.8], ["grayscale(0%) blur(0px)", "grayscale(100%) blur(8px)"])
   const imgScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

   const contentOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
   const contentY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0])
   const contentPointerEvents = useTransform(scrollYProgress, (v) => v > 0.7 ? "auto" : "none")

   // ScrollVelocity text fades in as image starts graying out
   const tickerOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])

   return (
      <section ref={containerRef} className="relative w-full h-[200vh]" id="hero">
         <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0" style={{ background: '#080605' }} />

            {/* 3D Canvas */}
            <Canvas
               className="absolute inset-0 z-10"
               camera={{ position: [0, 0.5, 5], fov: 50 }}
               dpr={[1, 1.5]}
               frameloop={isInView ? 'always' : 'never'}
               gl={{ antialias: true, alpha: true }}
               onCreated={({ gl }) => { gl.setClearColor('#282c20', 0) }}
            >
               <Suspense fallback={null}>
                  <SceneContent />
               </Suspense>
            </Canvas>

            {/* ── ScrollVelocity text — behind the profile image ── */}
            <motion.div
               style={{ opacity: tickerOpacity }}
               className="absolute inset-0 z-[14] flex flex-col justify-center pointer-events-none select-none"
            >
               <ScrollVelocity
                  texts={['Crafting the perfect recipe', 'Where science meets flavour']}
                  velocity={60}
                  numCopies={4}
                  className="font-display font-semibold tracking-tight"
                  parallaxClassName="py-2"
                  scrollerStyle={{
                     fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                     color: '#ffffff',
                     lineHeight: 1,
                  }}
               />
            </motion.div>

            {/* Profile image — ON TOP of the ticker text */}
            <motion.div
               style={{ scale: imgScale, filter: imgGrayscale }}
               className="absolute inset-0 z-[15] pointer-events-none drop-shadow-[0_0_80px_rgba(255,107,53,0.35)]"
            >
               <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src="/profile3.webp"
                  alt="Owner"
                  className="w-full h-full object-cover object-center"
               />
            </motion.div>

            {/* Hero Overlay Text */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between text-center px-6 pt-24 pb-12 pointer-events-none">
               {/* Center Area: Signature */}
               <div className="relative flex items-center justify-center w-full flex-grow">
                  <SignatureText />
               </div>

               {/* Bottom Area: Buttons */}
               {/* <motion.div
                  style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentPointerEvents as any }}
                  className="absolute bottom-16 left-0 right-0 flex flex-col items-center z-30 px-6"
               >
                  <div className="flex gap-4 flex-wrap justify-center items-center">
                     <a
                        href="#process"
                        className="group"
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
                  </div>
               </motion.div> */}
            </div>

            {/* Scroll hint */}
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
         </div>
      </section>
   )
}