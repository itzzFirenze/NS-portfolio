'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'

export default function Loader() {
   const { progress } = useProgress()
   const [show, setShow] = useState(true)
   const [done, setDone] = useState(false)
   const [displayProgress, setDisplayProgress] = useState(0)
   const realProgressReceived = useRef(false)

   useEffect(() => {
      if (progress > 0) realProgressReceived.current = true
      if (progress === 100) {
         setDisplayProgress(100)
         setTimeout(() => setDone(true), 400)
         setTimeout(() => setShow(false), 1200)
      } else if (progress > 0) {
         // Never go backwards — useProgress can reset mid-flight after hitting 100
         setDisplayProgress(p => Math.max(p, progress))
      }
   }, [progress])

   // Fallback: animate progress smoothly to 100 over ~2.5s if no R3F assets trigger useProgress
   useEffect(() => {
      const start = Date.now()
      const duration = 2200
      let raf: number
      const tick = () => {
         // Stop the fake animation the moment real R3F progress arrives
         if (realProgressReceived.current) return
         const elapsed = Date.now() - start
         const fakeProgress = Math.min((elapsed / duration) * 100, 100)
         setDisplayProgress(p => Math.max(p, fakeProgress))
         if (elapsed < duration) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      const timeout = setTimeout(() => {
         if (realProgressReceived.current) return
         setDisplayProgress(100)
         setDone(true)
         setTimeout(() => setShow(false), 800)
      }, 2500)

      return () => {
         cancelAnimationFrame(raf)
         clearTimeout(timeout)
      }
   }, [])

   // Baguette loaf body spans x=8 to x=114 in the viewBox
   const BAGUETTE_X_START = 8
   const BAGUETTE_WIDTH = 106
   const bakedWidth = (displayProgress / 100) * BAGUETTE_WIDTH

   return (
      <AnimatePresence>
         {show && (
            <motion.div
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#080605',
               }}
               initial={{ opacity: 1 }}
               exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            >
               {/* Baguette that "bakes" left to right */}
               <div style={{ marginBottom: 32 }}>
                  <svg
                     width="200"
                     height="80"
                     viewBox="0 0 120 60"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <defs>
                        {/* Unbaked / doughy */}
                        <linearGradient id="doughGrad" x1="8" y1="10" x2="114" y2="48" gradientUnits="userSpaceOnUse">
                           <stop offset="0%" stopColor="#e8d8aa" />
                           <stop offset="100%" stopColor="#d4bc80" />
                        </linearGradient>

                        {/* Baked / golden crust */}
                        <linearGradient id="bakedGrad" x1="8" y1="10" x2="114" y2="48" gradientUnits="userSpaceOnUse">
                           <stop offset="0%" stopColor="#f0a84e" />
                           <stop offset="50%" stopColor="#d4822a" />
                           <stop offset="100%" stopColor="#b8601a" />
                        </linearGradient>

                        {/* Grows left→right with progress */}
                        <clipPath id="bakedClip">
                           <rect
                              x={BAGUETTE_X_START}
                              y={0}
                              width={bakedWidth}
                              height={60}
                           />
                        </clipPath>

                        {/* Loaf silhouette clip (for score marks) */}
                        <clipPath id="loafClip">
                           <path d="M8 34 C10 18, 30 10, 60 10 C90 10, 112 16, 114 26 C116 36, 100 46, 70 48 C40 50, 10 46, 8 34 Z" />
                        </clipPath>

                        <linearGradient id="tipGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                           <stop offset="0%" stopColor="#c47b2b" />
                           <stop offset="100%" stopColor="#a05a18" />
                        </linearGradient>

                        {/* Shimmer sweep */}
                        <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                           <stop offset="0%" stopColor="rgba(255,240,180,0)" />
                           <stop offset="50%" stopColor="rgba(255,240,180,0.5)" />
                           <stop offset="100%" stopColor="rgba(255,240,180,0)" />
                        </linearGradient>
                     </defs>

                     {/* Shadow */}
                     <ellipse cx="62" cy="52" rx="48" ry="5" fill="rgba(0,0,0,0.35)" />

                     {/* Doughy base layer (full loaf) */}
                     <path
                        d="M8 34 C10 18, 30 10, 60 10 C90 10, 112 16, 114 26 C116 36, 100 46, 70 48 C40 50, 10 46, 8 34 Z"
                        fill="url(#doughGrad)"
                     />

                     {/* Baked layer — clips left→right */}
                     <path
                        d="M8 34 C10 18, 30 10, 60 10 C90 10, 112 16, 114 26 C116 36, 100 46, 70 48 C40 50, 10 46, 8 34 Z"
                        fill="url(#bakedGrad)"
                        clipPath="url(#bakedClip)"
                     />

                     {/* Shimmer on the baked portion */}
                     <g clipPath="url(#bakedClip)">
                        <motion.rect
                           x={-30}
                           y={0}
                           width={30}
                           height={60}
                           fill="url(#sheenGrad)"
                           animate={{ x: [BAGUETTE_X_START - 30, BAGUETTE_X_START + BAGUETTE_WIDTH + 10] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                        />
                     </g>

                     {/* Score marks clipped inside loaf */}
                     <g clipPath="url(#loafClip)">
                        <path d="M35 15 L29 26" stroke="rgba(160,80,20,0.7)" strokeWidth="2" strokeLinecap="round" />
                        <path d="M52 12 L46 23" stroke="rgba(160,80,20,0.7)" strokeWidth="2" strokeLinecap="round" />
                        <path d="M69 11 L63 22" stroke="rgba(160,80,20,0.7)" strokeWidth="2" strokeLinecap="round" />
                        <path d="M86 13 L80 24" stroke="rgba(160,80,20,0.7)" strokeWidth="2" strokeLinecap="round" />
                     </g>

                     {/* Top sheen highlight */}
                     <path
                        d="M20 18 C35 12, 70 11, 95 16"
                        stroke="rgba(255,235,160,0.35)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                     />

                     {/* Left tip — fades in early */}
                     <path
                        d="M8 34 C6 33, 2 31, 4 28 C6 26, 9 28, 10 31"
                        fill="url(#tipGrad)"
                        style={{ opacity: displayProgress > 8 ? 1 : 0.25, transition: 'opacity 0.4s' }}
                     />
                     {/* Right tip — appears near the end */}
                     <path
                        d="M114 26 C116 25, 120 26, 119 28 C118 30, 115 30, 113 28"
                        fill="url(#tipGrad)"
                        style={{ opacity: displayProgress > 88 ? 1 : 0.25, transition: 'opacity 0.4s' }}
                     />
                  </svg>
               </div>

               <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#FFF8F0',
                  marginBottom: 16,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
               }}>
                  Loading the Lab
               </div>

               {/* Progress bar */}
               <div style={{ width: 192, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                  <motion.div
                     style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #FF6B35, #FF2D78)' }}
                     initial={{ width: 0 }}
                     animate={{ width: `${displayProgress}%` }}
                     transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
               </div>
               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 12, fontFamily: 'Inter, sans-serif' }}>
                  {Math.round(displayProgress)}%
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}