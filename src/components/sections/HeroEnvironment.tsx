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
   const imgGrayscale = useTransform(scrollYProgress, [0, 0.8], ["grayscale(0%) blur(0px)", "grayscale(100%) blur(8px)"])
   const imgScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])
   const tickerOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
   return (
      <section
         ref={containerRef}
         id="hero"
         style={{
            position: 'relative',
            width: '100%',
            height: '200vh',
            // Break out of any parent padding on mobile
            marginLeft: 0,
            marginRight: 0,
         }}
      >
         <div
            style={{
               position: 'sticky',
               top: 0,
               // Use 100dvw to account for dynamic viewport on mobile browsers
               // and negative margins to escape any parent horizontal padding
               width: '100vw',
               left: 0,
               marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
               height: '100dvh',
               overflow: 'hidden',
               background: '#080605',
            }}
         >
            {/* Background */}
            <div
               style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  background: '#080605',
                  width: '100%',
                  height: '100%',
               }}
            />

            {/* 3D Canvas */}
            <Canvas
               style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                  width: '100% !important' as never,
                  height: '100% !important' as never,
               }}
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

            {/* ScrollVelocity text — behind the profile image */}
            <motion.div
               style={{
                  opacity: tickerOpacity,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  userSelect: 'none',
               }}
            >
               <ScrollVelocity
                  texts={['Crafting the perfect recipe', 'Where science meets flavour']}
                  velocity={60}
                  numCopies={4}
                  className="font-display font-semibold tracking-tight"
                  parallaxClassName="py-2"
                  parallaxStyle={{
                     width: '100vw',
                     position: 'relative',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     overflow: 'hidden',
                  }}
                  scrollerStyle={{
                     fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                     color: '#ffffff',
                     lineHeight: 1.2,
                  }}
               />
            </motion.div>

            {/* Profile image — ON TOP of the ticker text */}
            <motion.div
               style={{
                  scale: imgScale,
                  filter: imgGrayscale,
                  position: 'absolute',
                  inset: 0,
                  zIndex: 15,
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
               }}
               className="drop-shadow-[0_0_80px_rgba(255,107,53,0.35)]"
            >
               <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src="/profile.webp"
                  alt="Owner"
                  style={{
                     width: '100%',
                     height: '100%',
                     objectFit: 'cover',
                     objectPosition: 'center',
                     display: 'block',
                  }}
               />
            </motion.div>

            {/* Hero Overlay Text */}
            <div
               style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  padding: '96px 24px 48px',
                  pointerEvents: 'none',
               }}
            >
               <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexGrow: 1 }}>
                  <SignatureText />
               </div>
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