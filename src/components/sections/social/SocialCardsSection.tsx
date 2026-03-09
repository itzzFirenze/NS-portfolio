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
   description: string;
   bgImage: string;
   color: string;
   icon: React.ElementType<{ className?: string }>;
   url: string;
}

// Icons
const InstagramIcon = (props: any) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
   </svg>
)

const YouTubeIcon = (props: any) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
   </svg>
)

const TwitchIcon = (props: any) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"></path>
      <path d="M11 11V7"></path>
      <path d="M16 11V7"></path>
   </svg>
)

const TwitterIcon = (props: any) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
   </svg>
)

const TikTokIcon = (props: any) => (
   <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
   </svg>
)

const SOCIAL_CARDS: CardData[] = [
   {
      id: 'ig',
      platform: 'Instagram',
      handle: '@neeraj_bakes',
      description: 'Behind the scenes of the bakery, recipe tests, and daily life.',
      bgImage: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ce6?q=80&w=1000&auto=format&fit=crop',
      color: '#E1306C',
      icon: InstagramIcon,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'tw',
      platform: 'Twitch',
      handle: 'NeerajLive',
      description: 'Live streams of weekend baking sessions and Q&A.',
      bgImage: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop',
      color: '#9146FF',
      icon: TwitchIcon,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'yt',
      platform: 'YouTube',
      handle: 'Neeraj Bakes',
      description: 'Long-form tutorials on sourdough, croissants, and technical baking.',
      bgImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop',
      color: '#FF0000',
      icon: YouTubeIcon,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'tt',
      platform: 'TikTok',
      handle: '@neeraj_bakes',
      description: 'Quick bites, shaping techniques, and ASMR bread scoring.',
      bgImage: 'https://images.unsplash.com/photo-1586671201081-115f0d4bd1cd?q=80&w=1000&auto=format&fit=crop', // Dough/ASMR style
      color: '#00F2FE',
      icon: TikTokIcon,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'x',
      platform: 'Twitter / X',
      handle: '@neeraj_tech',
      description: 'Food science notes, process optimization threads, and quick tips.',
      bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
      color: '#1DA1F2',
      icon: TwitterIcon,
      url: 'https://instagram.com/neeraj_bakes'
   }
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

         <div className="absolute top-20 left-0 w-full text-center z-10 pointer-events-none">
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
               className="text-white/50 max-w-md mx-auto text-sm uppercase tracking-widest"
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