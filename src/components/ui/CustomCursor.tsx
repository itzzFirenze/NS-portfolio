'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
   const [mounted, setMounted] = useState(false)
   const cursorRef = useRef<HTMLDivElement>(null)
   const dotRef = useRef<HTMLDivElement>(null)
   const mouseX = useMotionValue(0)
   const mouseY = useMotionValue(0)
   const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
   const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })

   useEffect(() => {
      setMounted(true)

      const move = (e: MouseEvent) => {
         mouseX.set(e.clientX)
         mouseY.set(e.clientY)
         if (dotRef.current) {
            dotRef.current.style.left = e.clientX - 4 + 'px'
            dotRef.current.style.top = e.clientY - 4 + 'px'
         }
      }
      const enter = () => cursorRef.current?.classList.add('scale-[2.5]', 'border-[--brand-pink]')
      const leave = () => cursorRef.current?.classList.remove('scale-[2.5]', 'border-[--brand-pink]')

      window.addEventListener('mousemove', move)
      document.querySelectorAll('a, button, [data-cursor]')
         .forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

      return () => { window.removeEventListener('mousemove', move) }
   }, [mouseX, mouseY])

   // Don't render anything on the server — avoids hydration mismatch
   if (!mounted) return null

   return (
      <>
         <motion.div
            ref={cursorRef}
            style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: 36,
               height: 36,
               borderRadius: '50%',
               border: '2px solid #FF6B35',
               pointerEvents: 'none',
               zIndex: 9998,
               translateX: '-50%',
               translateY: '-50%',
               mixBlendMode: 'difference',
               x: springX,
               y: springY,
            }}
         />
         <div
            ref={dotRef}
            style={{
               position: 'fixed',
               width: 8,
               height: 8,
               borderRadius: '50%',
               background: '#FF6B35',
               pointerEvents: 'none',
               zIndex: 9999,
            }}
         />
      </>
   )
}
