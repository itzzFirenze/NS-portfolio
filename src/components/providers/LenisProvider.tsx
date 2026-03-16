'use client'
import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
   const pathname = usePathname()
   const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({
         duration: 1.4,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
      })
      
      setLenisInstance(lenis)

      function raf(time: number) {
         lenis.raf(time)
         ScrollTrigger.update()
         requestAnimationFrame(raf)
      }
      const id = requestAnimationFrame(raf)
      return () => {
         cancelAnimationFrame(id)
         lenis.destroy()
         setLenisInstance(null)
      }
   }, [])

   // Reset scroll on route change
   useEffect(() => {
      if (lenisInstance) {
         lenisInstance.scrollTo(0, { immediate: true })
      }
   }, [pathname, lenisInstance])
   return <>{children}</>
}
