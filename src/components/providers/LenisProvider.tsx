'use client'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({
         duration: 1.4,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
      })
      function raf(time: number) {
         lenis.raf(time)
         ScrollTrigger.update()
         requestAnimationFrame(raf)
      }
      const id = requestAnimationFrame(raf)
      return () => {
         cancelAnimationFrame(id)
         lenis.destroy()
      }
   }, [])
   return <>{children}</>
}
