'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Background3D from './Background3D'
import SocialCard from './SocialCard'

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
      bgImage: 'socials/instagram.jpg',
      color: '#E1306C',
      icon: FaInstagram,
      url: 'https://www.instagram.com/magarniranjan?igsh=eDJnOHdnMmdtZ2J1'
   },
   {
      id: 'yt',
      platform: 'Linkedin',
      handle: 'Nir Bahadur Palli Magar',
      bgImage: 'socials/linkedin.jpg',
      color: '#087ebb',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/nir-bahadur-palli-magar-4216337a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
   },
   {
      id: 'tt',
      platform: 'Facebook',
      handle: 'Niranjan Palli Magar',
      bgImage: 'socials/fb.jpg',
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

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
   }, [])

   useEffect(() => {
      const section = sectionRef.current
      if (!section) return

      const handleMouseMove = (e: MouseEvent) => {
         const rect = section.getBoundingClientRect()
         const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
         const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

         setMousePos({ x, y })

         if (containerRef.current) {
            const tiltMax = window.innerWidth < 768 ? 2 : 10
            gsap.to(containerRef.current, {
               rotateY: x * tiltMax,
               rotateX: -y * tiltMax,
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
   }, [])

   return (
      <section
         ref={sectionRef}
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
               />
            ))}
         </div>

         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080605] to-transparent pointer-events-none z-20" />
      </section>
   )
}