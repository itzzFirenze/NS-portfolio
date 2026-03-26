'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Background3D from './Background3D'
import SocialCard from './SocialCard'
import { images } from '../../../data/images'

export interface CardData {
   id: string;
   platform: string;
   handle: string;
   bgImage: string;
   color: string;
   icon: React.ElementType<{ className?: string }>;
   url: string;
}

import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa6'

const SOCIAL_CARDS: CardData[] = [
   {
      id: 'ig',
      platform: 'Instagram',
      handle: '@magarniranjan',
      bgImage: images.socials[0],
      color: '#E1306C',
      icon: FaInstagram,
      url: 'https://www.instagram.com/magarniranjan?igsh=eDJnOHdnMmdtZ2J1'
   },
   {
      id: 'yt',
      platform: 'Linkedin',
      handle: 'Nir Bahadur Palli Magar',
      bgImage: images.socials[1],
      color: '#087ebb',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/nir-bahadur-palli-magar-4216337a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
   },
   {
      id: 'tt',
      platform: 'Facebook',
      handle: 'Niranjan Palli Magar',
      bgImage: images.socials[2],
      color: '#3a5da0',
      icon: FaFacebook,
      url: 'https://www.facebook.com/share/14Vy5EaDnsz/?mibextid=wwXIfr'
   },
]

export default function SocialCardsSection() {
   const sectionRef = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
   const [isMobile, setIsMobile] = useState(false)

   // Refs to manage auto-cycle and dismiss timeout
   const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null)
   const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
   const isUserInteractingRef = useRef(false)

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
   }, [])

   // Auto-cycle cards on mobile when user is not interacting
   const startAutoCycle = useCallback(() => {
      if (autoCycleRef.current) clearInterval(autoCycleRef.current)
      let i = 0
      autoCycleRef.current = setInterval(() => {
         if (!isUserInteractingRef.current) {
            setHoveredIndex(i % SOCIAL_CARDS.length)
            i++
         }
      }, 3000)
   }, [])

   const stopAutoCycle = useCallback(() => {
      if (autoCycleRef.current) {
         clearInterval(autoCycleRef.current)
         autoCycleRef.current = null
      }
   }, [])

   useEffect(() => {
      if (!isMobile) return
      startAutoCycle()
      return () => stopAutoCycle()
   }, [isMobile, startAutoCycle, stopAutoCycle])

   // Handle mobile card tap: highlight the card, auto-dismiss after 2.5s, then resume cycle
   const handleMobileCardTap = useCallback((index: number) => {
      isUserInteractingRef.current = true
      stopAutoCycle()
      setHoveredIndex(index)

      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current)
      dismissTimeoutRef.current = setTimeout(() => {
         setHoveredIndex(null)
         isUserInteractingRef.current = false
         startAutoCycle()
      }, 2500)
   }, [startAutoCycle, stopAutoCycle])

   // Dismiss on tap outside cards (mobile)
   useEffect(() => {
      if (!isMobile) return
      const handleTouchOutside = (e: TouchEvent) => {
         const target = e.target as HTMLElement
         if (!target.closest('[data-social-card]')) {
            if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current)
            setHoveredIndex(null)
            isUserInteractingRef.current = false
            startAutoCycle()
         }
      }
      document.addEventListener('touchstart', handleTouchOutside)
      return () => document.removeEventListener('touchstart', handleTouchOutside)
   }, [isMobile, startAutoCycle])

   // Desktop mouse-tilt logic (unchanged)
   useEffect(() => {
      const section = sectionRef.current
      if (!section || isMobile) return

      const handleMouseMove = (e: MouseEvent) => {
         const rect = section.getBoundingClientRect()
         const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
         const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
         setMousePos({ x, y })

         if (containerRef.current) {
            gsap.to(containerRef.current, {
               rotateY: x * 10,
               rotateX: -y * 10,
               duration: 0.5,
               ease: 'power2.out',
            })
         }
      }

      const handleMouseLeave = () => {
         setMousePos({ x: 0, y: 0 })
         setHoveredIndex(null)
         if (containerRef.current) {
            gsap.to(containerRef.current, {
               rotateY: 0,
               rotateX: 0,
               duration: 1,
               ease: 'elastic.out(1, 0.3)',
            })
         }
      }

      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)
      return () => {
         section.removeEventListener('mousemove', handleMouseMove)
         section.removeEventListener('mouseleave', handleMouseLeave)
      }
   }, [isMobile])

   return (
      <section
         ref={sectionRef}
         id='socials'
         className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-var-bg-dark"
         style={{ perspective: '1200px' }}
      >
         <Background3D />

         <div className="absolute top-20 left-0 w-full flex flex-col items-center justify-center text-center z-10 pointer-events-none">
            <motion.h2
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
               Connect <span className="text-[#FF6B35]">Everywhere</span>
            </motion.h2>
            <motion.p
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-white/50 max-w-md mx-auto text-sm uppercase tracking-widest mt-2"
            >
               Follow the baking journey across platforms
            </motion.p>
         </div>

         <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center transform-gpu"
         >
            {SOCIAL_CARDS.map((card, index) => (
               <SocialCard
                  key={card.id}
                  card={card}
                  index={index}
                  totalCards={SOCIAL_CARDS.length}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  mouseX={mousePos.x}
                  mouseY={mousePos.y}
                  url={card.url}
                  isMobile={isMobile}
                  onMobileTap={handleMobileCardTap}
               />
            ))}
         </div>

         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080605] to-transparent pointer-events-none z-20" />
      </section>
   )
}