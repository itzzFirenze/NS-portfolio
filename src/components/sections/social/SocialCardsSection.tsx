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

import { FaInstagram, FaTwitch, FaYoutube, FaTiktok, FaXTwitter } from 'react-icons/fa6'

const SOCIAL_CARDS: CardData[] = [
   {
      id: 'ig',
      platform: 'Instagram',
      handle: '@neeraj_bakes',
      description: 'Behind the scenes of the bakery, recipe tests, and daily life.',
      bgImage: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ce6?q=80&w=1000&auto=format&fit=crop',
      color: '#E1306C',
      icon: FaInstagram,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'tw',
      platform: 'Twitch',
      handle: 'NeerajLive',
      description: 'Live streams of weekend baking sessions and Q&A.',
      bgImage: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop',
      color: '#9146FF',
      icon: FaTwitch,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'yt',
      platform: 'YouTube',
      handle: 'Neeraj Bakes',
      description: 'Long-form tutorials on sourdough, croissants, and technical baking.',
      bgImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop',
      color: '#FF0000',
      icon: FaYoutube,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'tt',
      platform: 'TikTok',
      handle: '@neeraj_bakes',
      description: 'Quick bites, shaping techniques, and ASMR bread scoring.',
      bgImage: 'https://images.unsplash.com/photo-1586671201081-115f0d4bd1cd?q=80&w=1000&auto=format&fit=crop', // Dough/ASMR style
      color: '#00F2FE',
      icon: FaTiktok,
      url: 'https://instagram.com/neeraj_bakes'
   },
   {
      id: 'x',
      platform: 'Twitter / X',
      handle: '@neeraj_tech',
      description: 'Food science notes, process optimization threads, and quick tips.',
      bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
      color: '#1DA1F2',
      icon: FaXTwitter,
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