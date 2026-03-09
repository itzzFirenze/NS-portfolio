'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '@react-three/drei'

export default function Loader() {
   const { progress } = useProgress()
   const [show, setShow] = useState(true)
   const [done, setDone] = useState(false)

   useEffect(() => {
      if (progress === 100) {
         setTimeout(() => setDone(true), 400)
         setTimeout(() => setShow(false), 1200)
      }
   }, [progress])

   // Fallback: if no R3F assets trigger progress (all inline geometry),
   // dismiss the loader after 2.5 seconds regardless
   useEffect(() => {
      const timeout = setTimeout(() => {
         setDone(true)
         setTimeout(() => setShow(false), 800)
      }, 2500)
      return () => clearTimeout(timeout)
   }, [])

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
               {/* Animated dough blob */}
               <motion.div
                  style={{
                     width: 80,
                     height: 80,
                     borderRadius: '50%',
                     marginBottom: 32,
                     background: 'linear-gradient(135deg, #FF6B35, #FF2D78)',
                  }}
                  animate={{
                     scale: [1, 1.2, 0.9, 1.1, 1],
                     borderRadius: ['50%', '40%', '50%', '45%', '50%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
               />
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
                     animate={{ width: done ? '100%' : `${Math.max(progress, done ? 100 : 0)}%` }}
                     transition={{ duration: 0.3 }}
                  />
               </div>
               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 12, fontFamily: 'Inter, sans-serif' }}>
                  {done ? '100' : Math.round(progress)}%
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}
