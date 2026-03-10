'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CardData } from './SocialCardsSection'

interface SocialCardProps {
   card: CardData;
   index: number;
   totalCards: number;
   hoveredIndex: number | null;
   setHoveredIndex: (idx: number | null) => void;
   mouseX: number;
   mouseY: number;
   url: string;
   isMobile: boolean;
}

export default function SocialCard({
   card,
   index,
   totalCards,
   hoveredIndex,
   setHoveredIndex,
   mouseX,
   mouseY,
   url,
   isMobile
}: SocialCardProps) {
   const cardRef = useRef<HTMLDivElement>(null)

   const isHovered = hoveredIndex === index
   const isAnyHovered = hoveredIndex !== null

   const centerIndex = Math.floor(totalCards / 2)
   const offsetFromCenter = index - centerIndex

   const baseX = isMobile ? offsetFromCenter * 45 : offsetFromCenter * 140
   const baseY = isMobile ? Math.abs(offsetFromCenter) * 25 : Math.abs(offsetFromCenter) * 15
   const baseRotate = isMobile ? offsetFromCenter * 8 : offsetFromCenter * 6
   const baseScale = isMobile ? 1 - Math.abs(offsetFromCenter) * 0.12 : 1 - Math.abs(offsetFromCenter) * 0.06
   const baseZIndex = totalCards - Math.abs(offsetFromCenter)

   let xOffset = baseX
   let yOffset = baseY
   let rotateZ = baseRotate
   let scale = baseScale
   let zIndex = baseZIndex

   if (isAnyHovered) {
      if (isHovered) {
         xOffset = baseX
         yOffset = isMobile ? -15 : -30
         rotateZ = 0
         scale = isMobile ? 1.02 : 1.05
         zIndex = 50
      } else {
         const pushDirection = index < hoveredIndex! ? -1 : 1
         xOffset = isMobile ? baseX + (pushDirection * 15) : baseX + (pushDirection * 40)
         yOffset = isMobile ? baseY + 5 : baseY + 10
         rotateZ = isMobile ? baseRotate + (pushDirection * 1) : baseRotate + (pushDirection * 2)
         scale = baseScale * 0.95
         zIndex = baseZIndex
      }
   }

   const parallaxX = isHovered ? mouseX * 20 : mouseX * 5
   const parallaxY = isHovered ? mouseY * 20 : mouseY * 5

   const Icon = card.icon

   return (
      <motion.div
         ref={cardRef}
         className="absolute top-1/2 left-1/2 origin-center cursor-pointer shadow-2xl"
         style={{ zIndex }}
         initial={{ x: '-50%', y: '-50%' }}
         animate={{
            x: `calc(-50% + ${xOffset}px)`,
            y: `calc(-50% + ${yOffset}px)`,
            rotateZ: rotateZ,
            scale: scale,
         }}
         transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
            mass: 1
         }}
         onMouseEnter={() => setHoveredIndex(index)}
         onMouseLeave={() => setHoveredIndex(null)}
         onClick={() => window.open(card.url, '_blank')}
      >
         {/* Card Body */}
         <div
            className="relative w-[280px] h-[400px] md:w-[320px] md:h-[460px] rounded-2xl overflow-hidden glass-card group transition-colors duration-300 border border-white/10"
            style={{
               borderColor: isHovered ? card.color : 'rgba(255, 255, 255, 0.08)'
            }}
         >
            {/* Background Image */}
            <motion.div
               className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-700 ease-out"
               style={{
                  backgroundImage: `url(${card.bgImage})`,
               }}
               animate={{
                  x: parallaxX,
                  y: parallaxY,
                  scale: isHovered ? 1.05 : 1
               }}
            />

            {/* Gradient overlay — slightly heavier at top so header content is legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25" />

            {isHovered && (
               <div
                  className="absolute inset-0 opacity-30 blur-3xl transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: card.color }}
               />
            )}

            {/* ── Content ── inset-8 = 32px padding on all sides, well away from edges */}
            <div className="absolute inset-8 flex flex-col justify-between z-10">

               {/* Top row: icon + handle pill */}
               <div className="flex items-start justify-between">
                  {/* Icon bubble */}
                  <div
                     className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                     style={{
                        color: isHovered ? card.color : 'white',
                        backgroundColor: isHovered ? 'white' : 'rgba(255,255,255,0.12)',
                        boxShadow: isHovered ? `0 0 16px ${card.color}55` : 'none'
                     }}
                  >
                     <Icon className="w-5 h-5" />
                  </div>

                  {/* Handle pill — max-width so it never bleeds to the edge */}
                  <div
                     className="glass px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase max-w-[52%] truncate transition-colors duration-300"
                     style={{ color: isHovered ? card.color : 'rgba(255,255,255,0.65)' }}
                  >
                     {card.handle}
                  </div>
               </div>

               {/* Bottom block: platform name + description + CTA */}
               <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-white leading-tight group-hover:drop-shadow-lg">
                     {card.platform}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/65 leading-relaxed line-clamp-2">
                     {card.description}
                  </p>

                  <motion.div
                     className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider overflow-hidden"
                     style={{ color: card.color }}
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                  >
                     <span>Explore</span>
                     <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </motion.div>
               </div>

            </div>
         </div>
      </motion.div>
   )
}